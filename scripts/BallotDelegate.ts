import { ethers } from "hardhat";
import { Ballot__factory } from "../typechain-types";
import { MyERC20Votes__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

const MINT_VALUE = ethers.utils.parseUnits("100");
const TOKEN_ADDRESS = "0x1bD405349A7C8F7f3beA1908D310E0a56c5595d7";
const TOKEN_BLOCK = 3498669;
async function main() {

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
  console.log(`Connected to the address ${wallet.address}`);

  //const provider = new ethers.providers.AlchemyProvider("goerli",process.env.ALCHEMY_API_KEY);
  const provider = new ethers.providers.InfuraProvider(
    "sepolia",
    process.env.INFURA_API_KEY
  );

  const signer = wallet.connect(provider);

  const wallet2 = new ethers.Wallet(process.env.PRIVATE_KEY3 ?? "");
  console.log(`Connected to the address ${wallet.address}`);


  const signer2 = wallet2.connect(provider);
  console.log(`Connected to the address ${signer2.address}`);

  const lastBlock = await  provider?.getBlock("latest");
  console.log(`Connected to the blocknumber ${lastBlock?.number}`);

  //Get contract factory object
  const tokenContractFactory = new MyERC20Votes__factory(signer);
  //We get the  deployed contract
  const tokenContract =  tokenContractFactory.attach(TOKEN_ADDRESS);

  const delegateTx = await tokenContract.connect(signer).delegate(signer.address);
  await delegateTx.wait();
  const votesAfter = await tokenContract.getVotes(signer.address);
  console.log(`Account ${signer.address} has ${ethers.utils.formatUnits(votesAfter)} voting powers after self delegating\n`);

  const transferTx = await tokenContract.connect(signer).transfer(signer2.address,MINT_VALUE.div(2));
  await transferTx.wait();
  const votesAfterTransfer = await tokenContract.getVotes(signer.address);
  console.log(`Account ${signer.address} has ${ethers.utils.formatUnits(votesAfterTransfer)} voting powers after after transferring at the block ${transferTx.blockNumber}\n`);


  const votes2AfterTransfer = await tokenContract.getVotes(signer2.address);
  console.log(`Account ${signer2.address} has ${ethers.utils.formatUnits(votes2AfterTransfer)} voting powers after receiving the transfer\n`);

  const delegateTx2 = await tokenContract.connect(signer2).delegate(signer2.address);
  await delegateTx2.wait();
  const votesAfter2 = await tokenContract.getVotes(signer2.address);
  console.log(`Account ${signer2.address} has ${ethers.utils.formatUnits(votesAfter2)} voting powers after self delegating at the block ${delegateTx2.blockNumber}\n`);


  let pastVotes = await tokenContract.getPastVotes(signer.address, lastBlock.number-1);
  console.log(`Account ${signer.address} has ${ethers.utils.formatUnits(pastVotes)} units of voting power at block ${lastBlock.number}\n`);
  let pastVotes2 = await tokenContract.getPastVotes(signer2.address, lastBlock.number-1);
  console.log(`Account ${signer2.address} has ${ethers.utils.formatUnits(pastVotes2)} units of voting power at block ${lastBlock.number}\n`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});