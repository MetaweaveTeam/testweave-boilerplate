'use strict';
import arweave from '../api/arweave.js';
import TestWeave from 'testweave-sdk';
import { readContract, interactWrite, interactWriteDryRun } from 'smartweave';
import fs from 'fs';
const CONF = JSON.parse(fs.readFileSync('./.local/contract.json').toString());
import INPUT from '../INPUT.js';

const interact = async (walletN = 0) => {
  if(walletN < 0 || walletN > 4){
    console.log('Error: you can only select a wallet number from 0 to 4');
    return;
  }
  if(!fs.existsSync(`./.local/wallets/user-${walletN}.json`)){
    console.log("Error: couldn't find this user wallet. Make sure to run `$ node generate-wallets.js` prior to use this script.");
    return;
  }
  
  const testWeave = await TestWeave.default.init(arweave);

  const jwk = JSON.parse(fs.readFileSync(`./.local/wallets/user-${walletN}.json`).toString());
  const walletAddr = await arweave.wallets.getAddress(jwk);

  console.log('\n---- information ----');
  console.log(`\ncontract ID: ${CONF.contract_id}\n`);
  console.log(`wallet no ${walletN}: ${walletAddr}`)
  console.log("input: ", INPUT);

  console.log('\n---- dry run ----');
  const output = await interactWriteDryRun(arweave, jwk, CONF.contract_id, INPUT);
  console.log("\noutput: ", output);

  console.log('\noutput.state: ', output.state);

  // No error, let's interact for real
  if(output.type !== 'ok')
    console.log('')
  else {
    console.log('\n---- interact write ----');
    const txid = await interactWrite(arweave, jwk, CONF.contract_id, INPUT);
    console.log("\ntxid: ", txid);
    console.log("mining...");
    await testWeave.mine();
    
    /* 
     *  Make a dummy interaction because of a testweave-docker bug 
     *  that shows only the penultimate state of a contract
     */
    await interactWrite(arweave, jwk, CONF.contract_id, {});
    await testWeave.mine();
    await testWeave.mine();
  }

  console.log('\n---- new contract state ----\n')
  const contractState = await readContract(arweave, CONF.contract_id);
  console.log(contractState, '\n');
};

export default interact;