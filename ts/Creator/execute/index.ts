/* eslint-disable no-console */
/**
 * 执行某些特殊的文件.
 */
import shell from "shelljs"
import path from "path"
import fs from "fs-extra"
import R from "ramda"
import { noEmptyString } from "../../str/noEmptyString"

export default function ExecuteFile(dirPath: string, destDir: string) {
  mergePackageJson(dirPath, destDir)
  installModules(dirPath)
}

async function installModules(dirPath: string) {
  const str = await readFileAsString(path.join(dirPath, "modules.txt"))
  // 分割开发和生产包
  const all = str.split(">>>")
  const pro = all[0]
  const dev = all[1]
  runInstallShell(trimToModulesList(pro), false)
  runInstallShell(trimToModulesList(dev))
}

async function readFileAsString(filePath: string) {
  const exist = await fs.pathExists(filePath)
  if (exist) {
    const modulesFile = await fs.readFile(filePath)
    const str = modulesFile.toString()
    return str
  }
  console.warn("cant not get file", filePath)
  return ""
}

async function readFileAsJson(filePath: string) {
  const str = await readFileAsString(filePath)
  if (str) {
    try {
      return JSON.parse(str)
    } catch (err) {
      return {}
    }
  }
  return {}
}

function runInstallShell(modulesList: string, isDev = true) {
  if (modulesList) {
    shell.exec(`yarn add ${modulesList}${isDev ? " -D" : ""}`)
  }
}

function trimToModulesList(str: string) {
  return noEmptyString(str.split("\n")).join(" ")
}

async function mergePackageJson(dirPath: string, destDir: string) {
  const packageJsonPath = path.join(destDir, "package.json")
  const packageJSON = await readFileAsJson(path.join(dirPath, "package.json"))
  const currentPackageJSON = await readFileAsJson(packageJsonPath)
  const newPackageJSON = R.mergeDeepRight(packageJSON, currentPackageJSON)
  return fs.writeFile(packageJsonPath, JSON.stringify(newPackageJSON, null, 2))
}
