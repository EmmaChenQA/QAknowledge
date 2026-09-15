const D = window.DATA, NODES = D.nodes, QUIZ = D.quizzes, NOTES = D.notes, TOPICS = D.topics;
let progress = D.progress, _r = '';
progress.reads = progress.reads || {}; progress.answers = progress.answers || [];
const SERVER = location.protocol.startsWith('http');
const byId = Object.fromEntries(NODES.map(n => [n.id, n]));
const $ = s => document.querySelector(s);
const M = $('#m');
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const short = s => String(s).replace(/（.*?）/, '');
const A = (act, extra, txt, cls) => '<a data-act="' + act + '" ' + extra + ' class="' + (cls || '') + '" style="cursor:pointer;text-decoration:none">' + txt + '</a>';
const topicOf = id => TOPICS.find(t => t.ids.includes(id)) || TOPICS[TOPICS.length - 1];
const tNodes = t => t.ids.map(i => byId[i]).filter(Boolean);

try { const p = localStorage.getItem('qk-progress'); if (p && !SERVER) progress = JSON.parse(p); } catch (e) {}
if (SERVER) fetch('/progress').then(r => r.json()).then(p => { progress = p; progress.reads = progress.reads || {}; progress.answers = progress.answers || []; if (location.hash.startsWith('#n/')) side(location.hash.slice(3)); else route(); }).catch(() => {});
function save() {
  try { localStorage.setItem('qk-progress', JSON.stringify(progress)); } catch (e) {}
  if (SERVER) fetch('/progress', { method: 'POST', body: JSON.stringify(progress) }).catch(() => {});
}
function toast(t) { const d = document.createElement('div'); d.className = 'toast'; d.textContent = t; document.body.appendChild(d); setTimeout(() => d.remove(), 2200); }
async function post(url, data) {
  if (!SERVER) { toast('唯讀模式：請用 node scripts/serve.js 開啟'); return false; }
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  if (!r.ok) { toast('失敗：' + (await r.text()).slice(0, 80)); return false; }
  return true;
}
const val = id => $('#' + id).value.trim();
const list = id => val(id).split(/[,、]/).map(s => s.trim()).filter(Boolean);
function stats() { const s = {}; for (const a of progress.answers) { s[a.node] = s[a.node] || { t: 0, w: 0 }; s[a.node].t++; if (!a.correct) s[a.node].w++; } return s; }
const isRead = id => !!progress.reads[id];
const dotCls = (st, id) => st[id] ? (st[id].w ? 'bad' : 'ok') : isRead(id) ? 'read' : '';
const done = (st, t) => tNodes(t).filter(n => st[n.id]).length;
const readCnt = t => tNodes(t).filter(n => isRead(n.id)).length;
function markRead(id) { if (isRead(id) || location.hash !== '#n/' + id) return; progress.reads[id] = new Date().toISOString(); save(); side(id); }

// ---------- domain filter（側欄專用，不影響首頁；首頁固定依領域分區顯示） ----------
const DOMAIN_LABEL = { backend: '後端與系統', frontend: '前端', qa: 'QA 技巧' };
const DOMAIN_SHORT = { all: '全部', backend: '後端', frontend: '前端', qa: 'QA' };
const DOMAIN_ORDER = ['backend', 'frontend', 'qa'];
let domainFilter = 'all';
try { domainFilter = localStorage.getItem('qk-domain') || 'all'; } catch (e) {}
function setDomain(d) {
  domainFilter = d; try { localStorage.setItem('qk-domain', d); } catch (e) {}
  const h = decodeURIComponent(location.hash.slice(1));
  side(h.startsWith('n/') && byId[h.slice(2)] ? h.slice(2) : null);
}
function domainSeg() {
  return '<div class="seg">' + ['all'].concat(DOMAIN_ORDER).map(d => '<button class="' + (domainFilter === d ? 'on' : '') + '" data-act="domain" data-d="' + d + '">' + DOMAIN_SHORT[d] + '</button>').join('') + '</div>';
}
function domainList() { return domainFilter === 'all' ? DOMAIN_ORDER : [domainFilter]; }

// ---------- sidebar ----------
function side(cur) {
  const st = stats(); const tk = cur ? topicOf(cur).key : null;
  let html = domainSeg();
  for (const dom of domainList()) {
    const ts = TOPICS.filter(t => t.domain === dom && tNodes(t).length);
    html += ts.map(t => {
      const ns = tNodes(t);
      return '<details class="t"' + (t.key === tk ? ' open' : '') + '><summary><svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>' + esc(t.name) + '<span class="n">' + done(st, t) + '/' + ns.length + '</span><span class="topic-plus" data-act="new-node" data-topic="' + t.key + '" title="在「' + esc(t.name) + '」新增節點">＋</span></summary>'
        + '<div class="bar"><i style="width:' + (readCnt(t) / ns.length * 100) + '%"></i></div>'
        + ns.map(n => '<a class="item' + (n.id === cur ? ' on' : '') + '" data-act="node" data-id="' + n.id + '"><span class="dot ' + dotCls(st, n.id) + '"></span>' + esc(short(n.title)) + '</a>').join('') + '</details>';
    }).join('');
  }
  html += '<div class="legend"><span><i class="dot"></i>未讀</span><span><i class="dot read"></i>已讀</span><span><i class="dot ok"></i>全對</span><span><i class="dot bad"></i>有錯題</span></div>';
  $('#side').innerHTML = html;
}
function setNav(k) { document.querySelectorAll('.topnav a').forEach(a => a.classList.toggle('on', a.dataset.act === k)); }

// ---------- pages ----------
function home() {
  location.hash = ''; _r = location.hash; setNav('home'); side(null); const st = stats();
  const answered = Object.keys(st).filter(id => byId[id]).length;
  const readN = NODES.filter(n => isRead(n.id)).length;
  const dueN = QUIZ.flatMap(q => q.questions.map((x, i) => due(q.node, i))).filter(Boolean).length;
  const weak = Object.entries(st).filter(([id, v]) => v.w && byId[id]).sort((a, b) => b[1].w / b[1].t - a[1].w / a[1].t).slice(0, 3);
  const recent = NOTES.slice(0, 3);
  M.innerHTML = '<div class="wrap single"><h1>今天從哪裡開始</h1><p class="lead">' + NODES.length + ' 個概念分成 ' + TOPICS.filter(t => tNodes(t).length).length + ' 個主題。先看主題卡的進度，或直接搜手上票務的關鍵字（⌘K）。</p>'
    + '<div class="tiles"><div class="tile"><small>已讀概念</small><div class="v">' + readN + ' <span style="font-size:14px;color:var(--mut);font-weight:400">/ ' + NODES.length + '</span></div><div class="bar" style="margin:6px 0 4px"><i style="width:' + (readN / NODES.length * 100) + '%"></i></div><small>開啟節點停留幾秒即記為已讀 · 已答題 ' + answered + ' 個</small></div>'
    + '<div class="tile"><small>今日到期檢測</small><div class="v">' + dueN + '</div>' + A('quiz', '', '去作答 →', '') + '<small style="margin-left:8px">共 ' + QUIZ.reduce((a, q) => a + q.questions.length, 0) + ' 題</small></div>'
    + '<div class="tile"><small>最需要回頭看</small>' + (weak.length ? '<ul class="weak">' + weak.map(([id, v]) => '<li>' + A('node', 'data-id="' + id + '"', esc(short(byId[id].title))) + '<span style="color:var(--bad)">' + Math.round(v.w / v.t * 100) + '%</span></li>').join('') + '</ul>' : '<div style="color:var(--mut);font-size:13px;margin-top:6px">尚無錯題</div>') + '</div></div>'
    + '<h2 style="font-size:16px;color:var(--mut);font-weight:500;margin:0 0 12px">主題</h2>'
    + DOMAIN_ORDER.map(dom => { const ts = TOPICS.filter(t => t.domain === dom && tNodes(t).length); if (!ts.length) return ''; return '<div class="sec-h">' + DOMAIN_LABEL[dom] + '</div><div class="cards">' + ts.map(t => { const ns = tNodes(t); return '<div class="card" data-act="topic" data-key="' + t.key + '"><b>' + esc(t.name) + '</b><p>' + esc(t.desc) + '</p><div class="bar"><i style="width:' + (readCnt(t) / ns.length * 100) + '%"></i></div><div class="n"><span>' + ns.length + ' 個概念</span><span>已讀 ' + readCnt(t) + ' · 已答 ' + done(st, t) + '</span></div></div>'; }).join('') + '</div>'; }).join('')
    + (recent.length ? '<h2 style="font-size:16px;color:var(--mut);font-weight:500;margin:32px 0 8px">最近的經歷筆記</h2>' + recent.map(n => '<div class="hit" data-act="note" data-file="' + esc(n.file) + '"><b>' + esc(n.title) + '</b> <small>' + esc(n.date) + ' · ' + esc(n.context || '未分類') + '</small></div>').join('') : '')
    + '</div>';
}
function topic(key) {
  const t = TOPICS.find(x => x.key === key); if (!t) return; location.hash = 't/' + key; _r = location.hash; setNav('home'); const ns = tNodes(t); side(ns[0] && ns[0].id); const st = stats();
  M.innerHTML = '<div class="wrap single"><div class="crumb">' + A('home', '', '首頁') + ' › ' + esc(t.name) + '</div><h1>' + esc(t.name) + '</h1><p class="lead">' + esc(t.desc) + '</p><div class="list">'
    + ns.map((n, i) => '<a data-act="node" data-id="' + n.id + '"><span><span style="color:var(--mut);font-variant-numeric:tabular-nums;margin-right:10px">' + String(i + 1).padStart(2, '0') + '</span>' + esc(n.title) + '<br><small style="margin-left:30px">' + esc(n.summary) + '</small></span><small>' + (st[n.id] ? (st[n.id].w ? '有錯題' : '全對') : isRead(n.id) ? '已讀' : '未讀') + '</small></a>').join('') + '</div></div>';
}
function show(id) {
  const n = byId[id]; if (!n) return; location.hash = 'n/' + id; _r = location.hash; setNav('home'); side(id); const st = stats();
  const t = topicOf(id), ns = tNodes(t), i = ns.findIndex(x => x.id === id);
  const tmp = document.createElement('div'); tmp.innerHTML = n.html; const hs = [...tmp.querySelectorAll('h3')]; hs.forEach((h, k) => h.id = 'h' + k);
  const rel = n.related.map(r => byId[r] ? '<span class="chip" data-act="node" data-id="' + r + '">' + esc(short(byId[r].title)) + '</span>' : '<span class="chip" style="color:var(--mut);cursor:default">' + esc(r) + '（未建）</span>').join('');
  const linked = NOTES.filter(x => x.nodes.includes(id));
  M.innerHTML = '<div class="wrap"><div>'
    + '<div class="stepper">' + A('topic', 'data-key="' + t.key + '"', esc(t.name)) + '<div class="steps">' + ns.map((x, k) => '<i class="' + (k === i ? 'cur' : st[x.id] ? 'd' : '') + '" title="' + esc(short(x.title)) + '"></i>').join('') + '</div><span>' + (i + 1) + ' / ' + ns.length + '</span></div>'
    + '<h1>' + esc(n.title) + '</h1>'
    + '<div class="meta"><span class="badge" title="來源信心：book 書上原理／verified 實測過／inferred 推論">' + esc(n.confidence) + '</span>'
    + '<span class="tags">' + n.tags.map(x => '<a class="tagl" data-act="tag" data-t="' + esc(x) + '">#' + esc(x) + '</a>').join('') + '</span>'
    + '<span>更新 ' + esc(n.updated) + '</span>' + (isRead(id) ? '<span>· 已讀</span>' : '') + (st[id] ? '<span>· 答題 ' + st[id].t + ' 錯 ' + st[id].w + '</span>' : '') + '</div>'
    + (n.summary ? '<p class="lead">' + esc(n.summary) + '</p>' : '')
    + '<article>' + tmp.innerHTML + '</article>'
    + (n.sources.length ? '<h3 id="src" style="font-size:16px;margin-top:36px">出處</h3><ul>' + n.sources.map(s => '<li>' + esc(s) + '</li>').join('') + '</ul>' : '')
    + (rel ? '<h3 id="rel" style="font-size:16px;margin-top:28px">相關概念</h3><div class="rel">' + rel + '</div>' : '')
    + '<h3 id="my" style="font-size:16px;margin-top:36px">我的筆記</h3><div class="box note" id="mynote">' + (n.myNoteHtml || '<span style="color:var(--mut)">尚未填寫</span>') + '</div>'
    + '<p><button data-act="edit-note" data-id="' + id + '">編輯我的筆記</button> '
    + (QUIZ.some(q => q.node === id) ? '<button class="pri" data-act="quiz" data-id="' + id + '">本節點知識檢測</button> ' : '')
    + '<button data-act="add-quiz" data-id="' + id + '">新增題目</button></p>'
    + (linked.length ? '<h3 id="logs" style="font-size:16px;margin-top:28px">相關經歷筆記</h3>' + linked.map(x => '<div class="hit" data-act="note" data-file="' + esc(x.file) + '"><b>' + esc(x.title) + '</b> <small>' + esc(x.date) + ' · ' + esc(x.context || '') + '</small></div>').join('') : '')
    + '<div class="pn">' + (i > 0 ? A('node', 'data-id="' + ns[i - 1].id + '"', '<small>上一個</small>← ' + esc(short(ns[i - 1].title))) : '<span></span>') + (i >= 0 && i < ns.length - 1 ? A('node', 'data-id="' + ns[i + 1].id + '"', '<small>下一個</small>' + esc(short(ns[i + 1].title)) + ' →', '') : A('topic', 'data-key="' + t.key + '"', '<small>路徑完成</small>回到 ' + esc(t.name))) + '</div>'
    + '</div><nav class="toc"><b>本頭</b>' + hs.map(h => '<a data-jump="' + h.id + '">' + esc(h.textContent) + '</a>').join('') + (n.sources.length ? '<a data-jump="src">出處</a>' : '') + (rel ? '<a data-jump="rel">相關概念</a>' : '') + '<a data-jump="my">我的筆記</a>' + (linked.length ? '<a data-jump="logs">經歷筆記</a>' : '') + '</nav></div>';
  M.querySelector('.toc b').textContent = '本頁';
  M.scrollTop = 0;
  setTimeout(() => markRead(id), 2500);
}
function editNote(id) {
  const n = byId[id];
  $('#mynote').innerHTML = '<textarea id="mn" rows="8">' + esc(n.myNote || '') + '</textarea>'
    + '<button class="pri" data-act="save-note" data-id="' + id + '">儲存</button> <button data-act="node" data-id="' + id + '">取消</button>'
    + '<div class="ro">支援 markdown；寫跨產業成立的理解與疑問。特定產品的實測經歷請用「筆記」頁的經歷筆記。</div>';
}
function showNotes() {
  location.hash = 'notes'; _r = location.hash; setNav('notes'); side(null);
  const ctxs = [...new Set(NOTES.map(n => n.context).filter(Boolean))];
  M.innerHTML = '<div class="wrap single"><h1>經歷筆記</h1><p class="lead">綁定特定產品／情境的實測經驗，換產業前先確認是否仍適用。共 ' + NOTES.length + ' 則。</p>'
    + (ctxs.length ? '<div class="meta">情境：<span class="tags">' + ctxs.map(c => '<a class="tagl" data-act="tag" data-t="' + esc(c) + '">#' + esc(c) + '</a>').join('') + '</span></div>' : '')
    + '<p><button class="pri" data-act="new-note">新增筆記</button></p>'
    + NOTES.map(n => '<div class="hit" data-act="note" data-file="' + esc(n.file) + '"><b>' + esc(n.title) + '</b> <small>' + esc(n.date) + ' · ' + esc(n.context || '未分類') + '</small><br><small>' + esc(n.summary || '') + '</small></div>').join('')
    + (NOTES.length ? '' : '<p style="color:var(--mut)">尚無筆記。</p>') + '</div>';
}
function showNote(file) {
  const n = NOTES.find(x => x.file === file); if (!n) return; location.hash = 'note/' + encodeURIComponent(file); _r = location.hash; setNav('notes'); side(null);
  M.innerHTML = '<div class="wrap single"><div class="crumb">' + A('notes', '', '筆記') + ' › ' + esc(n.date) + '</div><h1>' + esc(n.title) + '</h1><div class="meta">' + (n.context ? '<span class="badge">' + esc(n.context) + '</span>' : '') + '<span class="tags">' + n.tags.map(t => '<a class="tagl" data-act="tag" data-t="' + esc(t) + '">#' + esc(t) + '</a>').join('') + '</span>' + '<span>' + esc(n.date) + '</span></div>'
    + (n.summary ? '<p class="lead">' + esc(n.summary) + '</p>' : '') + '<article>' + n.html + '</article>'
    + (n.nodes.length ? '<h3 style="font-size:16px;margin-top:28px">關聯節點</h3><div class="rel">' + n.nodes.map(i => byId[i] ? '<span class="chip" data-act="node" data-id="' + i + '">' + esc(short(byId[i].title)) + '</span>' : '<span class="chip" style="color:var(--mut)">' + esc(i) + '（未建）</span>').join('') + '</div>' : '')
    + '<div class="ro">經歷筆記綁定特定情境，換產品／產業前先確認是否仍適用。</div><p><button data-act="edit-log" data-file="' + esc(file) + '">編輯</button></p></div>';
}
function nodeOptions(sel) { return TOPICS.map(t => '<optgroup label="' + esc(t.name) + '">' + tNodes(t).map(n => '<option value="' + esc(n.id) + '"' + (sel && sel.includes(n.id) ? ' selected' : '') + '>' + esc(short(n.title)) + '</option>').join('') + '</optgroup>').join(''); }
function formNote(n) {
  location.hash = n ? 'edit/' + encodeURIComponent(n.file) : 'new-note'; _r = location.hash; setNav('notes'); side(null);
  M.innerHTML = '<div class="wrap single"><h1>' + (n ? '編輯' : '新增') + '經歷筆記</h1>'
    + '<div class="row"><div><label class="f">日期</label><input type="text" id="f_date" value="' + esc(n ? n.date : new Date().toISOString().slice(0, 10)) + '"></div>'
    + '<div><label class="f">情境（產品／產業／專案）</label><input type="text" id="f_ctx" value="' + esc(n ? n.context : '') + '" placeholder="博彩平台 / 支付"></div></div>'
    + '<label class="f">標題</label><input type="text" id="f_title" value="' + esc(n ? n.title : '') + '">'
    + '<label class="f">一句摘要</label><input type="text" id="f_sum" value="' + esc(n ? n.summary : '') + '">'
    + '<label class="f">標籤（逗號分隔）</label><input type="text" id="f_tags" value="' + esc(n ? n.tags.join(', ') : '') + '">'
    + '<label class="f">關聯節點（可複選，⌘ 點選多個）</label><select id="f_nodes" multiple size="8">' + nodeOptions(n ? n.nodes : []) + '</select>'
    + '<label class="f">內文（markdown）</label><textarea id="f_body" rows="14">' + esc(n ? n.body : '## 情境\n\n## 發生什麼\n\n## 學到什麼\n\n## 下次怎麼測\n') + '</textarea>'
    + '<button class="pri" data-act="save-log" ' + (n ? 'data-file="' + esc(n.file) + '"' : '') + '>儲存</button> <button data-act="notes">取消</button></div>';
}
function formNodeNew(presetTopic) {
  location.hash = 'new-node'; _r = location.hash; side(null);
  const dirs = [...new Set(NODES.map(n => n.id.split('/').slice(0, -1).join('/')))];
  const defDir = presetTopic ? (presetTopic === 'vue' ? 'rd/frontend' : presetTopic.startsWith('qa-') ? 'qa/' + presetTopic.slice(3) : 'rd/backend') : dirs[0];
  M.innerHTML = '<div class="wrap single"><h1>新增節點' + (presetTopic ? '：' + esc((TOPICS.find(t => t.key === presetTopic) || {}).name || '') : '') + '</h1><div class="ro">網頁新增的節點預設 confidence 為 inferred（未經書本或實測佐證）。</div>'
    + '<div class="row"><div><label class="f">領域目錄</label><select id="f_dir">' + dirs.map(d => '<option' + (d === defDir ? ' selected' : '') + '>' + esc(d) + '</option>').join('') + '</select></div>'
    + '<div><label class="f">id（英文 kebab-case）</label><input type="text" id="f_id" placeholder="rate-limiting"></div>'
    + '<div><label class="f">主題</label><select id="f_topic">' + TOPICS.filter(t => t.key !== 'misc').map(t => '<option value="' + t.key + '"' + (t.key === presetTopic ? ' selected' : '') + '>' + esc(t.name) + '</option>').join('') + '<option value="misc">其他</option></select></div></div>'
    + '<label class="f">標題</label><input type="text" id="f_title">'
    + '<label class="f">一句摘要</label><input type="text" id="f_sum">'
    + '<div class="row"><div><label class="f">aliases（逗號分隔，至少 3 個）</label><input type="text" id="f_alias"></div><div><label class="f">tags</label><input type="text" id="f_tags"></div></div>'
    + '<div class="row"><div><label class="f">confidence</label><select id="f_conf"><option>inferred</option><option>verified</option><option>book</option></select></div><div><label class="f">sources</label><input type="text" id="f_src"></div></div>'
    + '<label class="f">related（可複選）</label><select id="f_rel" multiple size="6">' + nodeOptions([]) + '</select>'
    + '<label class="f">正文</label><textarea id="f_body" rows="14">## 定義\n\n## 原理\n\n## QA 視角\n- 怎麼測：\n- 常見缺陷：\n</textarea>'
    + '<button class="pri" data-act="save-node">建立</button> <button data-act="home">取消</button></div>';
}
function formQuiz(id) {
  M.innerHTML = '<div class="wrap single"><h1>新增題目</h1><div class="meta">節點：' + esc(byId[id].title) + '</div>'
    + '<label class="f">題型</label><select id="f_type"><option value="choice">選擇題</option><option value="scenario">情境題</option></select>'
    + '<label class="f">題目</label><textarea id="f_q" rows="3"></textarea>'
    + '<div id="opts"><label class="f">選項（一行一個）</label><textarea id="f_opts" rows="4"></textarea><label class="f">正解是第幾個（從 1 起算）</label><input type="text" id="f_ans" value="1"></div>'
    + '<div id="scen" hidden><label class="f">參考答案要點</label><textarea id="f_sans" rows="5"></textarea></div>'
    + '<button class="pri" data-act="save-quiz" data-id="' + id + '">新增</button> <button data-act="node" data-id="' + id + '">取消</button></div>';
  $('#f_type').onchange = e => { const s = e.target.value === 'scenario'; $('#scen').hidden = !s; $('#opts').hidden = s; };
}
function searchPage(q) {
  q = q.toLowerCase(); setNav(''); side(null);
  const nh = NODES.map(n => { const a = n.aliases.find(x => x.toLowerCase().includes(q)); const ti = n.title.toLowerCase().includes(q); const tg = n.tags.some(x => x.toLowerCase() === q); if (!ti && !a && !tg && !n.text.includes(q)) return null; const i = n.text.indexOf(q); return { n, why: ti ? '標題' : a ? '別名「' + a + '」' : tg ? '標籤' : '內文', ctx: i < 0 ? n.summary : n.text.slice(Math.max(0, i - 50), i + 70).replace(/\n/g, ' '), s: ti ? 4 : a ? 3 : tg ? 2 : 1 }; }).filter(Boolean).sort((a, b) => b.s - a.s);
  const xh = NOTES.filter(n => (n.text + n.title + n.context).toLowerCase().includes(q));
  M.innerHTML = '<div class="wrap single"><h1>搜尋：' + esc(q) + '</h1><p class="lead">' + nh.length + ' 個概念、' + xh.length + ' 則筆記</p>'
    + nh.map(h => '<div class="hit" data-act="node" data-id="' + h.n.id + '"><b>' + esc(h.n.title) + '</b> <small>· ' + esc(topicOf(h.n.id).name) + ' · 命中' + esc(h.why) + '</small><br><small>' + esc(h.ctx) + '</small></div>').join('')
    + (xh.length ? '<h3 style="font-size:16px;margin-top:28px">經歷筆記</h3>' + xh.map(n => '<div class="hit" data-act="note" data-file="' + esc(n.file) + '"><b>' + esc(n.title) + '</b> <small>' + esc(n.date) + ' · ' + esc(n.context) + '</small></div>').join('') : '')
    + (nh.length + xh.length ? '' : '<p>沒有結果。試同義詞，或回首頁從主題瀏覽。</p>') + '</div>';
}

// ---------- quiz ----------
const GAP = [3, 7, 21];
function due(node, idx) {
  const h = progress.answers.filter(a => a.node === node && a.idx === idx); if (!h.length) return true;
  const last = h[h.length - 1]; let streak = 0; for (let i = h.length - 1; i >= 0 && h[i].correct; i--) streak++;
  return (Date.now() - new Date(last.at)) / 864e5 >= (streak ? GAP[Math.min(streak - 1, GAP.length - 1)] : 1);
}
function showQuiz(node, all) {
  setNav('quiz'); side(node || null); if (!node) location.hash = 'quiz'; _r = location.hash;
  let pool = QUIZ.filter(q => !node || q.node === node).flatMap(q => q.questions.map((x, i) => Object.assign({}, x, { node: q.node, idx: i })));
  const total = pool.length; if (!all) pool = pool.filter(q => due(q.node, q.idx));
  const dueCount = pool.length;
  pool.sort(() => Math.random() - 0.5); if (!node) pool = pool.slice(0, 10);
  M.innerHTML = '<div class="wrap single"><h1>知識檢測' + (node ? '：' + esc(short(byId[node].title)) : '') + '</h1>'
    + '<p class="lead">到期 ' + dueCount + ' / 共 ' + total + (dueCount > pool.length ? '（本頁隨機顯示 ' + pool.length + ' 題）' : '') + (all ? '' : ' · ' + A('quiz-all', 'data-id="' + (node || '') + '"', '全部出題')) + '</p>'
    + (pool.map((q, k) => '<div class="q" id="q' + k + '"><b>' + (k + 1) + '. ' + esc(q.q) + '</b> <small style="color:var(--mut)">(' + esc(short(byId[q.node] ? byId[q.node].title : q.node)) + ')</small>'
      + (q.type === 'scenario'
        ? '<textarea rows="4" placeholder="先寫你的答案，再看參考"></textarea><button data-act="reveal" data-k="' + k + '">看參考答案</button><div class="r"></div>'
        : q.options.map((o, i) => '<label><input type="radio" name="q' + k + '" value="' + i + '"> ' + esc(o) + '</label>').join('') + '<div class="r"></div>')
      + '</div>').join('') || '<p>今日無到期題目。' + A('quiz-all', 'data-id="' + (node || '') + '"', '全部出題') + '</p>') + '</div>';
  window._pool = pool;
  M.querySelectorAll('input[type=radio]').forEach(r => r.onchange = e => ansChoice(+e.target.name.slice(1), +e.target.value));
}
function ansChoice(k, i) {
  const q = window._pool[k], el = $('#q' + k), ok = i === q.answer;
  el.querySelector('.r').innerHTML = ok ? '<span class="ok">✓ 正確</span>' : '<span class="bad">✗ 錯誤，正解：' + esc(q.options[q.answer]) + '</span> ' + A('node', 'data-id="' + q.node + '"', '重讀節點');
  el.querySelectorAll('input').forEach(x => x.disabled = true);
  progress.answers.push({ node: q.node, idx: q.idx, correct: ok, at: new Date().toISOString() }); save();
}
function reveal(k) { const q = window._pool[k]; $('#q' + k).querySelector('.r').innerHTML = '<div class="box">' + esc(q.answer) + '</div>自評：<button data-act="self" data-k="' + k + '" data-ok="1">答對</button> <button data-act="self" data-k="' + k + '" data-ok="0">答錯</button>'; }
function self(k, ok) {
  const q = window._pool[k];
  $('#q' + k).querySelector('.r').innerHTML = ok ? '<span class="ok">✓ 已記錄</span>' : '<span class="bad">✗ 已記錄</span> ' + A('node', 'data-id="' + q.node + '"', '重讀節點');
  progress.answers.push({ node: q.node, idx: q.idx, correct: ok, at: new Date().toISOString() }); save();
}
function showWeak() {
  location.hash = 'weak'; _r = location.hash; setNav('weak'); side(null); const s = stats(); const rows = Object.entries(s).filter(([id]) => byId[id]).sort((a, b) => b[1].w / b[1].t - a[1].w / a[1].t);
  M.innerHTML = '<div class="wrap single"><h1>弱點</h1><p class="lead">依錯誤率排序，點節點回去重讀。</p>' + (rows.length
    ? '<table><tr><th>節點</th><th>主題</th><th>答題</th><th>錯</th><th>錯誤率</th></tr>' + rows.map(([id, v]) => '<tr><td>' + A('node', 'data-id="' + id + '"', esc(short(byId[id].title))) + '</td><td>' + esc(topicOf(id).name) + '</td><td>' + v.t + '</td><td>' + v.w + '</td><td>' + Math.round(v.w / v.t * 100) + '%</td></tr>').join('') + '</table>'
    : '<p>尚無答題紀錄</p>')
    + '<p style="margin-top:18px"><button data-act="export" title="下載目前所有答題與已讀紀錄，換裝置時可備份或還原">匯出答題紀錄</button> '
    + '<button data-act="import" title="匯入之前匯出的檔案，與目前紀錄合併，不會覆蓋">匯入答題紀錄</button>'
    + '<input type="file" id="importFile" accept="application/json" hidden></p></div>';
}
function mergeProgress(incoming) {
  progress.reads = progress.reads || {}; progress.answers = progress.answers || [];
  const seen = new Set(progress.answers.map(a => a.node + '|' + a.idx + '|' + a.at));
  let added = 0;
  (incoming.answers || []).forEach(a => { const k = a.node + '|' + a.idx + '|' + a.at; if (!seen.has(k)) { progress.answers.push(a); seen.add(k); added++; } });
  Object.entries(incoming.reads || {}).forEach(([id, at]) => { if (!progress.reads[id] || at < progress.reads[id]) progress.reads[id] = at; });
  return added;
}

// ---------- search dropdown (⌘K) ----------
const inp = $('#s'), ac = $('#ac'); let hits = [], sel = 0;
function suggest() {
  const q = inp.value.trim().toLowerCase(); sel = 0; if (!q) { ac.hidden = true; hits = []; return; }
  hits = NODES.map(n => { const a = n.aliases.find(x => x.toLowerCase().includes(q)); const ti = n.title.toLowerCase().includes(q); if (!ti && !a && !n.text.includes(q)) return null; return { n, why: ti ? '標題' : a ? '別名：' + a : '內文', s: ti ? 3 : a ? 2 : 1 }; }).filter(Boolean).sort((a, b) => b.s - a.s).slice(0, 8);
  const xn = NOTES.filter(n => (n.text + n.title).toLowerCase().includes(q)).slice(0, 3);
  ac.innerHTML = (hits.length ? '<div class="grp">概念</div>' + hits.map((h, k) => '<div class="it' + (k === sel ? ' sel' : '') + '" data-act="node" data-id="' + h.n.id + '"><span>' + esc(short(h.n.title)) + ' <small>· ' + esc(topicOf(h.n.id).name) + '</small></span><small>' + esc(h.why) + '</small></div>').join('') : '')
    + (xn.length ? '<div class="grp">經歷筆記</div>' + xn.map(n => '<div class="it" data-act="note" data-file="' + esc(n.file) + '"><span>' + esc(n.title) + '</span><small>' + esc(n.date) + '</small></div>').join('') : '')
    + '<div class="it" data-act="search" data-q="' + esc(q) + '"><span>顯示全部結果</span><small>Enter</small></div>'; ac.hidden = false;
}
inp.oninput = suggest; inp.onfocus = suggest;
inp.onkeydown = e => {
  if (e.key === 'Escape') { ac.hidden = true; inp.blur(); }
  if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, hits.length - 1); suggestSel(); }
  if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, 0); suggestSel(); }
  if (e.key === 'Enter') { const q = inp.value.trim(); ac.hidden = true; if (hits[sel] && e.metaKey === false && hits.length && sel >= 0 && document.activeElement === inp && q) { if (hits.length === 1 || e.shiftKey) show(hits[sel].n.id); else searchPage(q); } }
};
function suggestSel() { ac.querySelectorAll('.it').forEach((d, k) => d.classList.toggle('sel', k === sel)); }
document.addEventListener('keydown', e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); inp.focus(); inp.select(); } });
document.addEventListener('click', e => { if (!e.target.closest('.search')) ac.hidden = true; });

// ---------- actions ----------
document.addEventListener('click', async e => {
  const j = e.target.closest('[data-jump]'); if (j) { const el = document.getElementById(j.dataset.jump); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
  const t = e.target.closest('[data-act]'); if (!t) return; const d = t.dataset, act = d.act;
  if (act === 'new-node' && t.classList.contains('topic-plus')) { e.preventDefault(); e.stopPropagation(); }
  if (act === 'home') return home();
  if (act === 'topic') return topic(d.key);
  if (act === 'domain') return setDomain(d.d);
  if (act === 'node') return show(d.id);
  if (act === 'note') return showNote(d.file);
  if (act === 'notes') return showNotes();
  if (act === 'tag') { inp.value = d.t; ac.hidden = true; return searchPage(d.t); }
  if (act === 'search') { ac.hidden = true; return searchPage(d.q); }
  if (act === 'quiz') return showQuiz(d.id || null);
  if (act === 'quiz-all') return showQuiz(d.id || null, true);
  if (act === 'weak') return showWeak();
  if (act === 'reveal') return reveal(+d.k);
  if (act === 'self') return self(+d.k, d.ok === '1');
  if (act === 'edit-note') return editNote(d.id);
  if (act === 'new-note') return formNote(null);
  if (act === 'edit-log') return formNote(NOTES.find(x => x.file === d.file));
  if (act === 'new-node') return formNodeNew(d.topic);
  if (act === 'add-quiz') return formQuiz(d.id);
  if (act === 'export') { const a = document.createElement('a'); a.href = 'data:application/json,' + encodeURIComponent(JSON.stringify(progress, null, 1)); a.download = 'progress.json'; a.click(); return; }
  if (act === 'import') {
    const f = $('#importFile'); if (!f) return;
    f.onchange = () => {
      const file = f.files[0]; if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const incoming = JSON.parse(reader.result);
          if (!incoming || (typeof incoming !== 'object')) throw new Error('格式不對');
          const added = mergeProgress(incoming);
          save(); toast('已合併，新增 ' + added + ' 筆答題紀錄'); setTimeout(showWeak, 400);
        } catch (err) { toast('匯入失敗：檔案格式不對'); }
      };
      reader.readAsText(file);
    };
    f.click(); return;
  }
  if (act === 'save-note') { if (await post('/note-section', { id: d.id, text: $('#mn').value })) { toast('已儲存'); setTimeout(() => location.reload(), 400); } return; }
  if (act === 'save-log') {
    if (!val('f_title')) return toast('請填標題');
    const selN = [...$('#f_nodes').selectedOptions].map(o => o.value); location.hash = 'notes'; _r = location.hash;
    if (await post('/note', { file: d.file || '', date: val('f_date'), title: val('f_title'), context: val('f_ctx'), summary: val('f_sum'), tags: list('f_tags'), nodes: selN, body: $('#f_body').value })) { toast('已儲存'); setTimeout(() => location.reload(), 400); }
    return;
  }
  if (act === 'save-node') {
    if (!val('f_id') || !val('f_title')) return toast('請填 id 與標題');
    const selR = [...$('#f_rel').selectedOptions].map(o => o.value);
    if (await post('/node', { dir: val('f_dir'), name: val('f_id'), topic: val('f_topic'), title: val('f_title'), summary: val('f_sum'), aliases: list('f_alias'), tags: list('f_tags'), confidence: val('f_conf'), sources: list('f_src'), related: selR, body: $('#f_body').value })) { toast('已建立'); location.hash = 'n/' + val('f_dir') + '/' + val('f_id'); _r = location.hash; setTimeout(() => location.reload(), 400); }
    return;
  }
  if (act === 'save-quiz') {
    const type = val('f_type'); if (!val('f_q')) return toast('請填題目');
    const q = type === 'scenario' ? { type: 'scenario', q: val('f_q'), answer: $('#f_sans').value.trim() } : { type: 'choice', q: val('f_q'), options: $('#f_opts').value.split('\n').map(s => s.trim()).filter(Boolean), answer: (+val('f_ans') || 1) - 1 };
    if (type === 'choice' && q.options.length < 2) return toast('至少兩個選項');
    if (await post('/quiz', { node: d.id, question: q })) { toast('已新增'); setTimeout(() => location.reload(), 400); }
    return;
  }
});

// ---------- route ----------
function route() {
  const h = decodeURIComponent(location.hash.slice(1));
  if (h.startsWith('n/') && byId[h.slice(2)]) return show(h.slice(2));
  if (h.startsWith('t/')) return topic(h.slice(2));
  if (h.startsWith('note/')) return showNote(h.slice(5));
  if (h === 'notes') return showNotes();
  if (h === 'quiz') return showQuiz(null);
  if (h === 'weak') return showWeak();
  home();
}
route(); _r = location.hash;
window.addEventListener('hashchange', () => { if (location.hash === _r) return; _r = location.hash; route(); });
