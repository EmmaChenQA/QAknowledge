---
id: rd/backend/rails/dependent-delete-modes
title: 關聯刪除行為（:dependent 選項）
aliases: [dependent destroy, dependent nullify, dependent delete, cascade delete, 級聯刪除, 關聯物件刪除, destroy_async, restrict_with_exception]
tags: [rails, delete, associations, data-integrity]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Active Record Associations §8.1.2 :dependent (CC BY-SA 4.0, guides.rubyonrails.org)]
related: [rd/backend/rails/dependent-gotchas, rd/backend/rails/counter-cache-staleness]
summary: :dependent 決定刪除主記錄後關聯資料被砍/清空/擋下，六種模式結果不同，須逐一實測。
---
## 定義
belongs_to／has_many／has_one 的 :dependent 選項，決定刪除擁有者記錄時關聯記錄要被刪除、清空還是擋下。

## 原理
:destroy 逐筆呼叫並觸發 callback，較慢但保留清理邏輯；:delete/:delete_all 直接 DELETE，跳過 callback 較快但可能漏清理；:destroy_async 背景非同步刪除，不應搭配 DB 外鍵約束；:nullify 只把外鍵設 NULL，記錄不刪也不觸發 callback；:restrict_with_exception 有關聯記錄拋例外阻擋；:restrict_with_error 改加驗證錯誤阻擋，不拋例外。

## QA 視角
- 怎麼測：各模式建關聯資料後刪主記錄，查 DB 確認記錄被刪、外鍵變 NULL，或刪除被擋下。
- 常見缺陷：:delete 誤以為會跑 callback；:nullify 用在 NOT NULL 外鍵欄位噴未攔截例外；:restrict_with_error 未拋例外被誤判刪除成功，要查 errors。
