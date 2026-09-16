# qa-knowledge

本地 QA / RD 知識庫。`kb/` 為唯一資料源；`kb/INDEX.md` 與 `site/index.html` 皆為建站產物。

## 使用
- 建站：`node scripts/build.js`（產 `kb/INDEX.md` + `site/index.html`）
- 閱讀＋答題：`node scripts/serve.js` → http://localhost:4173（答題自動寫回 `progress.json`）
- 桌面版（選單列／系統匣常駐，雙擊即啟動 server 並開瀏覽器）：見 [docs/DESKTOP_APP.md](docs/DESKTOP_APP.md)
- 測試／除錯時**不要碰正式紀錄**：`PORT=4174 QK_PROGRESS=/tmp/qk-test-progress.json node scripts/serve.js`，讀寫都走指定的另一份檔案（2026-09-15 事故後新增：AI 驗證一律走此模式，禁止對 `progress.json` 執行刪除）
- **改完 app.js／build.js／style.css 後、commit 前先跑迴歸測試**：`node scripts/smoketest.js`（或 `npm test`）。全程用隔離的 port 與暫存 progress.json，跑完自動清除，不會碰真實紀錄。涵蓋靜態掃描（防 href="#" 撞路由這類結構性錯誤）與動態流程（每個路由能開、表單欄位該連動的有連動、答題／重練/匯入匯出行為正確）。新功能有這類「兩個元件該同步卻各自預設」的風險時，順手加一條進去，不要只靠手動點一次。
- **每日自動備份**：`serve.js` 啟動時、以及每天第一次寫入 `/progress` 前，會把當下內容存一份到 repo 外的 `../qa-knowledge-backups/progress-YYYY-MM-DD.json`（同一天只存一次，存的是「當天變動前」的狀態），只保留最近 30 天，超過自動刪除。測試時可用 `QK_BACKUP_DIR` 另指路徑，避免污染真實備份。
- 直接開 `site/index.html` 也可，但答題只存瀏覽器 localStorage，需手動「匯出」覆蓋 `progress.json`

## 主題
- 9 個主題定義在 `kb/_topics.json`（key / name / desc / order）；`order` 是學習順序，側欄與上下一篇依此排
- 每個節點 frontmatter 有 `topic` 欄對應 key；未列在 order 的同 topic 節點自動補到該主題末尾
- 改主題歸屬：改節點的 `topic` 欄；改順序或新增主題：改 `kb/_topics.json`

## 節點規則
- 格式：`kb/_TEMPLATE.md`，`id` 與路徑一致
- **粒度**：一個可獨立測試的概念，100–600 字，超過就拆
- **邊界**：`kb/` 只放跨專案成立的內容（原理、通用測法、常見缺陷）；專案細節只能在「專案對應」段以「日期 + 指向」形式存在，不寫本體
- **信心**：`confidence: book`（書本全文）`| author-material`（作者本人公開發表資料，如 CC-BY 課程投影片/cheat sheet，非該書全文）`| verified`（實測過）`| inferred`（推論）；「專案對應」每條必帶日期，過期即刪或更新
- **來源語言**：`source_lang: en` 表示正文由英文原文改寫翻譯而成；來源本來就是中文（如 DDIA 繁中譯本、簡體中文原文）則不寫此欄，預設視為中文來源
- **aliases**：同義詞、口語、英文全列，AI 靠 INDEX.md 比對這欄找節點
- **出處**：`sources/` 的原書 PDF 不進 git，頁碼出處僅供本機回查

## 筆記（兩層）
- 節點補充：節點 md 末尾 `## 我的筆記` 段，放跨產業成立的理解與疑問。重拆節點時此段保留不覆蓋
- 經歷日誌：`notes/<日期>-<標題>.md`，frontmatter 帶 `context`（產品／產業）與 `nodes`（關聯節點），格式見 `notes/_TEMPLATE.md`
- 經歷日誌綁定特定情境，換產品或產業前先確認是否仍適用

## 網頁導覽
- 首頁：已讀進度、今日到期考題、弱點前三、主題卡（含進度）
- 側欄：依主題摺疊，當前主題自動展開；節點前的點代表未讀／已讀／全對／有錯題，底部有圖例
- 已讀判定：開啟節點並停留 2.5 秒自動記錄，存在 `progress.json` 的 `reads`；進度條算已讀，卡片另標已答
- 節點頁：頂部步進條顯示在本主題的第幾個，右側本頁目錄，底部上下一篇
- 搜尋：⌘K 聚焦，下拉標示命中的是標題／別名／內文，Enter 看全部結果

## 網頁可寫入（需用 serve.js 開啟）
- 編輯節點的「我的筆記」段、新增與編輯經歷日誌、新增節點（預設 `confidence: inferred`）、新增考題
- 寫回後自動重建，重新整理即生效
- 刪除節點／筆記、改 id、改既有節點正文一律直接改 md，網頁不提供

## 待補來源
- Vue：現有筆記只到響應式系統。渲染器／diff／key、元件生命週期、nextTick 待更完整來源，屆時走合併不重建

## 考題
- `quiz/<id>.json`，`type: choice`（單選，`answer` 為索引）或 `type: scenario`（情境題，`answer` 為參考要點，作答後自評）
- 間隔重複：答對後 3 → 7 → 21 天再出；答錯隔天重出
