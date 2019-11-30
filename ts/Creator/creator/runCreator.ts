import { CheckToStartConfig } from "./checkCreate"

export function RunCreator() {
  const command = process.argv[2]

  switch (command) {
    case "--config":
    case "-c":
    case "--c":
    case "--C":
    case "-C":
      CheckToStartConfig(true)
      break
    case "-l":
      CheckToStartConfig(false)
      break
    default:
      CheckToStartConfig(false, command)
  }
}
