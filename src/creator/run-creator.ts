import { listFile } from "../file/list-file"
import { config } from "../config/config"
import { copyTemplate } from "./copy-template"
import { executeFile } from "./execute-file"

export function RunCreator() {
  const arg1: string | undefined = process.argv[2]
  const arg2: string = process.argv[3] || ""
  switch (arg1) {
    case "-l":
    case undefined:
      listFile(config.templateDir)
      break
    default:
      copyTemplate(arg1, arg2)
      executeFile(arg1, arg2)
  }
}
