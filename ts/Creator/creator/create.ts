/* eslint-disable no-console */
import path from "path"
import ignore from "ignore"
import chalk from "chalk"
import { config } from "../config/config"
import { readIgnore } from "../file/readCreatorIgnore"
import { cutHead } from "../../str/cutHead"
import { CopyFile } from "../file/copyfile"
import ExecuteFile from "../execute"

import fs = require("fs")

export function Create(fromDirName: string) {
  const cwd = process.cwd()
  const alwaysIgnore = ignore().add(config.alwaysIgnore)

  const fromPath = path.join(config.templateDir, ".")
  const dirPath = path.join(config.templateDir, fromDirName)
  const ignorePath = path.join(
    config.templateDir,
    fromDirName,
    config.ignoreFile
  )

  console.log(chalk.blueBright("start to create..."))

  // 检查fromPath
  if (!fs.existsSync(dirPath)) {
    console.log(chalk.red("Can't find the Dir: ") + chalk.green(dirPath))
    return
  }

  // 尝试读取 .creatignore; 没有读取到, fileIgnore 为undefined;
  const fileIgnore = readIgnore(ignorePath)

  // 配置ignorer;
  let ignorer = alwaysIgnore
  if (fileIgnore) {
    ignorer = alwaysIgnore.add(fileIgnore)
  } else {
    console.log(
      chalk.grey(`No ignore file (${config.ignoreFile}) at: `),
      chalk.green(ignorePath)
    )
  }

  if (ignorer) {
    ignorer.add([config.ignoreFile])
    CopyFile(dirPath, "", cwd, (str) => {
      // 读出相对 from path 的文件路径;
      const sortStr = cutHead(fromPath, str)
      if (sortStr) {
        return ignorer.ignores(sortStr)
      }
      return false
    })
  } else {
    CopyFile(dirPath, "", cwd)
  }

  ExecuteFile(dirPath, cwd)
}
