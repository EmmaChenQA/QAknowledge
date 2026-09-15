---
id: rd/backend/metastable-failure-retry-storm
title: 亞穩態故障與重試風暴（Metastable Failure and Retry Storm）
aliases: [retry storm, 重試風暴, 負載卸除, load shedding, 熔斷器, circuit breaker, 指數退避, exponential backoff, 過載無法恢復]
tags: [reliability, overload, resilience, load-testing]
topic: perf
confidence: book
updated: 2026-09-15
sources: [DDIA ch2 §當過載系統無法恢復時]
related: [rd/backend/queueing-delay-and-throughput, rd/backend/fault-injection-chaos-engineering]
summary: 過載後客戶端逾時重試會讓負載更高，即使原始負載退去系統也可能卡在過載狀態，需靠退避/熔斷/卸載自我恢復。
---
## 定義
系統接近吞吐上限時，排隊延遲上升導致客戶端逾時並重發請求，請求量因而進一步上升，形成惡性循環，即使之後原始負載下降，系統仍可能停留在過載狀態直到重啟或人工介入，這種現象稱為亞穩態故障。常見緩解手段包括指數退避（重試間隔逐漸拉長並加入隨機擾動）、熔斷器（暫停向近期出錯的服務發請求）、負載卸除（伺服器主動拒絕部分請求）、背壓（要求客戶端降速）。

## 原理
這些機制的共同目的是打斷「變慢→逾時→重試→更慢」的正反饋迴路；沒有這些保護的系統，一次短暫尖峰負載可能演變成長時間的全面中斷，且無法自行恢復。

## QA 視角
- 怎麼測：對介面持續打高於處理能力的請求量，觀察逾時後客戶端是否會無節制重試、伺服器是否有熔斷/卸載回應；驗證重試邏輯是否有指數退避與隨機抖動，而非固定間隔重試；製造短暫尖峰負載後迅速降回正常，確認系統能否自行恢復而非卡死。
- 常見缺陷：
  - 前端/客戶端逾時後立即固定間隔重試，多個客戶端同時重試造成請求量加倍（重試風暴）
  - 後端沒有熔斷機制，單一慢下游拖垮整個服務且無法自我恢復
  - 壓測只測到系統開始出錯就停止，沒有驗證「降回正常負載後能否恢復」這一步
  - 負載卸除只做了回 503，但客戶端把 503 也當成需要重試的錯誤，形成新一輪風暴
