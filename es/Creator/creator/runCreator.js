"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkCreate_1 = require("./checkCreate");
function RunCreator() {
    let command = process.argv[2];
    switch (command) {
        case "--config":
        case "-c":
        case "--c":
        case "--C":
        case "-C":
            checkCreate_1.CheckToStartConfig(true);
            break;
        case "-l":
            checkCreate_1.CheckToStartConfig(false);
            break;
        default:
            checkCreate_1.CheckToStartConfig(false, command);
    }
}
exports.RunCreator = RunCreator;
