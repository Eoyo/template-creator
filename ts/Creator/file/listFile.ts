import shell from "shelljs";
import chalk from "chalk";

export function listFile(fromPath: string) {
  console.log(chalk.green("已有模板项目:"));
  shell.ls(fromPath).forEach(fileName => {
    console.log(chalk.blue(fileName));
  });
}
