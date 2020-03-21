/* eslint-disable no-console */
import path from "path"
import ignore from "ignore"
import chalk from "chalk"
import fs from "fs-extra"
import { config } from "../config/config"
import { copyFile } from "../file/copy-file"
import { readIgnore } from "../file/read-creator-ignore"
import { cutHead } from "../str/cutHead"

/**
 * 将模本文件复制到目标工作中的目录.
 * 1. 碰到 json 格式的文件对其进行合并.
 * 2. 不复制特殊的文件, 例如 node_modules, 和 modules.txt等.
 * 3. ts 文件如果本地存在了直接略过, 没有的才使用模本文件生成. 因为 ts 文件一般为业务代码.
 *
 * @param templateDir 模板的位置
 * @param workingDir 工作的目标目录
 */
export function copyTemplate(templateDir: string, workingDir: string) {
  console.log(chalk.blueBright("start to create..."))
  if (!fs.existsSync(templateDir)) {
    console.log(
      chalk.red("Can't find the template:") + chalk.green(templateDir)
    )
    return
  }

  // 配置需要忽略的文件检查器.
  const ignorer = ignore().add(config.alwaysIgnore)
  const ignorePath = path.join(templateDir, config.ignoreFile)
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
  const fromPath = config.templateDir
  const fileIgnore = (filePath: string) => {
    const sortStr = cutHead(fromPath, filePath)
    if (sortStr) {
      return ignorer.ignores(sortStr)
    }
    return false
  }

  copyFile(templateDir, workingDir, fileIgnore)
}
