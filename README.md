# Purpose

Here is a simple boilerplate to code smartweave contracts and iterate tests quickly.

# Setup

1. `$ git clone git@github.com:bidetaggle/testweave-boilerplate.git --recursive`
2. `$ cd testweave-boilerplate/`
3. `$ npm install`

# Usage.

1. Open a terminal in `testweave-docker/` and `$ docker-compose up`
2. Open a second terminal and `$ cd src/`
3. Edit `CONTRACT_NAME` value in `config.json` to match with the contract you want to work in 'contracts/'
4. Deploy the last version of the contract you are working on: `$ node create-contract.js`
5. Edit `INPUT.js` and run `$ node interact-contract.js` to test different interactions with your contract
6. Modify your contract and go back to 4. 🙂
