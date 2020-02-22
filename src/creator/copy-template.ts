/* eslint-disable no-console */
import path from "path"
import ignore from "ignore"
import chalk from "chalk"
import fs from "fs-extra"
import { config } from "../config/config"
import { copyFile } from "../file/copy-file"
import { readIgnore } from "../file/read-creator-ignore"
import { cutHead } from "../str/cutHead"

export function copyTemplate(fromDir: string, aimDir: string) {
  console.log(chalk.blueBright("start to create..."))
  if (!fs.existsSync(fromDir)) {
    console.log(chalk.red("Can't find the Dir: ") + chalk.green(fromDir))
    return
  }

  // 配置需要忽略的文件检查器.
  const ignorer = ignore().add(config.alwaysIgnore)
  const ignorePath = path.join(fromDir, config.ignoreFile)
  const ignoresFromFile = readIgnore(ignorePath)
  if (ignoresFromFile) {
    ignorer.add(ignoresFromFile)
  } else {
    console.log(
      chalk.grey(`No ignore file (${config.ignoreFile}) at: `),
      chalk.green(ignorePath)
    )
  }

  // 构建忽略文件的判断函数.
  const fromPath = path.join(config.templateDir, ".")
  const fileIgnore = (filePath: string) => {
    const sortStr = cutHead(fromPath, filePath)
    if (sortStr) {
      return ignorer.ignores(sortStr)
    }
    return false
  }

  copyFile(fromDir, aimDir, fileIgnore)
}
