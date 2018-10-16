"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const shelljs_1 = __importDefault(require("shelljs"));
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const logger_1 = require("../logger/logger");
function CopyFile(base, name, dest, ignore) {
    let fromPath = path_1.default.resolve(base, name);
    let toPath = path_1.default.resolve(dest, name);
    if (fs_1.default.existsSync(fromPath)) {
        const stat = fs_1.default.statSync(fromPath);
        // 是目录的时候
        if (stat.isDirectory()) {
            // 检查是否存在.
            if (fs_1.default.existsSync(toPath)) {
                logger_1.logExists(toPath);
            }
            else {
                shelljs_1.default.mkdir(toPath);
                logger_1.logCreate(toPath);
            }
            shelljs_1.default.ls('-A', fromPath).forEach(fileName => {
                CopyFile(fromPath, fileName, toPath, ignore);
            });
        }
        else {
            if (ignore && ignore(fromPath)) {
                logger_1.logIgnore(toPath);
                return;
            }
            // 文件直接copy;
            if (fs_1.default.existsSync(toPath)) {
                shelljs_1.default.cp(fromPath, toPath);
                logger_1.logUpdate(toPath);
            }
            else {
                shelljs_1.default.cp(fromPath, toPath);
                logger_1.logCreate(toPath);
            }
        }
    }
    else {
        console.log(chalk_1.default.red("Can't find the path: ") + chalk_1.default.green(path_1.default.resolve(fromPath)));
    }
}
exports.CopyFile = CopyFile;
