"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const path_1 = __importDefault(require("path"));
const readCreatorIgnore_1 = require("../file/readCreatorIgnore");
const diff_1 = require("../../str/diff");
const copyfile_1 = require("../file/copyfile");
const ignore_1 = __importDefault(require("ignore"));
const chalk_1 = __importDefault(require("chalk"));
const fs = require("fs");
function Create(fromDirName) {
    const cwd = process.cwd();
    const alwaysIgnore = ignore_1.default().add(config_1.config.alwaysIgnore);
    const fromPath = path_1.default.join(config_1.config.templateDir, ".");
    const dirPath = path_1.default.join(config_1.config.templateDir, fromDirName);
    const ignorePath = path_1.default.join(config_1.config.templateDir, fromDirName, config_1.config.ignoreFile);
    console.log(chalk_1.default.blueBright("start to create..."));
    // 检查fromPath
    if (!fs.existsSync(dirPath)) {
        console.log(chalk_1.default.red("Can't find the Dir: ") + chalk_1.default.green(dirPath));
        return;
    }
    // 尝试读取 .creatignore; 没有读取到, fileIgnore 为undefined;
    const fileIgnore = readCreatorIgnore_1.readIgnore(ignorePath);
    // 配置ignorer;
    let ignorer = alwaysIgnore;
    if (fileIgnore) {
        ignorer = alwaysIgnore.add(fileIgnore);
    }
    else {
        console.log(chalk_1.default.grey(`No ignore file (${config_1.config.ignoreFile}) at: `), chalk_1.default.green(ignorePath));
    }
    if (ignorer) {
        ignorer.add([config_1.config.ignoreFile]);
        copyfile_1.CopyFile(dirPath, "", cwd, str => {
            // 读出相对frompath的文件路径;
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
        copyfile_1.CopyFile(dirPath, "", cwd);
    }
}
exports.Create = Create;
