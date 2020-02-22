/* eslint-disable no-console */
/**
 * 执行某些特殊的文件.
 */
import shell from "shelljs"
import path from "path"
import { noEmptyString } from "../str/noEmptyString"
import { readFileAsString } from "../file/read-file-as-string"

/**
 *
 * @param modulesStr 代表一组 modules 的字符串
 */
function installModuleList(modulesStr: string, isDev = true) {
  const modulesList = noEmptyString(modulesStr.split("\n")).join(" ")
  if (modulesList) {
    shell.exec(`yarn add ${modulesList}${isDev ? " -D" : ""}`)
  }
}

/**
 * @param fromDir modules txt 所在的目录
 * @param destDir 安装的目标目录
 */
export async function installModulesFromModulesText(
  fromDir: string,
  destDir: string
) {
  const fileStr = await readFileAsString(path.join(fromDir, "modules.txt"))
  const [pro, dev] = fileStr.split(">>>")
  shell.cd(destDir)
  installModuleList(pro, false)
  shell.cd(destDir)
  installModuleList(dev)
}
