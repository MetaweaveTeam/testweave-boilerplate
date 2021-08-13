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

# Troubleshooting

If you get issues with testweave-docker, it sometimes helps to hard reset:
1. `$ docker-compose down` if it's still running
2. `$ docker container prune`
3. `$ docker volume prune`
4. `$ docker-compose up` 