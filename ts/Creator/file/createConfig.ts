import os = require("os");
import fs = require("fs");
import path = require("path");
import chalk from "chalk";

// 判断文件是否存在 teamplate-create/create.config.json

export let configDir = path.join(os.homedir(), "template-creator");
export let configFile = path.join(configDir, "create.config.json");

// 提示用户配置模板文件的路径;
export function StartConfig(mod: "firstConfig" | "justConfig", cb: () => void) {
  switch (mod) {
    case "firstConfig":
      logVersion();
      console.log(
        "Template-Creator need to know your ",
        chalk.blue("TemplateFilesDir")
      );
      console.log("Config file will be save to here:");
      console.log(configFile);
      process.stdout.write(chalk.green("Config the TemplateFilesDir to :"));
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
      console.log(chalk.blue("please input the TemplateFileDir:"));
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

// 可以考虑使用fs-extra;
function saveTemplateDir(templateFilesDir: string, cb: () => void) {
  fs.exists(configDir, es => {
    if (es) {
      fs.writeFile(
        configFile,
        JSON.stringify({
          templateFilesDir
        }),
        err => {
          cb();
          if (err) {
            throw err;
          }
        }
      );
    } else {
      fs.mkdir(configDir, err => {
        if (err) {
          throw err;
        } else {
          fs.writeFile(
            configFile,
            JSON.stringify({
              templateFilesDir
            }),
            err => {
              cb();
              if (err) {
                throw err;
              }
            }
          );
        }
      });
    }
  });
}

function logVersion() {
  console.log("version----- 2019-11-30");
}
