import fs = require("fs");
import { configFile, StartConfig } from "../file/createConfig";
//@ts-ignore; no types;
import { Create } from "./create";
import { listFile } from "../file/listFile";
import { config } from "../config/config";
import { Config } from "../config/interface";

// 函数式开发, 一个条件判断的分支一个函数;

function CheckFileToConfig(cb: () => void, alwaysConfig = true) {
  fs.exists(configFile, ex => {
    if (!ex) {
      // 不存在必须配置
      StartConfig("firstConfig", cb);
    } else {
      if (alwaysConfig) {
        StartConfig("justConfig", cb);
      } else {
        cb();
      }
    }
  });
}

export function CheckToStartConfig(
  configBeforeStart: boolean = false,
  arg: string = ""
) {
  if (configBeforeStart) {
    CheckFileToConfig(() => {
      process.exit();
    });
  } else {
    CheckFileToConfig(() => {
      // 同步的读取ConfigFile;
      config.templateDir = (JSON.parse(
        fs.readFileSync(configFile).toString()
      ) as Config).templateFilesDir;

      if (arg) {
        Create(arg);
      } else {
        listFile(config.templateDir);
      }
      process.exit();
    }, false);
  }
}
