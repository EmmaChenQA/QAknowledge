#!/usr/bin/env node
// 迴歸測試：每次改 app.js/build.js/style.css 後、commit 前跑一次。
// node scripts/smoketest.js
//
// 完全隔離：自己的 port、自己的 progress.json、自己的備份目錄，跑完自動清除，
// 絕不會碰到真實的 progress.json（2026-09-15 事故後訂的鐵律）。
//
// 涵蓋兩類檢查：
//   A. 靜態掃描（不用開瀏覽器）：抓「結構上就會出錯」的寫法，例如 href="#" 撞到
//      hash 路由（2026-09-16 實際踩過：字母跳轉列用 href="#idx-A"，點下去被
//      SPA 路由誤判成未知頁面，整頁被清空）。
//   B. 動態檢查（開無頭瀏覽器）：每個路由都能正常渲染、表單欄位彼此該連動的有
//      連動、核心互動流程（答題／重練／匯入匯出）真的會寫入預期的資料。

const { chromium } = require('playwright');
const http = require('http');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { spawn, execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
let failed = 0, passed = 0;
function ok(name, cond, detail) {
  if (cond) { passed++; console.log('  ✓', name); }
  else { failed++; console.log('  ✗', name, detail !== undefined ? '| ' + JSON.stringify(detail) : ''); }
}
function section(t) { console.log('\n== ' + t + ' =='); }

// ---------- A. 靜態掃描 ----------
function staticChecks() {
  section('A. 靜態掃描');
  const app = fs.readFileSync(path.join(ROOT, 'scripts/app.js'), 'utf8');
  const build = fs.readFileSync(path.join(ROOT, 'scripts/build.js'), 'utf8');

  // A1：href="#xxx"（非純 "#"）一律禁止，因為會被 hashchange 路由攔截、清空頁面。
  // 動態跳轉一律要用既有的 data-jump 機制。
  const badHrefs = [...(app + build).matchAll(/href="#[^"]+"/g)].map(m => m[0]);
  ok('無 href="#非空字串"（避免撞 hashchange 路由，全部改用 data-jump）', badHrefs.length === 0, badHrefs);

  // A2：route() 涵蓋所有「會被 location.hash 設定」的頁面
  const routeFn = (app.match(/function route\(\) \{[\s\S]*?\n\}/) || [''])[0];
  const hashSetters = [...app.matchAll(/location\.hash = (?:'([\w-]+)'|(\w+) \? '([\w-]+)' : '([\w-]+)')/g)]
    .flatMap(m => [m[1], m[3], m[4]].filter(Boolean))
    .filter(h => !['n/', 't/', 'note/', 'edit/'].some(p => h.startsWith(p)))
    .filter((v, i, a) => a.indexOf(v) === i);
  const uncovered = hashSetters.filter(h => !routeFn.includes(`'${h}'`));
  ok('route() 涵蓋每個會被設定的固定 hash（' + hashSetters.join(', ') + '）', uncovered.length === 0, uncovered);

  // A3：語法檢查
  try { execFileSync(process.execPath, ['--check', path.join(ROOT, 'scripts/app.js')] ); ok('app.js 語法正確', true); }
  catch (e) { ok('app.js 語法正確', false, e.message.slice(0, 200)); }
  try { execFileSync(process.execPath, ['--check', path.join(ROOT, 'scripts/build.js')]); ok('build.js 語法正確', true); }
  catch (e) { ok('build.js 語法正確', false, e.message.slice(0, 200)); }
  try { execFileSync(process.execPath, ['--check', path.join(ROOT, 'scripts/serve.js')]); ok('serve.js 語法正確', true); }
  catch (e) { ok('serve.js 語法正確', false, e.message.slice(0, 200)); }
}

// ---------- 隔離環境 ----------
function freeTmp(name) { return path.join(os.tmpdir(), 'qk-smoketest-' + process.pid + '-' + name); }

async function main() {
  staticChecks();

  const PORT = 14000 + (process.pid % 4000);
  const PROGRESS = freeTmp('progress.json');
  const BACKUP_DIR = freeTmp('backups');
  execFileSync(process.execPath, [path.join(ROOT, 'scripts/build.js')], { cwd: ROOT });

  const srv = spawn(process.execPath, [path.join(ROOT, 'scripts/serve.js')], {
    cwd: ROOT, env: Object.assign({}, process.env, { PORT: String(PORT), QK_PROGRESS: PROGRESS, QK_BACKUP_DIR: BACKUP_DIR }),
    stdio: 'pipe'
  });
  await new Promise(res => srv.stdout.once('data', res));
  const BASE = 'http://localhost:' + PORT;

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));

  section('B. 每個路由都能渲染');
  const routes = ['', '#quiz', '#weak', '#notes', '#index', '#new-node', '#new-note'];
  for (const r of routes) {
    await page.goto(BASE + '/' + r); await page.waitForTimeout(400);
    const h1 = await page.locator('h1').first().textContent().catch(() => null);
    ok('路由 ' + JSON.stringify(r || '(首頁)') + ' 有渲染出 h1', !!h1 && h1.trim().length > 0, h1);
  }
  // 直接開一個真實節點與主題
  // 選一個「自己的題庫同時有選擇題與情境題」的節點，後面才不會抽樣不到情境題（曾經因此測試不穩定）
  const sample = await page.evaluate(() => {
    const q = window.DATA.quizzes.find(x => x.questions.some(y => y.type === 'choice') && x.questions.some(y => y.type === 'scenario'));
    return q.node;
  });
  await page.goto(BASE + '/#n/' + sample); await page.waitForTimeout(400);
  ok('節點頁可直接開啟（reload 情境）', (await page.locator('h1').textContent()).length > 0);
  const sampleTopic = await page.evaluate(() => window.DATA.topics[0].key);
  await page.goto(BASE + '/#t/' + sampleTopic); await page.waitForTimeout(400);
  ok('主題頁可直接開啟（reload 情境）', (await page.locator('h1').textContent()).length > 0);

  section('B. 表單頁 reload 不掉回首頁（2026-09-16 曾經壞過）');
  await page.goto(BASE + '/#new-node'); await page.reload(); await page.waitForTimeout(400);
  ok('#new-node reload 後仍是表單', (await page.textContent('h1')) === '新增節點');
  await page.goto(BASE + '/#new-note'); await page.reload(); await page.waitForTimeout(400);
  ok('#new-note reload 後仍是表單', (await page.textContent('h1')) === '新增實務筆記');

  section('B. 新增節點表單：主題／目錄必須連動（2026-09-16 曾經對不上）');
  await page.goto(BASE + '/#new-node'); await page.waitForTimeout(400);
  const pairs = await page.evaluate(() => {
    const sel = document.querySelector('#f_topic'); const out = [];
    for (const opt of sel.options) { sel.value = opt.value; sel.dispatchEvent(new Event('change')); out.push([opt.value, document.querySelector('#f_dir').value]); }
    return out;
  });
  const known = { rails: 'rd/backend/rails', vue: 'rd/frontend' };
  let mismatch = [];
  pairs.forEach(([topic, dir]) => { if (known[topic] && known[topic] !== dir) mismatch.push([topic, dir, known[topic]]); if (dir === '') mismatch.push([topic, '(空)']); });
  ok('每個主題選項都能帶出對應目錄，且已知案例正確', mismatch.length === 0, mismatch);

  section('B. 索引頁字母跳轉不會清空頁面');
  await page.goto(BASE + '/#index'); await page.waitForTimeout(500);
  const azCount = await page.locator('.idx-az a').count();
  if (azCount > 0) {
    await page.click('.idx-az a >> nth=3'); await page.waitForTimeout(600);
    ok('點字母跳轉後仍在索引頁', (await page.textContent('h1')) === '關鍵字索引');
  } else ok('索引頁有字母跳轉列可測', false);
  await page.fill('#idxFilter', 'idempot'); await page.waitForTimeout(300);
  const rowsAfterFilter = await page.locator('.idx-row').count();
  ok('索引即時篩選會縮小結果', rowsAfterFilter > 0 && rowsAfterFilter < 50, rowsAfterFilter);

  section('B. 知識檢測：答錯 → 弱點頁出現重練入口 → 重練答對 → 消失');
  await page.goto(BASE + '/#n/' + sample); await page.waitForTimeout(400);
  await page.click('[data-act=quiz]'); await page.waitForTimeout(400);
  const cInfo = await page.evaluate(() => { const i = window._pool.findIndex(x => x.type === 'choice'); return i < 0 ? null : { i, answer: window._pool[i].answer }; });
  ok('本節點題庫可找到選擇題可測重練流程', !!cInfo, cInfo);
  if (cInfo) {
    const wrongI = cInfo.answer === 0 ? 1 : 0;
    await page.locator('#q' + cInfo.i + ' input[type=radio]').nth(wrongI).check();
    await page.locator('#q' + cInfo.i + ' button.submit').click(); await page.waitForTimeout(300);
    await page.goto(BASE + '/#weak'); await page.waitForTimeout(400);
    const hasRetry = await page.locator('button', { hasText: '重練全部錯題' }).count();
    ok('答錯後弱點頁出現「重練全部錯題」', hasRetry === 1);
    if (hasRetry) {
      await page.locator('button', { hasText: '重練全部錯題' }).click(); await page.waitForTimeout(400);
      ok('重練頁標題正確', (await page.textContent('h1')) === '重練錯題');
      const info = await page.evaluate(() => window._pool.map(x => x.answer));
      for (let k = 0; k < info.length; k++) { await page.locator('#q' + k + ' input[type=radio]').nth(info[k]).check(); await page.locator('#q' + k + ' button.submit').click(); }
      await page.waitForTimeout(300);
      await page.goto(BASE + '/#weak'); await page.waitForTimeout(400);
      ok('全部答對後「重練全部錯題」按鈕消失', (await page.locator('button', { hasText: '重練全部錯題' }).count()) === 0);
    }
  }

  section('B. 選擇題要按提交才算數（不是選了就送出）');
  await page.goto(BASE + '/#n/' + sample); await page.waitForTimeout(400);
  await page.click('[data-act=quiz]'); await page.waitForTimeout(400);
  const c2 = await page.evaluate(() => { const i = window._pool.findIndex(x => x.type === 'choice'); return i < 0 ? null : { i, answer: window._pool[i].answer }; });
  if (c2) {
    const submitBtn = page.locator('#q' + c2.i + ' button.submit');
    ok('提交按鈕預設是 disabled（還沒選任何選項）', await submitBtn.isDisabled());
    await page.locator('#q' + c2.i + ' input[type=radio]').first().check(); await page.waitForTimeout(100);
    ok('選了選項後尚未出現判定結果（還沒按提交）', (await page.locator('#q' + c2.i + ' .r').textContent()).trim() === '');
    ok('選了選項後提交按鈕變成可按', await submitBtn.isEnabled());
    await page.locator('#q' + c2.i + ' input[type=radio]').nth(c2.answer).check(); // 改選正解
    await submitBtn.click(); await page.waitForTimeout(200);
    ok('按提交後才出現判定結果', (await page.locator('#q' + c2.i + ' .r').textContent()).includes('正確'));
  } else ok('本節點題庫可找到選擇題測「先選再提交」流程', false);

  section('B. 情境題只保留最近一次作答');
  await page.goto(BASE + '/#n/' + sample); await page.waitForTimeout(400);
  await page.click('[data-act=quiz]'); await page.waitForTimeout(400);
  const sIdx = await page.evaluate(() => window._pool.findIndex(q => q.type === 'scenario'));
  ok('本題庫抽到情境題可測（固定選有情境題的節點，不應不穩定）', sIdx >= 0, sIdx);
  if (sIdx >= 0) {
    for (const [text, correct] of [['第一次作答', '0'], ['第二次作答，應該覆蓋第一次', '1']]) {
      await page.locator('#q' + sIdx + ' textarea').fill(text);
      await page.locator('#q' + sIdx + ' [data-act=reveal]').click(); await page.waitForTimeout(150);
      await page.locator('#q' + sIdx + ' [data-act=self][data-ok="' + correct + '"]').click(); await page.waitForTimeout(200);
    }
    const textEntries = await page.evaluate(() => progress.answers.filter(a => a.text));
    ok('情境題只留 1 筆帶文字的紀錄（不累積）', textEntries.length === 1, textEntries.length);
    ok('留下的是最後一次的內容', textEntries[0] && textEntries[0].text === '第二次作答，應該覆蓋第一次', textEntries[0] && textEntries[0].text);
  }

  section('B. 匯出／匯入合併不重複');
  const before = await page.evaluate(() => JSON.stringify(progress));
  const added1 = await page.evaluate(p => mergeProgress(JSON.parse(p)), before);
  ok('重複匯入相同內容不新增筆數', added1 === 0, added1);

  ok('全程無 console error', errs.length === 0, errs);

  await browser.close();
  srv.kill();
  [PROGRESS, BACKUP_DIR].forEach(p => { try { fs.rmSync(p, { recursive: true, force: true }); } catch (e) {} });

  console.log('\n' + '='.repeat(40));
  console.log(failed === 0 ? `✅ 全部通過（${passed} 項）` : `❌ ${failed} 項失敗，${passed} 項通過`);
  process.exit(failed === 0 ? 0 : 1);
}

main().catch(e => { console.error('smoketest 執行本身出錯:', e); process.exit(1); });
