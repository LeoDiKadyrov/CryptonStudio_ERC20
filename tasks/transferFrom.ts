import { task } from "hardhat/config";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

task("transferFrom", "Send tokens from another address")
  .addParam("from", "Address from where to send tokens")
  .addParam("to", "Address where to send tokens")
  .addParam("value", "Amount of tokens to send")
  .setAction(async (taskArgs, hre) => {
    const { from, to, value } = taskArgs;

    const kdvt = await hre.ethers.getContractAt("KadyrovToken", contractAddress);
    await kdvt.transferFrom(from, to, value);
});