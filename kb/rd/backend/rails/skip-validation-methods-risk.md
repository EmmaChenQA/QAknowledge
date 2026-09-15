---
id: rd/backend/rails/skip-validation-methods-risk
title: 繞過驗證的方法與風險（Skipping Validations）
aliases: [update_column, update_all, insert_all, toggle!, increment!, save(validate:false), 繞過驗證, 跳過驗證]
tags: [rails, validation, active-record, data-integrity]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Active Record Validations §1.4 Skipping Validations（CC BY-SA 4.0, guides.rubyonrails.org）]
related: [rd/backend/rails/validation-trigger-timing, rd/backend/untrusted-input-validation-boundary]
summary: update_column、update_all、insert_all、toggle!、increment! 等方法會直接寫資料庫、跳過驗證。
---
## 定義
Rails 有一批「直接改資料庫、不跑驗證」的方法：`update_column(s)`、`update_all`、`update_counters`、`increment!`、`toggle!`、`touch`、`insert(_all)`、`upsert(_all)`，以及 `save(validate: false)`。呼叫它們無視物件是否合法，一律寫入。

## 原理
這批方法多為效能或特定語意（如計數器遞增）而設計，直接下 SQL，不經驗證流程。開發常在批次更新、後台快速改資料時圖方便選用，等於資料庫可能存在「正常流程建立時本該被擋下」的不合法資料。

## QA 視角
- 怎麼測：查明「更新」實作是否走這批方法，若是，對該欄位刻意寫入正常驗證會擋下的值，確認是否仍寫入成功。
- 常見缺陷：批次腳本用 `update_column` 繞過驗證，單筆修改能寫入不合法值但正常表單會被擋，行為不一致；`increment!`/`toggle!` 改狀態欄位繞過自訂狀態機驗證，產生不合法轉移；`save(validate: false)` 留在正式程式碼未移除。
