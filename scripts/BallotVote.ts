import { ethers } from "hardhat";
import { TokenizedBallot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();
const VOTED_PROPOSAL = 1
const VOTED_PROPOSAL2 = 2
const VOTED_AMOUNT1 = ethers.utils.parseUnits("20");
const VOTED_AMOUNT2 = ethers.utils.parseUnits("30");
const TOKEN_ADDRESS = "0x30531d6E7A9429573E2410d0b7C01Eb784b798aE";

async function main() {

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
  const wallet2 = new ethers.Wallet(process.env.PRIVATE_KEY3 ?? "");

  const provider = new ethers.providers.InfuraProvider(
    "sepolia",
    process.env.INFURA_API_KEY
  );

  const signer = wallet.connect(provider);
  const signer2 = wallet2.connect(provider);

  console.log(`Connected to the address ${signer.address}`);
  console.log(`Connected to the address ${signer2.address}`);

  //Get contract factory object
  const ballotContractFactory = new TokenizedBallot__factory(signer);
  //We get the  deployed contract
  const ballotContract =  ballotContractFactory.attach(TOKEN_ADDRESS);
  //We wait till the contract is deployed on chain

  const votingPower = await ballotContract.votingPower(signer.address);
  console.log(`Voting power ${ethers.utils.formatUnits(votingPower)}`);


  const voteTx = await ballotContract.connect(signer).vote(VOTED_PROPOSAL,VOTED_AMOUNT1);
  const votingTxReceipt = await voteTx.wait();

  console.log(`Transaction completed at block ${votingTxReceipt.blockNumber} with hash ${votingTxReceipt.blockHash}`);


  const votingPower3 = await ballotContract.votingPower(signer.address);
  console.log(`Voting power ${ethers.utils.formatUnits(votingPower3)}`);

  const voteTx2 = await ballotContract.connect(signer2).vote(VOTED_PROPOSAL2,VOTED_AMOUNT2);
  const votingTxReceipt2 = await voteTx2.wait();

  console.log(`Transaction completed at block ${votingTxReceipt2.blockNumber} with hash ${votingTxReceipt2.blockHash}`);

  const votingPower4 = await ballotContract.votingPower(signer2.address);

  console.log(`Voting power ${ethers.utils.formatUnits(votingPower4)}`);


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});