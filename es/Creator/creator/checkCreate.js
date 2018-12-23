"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const createConfig_1 = require("../file/createConfig");
//@ts-ignore; no types;
const create_1 = require("./create");
const listFile_1 = require("../file/listFile");
const config_1 = require("../config/config");
// 函数式开发, 一个条件判断的分支一个函数;
function CheckFileToConfig(cb, alwaysConfig = true) {
    fs.exists(createConfig_1.configFile, ex => {
        if (!ex) {
            // 不存在必须配置
            createConfig_1.StartConfig("firstConfig", cb);
        }
        else {
            if (alwaysConfig) {
                createConfig_1.StartConfig("justConfig", cb);
            }
            else {
                cb();
            }
        }
    });
}
function CheckToStartConfig(configBeforeStart = false, arg = "") {
    if (configBeforeStart) {
        CheckFileToConfig(() => {
            process.exit();
        });
    }
    else {
        CheckFileToConfig(() => {
            // 同步的读取ConfigFile;
            config_1.config.templateDir = JSON.parse(fs.readFileSync(createConfig_1.configFile).toString()).templateFilesDir;
            if (arg) {
                create_1.Create(arg);
            }
            else {
                listFile_1.listFile(config_1.config.templateDir);
            }
            process.exit();
        }, false);
    }
}
exports.CheckToStartConfig = CheckToStartConfig;
