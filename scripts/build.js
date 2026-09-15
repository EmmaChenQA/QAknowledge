#!/usr/bin/env node
// kb/ + notes/ + quiz/ (+ progress.json) → kb/INDEX.md 與 site/index.html
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const MYNOTE = '## 我的筆記';

function walk(dir, ext) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(d => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p, ext) : p.endsWith(ext) ? [p] : [];
  });
}
function parseFront(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return [{}, src];
  const meta = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i < 0) continue;
    const k = line.slice(0, i).trim();
    let v = line.slice(i + 1).trim();
    if (v.startsWith('[') && v.endsWith(']')) v = v.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
    meta[k] = v;
  }
  return [meta, m[2]];
}
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function inline(s) {
  return esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
    .replace(/(^|\s)(https?:\/\/\S+)/g, '$1<a href="$2" target="_blank">$2</a>');
}
function md(src) {
  const out = []; let list = null, code = false, para = [], table = [];
  const flush = () => { if (para.length) { out.push('<p>' + inline(para.join(' ')) + '</p>'); para = []; } };
  const endList = () => { if (list) { out.push('</' + list + '>'); list = null; } };
  const endTable = () => {
    if (!table.length) return;
    const rows = table.filter(r => !/^\|[\s:|-]+\|?$/.test(r)).map(r => r.replace(/^\||\|$/g, '').split('|').map(c => c.trim()));
    out.push('<table>' + rows.map((cells, i) => '<tr>' + cells.map(c => '<' + (i ? 'td' : 'th') + '>' + inline(c) + '</' + (i ? 'td' : 'th') + '>').join('') + '</tr>').join('') + '</table>');
    table = [];
  };
  for (const raw of src.split('\n')) {
    if (raw.startsWith('```')) { flush(); endList(); endTable(); code = !code; out.push(code ? '<pre>' : '</pre>'); continue; }
    if (code) { out.push(esc(raw)); continue; }
    if (raw.trim().startsWith('|')) { flush(); endList(); table.push(raw.trim()); continue; }
    endTable();
    const h = raw.match(/^(#{1,6})\s+(.*)/);
    if (h) { flush(); endList(); out.push('<h' + (h[1].length + 1) + '>' + inline(h[2]) + '</h' + (h[1].length + 1) + '>'); continue; }
    const li = raw.match(/^\s*[-*]\s+(.*)/);
    if (li) { flush(); if (list !== 'ul') { endList(); list = 'ul'; out.push('<ul>'); } out.push('<li>' + inline(li[1]) + '</li>'); continue; }
    const ol = raw.match(/^\s*\d+\.\s+(.*)/);
    if (ol) { flush(); if (list !== 'ol') { endList(); list = 'ol'; out.push('<ol>'); } out.push('<li>' + inline(ol[1]) + '</li>'); continue; }
    if (!raw.trim()) { flush(); endList(); continue; }
    para.push(raw);
  }
  flush(); endList(); endTable();
  return out.join('\n');
}

const nodes = walk(path.join(ROOT, 'kb'), '.md')
  .filter(p => !/^[_A-Z]/.test(path.basename(p)))
  .map(p => {
    const [meta, full] = parseFront(fs.readFileSync(p, 'utf8'));
    const i = full.indexOf(MYNOTE);
    const body = i < 0 ? full : full.slice(0, i);
    const myNote = i < 0 ? '' : full.slice(i + MYNOTE.length).trim();
    const id = meta.id || path.relative(path.join(ROOT, 'kb'), p).replace(/\.md$/, '');
    return {
      id, title: meta.title || id, aliases: meta.aliases || [], tags: meta.tags || [],
      topic: meta.topic || 'misc', confidence: meta.confidence || '', updated: meta.updated || '', summary: meta.summary || '',
      sources: meta.sources || [], related: meta.related || [],
      html: md(body), myNote, myNoteHtml: myNote ? md(myNote) : '',
      text: (body + ' ' + myNote + ' ' + (meta.aliases || []).join(' ')).toLowerCase()
    };
  })
  .sort((a, b) => a.id.localeCompare(b.id));

const topicDefs = JSON.parse(fs.readFileSync(path.join(ROOT, 'kb', '_topics.json'), 'utf8'));
const topics = topicDefs.map(t => {
  const ordered = t.order.filter(id => nodes.some(n => n.id === id));
  const rest = nodes.filter(n => n.topic === t.key && !ordered.includes(n.id)).map(n => n.id).sort();
  return { key: t.key, name: t.name, desc: t.desc || '', domain: t.domain || 'rd', ids: ordered.concat(rest) };
});
const misc = nodes.filter(n => !topics.some(t => t.ids.includes(n.id))).map(n => n.id);
if (misc.length) topics.push({ key: 'misc', name: '其他', desc: '尚未歸入主題', ids: misc });

const notes = walk(path.join(ROOT, 'notes'), '.md')
  .filter(p => !/^[_A-Z]/.test(path.basename(p)))
  .map(p => {
    const [meta, body] = parseFront(fs.readFileSync(p, 'utf8'));
    const file = path.relative(path.join(ROOT, 'notes'), p);
    return {
      file, date: meta.date || file.slice(0, 10), title: meta.title || file.replace(/\.md$/, ''),
      context: meta.context || '', tags: meta.tags || [], nodes: meta.nodes || [], summary: meta.summary || '',
      body, html: md(body), text: body.toLowerCase()
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

const quizzes = walk(path.join(ROOT, 'quiz'), '.json').map(p => JSON.parse(fs.readFileSync(p, 'utf8')));
quizzes.forEach(q => q.questions.forEach(x => { x.type = x.type || 'choice'; }));
const progressPath = path.join(ROOT, 'progress.json');
const progress = fs.existsSync(progressPath) ? JSON.parse(fs.readFileSync(progressPath, 'utf8')) : { answers: [] };

fs.writeFileSync(path.join(ROOT, 'kb', 'INDEX.md'),
  '<!-- 由 scripts/build.js 產生，勿手改 -->\n# INDEX\n\nAI 開工先讀本檔，比對 aliases 挑節點，再讀命中的原檔。\n\n## 知識節點\n\n'
  + '| id | title | topic | aliases | confidence | updated | summary |\n|---|---|---|---|---|---|---|\n'
  + nodes.map(n => `| ${n.id} | ${n.title} | ${n.topic} | ${n.aliases.join('、')} | ${n.confidence}${n.myNote ? ' +筆記' : ''} | ${n.updated} | ${n.summary} |`).join('\n')
  + '\n\n## 經歷筆記（綁定特定情境，只當參考）\n\n'
  + '| date | title | context | nodes | summary |\n|---|---|---|---|---|\n'
  + (notes.length ? notes.map(n => `| ${n.date} | ${n.title} | ${n.context} | ${n.nodes.join('、')} | ${n.summary} |`).join('\n') : '| — | 尚無筆記 | | | |')
  + '\n');

const css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');
const app = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
const data = JSON.stringify({ nodes, topics, quizzes, notes, progress }).replace(/</g, '\\u003c');

const html = `<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8"><title>QA Knowledge</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>${css}</style></head><body>
<header class="top"><div class="brand" data-act="home"><div class="logo"><svg viewBox="0 0 24 24"><path d="M9 4h7L11 12l5 8H9l-5-8 5-8z" fill="#fff" opacity=".55"/><path d="M15 4h7l-5 8 5 8h-7l-5-8 5-8z" fill="#fff"/></svg></div><span class="wm">QA Knowledge</span></div>
<div class="search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="s" placeholder="搜尋標題、別名、內文、筆記…"><kbd>⌘K</kbd><div class="ac" id="ac" hidden></div></div>
<nav class="topnav"><a data-act="home">首頁</a><a data-act="notes">筆記</a><a data-act="quiz">知識檢測</a><a data-act="weak">弱點</a></nav>
</header>
<div class="layout"><aside id="side"></aside><main id="m"></main></div>
<script>window.DATA=${data}</script>
<script>${app}</script>
</body></html>`;

fs.mkdirSync(path.join(ROOT, 'site'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'site', 'index.html'), html);
fs.writeFileSync(path.join(ROOT, 'site', 'data.js'), 'window.DATA=' + data + ';\n');
console.log(`built ${nodes.length} nodes, ${notes.length} notes, ${quizzes.reduce((a, q) => a + q.questions.length, 0)} questions`);
