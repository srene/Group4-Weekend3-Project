# Weekend 3 - Group 4 Project
 
## Tokenized Ballot Contract Homework

### Contract deployment

```console
srene@macpro project %  yarn run ts-node --files scripts/BallotDeploy.ts Vanilla Chocolate Strawberry
Connected to the blocknumber 3499076
Connected to the address 0xbC3a67EC1664d540C17Aeb8F6Bea5bA89AdB9e15
Token contract was deployed at address 0x20D2Ee477ADEcf8daa8BC68C8B4091Bdc1d269Ca at the block 3499078

Minted 100.0 tokens to the address 0xbC3a67EC1664d540C17Aeb8F6Bea5bA89AdB9e15 at block 3499079

Deploying Ballot contract
Proposals: 
Proposal N. 1: Vanilla
Proposal N. 2: Chocolate
Proposal N. 3: Strawberry
The ballot contract was deployed at the address 0x30531d6E7A9429573E2410d0b7C01Eb784b798aE at the block number 3499080

```

[Token Contract deploy tx](https://sepolia.etherscan.io/tx/0x8e1e36e5f4c989e55b5f6b09e2120f61febe105e1a992a3a2336abf14bfabf71)

[TokenizedBallot Contract deploy](https://sepolia.etherscan.io/tx/0x905cc4c9075985d531336ca52a85a5513ac8931e6fbf369621ff5d578dfd77e9)

[Mint tx](https://sepolia.etherscan.io/tx/0xb2108d9813a5777c61d2e5e02a70cba1da26f840aa97465738f0dfc208f2c584)

### Vote delegation

```console
srene@macpro project % yarn run ts-node --files scripts/BallotDelegate.ts 
Connected to the address 0xbC3a67EC1664d540C17Aeb8F6Bea5bA89AdB9e15
Connected to the address 0x5EE85c2890c2201Ff9E28dEDB70f38aaCC775eB4
Connected to the blocknumber 3499090
Account 0xbC3a67EC1664d540C17Aeb8F6Bea5bA89AdB9e15 has 100.0 voting powers after self delegating

Account 0xbC3a67EC1664d540C17Aeb8F6Bea5bA89AdB9e15 has 50.0 voting powers after after transferring at the block undefined

Account 0x5EE85c2890c2201Ff9E28dEDB70f38aaCC775eB4 has 0.0 voting powers after receiving the transfer

Account 0x5EE85c2890c2201Ff9E28dEDB70f38aaCC775eB4 has 50.0 voting powers after self delegating at the block undefined

```

[Mint account delegation](https://sepolia.etherscan.io/tx/0x47c32cf7892cf983a882f4f231ada916f4eebf77ac99fcb0b7312dd3c9d0a023)

[Transfer to account 2](https://sepolia.etherscan.io/tx/0x22587373804f9f74a35048a12d68c0d9a306d470d7d52a0a847b1fa9ee6edf5a)

[Account 2 delegate](https://sepolia.etherscan.io/tx/0x134c8a84bffc628dee8667b2688ab151342d0ec5ee7a18b966d1451ffaaafb24)

### Vote cast

```console
srene@macpro project % yarn run ts-node --files scripts/BallotVote.ts 
Connected to the address 0xbC3a67EC1664d540C17Aeb8F6Bea5bA89AdB9e15
Connected to the address 0x5EE85c2890c2201Ff9E28dEDB70f38aaCC775eB4
Voting power 50.0
Transaction completed at block 3499135 with hash 0x6a3050271cbbfd33e50742126463868266e94d7b7454ef8574f46c888916c474
Voting power 30.0
Transaction completed at block 3499136 with hash 0x20d1175a6328e8cc9b2caa5a44c681b4ad6550111b6d6c65909224e314da6c35
Voting power 20.0
```
[Votation 1](https://sepolia.etherscan.io/tx/0xbc730be101b2af9b68141c4bb8492c8f15f0106927497920d6bed874ce7990ab)

[Votation 2](https://sepolia.etherscan.io/tx/0xd9e5b88605abf7226863c07b980a12e7b43b221958e1d193a8500243422d9633)

### Votation result

```console
srene@macpro project % yarn run ts-node --files ./scripts/BallotResult.ts  
Connected to the blocknumber 3445296
Connected to the address 0x5EE85c2890c2201Ff9E28dEDB70f38aaCC775eB4
Balance is 9916350999553872 WEI
The chairperson for this ballot is 0xbC3a67EC1664d540C17Aeb8F6Bea5bA89AdB9e15
The winning proposal is Chocolate
```