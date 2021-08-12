'use strict';
import Arweave from 'arweave';
import TestWeave from 'testweave-sdk';
import { createContract, readContract } from 'smartweave';
import fs from 'fs';

const CONF = JSON.parse(fs.readFileSync('./config.json').toString());

const contractInitState = fs.readFileSync(`../contracts/${CONF.CONTRACT_NAME}.json`).toString();
const contractSource = fs.readFileSync(`../contracts/${CONF.CONTRACT_NAME}.js`).toString();

(async () => {
  const arweave = Arweave.init({
    host: 'localhost',
    port: 1984,
    protocol: 'http',
    timeout: 20000,
    logging: false,
  }); 
  
  const testWeave = await TestWeave.default.init(arweave);

  const c = await createContract(arweave, testWeave.rootJWK, contractSource, contractInitState);
  console.log('contract txid: ', c);

  await testWeave.mine();

  CONF.contract_id = c;
  fs.writeFileSync('./config.json', JSON.stringify(CONF));

  const contractState = await readContract(arweave, c);
  console.log(`contract state: ${JSON.stringify(contractState)}`);

})()