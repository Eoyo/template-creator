/* eslint-disable no-console */
import path from "path"
import shell from "shelljs"
import fs from "fs"
import chalk from "chalk"
import { logExists, logCreate, logIgnore, logUpdate } from "../logger/logger"
import { mergeJson } from "../creator/merge-package-json"

export function copyFile(
  from: string,
  to: string,
  ignore?: (str: string) => boolean,
  fileName: string = ""
) {
  const fromPath = path.join(from, fileName)
  const toPath = path.join(to, fileName)

  if (ignore && ignore(fromPath)) {
    logIgnore(toPath)
    return
  }

  if (fs.existsSync(fromPath)) {
    const stat = fs.statSync(fromPath)
    // 是目录的时候
    if (stat.isDirectory()) {
      // 检查是否存在.
      if (fs.existsSync(toPath)) {
        logExists(toPath)
      } else {
        shell.mkdir(toPath)
        logCreate(toPath)
      }

      shell.ls("-A", fromPath).forEach((oneFileName) => {
        copyFile(fromPath, toPath, ignore, oneFileName)
      })
    } else {
      const isExist = fs.existsSync(toPath)
      if (path.extname(fromPath) === ".json") {
        mergeJson(fromPath, toPath)
        if (isExist) {
          logUpdate(toPath)
        } else {
          logCreate(toPath)
        }
      } else if (isExist && path.extname(fromPath) === ".ts") {
        logIgnore(toPath)
      } else {
        shell.cp(fromPath, toPath)
        if (isExist) {
          logUpdate(toPath)
        } else {
          logCreate(toPath)
        }
      }
    }
  } else {
    console.log(chalk.red("Can't find the path: ") + chalk.green(fromPath))
  }
}
