'use strict';
import Arweave from 'arweave';
import TestWeave from 'testweave-sdk';
import { readContract } from 'smartweave';
import fs from 'fs';
const CONF = JSON.parse(fs.readFileSync('./config.json').toString());

(async () => {
  const arweave = Arweave.init({
    host: 'localhost',
    port: 1984,
    protocol: 'http',
    timeout: 20000,
    logging: false,
  }); 
  
  const testWeave = await TestWeave.default.init(arweave);

  console.log(`\ncontract ID: ${CONF.contract_id}\n`);

  // interact with the contract
  const contractState = await readContract(arweave, CONF.contract_id);
  console.log(`Current state: ${JSON.stringify(contractState)}\n`);
})()