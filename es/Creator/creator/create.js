"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const path_1 = __importDefault(require("path"));
const readCreatorIgnore_1 = require("../file/readCreatorIgnore");
const diff_1 = require("../../str/diff");
const copyfile_1 = require("../file/copyfile");
const ignore_1 = __importDefault(require("ignore"));
function Create(fromDirName) {
    const cwd = process.cwd();
    const alwaysIgnore = ignore_1.default().add(config_1.config.alwaysIgnore);
    // read the .creatignore;
    const fileIgnore = readCreatorIgnore_1.readIgnore(path_1.default.resolve(config_1.config.templateDir, fromDirName, config_1.config.ignoreFile));
    let fromPath = path_1.default.resolve(config_1.config.templateDir, '.');
    let dirPath = path_1.default.resolve(config_1.config.templateDir, fromDirName);
    // 配置ignorer;
    let ignorer = alwaysIgnore;
    if (fileIgnore) {
        ignorer = alwaysIgnore.add(fileIgnore);
    }
    if (ignorer) {
        console.log('found ignorefile');
        ignorer.add([config_1.config.ignoreFile]);
        copyfile_1.CopyFile(dirPath, '', cwd, str => {
            let sortStr = diff_1.cutHead(fromPath, str);
            if (sortStr) {
                return ignorer.ignores(sortStr);
            }
            else {
                return false;
            }
        });
    }
    else {
        copyfile_1.CopyFile(dirPath, '', cwd);
    }
}
exports.Create = Create;
