---
id: rd/backend/rails/strict-validation-exception
title: strict 驗證拋出例外而非收集錯誤（Strict Validations）
aliases: [strict true, StrictValidationFailed, 驗證拋例外, strict option]
tags: [rails, validation, error-handling]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Active Record Validations §5. Strict Validations（CC BY-SA 4.0, guides.rubyonrails.org）]
related: [rd/backend/rails/validation-errors-collection-and-api-format, rd/backend/api-error-format]
summary: strict:true 讓驗證失敗直接拋 StrictValidationFailed 例外，跳過一般的 errors collection 流程。
---
## 定義
一般驗證失敗只是把錯誤加進 errors，讓 `valid?`/`save` 回傳 `false`。但加了 `strict: true` 後失敗會直接拋 `ActiveModel::StrictValidationFailed`（可自訂例外類別），連本該只是查詢的 `valid?` 都會炸掉。

## 原理
此選項為「不合法資料不能靜默略過」設計，但改變呼叫端契約：慣用 `if model.valid?` 安全查詢寫法，一旦某驗證被標 `strict`，可能在無 `rescue` 處意外拋例外，讓原本該回 4xx 的路徑變成未捕捉例外回 500。

## QA 視角
- 怎麼測：查明是否對關鍵欄位用了 `strict: true`，送不合法值確認 API 有對應例外處理（回 4xx 而非 500）；測純查詢用途的呼叫路徑是否也被意外中斷。
- 常見缺陷：controller 只 rescue `RecordInvalid` 沒涵蓋 `StrictValidationFailed`，變成 500；批次逐筆 `valid?` 篩資料時某筆命中 strict 直接中斷整批；自訂例外類別上線後前端解析邏輯未同步更新。
