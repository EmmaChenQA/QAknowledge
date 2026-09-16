# 桌面版操作手冊

選單列／系統匣常駐小工具，雙擊啟動後自動跑起 `scripts/serve.js` 並開瀏覽器到固定網址 `http://localhost:4173`。

## 為什麼要有它
- 不用開終端機打指令
- 網址固定，不會因為啟動方式不同而改變（app 明確指定 `PORT`，不受外部環境變數影響）
- 結束時會一併終止 server 子行程，不留殘留

## 重要前提
**app 只是啟動器，不含知識庫內容。** 打包後的 app 內部是唯讀的，`kb/`、`notes/`、`quiz/`、`progress.json` 都必須寫在真正的 repo 上，所以執行的機器上一定要有整個 repo。

知識庫路徑的解析順序（[desktop/main.js](../desktop/main.js)）：
1. 開發模式（未打包）直接用 repo 根目錄
2. 環境變數 `QK_ROOT`
3. 從執行檔位置往上找，最多 8 層，找含 `scripts/serve.js` 的目錄
4. 設定檔裡記住的路徑

解析成功後會寫進 `<userData>/config.json`。因此**首次從 repo 內的 `dist/` 啟動過一次**，之後把 app 移到任何地方都還找得到知識庫。repo clone 到哪個路徑都不影響。

## 狀態與圖示

圖示取自網站 logo 的雙 chevron。選單列是單色、不能用透明度區分前後兩個 chevron，改用間隙分隔。

| 狀態 | 圖示 | 選單首行 | 可用動作 |
|---|---|---|---|
| 啟動中 | 雙 chevron，前方淡化 | `啟動中…` | 動作皆停用 |
| 執行中 | 雙 chevron | `執行中 · localhost:4173` | 開啟知識庫／停止 server |
| 已停止 | 單一 chevron | `已停止` | 啟動 server |
| 失敗 | 驚嘆號三角形 | 具體失敗原因 | 重試／檢視錯誤訊息 |

狀態不只靠顏色或圖示區分，選單第一行永遠有文字說明。

## 關閉行為

| 動作 | 結果 |
|---|---|
| 關掉瀏覽器分頁 | server 繼續跑，圖示留著，可隨時再開 |
| 選單「停止 server」 | server 終止，app 仍常駐 |
| 選單「結束」 | 先終止 server，再關掉 app |
| 登出／關機 | 同上，`before-quit` 會先清子行程 |

答題紀錄是即時寫回 `progress.json`，關閉不會有未儲存問題。

---

## macOS

### 建置
```
npm run desktop:build
```
產出 `dist/mac-arm64/QA Knowledge.app`（約 288 MB）。

### 使用
1. 雙擊 `QA Knowledge.app`
2. 圖示出現在**螢幕最上方選單列**右側
3. 瀏覽器自動開啟 `http://localhost:4173`

app 不會出現在 Dock 與 Cmd+Tab（`app.dock.hide()`，選單列常駐工具的標準做法）。

### 放到「應用程式」資料夾
先從 `dist/mac-arm64/` 執行過一次（讓它記住 repo 位置），再把 `QA Knowledge.app` 拖到「應用程式」資料夾即可。

---

## Windows

### 建置
在 macOS 上即可跨平台編譯，**不需要 wine**：
```
npx electron-builder --win --x64
```
產出 `dist/win-unpacked/`（約 373 MB），執行檔是 `QA Knowledge.exe`。

### 使用
1. 把**整個 repo 資料夾**（含 `dist/win-unpacked/`）複製到 Windows
2. 進入 `dist\win-unpacked\`，雙擊 `QA Knowledge.exe`
3. 圖示出現在**右下角系統匣**，可能被收在「^」展開鈕裡，要手動拖出釘選才會常駐可見
4. 瀏覽器自動開啟 `http://localhost:4173`

Windows 系統匣的圖示是藍底色塊版本，因為純黑圖示在深色工作列會看不見。

### 只複製 win-unpacked 資料夾的情況
首次啟動會找不到知識庫並顯示錯誤，因為還沒記住任何路徑。需設環境變數 `QK_ROOT` 指向 repo 位置，或改成連同整個 repo 一起複製。

### SmartScreen 攔截
未經簽章，首次執行可能被 Windows Defender SmartScreen 擋下，點「其他資訊」→「仍要執行」。

---

## 開發模式

不打包直接跑：
```
npm run desktop
```
此模式下路徑解析直接用 repo 根目錄。

### 除錯時不要碰正式紀錄
與 `serve.js` 同一套隔離規則，另加 `QK_PORT`：
```
QK_PORT=4174 QK_PROGRESS=/tmp/qk-test-progress.json QK_BACKUP_DIR=/tmp/qk-test-backups npm run desktop
```

## 圖示重新產生

圖示由 [desktop/gen-icons.js](../desktop/gen-icons.js) 以純 Node 產生（無相依套件），來源是 [scripts/build.js](../scripts/build.js) 裡的網站 logo 座標。logo 改了就重跑：
```
node desktop/gen-icons.js
```
會重新產生 `desktop/icons/`（選單列各狀態，含 @2x 與 Windows 色塊版）與 `build/icon.png`（app 圖示，512px）。

## 環境變數

| 變數 | 用途 | 預設 |
|---|---|---|
| `QK_ROOT` | 知識庫 repo 路徑 | 見上方解析順序 |
| `QK_PORT` | server port | `4173` |
| `QK_PROGRESS` | 答題紀錄檔 | `<repo>/progress.json` |
| `QK_BACKUP_DIR` | 每日備份目錄 | `<repo>/../qa-knowledge-backups` |
