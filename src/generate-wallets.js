'use strict';
import arweave from './api/arweave.js';
import TestWeave from 'testweave-sdk';
import fs from 'fs';

(async () => {
  const testWeave = await TestWeave.default.init(arweave);

  for(let i=0 ; i<5 ; i++){
    const walletName = `user-${i}`;
    const jwk = await arweave.wallets.generate();
    const generatedAddr = await arweave.wallets.getAddress(jwk);
    console.log(`generated ${walletName}: ${generatedAddr}`);
    await testWeave.drop(generatedAddr, '1000000000');
    console.log("mining...");
    await testWeave.mine();
    fs.writeFileSync(`./.local/wallets/user-${i}.json`, JSON.stringify(jwk));
  }
})();