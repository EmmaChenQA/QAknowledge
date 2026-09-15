---
id: rd/backend/system-of-record-vs-derived-data
title: 權威記錄系統與衍生資料（System of Record vs Derived Data）
aliases: [source of truth, 快取一致性, cache invalidation, 衍生資料, 讀寫不一致, materialized view, 索引與主資料庫]
tags: [caching, consistency, architecture, data-flow]
topic: perf
confidence: book
updated: 2026-09-15
sources: [DDIA ch1 §權威記錄系統與衍生資料]
related: [rd/backend/etl-data-freshness-lag, rd/backend/idempotency]
summary: 快取/索引/報表都是可重建的衍生資料，只有主資料庫是權威來源；不一致時以主資料庫為準。
---
## 定義
權威記錄系統儲存某類資料的規範版本，新資料先寫入這裡；衍生資料系統的內容是由其他系統資料轉換而來，遺失可從來源重建（快取、索引、物化檢視、反正規化欄位皆屬此類）。

## 原理
衍生資料本質上是冗餘，用來換取讀取效能；權威記錄系統變更後，衍生資料需要透過某種流程（同步更新、非同步重建）跟上，這中間必然存在時間差或失敗窗口。

## QA 視角
- 怎麼測：修改權威資料後，分別讀取權威來源與各個衍生位置（快取、搜尋索引、後台列表頁），觀察多久後衍生資料才反映最新值；刻意讓衍生資料更新流程失敗或延遲，確認系統如何降級（顯示舊值/報錯/重試）。
- 常見缺陷：
  - 快取沒有在寫入後失效，導致使用者看到舊值
  - 衍生資料更新是非同步的，但前端沒有告知使用者「處理中」，造成誤判功能故障
  - 多個衍生副本（快取＋索引＋報表）更新時機不同步，同一份資料在不同頁面顯示不一致
  - 衍生資料損毀後沒有從權威來源重建的機制，只能手動修
