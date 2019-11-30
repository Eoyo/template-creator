"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const fs = require("fs");
const path = require("path");
const chalk_1 = __importDefault(require("chalk"));
// 判断文件是否存在 teamplate-create/create.config.json
exports.configDir = path.join(os.homedir(), "template-creator");
exports.configFile = path.join(exports.configDir, "create.config.json");
// 提示用户配置模板文件的路径;
function StartConfig(mod, cb) {
    switch (mod) {
        case "firstConfig":
            logVersion();
            console.log("Template-Creator need to know your ", chalk_1.default.blue("TemplateFilesDir"));
            console.log("Config file will be save to here:");
            console.log(exports.configFile);
            process.stdout.write(chalk_1.default.green("Config the TemplateFilesDir to :"));
            process.stdin.on("data", input => {
                // 去除回车;
                const dir = input.toString().trim();
                // 让用户确认一下自己设置的template file dir;
                console.log("The Creator get the dir:");
                console.log(dir);
                process.stdin.pause();
                saveTemplateDir(dir, () => {
                    console.log("Config Success! \n");
                    cb();
                });
            });
            break;
        case "justConfig":
            logVersion();
            console.log(chalk_1.default.blue("please input the TemplateFileDir:"));
            process.stdin.on("data", input => {
                // 去除回车;
                const dir = input.toString().trim();
                saveTemplateDir(dir, () => {
                    console.log("Config success!");
                    cb();
                });
            });
            break;
    }
}
exports.StartConfig = StartConfig;
// 可以考虑使用fs-extra;
function saveTemplateDir(templateFilesDir, cb) {
    fs.exists(exports.configDir, es => {
        if (es) {
            fs.writeFile(exports.configFile, JSON.stringify({
                templateFilesDir
            }), err => {
                cb();
                if (err) {
                    throw err;
                }
            });
        }
        else {
            fs.mkdir(exports.configDir, err => {
                if (err) {
                    throw err;
                }
                else {
                    fs.writeFile(exports.configFile, JSON.stringify({
                        templateFilesDir
                    }), err => {
                        cb();
                        if (err) {
                            throw err;
                        }
                    });
                }
            });
        }
    });
}
function logVersion() {
    console.log("version----- 2019-11-30");
}
