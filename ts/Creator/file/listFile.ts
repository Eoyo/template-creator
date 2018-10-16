import shell from 'shelljs';
import chalk from 'chalk';

export function listFile(fromPath: string) {
  shell.ls(fromPath).forEach(fileName => {
    console.log(chalk.blue(fileName));
  });
}
