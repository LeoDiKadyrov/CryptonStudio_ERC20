import { task } from "hardhat/config";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

task("transfer", "Transfer tokens to address")
  .addParam("to", "Address where to send tokens")
  .addParam("value", "Amount of tokens to send")
  .setAction(async (taskArgs, hre) => {
    const { to, value } = taskArgs;

    const kdvt = await hre.ethers.getContractAt("KadyrovToken", contractAddress);
    await kdvt.transfer(to, value);
  });