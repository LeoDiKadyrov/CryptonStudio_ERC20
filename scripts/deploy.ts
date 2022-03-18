import { ethers } from "hardhat";

async function main() {
  const KadyrovToken = await ethers.getContractFactory("KadyrovToken");
  const kdvt = await KadyrovToken.deploy();

  await kdvt.deployed();

  console.log("ERC20 deployed to:", kdvt.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });