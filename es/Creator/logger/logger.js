"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const logger = (tag, type) => {
    if (type === 'dark') {
        return (fileName) => {
            console.log(chalk_1.default.dim(tag + ':') + '  ' + chalk_1.default.dim(fileName));
        };
    }
    else {
        return (fileName) => {
            console.log(chalk_1.default.blue(tag + ':') + '  ' + chalk_1.default.green(fileName));
        };
    }
};
exports.logCreate = logger('Cr');
exports.logExists = logger('Ex', 'dark');
exports.logUpdate = logger('Up');
exports.logIgnore = logger('Ig', 'dark');
exports.logShould = logger('Shourld');
