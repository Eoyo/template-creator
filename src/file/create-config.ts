/* eslint-disable no-console */
import chalk from "chalk"
import path from "path"
import fs from "fs-extra"
import os from "os"

// 判断文件是否存在 teamplate-create/create.config.json

export const configDir = path.join(os.homedir(), "template-creator")
export const configFilePath = path.join(configDir, "create.config.json")

// 提示用户配置模板文件的路径;
export async function createConfig(mod: "firstConfig" | "justConfig") {
  return new Promise((res) => {
    switch (mod) {
      case "firstConfig":
        console.log(
          "Template-Creator need to know your",
          chalk.blue("TemplateFilesDir")
        )
        console.log("Config file will be save to here:")
        console.log(configFilePath)
        process.stdout.write(chalk.green("Config the TemplateFilesDir to :"))
        process.stdin.on("data", (input) => {
          // 去除回车;
          const dir = input.toString().trim()

          // 让用户确认一下自己设置的template file dir;
          console.log("The Creator get the dir:")
          console.log(dir)
          process.stdin.pause()
          saveTemplateDir(dir).then(() => {
            console.log("Config Success! \n")
            res()
            process.exit()
          })
        })
        break
      case "justConfig":
      default:
        console.log(chalk.blue("please input the TemplateFileDir:"))
        process.stdin.on("data", (input) => {
          // 去除回车;
          const dir = input.toString().trim()
          saveTemplateDir(dir).then(() => {
            console.log("Config Success! \n")
            res()
            process.exit()
          })
        })
        break
    }
  })
}

// 可以考虑使用fs-extra;
async function saveTemplateDir(templateFilesDir: string) {
  return fs.writeFile(
    configFilePath,
    JSON.stringify({
      templateFilesDir,
    })
  )
}
