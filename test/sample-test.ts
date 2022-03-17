import { run, ethers, network } from "hardhat";
import { Signer, BigNumber } from "ethers";
import { expect } from "chai";
// import { KadyrovToken } from "../src/types/KadyrovToken";

describe("Token", function () {
  let accounts: Signer[];
  let clean : any; // snapshot
  let contract: any;
  let owner : any, addr1 : any;

  before(async function() {
    await run("compile");
    [owner, addr1] = await ethers.getSigners();
    const KadyrovToken = await ethers.getContractFactory("KadyrovToken");
    contract = await KadyrovToken.deploy();
    await contract.deployed();

    clean = await network.provider.request({
        method: "evm_snapshot",
        params: []
    });
  }); 

  afterEach(async  function() {
    clean = await network.provider.request({
        method: "evm_revert",
        params: [clean],
    });

    clean = await network.provider.request({
      method: 'evm_snapshot',
      params: []
    });
  });

  describe("Basic properties", () => {
    it("Name should be KadyrovToken", async () => {
      expect(await contract.name()).to.eq("KadyrovToken");
    });

    it("Symbol should be KDVT", async () => {
      expect(await contract.symbol()).to.eq("KDVT");
    });

    it("Check owner balance", async () => {
      const ownerBalance = ethers.BigNumber.from(
        await contract.balanceOf(owner.address)
      );
      expect(await contract.totalSupply()).to.eq(ownerBalance);
    });

    it("Random user has zero on his/her balance", async () => {
      expect(await contract.balanceOf(addr1.address)).to.be.equal(0);
    });
  });

  describe("Transfer", () => {
    it("Correct transfer call increases balance", async () => {
      await contract.connect(owner).transfer(addr1.address, 1);
      expect(await contract.balanceOf(addr1.address)).to.eq(1);
    });

    it("Correct transfer call decreases balance", async () => {
      const balanceBefore = await contract.balanceOf(owner.address);
      await contract.connect(owner).transfer(addr1.address, 1);
      expect(await contract.balanceOf(owner.address)).to.eq(balanceBefore.sub(1));
    });

    it("Transfer to zero address should revert", async() => {
      await expect(contract.transfer(ethers.constants.AddressZero, 1)).to.be.revertedWith("_to shouldn't be 0x0 address");
    });

    it("Transfer of more tokens that user have should revert", async() => {
      await expect(contract.transfer(addr1.address, 100000000000)).to.be.revertedWith("Caller's account balance doesn't have enough tokens");
    });

    it("Transfer event should be emitted", async() => {
      await expect(contract.transfer(addr1.address, 1)).to.be.emit(contract, "Transfer");
    });

  });

});
