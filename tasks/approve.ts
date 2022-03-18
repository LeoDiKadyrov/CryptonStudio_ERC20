import { task } from "hardhat/config";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

task("approve", "Allowing another user to withdraw tokens from your balance")
  .addParam("spender", "The address to give access to")
  .addParam("current", "Current number of allowed tokens")
  .addParam("value", "Amount of tokens to allow for address")
  .setAction(async (taskArgs, hre) => {
    const { spender, current, value } = taskArgs;
    const kdvt = await hre.ethers.getContractAt("KadyrovToken", contractAddress);
    await kdvt.approve(spender, current, value);
});