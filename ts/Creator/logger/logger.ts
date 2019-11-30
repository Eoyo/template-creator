/* eslint-disable no-console */
import chalk from "chalk"

const logger = (tag: string, type?: "dark") => {
  if (type === "dark") {
    return (fileName: string) => {
      console.log(`${chalk.dim(`${tag}:`)}  ${chalk.dim(fileName)}`)
    }
  }
  return (fileName: string) => {
    console.log(`${chalk.blue(`${tag}:`)}  ${chalk.green(fileName)}`)
  }
}

export const logCreate = logger("Cr")
export const logExists = logger("Ex", "dark")
export const logUpdate = logger("Up")
export const logIgnore = logger("Ig", "dark")
export const logShould = logger("Shourld")
