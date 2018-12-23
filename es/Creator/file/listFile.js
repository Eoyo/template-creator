"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = __importDefault(require("shelljs"));
const chalk_1 = __importDefault(require("chalk"));
function listFile(fromPath) {
    console.log(chalk_1.default.green("已有模板项目:"));
    shelljs_1.default.ls(fromPath).forEach(fileName => {
        console.log(chalk_1.default.blue(fileName));
    });
}
exports.listFile = listFile;
