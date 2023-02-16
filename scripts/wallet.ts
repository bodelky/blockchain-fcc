import { ethers } from "hardhat";
import { Bytes } from "@ethersproject/bytes";

const fs = require("fs-extra");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

class Wallet {
  async writeEncrypWallet(pvk: string, password: Bytes | string) {
    let wallet = new ethers.Wallet(pvk);
    let encryptedWallet = await wallet.encrypt(password, pvk);
    fs.writeFileSync("./.encryptedJsonKey.json", encryptedWallet);
    console.log("Write Done");
  }
  async readWallet(path: string, password: any) {
    const encryptedJson: string = fs.readFileSync(path, "utf8");
    let wallet = new (ethers.Wallet.fromEncryptedJsonSync as any)(
      encryptedJson,
      password
    );
    console.log(wallet.address);
  }
}

async function main() {
  let wallet = new Wallet();
  // wallet.writeEncrypWallet(
  //   "1754a2b72a01261f3e75deb18fba8b63620ac9c58d11561706ca6738526de4d5",
  //   "1234"
  // );
  wallet.readWallet(
    path.join(__dirname, "..", ".encryptedJsonKey.json"),
    "1234"
  );
}

main().catch((err) => console.error(err));
