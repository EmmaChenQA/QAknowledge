---
id: rd/backend/json-numeric-precision-pitfalls
title: JSON 數值精度與型別模糊
aliases: [大整數精度, IEEE754 浮點數, JSON number, 64位元ID, base64編碼二進位字串]
tags: [encoding, json, api, precision]
topic: api
confidence: book
updated: 2026-09-15
sources: [DDIA ch5 §JSON、XML 及其二進位制變體]
related: [rd/backend/schema-forward-backward-compatibility]
summary: JSON 不區分整數浮點數也無精度規範，大於2^53的整數在部分語言會失真。
---
## 定義
JSON 區分字串與數值，但不區分整數與浮點數，也未規定數值精度上限。多數語言（尤其 JavaScript）用雙精度浮點數解析 JSON 數值，超過 2 的 53 次方的整數無法精確表示。

## 原理
資料庫或後端常用 64 位整數當主鍵或訂單編號，一旦原樣塞進 JSON 數值欄位傳給前端，前端若用 JavaScript 解析就可能失真（末幾位被四捨五入或改變）。常見解法是同時提供數值版與字串版，或乾脆全部改成字串傳輸。

## QA 視角
- 怎麼測：用大於 2^53（約 9007199254740992）的 ID／金額／時間戳送出請求或接收回應，前端顯示值、送出的下一個請求裡帶的值，跟後端實際值逐字元比對，看有無被四捨五入或位數漂移。
- 常見缺陷：
  - 訂單號、交易序號用大整數且只回傳 JSON number，前端顯示或再送出時尾數跑掉，導致查詢/退款對不上單
  - 前端把大數字四捨五入後又送回後端當查詢條件，查無資料卻誤判為「系統無此單」
  - 同一支 API 對同一欄位有時回字串有時回數值（型別不穩定），前端型別判斷分支漏了一種造成顯示異常
  - 二進位資料（如簽章、憑證）用 base64 塞進 JSON，忘記處理編碼導致資料變成亂碼卻沒有明確報錯
