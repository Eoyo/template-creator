#!/home/lium/.nvm/versions/node/v10.3.0/bin/node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
const create_1 = require("./creator/create");
const listFile_1 = require("./file/listFile");
const config_1 = require("./config/config");
const arr = yargs_1.argv._;
if (arr[0]) {
    create_1.Create(arr[0]);
}
else {
    listFile_1.listFile(config_1.config.templateDir);
}
