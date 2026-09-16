const { app, Tray, Menu, shell, dialog, nativeImage } = require('electron');
const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const fs = require('fs');

// 打包後的 app 是唯讀的，server 必須跑在真正的 repo 上。repo 位置因人而異，
// 所以解析成功後記到設定檔，之後 app 移出 repo（例如搬到應用程式資料夾）仍找得到。
const CONFIG = path.join(app.getPath('userData'), 'config.json');
const isRepo = p => !!p && fs.existsSync(path.join(p, 'scripts', 'serve.js'));

function findRoot() {
  if (!app.isPackaged) return path.resolve(__dirname, '..');
  if (isRepo(process.env.QK_ROOT)) return process.env.QK_ROOT;
  let dir = path.dirname(process.execPath);
  for (let i = 0; i < 8; i++) {
    if (isRepo(dir)) return dir;
    const up = path.dirname(dir);
    if (up === dir) break;
    dir = up;
  }
  try { const saved = JSON.parse(fs.readFileSync(CONFIG, 'utf8')).root; if (isRepo(saved)) return saved; } catch {}
  return null;
}

const ROOT = findRoot();
if (ROOT && app.isPackaged) {
  try { fs.mkdirSync(path.dirname(CONFIG), { recursive: true }); fs.writeFileSync(CONFIG, JSON.stringify({ root: ROOT })); } catch {}
}
const PORT = Number(process.env.QK_PORT) || 4173;
const URL = 'http://localhost:' + PORT;

let BUILD = null;
try { BUILD = require('./build-info.json'); } catch {}

let tray = null, child = null, state = 'stopped', detail = '', stderr = [];

const ICON = s => nativeImage.createFromPath(
  path.join(__dirname, 'icons', s + (process.platform === 'darwin' ? 'Template' : '') + '.png'));

const LABEL = {
  starting: () => '啟動中…',
  running: () => '執行中 · localhost:' + PORT,
  stopped: () => '已停止',
  error: () => detail || '啟動失敗',
};

function setState(next, info) {
  state = next;
  detail = info || '';
  render();
}

function render() {
  tray.setImage(ICON(state));
  tray.setToolTip('QA Knowledge — ' + LABEL[state]());

  const items = [{ label: LABEL[state](), enabled: false }, { type: 'separator' }];
  if (state === 'running' || state === 'starting') {
    const busy = state === 'starting';
    items.push({ label: '開啟知識庫', enabled: !busy, click: () => shell.openExternal(URL) });
    items.push({ label: '停止 server', enabled: !busy, click: stop });
  } else if (state === 'stopped') {
    items.push({ label: '啟動 server', click: start });
  } else {
    items.push({ label: '重試', click: start });
    items.push({ label: '檢視錯誤訊息', click: showError });
  }
  items.push({ type: 'separator' });
  items.push({
    label: 'v' + app.getVersion() + (BUILD ? ' · ' + BUILD.commit + ' · ' + BUILD.builtAt : ' · 開發模式'),
    enabled: false,
  });
  items.push({ label: '結束', click: () => app.quit() });
  tray.setContextMenu(Menu.buildFromTemplate(items));
}

// 探測 port：回傳 'ours'（是知識庫 server）、'other'（被別的程式占用）或 null（沒人在聽）
function probe() {
  return new Promise(resolve => {
    const req = http.get(URL + '/progress', { timeout: 1000 }, res => {
      let body = '';
      res.on('data', c => { body += c; if (body.length > 1e5) req.destroy(); });
      res.on('end', () => {
        try { resolve('answers' in JSON.parse(body) ? 'ours' : 'other'); }
        catch { resolve('other'); }
      });
    });
    req.on('timeout', () => req.destroy());
    req.on('error', () => resolve(null));
  });
}

async function waitReady(proc, deadline) {
  while (Date.now() < deadline) {
    if (await probe() === 'ours') return true;
    if (proc.exitCode !== null || proc.signalCode !== null) return false;
    await new Promise(r => setTimeout(r, 200));
  }
  return false;
}

async function start() {
  if (child) return;
  setState('starting');
  stderr = [];

  if (!isRepo(ROOT)) return setState('error', ROOT ? '找不到知識庫：' + ROOT : '找不到知識庫資料夾');

  const occupied = await probe();
  if (occupied === 'ours') return setState('running');
  if (occupied === 'other') return setState('error', 'port ' + PORT + ' 被其他程式占用');

  // ELECTRON_RUN_AS_NODE 讓 Electron 內建的 Node 執行 serve.js，機器上不需另外裝 Node
  child = spawn(process.execPath, [path.join(ROOT, 'scripts', 'serve.js')], {
    cwd: ROOT,
    env: { ...process.env, ELECTRON_RUN_AS_NODE: '1', PORT: String(PORT) },
  });
  const proc = child;
  proc.stderr.on('data', d => { stderr.push(String(d)); if (stderr.length > 50) stderr.shift(); });
  proc.on('exit', code => {
    if (child === proc) child = null;
    if (state === 'running' || state === 'starting') setState('error', 'server 結束（代碼 ' + code + '）');
  });

  if (await waitReady(proc, Date.now() + 15000)) {
    setState('running');
    shell.openExternal(URL);
  } else {
    stop();
    setState('error', 'server 啟動逾時');
  }
}

function stop() {
  setState('stopped');
  if (child) { child.kill(); child = null; }
}

function showError() {
  dialog.showMessageBox({
    type: 'error',
    message: detail || '啟動失敗',
    detail: stderr.join('') || (ROOT
      ? '知識庫路徑：' + ROOT
      : '請先從 repo 內的 dist/ 執行一次，或設定環境變數 QK_ROOT 指向知識庫資料夾。'),
    buttons: ['關閉'],
  });
}

if (!app.requestSingleInstanceLock()) app.quit();

app.whenReady().then(() => {
  if (process.platform === 'darwin') app.dock.hide();
  tray = new Tray(ICON('stopped'));
  render();
  start();
});

app.on('window-all-closed', () => {});
app.on('before-quit', () => { if (child) child.kill(); });
