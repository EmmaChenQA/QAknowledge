---
id: rd/backend/oltp-vs-olap-workload
title: 事務型與分析型工作負載（OLTP vs OLAP）
aliases: [點查詢, 聚合查詢, 交易處理, 報表系統, 商業智慧, point query, aggregation query, 列式儲存, 面向行儲存, 分析型資料庫, 事務型資料庫, HTAP, 資料倉儲延遲, column-oriented]
tags: [database, workload, performance, reporting, storage-engine, olap, oltp, analytics]
topic: model
confidence: book
updated: 2026-09-15
sources: [DDIA ch1 §分析型與事務型系統, DDIA ch4 §分析型資料儲存, DDIA ch4 §列式儲存]
related: [rd/backend/response-time-percentiles, rd/backend/etl-data-freshness-lag, rd/backend/star-schema-analytics, rd/backend/lsm-tree-vs-btree-storage, rd/backend/materialized-view-staleness]
summary: OLTP 按鍵讀寫少量記錄要求低延遲（面向行儲存），OLAP 掃描大量記錄做聚合（面向列儲存），兩者儲存佈局、效能特徵與失敗模式都相反，且資料常非即時同步。
---
## 定義
OLTP（聯機事務處理）以固定的預先定義查詢，對少量記錄做點查詢與增刪改，強調低延遲，通常用面向行儲存（同一筆記錄各欄位存放在一起）；OLAP（聯機分析處理）掃描大量記錄計算聚合統計，查詢型別由分析師自由決定，通常用面向列儲存（同一欄位所有值存放在一起）以減少讀取量，強調吞吐與正確彙總。

## 原理
兩者資料佈局與最佳化方向相反：OLTP 資料庫若被拿去跑大量聚合查詢，會拖慢其他使用者的一般操作；面向列儲存的 OLAP 系統插入/更新單筆記錄成本高，寫入通常是批次匯入而非即時逐筆。因此系統常把分析查詢移到獨立資料倉儲/報表庫，經 ETL 定期或持續同步，兩邊資料存在延遲與短暫不一致視窗。標榜 HTAP 的系統底層往往仍是兩套引擎共用同一介面。

## QA 視角
- 怎麼測：確認報表/後台統計頁面查的是報表庫還是正式交易庫；驗收「操作後報表更新」類需求時，先確認是否共用同一資料庫，非則測「操作後多久報表才更新」而非要求瞬時一致；跑一次大範圍匯出/報表查詢，觀察是否拖慢其他使用者的一般下單/登入操作；比對報表數字與交易明細加總是否一致，抓 ETL 轉換錯誤；批次寫入類功能應測大量筆數下的效能與失敗重試，而非只測少量筆數。
- 常見缺陷：後台報表直接查生產交易庫，尖峰時段拖垮前台效能；報表資料有延遲卻未標示「更新至 X 時間」，被誤判為即時；ETL 轉換邏輯與交易規則不同步，改了計費規則後報表口徑沒跟著更新；大量匯出功能沒有分頁/限流，一次查詢把資料庫打滿；業務操作後立刻檢查報表數字未變被誤判為異常，實際是批次延遲；對分析型資料庫做逐筆高頻寫入，效能遠低於預期；只在小資料量下驗證分析查詢，資料量增長後才發現查詢逾時或記憶體不足。
