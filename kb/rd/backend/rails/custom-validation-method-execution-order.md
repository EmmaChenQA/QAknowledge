---
id: rd/backend/rails/custom-validation-method-execution-order
title: 自訂驗證方法的執行順序（Custom Validation Method Order）
aliases: [validate 方法順序, 多個自訂驗證, errors.add 順序, 驗證執行順序, custom method validation]
tags: [rails, validation, active-record]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Active Record Validations §7.2 Custom Methods（CC BY-SA 4.0, guides.rubyonrails.org）]
related: [rd/backend/rails/validation-trigger-timing, rd/backend/rails/validation-errors-collection-and-api-format]
summary: 用 validate 註冊的多個自訂驗證方法依序全部執行，不會因前面失敗中止後面的。
---
## 定義
用 `validate :方法名` 註冊的自訂驗證方法照註冊順序依序執行，即使前一個已判定失敗，後面的仍會繼續跑——`valid?` 只看最終 errors 是否為空，不是「找到第一個問題就停」。

## 原理
Active Record 設計目標是一次把所有問題找出來，因此同次呼叫的 errors 可能同時含多個不相關錯誤。這代表若方法 B 假設方法 A 已擋下某狀態（如先做 nil 檢查），兩者是平行執行而非互斥跳過，A 失敗仍可能讓 B 對非預期資料操作而拋例外，而非乾淨驗證失敗。

## QA 視角
- 怎麼測：構造同時觸發多個獨立規則的資料，確認 API 一次列出全部錯誤；針對自訂驗證間可能的隱性依賴，讓前一個失敗但仍讓後一個讀到異常輸入，觀察是否拋未捕捉例外。
- 常見缺陷：自訂方法直接存取關聯物件卻未判斷是否存在，前一驗證已標記異常但此方法仍對 nil 呼叫方法拋例外變 500；多個方法互相覆寫同一欄位 errors 只看得到最後一則；重構打亂方法順序後隱性依賴邏輯悄悄壞掉卻無測項覆蓋。
