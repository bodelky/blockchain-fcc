import { ethers } from "hardhat";
import { SimpleStorage } from "../typechain-types/SimpleStorage";
import { assert } from "chai";

describe("SimpleStorage", () => {
  let simpleStorageFactory, simpleStorage: SimpleStorage;
  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = (await simpleStorageFactory.deploy()) as SimpleStorage;
  });
  it("Should start the favorite number with 0", async () => {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue: any = 0;
    assert.equal(currentValue.toString(), expectedValue);
  });

  it("Should update when we call store", async () => {
    const expectedValue: any = 1;
    const txResponse = await simpleStorage.setFavoriteNumber(expectedValue);
    await txResponse.wait(1);
    const currentValue = await simpleStorage.retrieve();

    assert.equal(currentValue.toString(), expectedValue);
  });
});
