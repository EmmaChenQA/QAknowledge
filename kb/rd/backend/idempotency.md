---
id: rd/backend/idempotency
title: 冪等性（Idempotency）
aliases: [重複扣款, 重複入帳, 重送, 防重, idempotent, idempotency key]
tags: [api, 支付, 重試, 併發]
topic: tx
confidence: book
updated: 2026-09-15
sources: [DDIA ch.11, https://stripe.com/docs/api/idempotent_requests]
related: [rd/backend/transaction-acid, rd/backend/lost-update, rd/backend/api-http-methods]
summary: 同一請求執行多次結果應與一次相同；測法是同 key 重送與併發後看回讀值。
---
## 定義
同一請求執行一次與執行多次，對系統狀態的影響相同。

## 原理
- 用戶端帶 idempotency key，伺服端以 key 查快取或唯一索引，命中則回傳首次結果。
- 常與 DB 唯一約束、樂觀鎖或分散式鎖搭配。
- HTTP 語意：GET/PUT/DELETE 應冪等，POST 預設不冪等。

## QA 視角
- 怎麼測：同 key 連打兩次、網路逾時後重送、併發兩支同 key 同時送。
- 斷言看回讀值（餘額、筆數），不看 2xx。
- 常見缺陷：key 只擋順序重送不擋併發；key 過期後重送重複入帳；錯誤回應也被快取。

## 專案對應
- [2026-09-15] QA_AI_BOT → 出金／存款單建立、優惠券領取；技法見 `docs/harness/TEST_DESIGN.md §6`
