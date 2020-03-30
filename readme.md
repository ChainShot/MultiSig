# Decentralized MultiSig Application

This is a MultiSig Dapp built in the [ChainShot](https://www.chainshot.com/) Zero to Blockchain Curriculum.

## Project Layout

There are four top-level folders:

1. `/app` - contains the front-end application
2. `/contracts` - contains the solidity contract
3. `/tests` - tests for the solidity contract
4. `/scripts` - contains [Buidler contract scripts](https://buidler.dev/guides/scripts.html)

## Setup

Install dependencies with `npm install`.

There are three npm scripts:

1. `npm run test` - tests contracts in `/contracts` with the tests in `/tests`
2. `npm run start` - runs deploy and starts the front-end application
3. `npm run deploy` - compiles the MultiSig contract and deploys it, storing an artifact and address information in `/app`

This application using [Parcel](https://parceljs.org/) to bundle assets and run.

It uses [Buidler](https://buidler.dev/) to compile and test solidity contracts.
