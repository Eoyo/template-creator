import path from "path"
import { listFile } from "../file/list-file"
import { config } from "../config/config"
import { copyTemplate } from "./copy-template"
import { mergeJson } from "./merge-package-json"

export async function RunCreator() {
  const arg1: string = process.argv[2] || ""
  const arg2: string = process.argv[3] || ""

  const templateDir = path.join(config.templateDir, arg1)
  const workingDir = path.join(process.cwd(), arg2)

  switch (arg1) {
    case "-l":
    case "":
      listFile(config.templateDir)
      break
    default:
      // 保证在安装包之前完成 package.json 的更新
      await mergeJson(
        path.join(templateDir, "package.json"),
        path.join(workingDir, "package.json")
      )
      copyTemplate(templateDir, workingDir)
  }
}
