---
id: rd/backend/rails/counter-cache-staleness
title: Counter Cache 計數快取失準情境
aliases: [counter_cache, 計數快取, books_count, reset_counters, 快取筆數不同步, counter cache stale]
tags: [rails, associations, performance, data-integrity]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Active Record Associations §8.3 Counter Cache (CC BY-SA 4.0, guides.rubyonrails.org)]
related: [rd/backend/rails/dependent-delete-modes]
summary: counter_cache 快取筆數只在特定條件下自動維護，回填未做或改主鍵都會與實際筆數脫鉤。
---
## 定義
counter_cache 在 belongs_to 端宣告，把關聯筆數快取到擁有者模型的一個整數欄位，讓 size 等方法免去即時 COUNT(*) 查詢。

## 原理
欄位需自行遷移加到擁有者模型（如 books_count），Rails 在關聯物件新增或移除時自動維護該值。既有大表加上 counter_cache 前若未先回填欄位值，方法讀到的是未初始化快取，得錯誤筆數；可用 counter_cache: { active: false } 暫時繞過快取改查資料庫，回填完成再啟用。若手動變更擁有者主鍵卻沒同步更新外鍵，快取不會自動修正，孤兒子記錄仍被計入，須用 reset_counters 校正。

## QA 視角
- 怎麼測：新增/刪除關聯物件後比對快取欄位與 COUNT(*) 實測值；大表回填情境驗證回填期間讀到的計數；改主鍵後查計數是否留孤兒殘留值。
- 常見缺陷：回填未做就啟用，計數長期偏真實值；批次刪除（:delete_all 或直接 SQL）繞過 callback 使快取不扣減；主鍵變更後計數卡舊值，reset_counters 未納入維運。
