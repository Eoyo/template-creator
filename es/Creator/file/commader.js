"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
commander_1.default
    .version('0.1.0')
    .option('-p, --peppers', 'Add peppers')
    .option('-P, --pineapple', 'Add pineapple')
    .option('-b, --bbq-sauce', 'Add bbq sauce')
    .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
    .parse(process.argv);
__dirname;
process.cwd();
console.log('you ordered a pizza with:');
if (commander_1.default.peppers)
    console.log('  - peppers');
if (commander_1.default.pineapple)
    console.log('  - pineapple');
if (commander_1.default.bbqSauce)
    console.log('  - bbq');
console.log('  - %s cheese', commander_1.default.cheese);
