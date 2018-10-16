#!/home/lium/.nvm/versions/node/v10.3.0/bin/node
//@ts-ignore;
import {argv} from 'yargs';
import {Create} from './creator/create';
import {listFile} from './file/listFile';
import {config} from './config/config';
const arr = argv._;

if (arr[0]) {
  Create(arr[0]);
} else {
  listFile(config.templateDir);
}
