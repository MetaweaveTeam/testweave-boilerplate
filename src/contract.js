'use strict';
import deploy from "./commands/deploy.js";
import interact from "./commands/interact.js";
import read from "./commands/read.js";

switch(process.argv[2]){
  case 'deploy':
    deploy(process.argv[3]);
    break;
  case 'interact':
    interact(process.argv[3]);
    break;
  case 'read':
    read();
    break;
  default:
    console.log('Error: invalid argument.');
}