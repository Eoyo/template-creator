"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = __importDefault(require("shelljs"));
const chalk_1 = __importDefault(require("chalk"));
function listFile(fromPath) {
    shelljs_1.default.ls('-A', fromPath).forEach(fileName => {
        console.log(chalk_1.default.blue(fileName));
    });
}
exports.listFile = listFile;
