---
id: rd/backend/rails/validation-context-on-option
title: 驗證情境與 on 選項（Validation Contexts / :on）
aliases: [on create, on update, valid?(context), save context, 自訂驗證情境, custom context, 分步驟表單驗證]
tags: [rails, validation, active-record]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Active Record Validations §3.4 :on, §7.3 Custom Contexts（CC BY-SA 4.0, guides.rubyonrails.org）]
related: [rd/backend/rails/validation-trigger-timing]
summary: :on 選項讓同一組驗證只在 create/update/自訂情境跑，忘記情境涵蓋範圍是漏測熱點。
---
## 定義
`validates` 預設在 `create`/`update` 都執行，可用 `on: :create`/`on: :update` 限定其一；也可自訂情境名（如 `:account_setup`），此時只在明確呼叫 `valid?(:context)`／`save(context:)` 才觸發，一般 `save` 不會跑到。呼叫某情境時，該情境專屬驗證加上無 `on` 的驗證會一起跑，其他情境不跑。

## 原理
常用於多步驟表單或「建立要唯一、修改可重複」這類差異情境，風險在涵蓋範圍容易被誤判——某驗證可能不是所有存檔路徑都會跑。

## QA 視角
- 怎麼測：對每個帶 `on:` 的規則列出哪些操作路徑會觸發，逐一送不合法資料驗證是否被擋、未涵蓋路徑是否放行。
- 常見缺陷：`on: :create` 規則誤以為 `update` 也驗，實測發現能把已存資料改成不合法值；自訂情境只在特定入口呼叫，其他建立入口（後台批次、API 直建）完全沒觸發；多步驟表單最後彙整送出用錯情境，前幾步該擋的反而放行。
