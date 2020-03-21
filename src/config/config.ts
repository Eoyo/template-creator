import { paths } from "./path"

export const config = {
  templateDir: paths.root("__template__"),
  // 用户配置的忽略文件.
  ignoreFile: "ignore.config",
  alwaysIgnore: [
    "ignore.config",
    ".git",
    "node_modules",
    ".DS_Store",
    "package.json",
    "modules.txt",
  ],
}
