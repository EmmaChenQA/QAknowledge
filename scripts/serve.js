#!/usr/bin/env node
// 本地小 server：serve site/，並接收網頁的寫入（筆記／節點／考題／答題紀錄），寫完自動重建
const http = require('http'), fs = require('fs'), path = require('path');
const { execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..'), PORT = process.env.PORT || 4173;
const PROGRESS = process.env.QK_PROGRESS ? path.resolve(process.env.QK_PROGRESS) : path.join(ROOT, 'progress.json');
const BACKUP_DIR = process.env.QK_BACKUP_DIR ? path.resolve(process.env.QK_BACKUP_DIR) : path.join(ROOT, '..', 'qa-knowledge-backups');
const BACKUP_KEEP_DAYS = 30;

const safe = (base, ...seg) => {
  const p = path.resolve(ROOT, base, ...seg);
  if (!p.startsWith(path.resolve(ROOT, base) + path.sep)) throw new Error('路徑不合法');
  return p;
};
const arr = v => '[' + (Array.isArray(v) ? v : String(v || '').split(',')).map(s => String(s).trim()).filter(Boolean).join(', ') + ']';
const oneLine = v => String(v || '').replace(/[\r\n]+/g, ' ').trim();
const slug = s => oneLine(s).replace(/[^\w一-鿿-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'note';
const today = () => new Date().toISOString().slice(0, 10);

// 每日首次寫入前，把「今天寫入之前」的狀態存一份快照；同一天不重複備份；只留最近 BACKUP_KEEP_DAYS 天
function backupProgressOnce() {
  try {
    if (!fs.existsSync(PROGRESS)) return; // 沒有舊檔可備份（例如第一次啟動）
    const stamp = today();
    const target = path.join(BACKUP_DIR, `progress-${stamp}.json`);
    if (fs.existsSync(target)) return; // 今天已備份過
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    fs.copyFileSync(PROGRESS, target);
    const cutoff = Date.now() - BACKUP_KEEP_DAYS * 864e5;
    for (const f of fs.readdirSync(BACKUP_DIR)) {
      const m = f.match(/^progress-(\d{4}-\d{2}-\d{2})\.json$/);
      if (m && new Date(m[1] + 'T00:00:00Z').getTime() < cutoff) fs.unlinkSync(path.join(BACKUP_DIR, f));
    }
  } catch (e) { console.error('backup 失敗（不影響寫入）:', e.message); }
}
const rebuild = () => execFileSync(process.execPath, [path.join(__dirname, 'build.js')], { encoding: 'utf8' }).trim();

const handlers = {
  '/note-section'(b) {
    const f = safe('kb', b.id + '.md');
    if (!fs.existsSync(f)) throw new Error('節點不存在');
    const src = fs.readFileSync(f, 'utf8'), i = src.indexOf('## 我的筆記');
    const head = (i < 0 ? src : src.slice(0, i)).replace(/\s*$/, '\n');
    const text = String(b.text || '').trim();
    fs.writeFileSync(f, text ? head + '\n## 我的筆記\n' + text + '\n' : head);
  },
  '/note'(b) {
    const date = /^\d{4}-\d{2}-\d{2}$/.test(b.date) ? b.date : today();
    const file = b.file ? path.basename(b.file) : date + '-' + slug(b.title) + '.md';
    const f = safe('notes', file);
    fs.writeFileSync(f, '---\n'
      + 'date: ' + date + '\n'
      + 'title: ' + oneLine(b.title) + '\n'
      + 'context: ' + oneLine(b.context) + '\n'
      + 'tags: ' + arr(b.tags) + '\n'
      + 'nodes: ' + arr(b.nodes) + '\n'
      + 'summary: ' + oneLine(b.summary) + '\n'
      + '---\n' + String(b.body || '').trim() + '\n');
  },
  '/node'(b) {
    if (!/^[a-z0-9-]+$/.test(b.name)) throw new Error('id 只能用小寫英數與 -');
    const f = safe('kb', b.dir, b.name + '.md');
    if (fs.existsSync(f)) throw new Error('節點已存在');
    fs.mkdirSync(path.dirname(f), { recursive: true });
    fs.writeFileSync(f, '---\n'
      + 'id: ' + b.dir + '/' + b.name + '\n'
      + 'title: ' + oneLine(b.title) + '\n'
      + 'aliases: ' + arr(b.aliases) + '\n'
      + 'tags: ' + arr(b.tags) + '\n'
      + 'topic: ' + (/^[a-z0-9-]+$/.test(b.topic || '') ? b.topic : 'misc') + '\n'
      + 'confidence: ' + (['book', 'author-material', 'verified', 'inferred'].includes(b.confidence) ? b.confidence : 'inferred') + '\n'
      + 'updated: ' + today() + '\n'
      + 'sources: ' + arr(b.sources) + '\n'
      + 'related: ' + arr(b.related) + '\n'
      + 'summary: ' + oneLine(b.summary) + '\n'
      + '---\n' + String(b.body || '').trim() + '\n');
  },
  '/quiz'(b) {
    if (!fs.existsSync(safe('kb', b.node + '.md'))) throw new Error('節點不存在');
    const f = safe('quiz', b.node.replace(/\//g, '-') + '.json');
    const j = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : { node: b.node, questions: [] };
    const q = b.question || {};
    if (!q.q) throw new Error('缺題目');
    if (q.type === 'scenario') { if (!q.answer) throw new Error('缺參考答案'); }
    else if (!Array.isArray(q.options) || q.options.length < 2 || typeof q.answer !== 'number' || q.answer < 0 || q.answer >= q.options.length) throw new Error('選項或正解不合法');
    j.questions.push(q);
    fs.writeFileSync(f, JSON.stringify(j, null, 2) + '\n');
  }
};

http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (req.method === 'POST') {
    let body = '';
    req.on('data', c => { body += c; if (body.length > 2e6) req.destroy(); });
    req.on('end', () => {
      try {
        const b = JSON.parse(body || '{}');
        if (url === '/progress') { backupProgressOnce(); fs.writeFileSync(PROGRESS, body); return res.writeHead(204).end(); }
        const h = handlers[url];
        if (!h) return res.writeHead(404).end();
        h(b);
        const log = rebuild();
        console.log(url, '→', log);
        res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify({ ok: true, log }));
      } catch (e) { console.error(url, e.message); res.writeHead(400).end(e.message); }
    });
    return;
  }
  if (url === '/progress') {
    const p = PROGRESS;
    res.setHeader('Content-Type', 'application/json');
    return res.end(fs.existsSync(p) ? fs.readFileSync(p) : '{"answers":[]}');
  }
  let f;
  try { f = safe('site', url === '/' ? 'index.html' : '.' + url); } catch (e) { return res.writeHead(400).end(); }
  if (!fs.existsSync(f)) return res.writeHead(404).end();
  res.setHeader('Content-Type', (f.endsWith('.js') ? 'application/javascript' : f.endsWith('.css') ? 'text/css' : 'text/html') + '; charset=utf-8');
  res.end(fs.readFileSync(f));
}).listen(PORT, () => { backupProgressOnce(); console.log('http://localhost:' + PORT); });
