import path from "path"
import { listFile } from "../file/list-file"
import { config } from "../config/config"
import { copyTemplate } from "./copy-template"
import { executeFile } from "./execute-file"

export function RunCreator() {
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
      copyTemplate(fromDir, aimDir)
      executeFile(fromDir, aimDir)
  }
}
