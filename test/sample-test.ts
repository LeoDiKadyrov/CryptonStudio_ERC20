import { ethers, network } from "hardhat";
import { Signer, BigNumber } from "ethers";
import { expect } from "chai";
import { KadyrovToken } from "../src/types/KadyrovToken";

describe("Token", function () {
  let accounts: Signer[];
  let clean : any; // snapshot
  let contract: KadyrovToken;

  before(async function() {
    const KadyrovToken = await ethers.getContractFactory("KadyrovToken");
    const contract = await KadyrovToken.deploy();
    accounts = await ethers.getSigners();
    await contract.deployed();

    clean = await network.provider.request({
        method: "evm_snapshot",
        params: []
    });
  }); 

  afterEach(async  function() {
    await network.provider.request({
        method: "evm_revert",
        params: [clean],
    });
  });

  describe("name", () => {
    it("should return name", async () => {
      await expect(contract.name()).to.eq("KadyrovToken");
    });
  });
});
