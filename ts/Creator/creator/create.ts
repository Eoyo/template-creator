import {config} from '../config/config';
import path from 'path';
import {readIgnore} from '../file/readCreatorIgnore';
import {cutHead} from '../../str/diff';
import {CopyFile} from '../file/copyfile';
import ignore from 'ignore';

export function Create(fromDirName: string) {
  const cwd = process.cwd();
  const alwaysIgnore = ignore().add(config.alwaysIgnore);

  // read the .creatignore;
  const fileIgnore = readIgnore(
    path.resolve(config.templateDir, fromDirName, config.ignoreFile),
  );

  let fromPath = path.resolve(config.templateDir, '.');
  let dirPath = path.resolve(config.templateDir, fromDirName);

  // 配置ignorer;
  let ignorer = alwaysIgnore;
  if (fileIgnore) {
    ignorer = alwaysIgnore.add(fileIgnore);
  }

  if (ignorer) {
    console.log('found ignorefile');
    ignorer.add([config.ignoreFile]);
    CopyFile(dirPath, '', cwd, str => {
      let sortStr = cutHead(fromPath, str);
      if (sortStr) {
        return ignorer.ignores(sortStr);
      } else {
        return false;
      }
    });
  } else {
    CopyFile(dirPath, '', cwd);
  }
}
