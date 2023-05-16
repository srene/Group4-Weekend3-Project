import { ethers } from "hardhat";
import { TokenizedBallot__factory } from "../typechain-types";
import { MyERC20Votes__factory } from "../typechain-types";

const MINT_VALUE = ethers.utils.parseUnits("100");
const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

function convertStringArrayToBytes32(array: string[]) {
    const bytes32Array = [];
    for (let index = 0; index < array.length; index++) {
      bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
    }
    return bytes32Array;
  }

async function main(){
    const [deployer, acc1, acc2] = await ethers.getSigners();
    const ballotContractFactory = new TokenizedBallot__factory(deployer);
    const tokenContractFactory = new MyERC20Votes__factory(deployer);
    const prop0 = ethers.utils.formatBytes32String(PROPOSALS[0]);
    const prop1 = ethers.utils.formatBytes32String(PROPOSALS[1]);
    const prop2 = ethers.utils.formatBytes32String(PROPOSALS[2]);
    const tokenContract = await tokenContractFactory.deploy();
    const tokenContractDeployTxReceipt = await tokenContract.deployTransaction.wait();
    console.log(`Token contract was deployed at address ${tokenContract.address} at the block ${tokenContractDeployTxReceipt.blockNumber}\n`);

    const mintTx = await tokenContract.mint(acc1.address, MINT_VALUE);
    const mintTxReceipt = await mintTx.wait();
    console.log(`Minted ${ethers.utils.formatUnits(MINT_VALUE)} tokes to the address ${acc1.address} at block ${mintTxReceipt.blockNumber}\n`);


    const ballotContract = await ballotContractFactory.deploy([prop0,prop1,prop2],tokenContract.address,6);
    const ballotContractDeployTxReceipt = await ballotContract.deployTransaction.wait();
    console.log(`Contract was deployed at address ${ballotContract.address} at the block ${ballotContractDeployTxReceipt.blockNumber}\n`);

    const balanceBN = await tokenContract.balanceOf(acc1.address);

    console.log(`Account ${acc1.address} has ${ethers.utils.formatUnits(balanceBN)} MyTokens\n`);

    const votes = await tokenContract.getVotes(acc1.address);

    console.log(`Account ${acc1.address} has ${ethers.utils.formatUnits(votes)} voting powers before self delegating\n`);


    const delegateTx = await tokenContract.connect(acc1).delegate(acc1.address);
    await delegateTx.wait();
    const votesAfter = await tokenContract.getVotes(acc1.address);
    console.log(`Account ${acc1.address} has ${ethers.utils.formatUnits(votesAfter)} voting powers after self delegating\n`);

    const transferTx = await tokenContract.connect(acc1).transfer(acc2.address,MINT_VALUE.div(2));
    await transferTx.wait();
    const votesAfterTransfer = await tokenContract.getVotes(acc1.address);
    console.log(`Account ${acc1.address} has ${ethers.utils.formatUnits(votesAfterTransfer)} voting powers after after transferring at the block ${transferTx.blockNumber}\n`);


    const votes2AfterTransfer = await tokenContract.getVotes(acc2.address);
    console.log(`Account ${acc2.address} has ${ethers.utils.formatUnits(votes2AfterTransfer)} voting powers after receiving the transfer\n`);

    const delegateTx2 = await tokenContract.connect(acc2).delegate(acc2.address);
    await delegateTx2.wait();
    const votesAfter2 = await tokenContract.getVotes(acc2.address);
    console.log(`Account ${acc2.address} has ${ethers.utils.formatUnits(votesAfter2)} voting powers after self delegating at the block ${delegateTx2.blockNumber}\n`);

    for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await ballotContract.proposals(index);
        console.log(`Contract proposal ${ethers.utils.parseBytes32String(proposal.name)}\n`);

      }


    const voteTx = await ballotContract.connect(acc1).vote(0,20);
    await voteTx.wait();

    const voteTx2 = await ballotContract.connect(acc2).vote(1,50);
    await voteTx2.wait();

    const winner =  await ballotContract.winnerName();
    console.log(`Account ${acc1.address} voted and ${ethers.utils.parseBytes32String(winner)} proposal is winning\n`);
  

    /*const balanceBN = await contract.balanceOf(acc1.address);

    console.log(`Account ${acc1.address} has ${ethers.utils.formatUnits(balanceBN)} MyTokens\n`);

    const votes = await contract.getVotes(acc1.address);

    console.log(`Account ${acc1.address} has ${ethers.utils.formatUnits(votes)} voting powers before self delegating\n`);

    const delegateTx = await contract.connect(acc1).delegate(acc1.address);
    await delegateTx.wait();
    const votesAfter = await contract.getVotes(acc1.address);
    console.log(`Account ${acc1.address} has ${ethers.utils.formatUnits(votesAfter)} voting powers after self delegating\n`);

    const transferTx = await contract.connect(acc1).transfer(acc2.address,MINT_VALUE.div(2));
    await transferTx.wait();
    const votesAfterTransfer = await contract.getVotes(acc1.address);
    console.log(`Account ${acc1.address} has ${ethers.utils.formatUnits(votesAfterTransfer)} voting powers after after transferring \n`);


    const votes2AfterTransfer = await contract.getVotes(acc2.address);
    console.log(`Account ${acc2.address} has ${ethers.utils.formatUnits(votes2AfterTransfer)} voting powers after receiving the transfer\n`);

    const delegateTx2 = await contract.connect(acc2).delegate(acc2.address);
    await delegateTx2.wait();
    const votesAfter2 = await contract.getVotes(acc2.address);
    console.log(`Account ${acc2.address} has ${ethers.utils.formatUnits(votesAfter2)} voting powers after self delegating\n`);


    for(let i = 1; i<4;i++){
        const lastBlock = await ethers.provider.getBlock("latest");
        let pastVotes = await contract.getPastVotes(acc1.address, lastBlock.number - i);
        console.log(`Account ${acc1.address} has ${ethers.utils.formatUnits(pastVotes)} units of voting power at block ${lastBlock.number - i}\n`);
    }*/
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});