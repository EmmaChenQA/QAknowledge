---
id: rd/backend/queueing-delay-and-throughput
title: 排隊延遲與吞吐量（Queueing Delay and Throughput）
aliases: [隊頭阻塞, head-of-line blocking, 服務時間, service time, 網路延遲, 吞吐量上限, 併發瓶頸]
tags: [performance, concurrency, latency, load-testing]
topic: perf
confidence: book
updated: 2026-09-15
sources: [DDIA ch2 §延遲與響應時間]
related: [rd/backend/response-time-percentiles, rd/backend/metastable-failure-retry-storm, rd/backend/load-parameters-and-scalability]
summary: 響應時間等於服務時間加排隊延遲加網路延遲；負載接近處理上限時排隊延遲會急劇上升，慢請求會拖慢後續請求。
---
## 定義
服務時間是伺服器實際處理請求的時間；排隊延遲是請求等待資源（CPU、連線數、佇列）而尚未開始處理的時間；響應時間是客戶端實際感受到的總時間，包含以上全部。隊頭阻塞指少數慢請求佔用資源，導致後面本該很快的請求也被迫等待。

## 原理
吞吐量越接近系統處理極限，排隊延遲越會非線性飆升；因此效能問題常不是「單一請求變慢」，而是「並發量上升後大家一起變慢」，必須在客戶端量測響應時間（而非只在伺服器端量測服務時間）才能看到排隊延遲的存在。

## QA 視角
- 怎麼測：壓力測試時逐步拉高並發量，觀察響應時間是否從某個吞吐量開始急劇上升（找到拐點）；混合一支刻意變慢的請求（如大檔案上傳）與大量正常請求，確認是否拖慢其他正常請求（隊頭阻塞）；量測時同時記錄客戶端與伺服端耗時，比對差異抓出排隊延遲。
- 常見缺陷：
  - 效能測試只在低並發下跑，沒測到吞吐拐點附近的延遲暴增
  - 共用連線池/執行緒池被單一慢查詢佔滿，導致無關功能一起變慢
  - 伺服器端日誌只記服務時間，客訴「頁面卡」卻查無異常（漏看排隊延遲）
  - 批次任務與線上流量共用資源，批次一跑線上就變慢
