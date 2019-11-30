/**
 * 执行某些特殊的文件.
 */
import shell from "shelljs";
import path from "path";
import fs from "fs-extra";
import { noEmptyString } from "../../str/noEmptyString";
export default function ExecuteFile(dirtPath: string) {
  installModules(dirtPath);
}

async function installModules(dirtPath: string) {
  const str = await readFileAsString(path.join(dirtPath, "modules.txt"));
  // 分割开发和生产包
  const all = str.split(">>>");
  const pro = all[0];
  const dev = all[1];
  runInstallShell(trimToModulesList(pro), false);
  runInstallShell(trimToModulesList(dev));
}

async function readFileAsString(filePath: string) {
  const exist = await fs.pathExists(filePath);
  if (exist) {
    const modulesFile = await fs.readFile(filePath);
    const str = modulesFile.toString();
    return str;
  } else {
    return "";
  }
}

function runInstallShell(modulesList: string, isDev = true) {
  if (modulesList) {
    return shell.exec(`yarn ${modulesList}${isDev ? " -D" : ""}`);
  }
}

function trimToModulesList(str: string) {
  return noEmptyString(str.split("\n")).join(" ");
}
