import { listFile } from "../file/list-file"
import { config } from "../config/config"
import { copyTemplate } from "./copy-template"
import { executeFile } from "./execute-file"

export function RunCreator() {
  const arg1 = process.argv[2]
  const arg2 = process.argv[3] || ""
  switch (arg1) {
    case "-l":
      listFile(config.templateDir)
      break
    default:
      copyTemplate(arg1, arg2)
      executeFile(arg1, arg2)
  }
}
