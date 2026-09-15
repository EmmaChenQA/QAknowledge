---
id: rd/backend/batch-scheduling-delay
title: 排程批次延遲與資料新鮮度（Batch Scheduling Delay）
aliases: [排程作業延遲, 報表延遲, 每日批次, cron delay, 資料新鮮度, workflow DAG, 工作流依賴]
tags: [批處理, 排程, 報表, 資料新鮮度]
topic: stream
confidence: book
updated: 2026-09-15
sources: [DDIA ch11 §分散式作業編排／工作流排程]
related: [rd/backend/batch-output-atomicity, rd/backend/event-time-vs-processing-time, rd/backend/etl-data-freshness-lag, rd/backend/star-schema-analytics]
summary: 定期批次作業的輸出延遲取決於排程週期與上游工作流依賴，非即時
---
## 定義
批處理作業通常按固定週期排程（如每小時、每日），或作為工作流（有向無環圖 DAG）中的一環，等上游作業全部完成後才執行。輸出反映的是「上一次排程執行時」的資料狀態，而非當下最新狀態。

## 原理
一項作業的輸出可能同時是多個下游作業的輸入，工作流排程器（如 Airflow）通常要等產生輸入的所有上游作業都成功完成，才會啟動下游作業。因此報表/統計類輸出的新鮮度，取決於整條依賴鏈中最慢的一環，而非單一作業本身的執行時間。任何一個上游作業延遲或失敗重試，都會連帶延後下游輸出時間；工作流可能包含數十到上百個作業，跨團隊維護時尤其容易出現「某環卡住、整條鏈延遲」而不易察覺。

## QA 視角
- 怎麼測：確認報表/統計頁面是否標示資料截止時間（as-of time）而非誤導成「即時」；人為延後或讓某個上游作業失敗，驗證下游是否正確等待而非讀到不完整/舊資料；驗證排程重跑（backfill）某一天的批次後，該日報表能否正確更新而不影響其他日期。
- 常見缺陷：頁面文案寫「即時更新」但資料其實是 T-1 或依賴鏈完成後才更新，造成使用者誤判；工作流重試機制掩蓋了上游長期失敗，下游持續讀到過期資料卻無告警；補資料（backfill）只重跑單一作業卻沒有連動重跑下游，造成報表口徑不一致；排程時間與資料時區未對齊，導致「每日報表」的資料邊界切在錯誤時刻（如 UTC 午夜 vs 當地午夜）。
