import fs from "fs-extra"
import path from "path"
import R from "ramda"
import { readFileAsString } from "../file/read-file-as-string"

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

function getPackageJsonPathInDir(dirPath: string) {
  return path.join(dirPath, "package.json")
}

export async function mergePackageJson(fromDir: string, destDir: string) {
  const fromPackageJsonPath = getPackageJsonPathInDir(fromDir)
  const destPackageJsonPath = getPackageJsonPathInDir(destDir)

  const [packageJSON, currentPackageJSON] = await Promise.all([
    readFileAsJson(fromPackageJsonPath),
    readFileAsJson(destPackageJsonPath),
  ])

  const newPackageJSON = R.mergeDeepRight(packageJSON, currentPackageJSON)

  console.log(destPackageJsonPath, JSON.stringify(newPackageJSON, null, 2))
  return fs.writeFile(
    destPackageJsonPath,
    JSON.stringify(newPackageJSON, null, 2)
  )
}
