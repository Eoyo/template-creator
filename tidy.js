#!/usr/bin/env node

const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

function shellCmd (cmd ='ls') {
    return (pathStr, arg = '') => {
        const args = arg ? [args, pathStr] : [pathStr];
        return new Promise((res) => {
            const ls = spawn(cmd, args);
            let dataStr = '';
    
            ls.stdout.on('data', (data) => {
                dataStr += data;
            });
    
            ls.stdout.on('end', (data) => {
                res(dataStr);
            })
    
            ls.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });
    
            ls.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
            });
        })
    }
}

const mkDir = shellCmd('mkdir');
const cp = shellCmd('cp');
const ls = shellCmd('ls');

// tidy 的目标文件夹s
const download = '/home/lium/download/'

async function tidyFile() {
    let fileStr = '';
    fileStr = await ls(download);
    const data = fileStr.trim().split('\n');
    data.forEach(async o => {
        const oarr = o.split('.')
        const tail = oarr.length > 1 ? oarr.pop() : '';
        if (tail) {
            const tailDir = path.join(download, tail)
            if (!fs.existsSync(tailDir) ) {
                await mkDir(tailDir)
                console.log('mkdir :: ', tailDir);
            } // else

            try {
                const mv = spawn('mv', [path.join(download, o), path.join(download, tail)])
                console.log('moving :: ' + path.join(download, o) + ' => ' + tailDir );
            } catch (e) {
                console.error(e);
            }
        }
    })
}

tidyFile();