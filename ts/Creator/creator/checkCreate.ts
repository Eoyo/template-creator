import fs from "fs-extra"
import { configFilePath, StartConfig } from "../file/createConfig"
import { Create } from "./create"
import { listFile } from "../file/listFile"
import { config } from "../config/config"
import { Config } from "../config/interface"

// 函数式开发, 一个条件判断的分支一个函数;
async function CheckFileToConfig(alwaysConfig = true): Promise<unknown> {
  const isExist = await fs.pathExists(configFilePath)
  if (isExist && alwaysConfig) {
    return StartConfig("justConfig")
  }
  if (!isExist) {
    return StartConfig("firstConfig")
  }
}

export function CheckToStartConfig(
  configBeforeStart: boolean = false,
  arg: string = ""
) {
  if (configBeforeStart) {
    CheckFileToConfig()
  } else {
    CheckFileToConfig(false).then(() => {
      // 同步的读取ConfigFile;
      config.templateDir = (JSON.parse(
        fs.readFileSync(configFilePath).toString()
      ) as Config).templateFilesDir

      if (arg) {
        Create(arg)
      } else {
        listFile(config.templateDir)
      }
    })
  }
}
