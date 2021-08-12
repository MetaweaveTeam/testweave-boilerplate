'use strict';
import Arweave from 'arweave';
import TestWeave from 'testweave-sdk';
import { readContract, interactWrite, interactWriteDryRun } from 'smartweave';
import fs from 'fs';
const CONF = JSON.parse(fs.readFileSync('./config.json').toString());
import INPUT from './INPUT.js';

(async () => {
  const arweave = Arweave.init({
    host: 'localhost',
    port: 1984,
    protocol: 'http',
    timeout: 20000,
    logging: false,
  }); 
  
  const testWeave = await TestWeave.default.init(arweave);

  // generate a wallet
  const jkw = await arweave.wallets.generate();
  const generatedAddr = await arweave.wallets.getAddress(jkw)

  console.log(`\ncontract ID: ${CONF.contract_id}`);
  console.log("\ninput: ", INPUT);

  // interact with the contract
  const output = await interactWriteDryRun(arweave, testWeave.rootJWK, CONF.contract_id, INPUT);
  console.log("\noutput: ", output);

  console.log('\noutput.state: ', output.state);

  // No error, let's interact for real
  if(output.type === 'ok'){
    const txid = await interactWrite(arweave, testWeave.rootJWK, CONF.contract_id, INPUT);
    console.log("\ntxid: ", txid);

    console.log("\nmining...");
    await testWeave.mine();
    
    const contractState = await readContract(arweave, CONF.contract_id);
    console.log(`\nContract State: ${JSON.stringify(contractState)}\n`);
  }
})()