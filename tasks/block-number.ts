import { HardhatRuntimeEnvironment } from "hardhat/types";
import { task } from "hardhat/config";

export default task("block-number", "Print Block Number").setAction(
  async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`Current block: ${blockNumber}`);
  }
);
