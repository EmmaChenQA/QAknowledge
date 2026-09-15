---
id: rd/backend/rails/association-n-plus-one
title: 關聯查詢 N+1 問題
aliases: [N+1 query, N加1查詢, eager loading, includes 預載, lazy loading, 延遲載入, 效能回歸]
tags: [rails, associations, performance]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Active Record Associations §7.1/§7.5/§8.2.1.2 (CC BY-SA 4.0, guides.rubyonrails.org)]
related: [rd/backend/rails/inverse-of-data-consistency, rd/backend/response-time-percentiles]
summary: 逐筆存取關聯觸發額外查詢，總查詢數隨主記錄筆數線性成長，看 SQL log 或回應時間即可察覺。
---
## 定義
N+1 是先執行 1 次查詢取得一組主記錄，再對每一筆主記錄各自觸發 1 次額外查詢取關聯資料，總查詢數隨主記錄筆數線性成長的效能問題。

## 原理
Rails 關聯方法預設延遲載入：呼叫 author.books 不會立刻查資料庫，等真正用到資料（如 each、size）才送出查詢，結果會快取共用，但只在單一 owner 物件內有效；對一組 author 逐筆存取 books，每個各觸發一次查詢即成 N+1。若關聯缺對應的 :inverse_of（如自訂 :foreign_key 使 Rails 無法自動識別雙向關聯），即使父物件已載入，透過子物件反查父物件也會被迫重新查詢。

## QA 視角
- 怎麼測：開 SQL log，觀察同一張表是否對相近的 WHERE id = ? 條件重複出現多次；比對 API 回應時間是否隨清單筆數線性增加。
- 常見缺陷：列表頁逐筆讀關聯欄位（如訂單逐筆讀顧客名稱）沒用 includes 預載；巢狀關聯只 includes 第一層；自訂 :foreign_key 卻未補 :inverse_of，反向查詢誤判未快取重打 DB。
