import fs from "fs-extra"

export async function readFileAsString(filePath: string) {
  const exist = await fs.pathExists(filePath)
  if (exist) {
    const modulesFile = await fs.readFile(filePath)
    const str = modulesFile.toString()
    return str
  }
  // eslint-disable-next-line no-console
  console.warn(
    "cant not get file",
    filePath,
    "this will return the empty value"
  )
  return ""
}
