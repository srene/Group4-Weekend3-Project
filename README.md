# Weekend 3 - Group 4 Project
 
## Tokenized Ballot Contract Homework

### Contract deployment

```console
srene@macpro project % yarn run ts-node --files scripts/BallotDeploy.ts Vanilla Chocolate Strawberry
Connected to the blocknumber 3498766
Connected to the address 0xbC3a67EC1664d540C17Aeb8F6Bea5bA89AdB9e15
Token contract was deployed at address 0xb52E4E103A0506792227098E2dDa957AdcAEc4B8 at the block 3498768

Minted 100.0 tokens to the address 0xbC3a67EC1664d540C17Aeb8F6Bea5bA89AdB9e15 at block 3498769

Deploying Ballot contract
Proposals: 
Proposal N. 1: Vanilla
Proposal N. 2: Chocolate
Proposal N. 3: Strawberry
The ballot contract was deployed at the address 0xb78B492d4A9E74513bFD651C20DeB8369AE234D0 at the block number 3498770
```

[Contract deploy tx](https://sepolia.etherscan.io/tx/0x179a7cf066413325f66b9cd1d8bcf13063efaf39af5538fd7ca42184bb32e55f)

[Mint tx](https://sepolia.etherscan.io/tx/0x89997ac663b64adac44ad04b15e3c5512575ebc7ad488b44f98b30360cb2f4a4)

### Vote delegation

```console
srene@macpro project % yarn run ts-node --files scripts/BallotDelegate.ts 
Connected to the address 0xbC3a67EC1664d540C17Aeb8F6Bea5bA89AdB9e15
Connected to the address 0x5EE85c2890c2201Ff9E28dEDB70f38aaCC775eB4
Connected to the blocknumber 3498776
Account 0xbC3a67EC1664d540C17Aeb8F6Bea5bA89AdB9e15 has 100.0 voting powers after self delegating

Account 0xbC3a67EC1664d540C17Aeb8F6Bea5bA89AdB9e15 has 50.0 voting powers after after transferring at the block undefined

Account 0x5EE85c2890c2201Ff9E28dEDB70f38aaCC775eB4 has 0.0 voting powers after receiving the transfer

Account 0x5EE85c2890c2201Ff9E28dEDB70f38aaCC775eB4 has 50.0 voting powers after self delegating at the block undefined

Account 0xbC3a67EC1664d540C17Aeb8F6Bea5bA89AdB9e15 has 100.0 units of voting power at block 3498776

Account 0x5EE85c2890c2201Ff9E28dEDB70f38aaCC775eB4 has 0.0 units of voting power at block 3498776
```

### Vote cast

```console
srene@macpro project % yarn run ts-node --files ./scripts/BallotVote.ts       
Connected to the blocknumber 3445212
Connected to the address 0x1A433dB77813FA4257452B8aCd14d98C8BecB9Fb
Balance is 10000000000000000 WEI
The chairperson for this ballot is 0xbC3a67EC1664d540C17Aeb8F6Bea5bA89AdB9e15
Voting to proposal 1
Transaction completed at block 3445213 with hash 0x4d25611315488763e583f508c0577dc8951d52e0e78f88784f08193f347a2179
```

### Votation result

```console
srene@macpro project % yarn run ts-node --files ./scripts/BallotResult.ts  
Connected to the blocknumber 3445296
Connected to the address 0x5EE85c2890c2201Ff9E28dEDB70f38aaCC775eB4
Balance is 9916350999553872 WEI
The chairperson for this ballot is 0xbC3a67EC1664d540C17Aeb8F6Bea5bA89AdB9e15
The winning proposal is Chocolate
```