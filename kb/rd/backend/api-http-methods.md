---
id: rd/backend/api-http-methods
title: HTTP 方法語意與冪等性（HTTP Methods & Idempotency）
aliases: [GET POST PUT PATCH DELETE, 動詞誤用, RESTful 方法, 方法覆蓋, X-HTTP-Method-Override, CRUD 對應, verb tunneling]
tags: [rest-api, http, idempotency, contract]
topic: api
confidence: book
updated: 2026-09-15
sources: [REST API Design Guide §2.2 動詞+宾语, §2.3 動詞的覆盖]
related: [rd/backend/idempotency, rd/backend/api-status-codes, rd/backend/api-pagination-filtering-sorting]
summary: 各 HTTP 方法有固定語意與冪等承諾；RD 用錯方法或用 POST 做查詢會讓客戶端重試策略失效。
---
## 定義
GET 檢索、POST 建立（或觸發非建立型動作）、PUT 整體建立/替換、PATCH 部分更新、DELETE 刪除。規範上 GET/PUT/DELETE 須為冪等（同請求重送多次結果等同一次），POST/PATCH 不保證冪等。客戶端只能用 GET/POST 時，用 `X-HTTP-Method-Override` header 讓伺服器把 POST 當 PUT/PATCH/DELETE 處理。

## 原理
冪等性是網路重試機制的基礎：斷線重送 GET/PUT/DELETE 對伺服器狀態安全，重送 POST 不安全（可能重複建立）。方法選用錯誤（如用 GET 做刪除、用 POST 做查詢）會讓瀏覽器快取、CDN、重試邏輯與這份契約假設對不上。

## QA 視角
- 怎麼測：對同一 PUT/DELETE 連續打兩次，確認第二次結果與第一次一致（非疊加）；檢查是否有「用 GET 觸發副作用」的端點（如 `GET /logout` 卻登出帳號，會被爬蟲/預取意外觸發）；確認 POST 建立類端點沒有被誤標可重試。
- 常見缺陷：GET 端點帶副作用（狀態被瀏覽器預抓取或防毒掃描器觸發而意外變更）；PUT 實作成只新增不覆蓋（違反冪等承諾，重送兩次資料變兩份）；用 POST 做查詢導致無法被快取、無法被瀏覽器上一頁還原；`X-HTTP-Method-Override` 未驗證來源導致方法覆蓋被濫用繞過前端限制。
