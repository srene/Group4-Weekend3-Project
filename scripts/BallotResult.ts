import { ethers } from "hardhat";
import { TokenizedBallot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();
const CONTRACT_ADDRESS = "0x30531d6E7A9429573E2410d0b7C01Eb784b798aE";

async function main() {

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");

  //const provider = new ethers.providers.AlchemyProvider("goerli",process.env.ALCHEMY_API_KEY);
  const provider = new ethers.providers.InfuraProvider(
    "sepolia",
    process.env.INFURA_API_KEY
  );

  const signer = wallet.connect(provider);
  console.log(`Connected to the address ${signer.address}`);

  //Get contract factory object
  const ballotContractFactory = new TokenizedBallot__factory(signer);
  //We get the  deployed contract
  const ballotContract =  ballotContractFactory.attach(CONTRACT_ADDRESS);
  //We wait till the contract is deployed on chain
  const votingResult = await ballotContract.winnerName();
  console.log(`Votation winner: ${ethers.utils.parseBytes32String(votingResult)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});