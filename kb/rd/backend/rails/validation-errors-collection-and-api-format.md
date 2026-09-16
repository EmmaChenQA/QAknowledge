---
id: rd/backend/rails/validation-errors-collection-and-api-format
title: 驗證錯誤集合的結構與 API 格式（errors collection）
aliases: [errors.full_messages, errors.where, error type, error details, 多筆驗證錯誤, full_message, errors[:base]]
tags: [rails, validation, api, error-handling]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Active Record Validations §1.6, §8. Working with Validation Errors（CC BY-SA 4.0, guides.rubyonrails.org）]
related: [rd/backend/api-error-format]
summary: 一次驗證失敗可同時累積多個欄位、多種類型的錯誤，API 序列化這份清單的方式常被漏測。
---
## 定義
驗證失敗是 `ActiveModel::Errors` 集合，每個 `Error` 帶 `attribute`（欄位）、`type`（種類，如 `:too_short`）、`message`、`full_message`。同一欄位可能同時多種錯誤，不屬特定欄位的掛在 `:base`。

## 原理
集合在一次呼叫後即完整累積（見 `custom-validation-method-execution-order`），API 通常序列化成 JSON。格式無統一標準，可能用 `full_messages`、依欄位分組陣列、或直接暴露 `type`，取決各專案自訂邏輯。

## QA 視角
- 怎麼測：構造同時觸發多欄位、單欄位多種失敗的請求，確認回應列全部錯誤而非只回第一筆；核對格式跨端點是否一致；確認 `:base` 錯誤有對應位置呈現。
- 常見缺陷：API 只回 `full_messages.first`，多筆錯誤只看得到一筆；序列化依賴 `type` 做 i18n，部分 `errors.add` 用字串訊息沒對應 type；不同端點序列化方式不一致（陣列 vs 物件），共用錯誤元件失效。
