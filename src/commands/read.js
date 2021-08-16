'use strict';
import arweave from '../api/arweave.js';
import TestWeave from 'testweave-sdk';
import { readContract } from 'smartweave';
import fs from 'fs';
const CONF = JSON.parse(fs.readFileSync('./.local/contract.json').toString());

const read = async () => {
  const testWeave = await TestWeave.default.init(arweave);

  console.log(`\ncontract ID: ${CONF.contract_id}\n`);

  const contractState = await readContract(arweave, CONF.contract_id);
  console.log(`Current state: ${JSON.stringify(contractState)}\n`);
};

export default read;