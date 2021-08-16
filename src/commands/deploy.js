'use strict';
import arweave from '../api/arweave.js';
import TestWeave from 'testweave-sdk';
import { createContract, readContract } from 'smartweave';
import fs from 'fs';

const CONF = JSON.parse(fs.readFileSync('./.local/contract.json').toString());


const deploy = async (contractName) => {
  if(!contractName){
    console.log("Error: Please add a contract name to deploy as a second argument.\nExample: $ node contract.js deploy hello-world");
    return;
  }
  if(!fs.existsSync(`../contracts/${contractName}.js`)){
    console.log(`Error: Found no contract file with the name ${contractName}.js`);
    return;
  }
  if(!fs.existsSync(`../contracts/${contractName}.json`)){
    console.log(`Error: Found no inital state file with the name ${contractName}.json`);
    return;
  }
  const contractInitState = fs.readFileSync(`../contracts/${contractName}.json`).toString();
  const contractSource = fs.readFileSync(`../contracts/${contractName}.js`).toString();

  const testWeave = await TestWeave.default.init(arweave);

  const c = await createContract(arweave, testWeave.rootJWK, contractSource, contractInitState);
  console.log('contract txid: ', c);

  await testWeave.mine();

  CONF.contract_id = c;
  fs.writeFileSync('./.local/contract.json', JSON.stringify(CONF));

  const contractState = await readContract(arweave, c);
  console.log(`contract state: ${JSON.stringify(contractState)}`);
};

export default deploy;