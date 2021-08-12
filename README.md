# Purpose

Here is a simple boilerplate to code smartweave contracts and iterate tests quickly.

# Setup

1. `$ git clone git@github.com:bidetaggle/testweave-boilerplate.git --recursive`
2. `$ cd testweave-boilerplate/`
3. `$ npm install`

# Usage.

1. Open a terminal in `testweave-docker/` and `$ docker-compose up`
2. Edit `CONTRACT_NAME` value in `src/config.json` to match with the contract you want to work in 'contracts/'
3. Deploy the last version of the contract you are working on: `$ node src/create-contract.js`
4. Edit `src/INPUT.js` and run `$ node src/interact-contract.js` to test different interactions with your contract
5. Modify your contract and go back to 3. 🙂
