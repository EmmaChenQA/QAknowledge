---
id: qa/exploratory/api-test-mnemonics-binmen-poised-vader
title: API 測試記憶口訣三組（BINMEN／POISED／VADER）
aliases: [API testing checklist, BINMEN, POISED, VADER, API 測試框架, API 測試涵蓋面, api testing mnemonics, API 驗收清單]
tags: [api-testing, test-design, checklist, mnemonic]
topic: qa-exploratory
confidence: author-material
updated: 2026-09-15
sources: [Test Heuristics Cheat Sheet p3（CC BY-SA 4.0，原創者 Gwen Diagram／Ash Winter、Amber Race、Stuart Ashman，經 Ministry of Testing 彙整）]
source_lang: en
related: [rd/backend/api-status-codes, rd/backend/api-error-format, rd/backend/api-auth-error-401-403]
summary: 三組英文縮寫口訣，快速掃描 API 測試該涵蓋的面向，避免只測正常路徑
---
## 定義
BINMEN、POISED、VADER 是三組英文字母縮寫記憶口訣，各自代表一組 API 測試時要逐項檢查的面向，用來避免只測「正常路徑回 200」就結案，屬於規劃 API 測試案例時的快速檢查清單，而不是測試技法本身。

## 原理
BINMEN（Gwen Diagram／Ash Winter）代表 Boundary（邊界值）、Invalid Entries（無效輸入）、NULL（空值／缺欄位）、Method（HTTP 方法是否正確處理，例如對唯讀端點送 POST）、Empty（空集合／空陣列／空字串回應）、Negative（負數或反向情境），適合作為單一端點輸入驗證的快速掃描表。POISED（Amber Race）代表 Parameters（參數組合，含必填／選填／多餘參數）、Output（回應內容格式與欄位是否符合契約）、Interop（與上下游系統或第三方 API 的互通性）、Security（授權／認證／資料外洩）、Errors（錯誤情境與錯誤格式一致性）、Data（資料正確性與完整性），涵蓋面比 BINMEN 更廣，適合作整支 API 的驗收清單。VADER（Stuart Ashman）代表 Verbs（HTTP 動詞語意是否正確，例如 GET 不該有副作用、DELETE 是否真的刪除）、Authorisation/Authentication（授權與驗證，含越權存取他人資源）、Data（請求與回應資料的正確性）、Errors（錯誤碼與錯誤訊息是否一致且不洩漏內部資訊）、Responsiveness（回應時間是否在可接受範圍），比較聚焦在 REST 語意正確性與資安面。三組口訣互有重疊（都涵蓋 Data 與 Errors），實務上可依測試對象選一組當主軸，另外兩組拿來補漏。

## QA 視角
- 怎麼測：規劃一支新 API 端點的測試案例時，先用 POISED 六個字母各寫一行「本端點在這個面向要測什麼」，再用 BINMEN 展開 Parameters 這一項的具體輸入值（邊界、無效、空值、負數），最後用 VADER 的 Authorisation 項目補一條「用別人的 ID／token 呼叫本端點會不會拿到不該拿到的資料」的越權測試。
- 常見缺陷：只驗證 2xx 成功路徑，沒測不同錯誤碼下的 body 格式是否一致（同一支 API 對不同錯誤原因回傳結構不同，前端無法統一解析）；GET 端點被實作成有副作用（例如呼叫一次就增加計數），違反 Verbs 語意；錯誤訊息直接把資料庫例外堆疊或內部服務名稱吐回前端，屬於 Errors 與 Security 同時中招；換一組使用者 ID 呼叫同一端點就能讀到別人的資料，屬於 Authorisation 缺陷，但因為正常帳號測試路徑完全正常而被漏掉。
