---
name: qa-knowledge
description: 本地 QA / RD 知識庫路由。做測試設計、判斷 RD 行為是否合理、寫 AC/TC、分析缺陷根因、或碰到不熟的後端／前端／部署概念時，先查 kb/ 對應節點再動手。
---

# qa-knowledge

資料源：`~/Documents/qa-knowledge/kb/**/*.md`（每概念一檔，frontmatter 有 id/tags/related）。
網頁：`site/index.html`（給人看；AI 直接讀 md，不經網頁）。

## Recall-first 紀律

1. 任務命中下表 → 先讀 `kb/INDEX.md`（每節點一行：id / aliases / confidence / summary），比對 aliases 挑節點，再只讀命中的原檔；不整目錄載入、不靠 grep 猜詞。
   - `confidence: inferred` 的內容只當假說；「專案對應」段的日期距今 >90 天先驗證再用。
2. 節點有「專案對應」段 → 優先照其指向的專案 KB 段落。
2b. 節點的 `## 我的筆記` 段是使用者親寫，與正文同等可信，優先於書上原理。
2d. `confidence: author-material` 表示來源是作者本人公開發表的資料（如 CC-BY 課程投影片），不是該概念關聯書籍的全文——可信度介於 book 與 inferred 之間，視同 book 使用即可。
2c. `notes/` 經歷日誌只當參考：讀時一併看 `context` 欄，與當前專案產業不同時不得當結論，需重新驗證。INDEX.md 下半段列出全部日誌。
3. 查無節點且該概念在任務中反覆出現 → 任務結束後提議新增節點（用 `kb/_TEMPLATE.md`），不得未經同意直接寫。

## 主題（`kb/_topics.json`）

INDEX.md 的 topic 欄對應下列 key，可先用主題縮小範圍再比對 aliases：
tx 交易與隔離級別｜rep 複製與一致性｜dist 分散式系統的麻煩｜api API 契約與相容｜stream 批次串流與訊息｜model 資料模型與儲存｜perf 效能可靠性與 SLO｜e2e 端到端完整性｜vue 前端響應式

## 路由表

| 任務情境 | 查哪裡 |
|---|---|
| 支付 / 出金 / 重試 / 併發扣減 | `kb/rd/backend/`（idempotency, transaction, lock）|
| API 錯誤碼、契約、回讀值 | `kb/rd/backend/api-*` |
| 前台畫面異常、狀態不同步、快取 | `kb/rd/frontend/` |
| 部署後行為不一致、環境差異、log 判讀 | `kb/rd/devops/` |
| 寫 TC、選測試技法、拆 AC | `kb/qa/test-design-*` |
| 判 bug 根因、pre-existing vs regression | `kb/qa/defect-analysis` + `kb/rd/` 對應概念 |
| 探索式測試、測試展開 | `kb/qa/exploratory-*` |

## 新增節點流程（拆書）

1. 原書 PDF 放 `sources/`（gitignore，不進 git）。
2. OCR 後只擷取重點改寫成節點，原文不入 `kb/`，只留頁碼出處。
3. 每節點配 `quiz/<id>.json` 3–5 題（考題給人練，不給 AI）。
4. `node scripts/build.js` 重建網頁。
