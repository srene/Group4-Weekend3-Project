import { ethers } from "hardhat";
import { MyERC20Votes__factory } from "../typechain-types";

const MINT_VALUE = ethers.utils.parseUnits("10");

async function main(){
    const [deployer, acc1, acc2] = await ethers.getSigners();
    const contractFactory = new MyERC20Votes__factory(deployer);
    const contract = await contractFactory.deploy();
    const deployTxRecepit = await contract.deployTransaction.wait();
    console.log(`Contract was deployed at address ${contract.address} at the block ${deployTxRecepit.blockNumber}\n`);

    const mintTx = await contract.mint(acc1.address, MINT_VALUE);
    const mintTxReceipt = await mintTx.wait();
    console.log(`Minted ${ethers.utils.formatUnits(MINT_VALUE)} tokes to the address ${acc1.address} at block ${mintTxReceipt.blockNumber}\n`);

    const balanceBN = await contract.balanceOf(acc1.address);

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
    }
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});