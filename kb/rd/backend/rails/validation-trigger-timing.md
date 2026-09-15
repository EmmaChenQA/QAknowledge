---
id: rd/backend/rails/validation-trigger-timing
title: 驗證觸發時機（Validation Triggers）
aliases: [驗證何時執行, save 才驗證, valid?, new 不觸發驗證, create vs new, 何時跑驗證]
tags: [rails, validation, active-record, api]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Active Record Validations §1.3 Validation Triggers, §1.5 Checking Validity（CC BY-SA 4.0, guides.rubyonrails.org）]
related: [rd/backend/untrusted-input-validation-boundary, rd/backend/api-error-format]
summary: 驗證只在 save/create/update 等方法呼叫時執行，new 出來的物件不會自動驗證。
---
## 定義
`validates` 規則只在呼叫 `create`、`save`、`update`（含 bang 版本）時自動觸發；單純 `new` 或賦值不會跑驗證，需主動呼叫 `valid?`/`invalid?` 才會填入 errors。

## 原理
存檔方法會先跑完全部驗證，errors 非空就中止、不送 SQL。資料庫不保證規則生效，是否真的擋下取決於程式碼有沒有走到這幾個方法。

## QA 視角
- 怎麼測：只 `new` 不存檔時確認 errors 為空；分別對 `create`／`update` 送同組不合法資料，確認兩條路徑都被擋下，不只測一種。
- 常見缺陷：賦值後未呼叫 `save` 就當資料已更新；背景 job 直接組 SQL 寫入繞過 `create`/`save`；只測 `create` 就收工，未測 `update`（可能設了 `on: :create` 而放過，見 `validation-context-on-option`）。
