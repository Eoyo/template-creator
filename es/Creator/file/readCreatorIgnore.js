"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const ignore_1 = __importDefault(require("ignore"));
//
function readIgnoreFileAsArr(filePath) {
    const str = fs_1.default.readFileSync(filePath).toString();
    const divider = /([; ,\n])+/;
    const arr = str.split(divider).filter(str => {
        // 空字符串也不要
        return !divider.test(str) && str !== '';
    });
    return arr;
}
exports.readIgnoreFileAsArr = readIgnoreFileAsArr;
function readIgnore(filePath) {
    if (fs_1.default.existsSync(filePath)) {
        return ignore_1.default().add(readIgnoreFileAsArr(filePath));
    }
    else {
        return;
    }
}
exports.readIgnore = readIgnore;
