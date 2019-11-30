import fs from "fs"
import ignore from "ignore"

//
export function readIgnoreFileAsArr(filePath: string) {
  const str = fs.readFileSync(filePath).toString()
  const divider = /([; ,\n])+/
  const arr = str.split(divider).filter((char) => {
    // 空字符串也不要
    return !divider.test(char) && char !== ""
  })
  return arr
}

export function readIgnore(filePath: string) {
  if (fs.existsSync(filePath)) {
    return ignore().add(readIgnoreFileAsArr(filePath))
  }
  return undefined
}
