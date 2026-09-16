#!/usr/bin/env node
// 打包前戳上建置資訊，讓 app 選單能顯示「現在跑的是哪一版」
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const git = args => execSync('git ' + args, { cwd: ROOT, encoding: 'utf8' }).trim();

let commit = 'unknown';
try {
  commit = git('rev-parse --short HEAD');
  if (git('status --porcelain')) commit += '+'; // + 表示打包時工作區有未 commit 的改動
} catch {}

const d = new Date(), pad = n => String(n).padStart(2, '0');
const builtAt = `${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;

fs.writeFileSync(path.join(__dirname, 'build-info.json'), JSON.stringify({ commit, builtAt }) + '\n');
console.log('build-info:', commit, builtAt);
