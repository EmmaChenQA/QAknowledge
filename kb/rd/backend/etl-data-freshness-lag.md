---
id: rd/backend/etl-data-freshness-lag
title: ETL/資料管道時效性（ETL Data Freshness Lag）
aliases: [資料倉儲同步延遲, reverse ETL, 資料管道, 批次匯入延遲, 事件流同步, 報表資料落後]
tags: [etl, data-pipeline, latency, reporting]
topic: perf
confidence: book
updated: 2026-09-15
sources: [DDIA ch1 §資料倉儲, DDIA ch1 §超越資料湖]
related: [rd/backend/oltp-vs-olap-workload, rd/backend/system-of-record-vs-derived-data, rd/backend/batch-scheduling-delay, rd/backend/star-schema-analytics]
summary: 資料倉儲/報表資料是透過 ETL 從交易庫定期或持續同步而來，天生存在時間差，需明確測「多久後可見」。
---
## 定義
ETL（提取—轉換—載入）把事務型系統的資料抽取、轉換、載入到分析型系統（資料倉儲/資料湖），可以是定期批次或持續事件流；資料倉儲/報表看到的永遠是某個時間點的快照，而非即時狀態。反向 ETL 則是把分析結果送回事務型系統（如推薦結果、風控名單）。

## 原理
批次 ETL 通常有固定週期（如每日/每小時），流式 ETL 延遲較小但仍非零；轉換步驟本身也可能出錯或漏資料，造成報表與源頭資料不一致，而不只是「慢」。

## QA 視角
- 怎麼測：在交易庫寫入一筆新資料後，記錄多久才出現在報表/分析頁面/後台統計，對照系統宣稱的同步週期是否相符；刻意在 ETL 排程視窗前後各測一次，確認邊界行為（剛好卡在批次切點）；反向 ETL（如風控名單、推薦結果）異動後，確認回寫到前台生效的時間與正確性。
- 常見缺陷：
  - 報表頁面沒有標示資料時間戳，使用者以為是即時數字
  - ETL 排程失敗後沒有告警，報表默默停留在舊資料且無人察覺
  - 轉換規則變更未回填歷史資料，造成同一報表前後期口徑不一致
  - 反向 ETL 寫回事務系統時覆蓋了使用者剛做的手動修改（寫入時序衝突）
