---
id: rd/backend/relational-vs-document-model
title: 關聯式與文件資料模型（Relational vs Document Model）
aliases: [關聯式資料庫, 文件資料庫, NoSQL, JSON 巢狀, 一對多關係, ORM, N+1 查詢, object-relational mismatch]
tags: [data-model, database, query, schema]
topic: model
confidence: book
updated: 2026-09-15
sources: [DDIA ch3 §關係模型與文件模型, DDIA ch3 §物件關係不匹配]
related: [rd/backend/normalization-denormalization-tradeoff, rd/backend/schema-on-read-vs-write, rd/backend/graph-data-model-and-query]
summary: 一對多資料適合文件模型（自包含、區域性好），多對多與需跨表連線的資料適合關聯模型。
---
## 定義
關聯式模型把資料拆成多張表，靠外來鍵與 JOIN 組合；文件模型把一份資料（含巢狀結構）存成一個自包含的 JSON/XML 文件。

## 原理
文件模型優點是讀取整份資料時區域性好（一次讀取即得完整結構），適合「一對多、樹狀、很少互相引用」的資料；缺點是不易直接引用巢狀項目、多對多關係難以自然表達。關聯模型靠 JOIN 解決跨表引用，但取回一份完整資料常需多次查詢或多路連線。ORM 減少轉換樣板碼，但常見陷阱是 N+1 查詢問題：逐筆查詢關聯資料而非一次 JOIN 取回，造成大量意外資料庫請求。

## QA 視角
- 怎麼測：對「詳情頁一次載入多個關聯資料」的功能，用網路面板數清實際發出的請求數，異常暴增（如列表筆數 N 對應 N+1 次請求）即懷疑觸發 N+1；對巢狀 JSON 欄位做新增/刪除子項測試，確認不會影響同層其他子項（文件整份覆寫的副作用）。
- 常見缺陷：
  - 列表頁筆數增加時回應時間非線性成長（N+1 查詢隨列表筆數線性增加請求數）。
  - 文件模型更新巢狀陣列中一項，因整份覆寫而遺漏其餘欄位或覆蓋掉他人併發寫入。
  - 多對多關係只存單向引用，導致「反查」方向的清單缺漏或不同步。
  - 巢狀項目沒有獨立 ID，只能用「第幾筆」定位，前端刪除/排序時位置錯位。
