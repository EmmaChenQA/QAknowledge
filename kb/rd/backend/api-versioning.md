---
id: rd/backend/api-versioning
title: API 版本策略（API Versioning）
aliases: [v1 v2, API 版號, semver, 語意化版本, breaking change, 向下相容, API 升版, RPC, REST, gRPC, 遠端呼叫語意差異, 冪等性 API, 服務發現, API 版本相容, 欄位增刪, contract testing, API 向後相容, 服務間呼叫]
tags: [rest-api, versioning, compatibility, contract, api, rpc, rest, network, microservices, integration]
topic: api
confidence: book
updated: 2026-09-15
sources: [REST API Design Guide §五 版本控制, DDIA ch5 §流經服務的資料流：REST 與 RPC, DDIA ch1 §微服務與無伺服器]
related: [rd/backend/api-error-format, rd/backend/schema-forward-backward-compatibility, rd/backend/database-rolling-upgrade-dataflow, rd/backend/system-of-record-vs-derived-data]
summary: API 版本號依語意化版本規則升版；微服務／RPC 呼叫因網路本質（逾時、重試、獨立部署）讓版本相容比想像中更容易破。
---
## 定義
API 版本常放在 URL 路徑（`/v1/products`）或 header。語意化版本：主版號＝破壞性修改、次版號＝向下相容新增、修訂號＝向下相容修正。微服務架構下每個服務有獨立資料庫與 API、可各自升版；RPC 想讓遠端呼叫看起來像本地函式呼叫，但網路請求可能逾時且不知結果，這使版本相容問題更複雜。

## 原理
一般假設「先升級全部伺服器，再升級全部客戶端」，故請求只需向後相容、回應只需向前相容；但跨組織 API 或微服務間呼叫常無法強迫對方同時升級，短時間內新舊版本並存是常態。逾時後不確定請求是否已執行成功，是版本/相容性測試最容易漏掉的分支。REST/gRPC 版本化業界無統一標準。

## QA 視角
- 怎麼測：確認新版上線後舊版端點仍可用且行為不變；比對新舊版同一資源欄位差異，判斷是新增（相容）還是刪除/改型別（破壞性）；用舊版 client 呼叫新版後端（反之亦然），確認相容期不炸；對寫入型端點模擬「請求送達但回應遺失」，重試觀察是否重複扣款/建單；多服務串接功能故意讓某依賴服務回傳舊格式或延遲上線，觀察容錯行為。
- 常見缺陷：次版號升級卻刪除/改名欄位，前端解析崩潰；版本隔離不完整，改新版資料庫欄位波及舊版 API；未指定版本時預設行為隨時間漂移；棄用舊版無緩衝期直接下線；缺乏冪等鍵，逾時重試造成重複扣款/建單；新增必填欄位未給預設值，舊客戶端直接 400；跨服務呼叫失敗無降級，直接讓使用者看到 500；部署順序依賴未文件化，灰度發佈中間態資料錯亂。
