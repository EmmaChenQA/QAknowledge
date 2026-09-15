---
id: rd/backend/api-error-format
title: 錯誤回應格式規範（Error Response Format）
aliases: [錯誤訊息格式, error body, 統一錯誤格式, detail 欄位, 錯誤包200, 不要回200裝錯誤]
tags: [rest-api, error-handling, contract, json]
topic: api
confidence: book
updated: 2026-09-15
sources: [REST API Design Guide §4.1 不要返回纯本文, §4.2 发生错误时不要返回200状态码]
related: [rd/backend/api-status-codes]
summary: 錯誤回應應為結構化 JSON（狀態碼＋error/detail 欄位），不得用 200 包裝錯誤或回傳純文字。
---
## 定義
回應一律為 `application/json`（非純文字），狀態碼本身即反映成功或失敗，錯誤細節放在 body（如 `{"error": "...", "detail": {...}}`），不應在 2xx 狀態碼下用 body 內欄位（如 `status: failure`）另行宣告失敗。

## QA 視角
- 怎麼測：故意送壞資料（缺必填、型別錯、超長欄位），確認狀態碼本身已反映失敗（4xx），而非 200 + body 內宣告失敗；檢查錯誤 body 是否為固定結構（欄位名稱、巢狀層級一致），跨端點抽測是否一致；檢查回應 Content-Type 是否確實為 application/json。
- 常見缺陷：狀態碼 200 但 body 寫 `success: false`，導致只判斷狀態碼的監控/自動化測試誤判為通過（最典型的漏測型態，錯誤碼類 TC 必須讀 body 而非只驗 status）；不同端點的錯誤格式不一致（有的用 `error`，有的用 `message`，有的用 `errors: []`），前端統一錯誤處理失效；錯誤 body 洩漏內部資訊（DB 錯誤堆疊、內部服務名稱、SQL 片段），屬資安候選，QA 測負向案例時應固定檢查 body 原文而非只看 status。
