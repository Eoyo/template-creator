import path from "path"
import { listFile } from "../file/list-file"
import { config } from "../config/config"
import { copyTemplate } from "./copy-template"
import { installModulesFromModulesText } from "./install-modules"
import { mergePackageJson } from "./merge-package-json"

export async function RunCreator() {
  const arg1: string | undefined = process.argv[2] || ""
  const arg2: string = process.argv[3] || ""

  const fromDir = path.join(config.templateDir, arg1)
  const aimDir = path.join(process.cwd(), arg2)

  switch (arg1) {
    case "-l":
    case "":
      listFile(config.templateDir)
      break
    default:
      await mergePackageJson(fromDir, aimDir)
      copyTemplate(fromDir, aimDir)
      installModulesFromModulesText(fromDir, aimDir)
  }
}
