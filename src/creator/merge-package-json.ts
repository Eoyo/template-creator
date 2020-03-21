import fs from "fs-extra"
import { readFileAsString } from "../file/read-file-as-string"
import { deepMerge } from "./deepMerge"

const safeParseJson = (str: string) => {
  if (str) {
    try {
      return JSON.parse(str)
    } catch (err) {
      return {}
    }
  }
  return {}
}

const readFileAsJson = async (filePath: string) => {
  return safeParseJson(await readFileAsString(filePath))
}

export async function mergeJson(
  templateJsonPath: string,
  destJsonPath: string
) {
  const [templatePackageJSON, currentPackageJSON] = await Promise.all([
    readFileAsJson(templateJsonPath),
    readFileAsJson(destJsonPath),
  ])

  const [newPackageJSON] = deepMerge(currentPackageJSON, templatePackageJSON)
  return fs.writeFile(destJsonPath, JSON.stringify(newPackageJSON, null, 2))
}
