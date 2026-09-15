---
id: rd/backend/response-time-percentiles
title: 響應時間分位數（Response Time Percentiles）
aliases: [p50, p95, p99, 尾延遲, tail latency, 中位數響應時間, 平均值誤導]
tags: [performance, latency, monitoring, testing]
topic: perf
confidence: book
updated: 2026-09-15
sources: [DDIA ch2 §描述效能, DDIA ch2 §平均值、中位數與分位數]
related: [rd/backend/queueing-delay-and-throughput, rd/backend/slo-sla-tail-latency-amplification]
summary: 響應時間應看分位數（p95/p99）而非平均值，平均值會掩蓋少數使用者的極端延遲。
---
## 定義
響應時間是一組分佈而非單一數字；中位數（p50）代表「典型」等待時間，p95/p99/p999 代表高分位數（尾延遲），表示這麼多比例的請求快於這個閾值。平均值容易被少數異常值拉高或無法反映多數人的實際體驗。

## 原理
平均值適合估算系統整體吞吐承載能力，但不適合描述使用者體感；高分位數之所以重要，是因為最慢的那批使用者往往也是資料量最大、最活躍（最有價值）的使用者。對分位數取平均在數學上沒有意義，須用直方圖合併。

## QA 視角
- 怎麼測：效能測試報告只看平均值時要主動要求 p95/p99 數據；同一支壓測腳本多輪執行，觀察 p99 是否穩定或有長尾突刺；針對「重度使用者」帳號（資料量大、關注數多）單獨測回應時間，不能只用乾淨測試帳號代表全體。
- 常見缺陷：
  - 效能驗收只驗平均響應時間，實際上有 5%～10% 請求超時但被平均值掩蓋
  - 監控儀表板把多台機器的分位數直接平均，得出失真的合併指標
  - 資料量大的帳號（VIP/高交易量）操作明顯變慢卻沒有納入測試場景
  - p99 異常時只看單次測試結果就下結論，未觀察多輪穩定性
