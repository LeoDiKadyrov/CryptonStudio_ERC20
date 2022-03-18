import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import "@nomiclabs/hardhat-etherscan";
import { task } from "hardhat/config";
import "hardhat-contract-sizer";
import "hardhat-gas-reporter"
import "solidity-coverage";
import 'dotenv/config'
import "./tasks/index";

const { ALCHEMY_API_KEY, PRIVATE_KEY } = process.env;

task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config = {
  solidity: {
    version:"0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000000,
      },
    },
  },
  etherscan : {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  typechain: {
    outDir: 'src/types',
    target: 'ethers-v5',
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    externalArtifacts: ['externalArtifacts/*.json'], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  },
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  }
}
 export default config;
