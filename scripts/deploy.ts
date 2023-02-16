import { ethers, run } from "hardhat";

async function main() {
  const storageFactory = await ethers.getContractFactory("StorageFactory");
  console.log("Deploying...");
  const storageFactoryContract = await storageFactory.deploy();
  await storageFactoryContract.deployed();

  console.log(`Storage Factory address: ${storageFactoryContract.address}`);
  if (process.env.ETHERSCAN_API_KEY) {
    await storageFactoryContract.deployTransaction.wait(6);
    await verify(storageFactoryContract.address);
  }

  // // Actions
  // -- Create
  await storageFactoryContract.createStorage();
  console.log("Create Storage done!");
  // -- Set Number
  let index = 0,
    number = 10;
  await storageFactoryContract.setFavoriteNumber(index, number);
  console.log("Set number done!");
  // -- Retrieve
  let getNumber = await storageFactoryContract.getNumber(index);
  console.log(`Number from index ${index}: ${getNumber}`);
}

async function verify(contractAddress: string, args?: any[]) {
  console.log("Verifying...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error: any) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(error);
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
