---
id: rd/backend/fault-injection-chaos-engineering
title: 故障注入與混沌工程（Fault Injection & Chaos Engineering）
aliases: [故障注入, fault injection, 混沌工程, chaos engineering, Chaos Monkey, Jepsen, 確定性模擬測試, DST, 故障 vs 失效, fault vs failure, 單點故障, SPOF, 硬體故障率]
tags: [distributed-systems, testing, chaos-engineering, fault-tolerance, reliability]
topic: dist
confidence: book
updated: 2026-09-15
sources: [DDIA ch9 §形式化方法和隨機測試, DDIA ch2 §可靠性與容錯, DDIA ch2 §硬體與軟體故障]
related: [rd/backend/unreliable-network-timeout, rd/backend/process-pause-gc-stw, rd/backend/consensus-algorithms, rd/backend/metastable-failure-retry-storm]
summary: 故障是局部元件失常、失效是整個系統未達 SLO；分散式系統的缺陷多半只在故障真的發生時才現形，必須主動注入故障（混沌工程）才能驗證容錯是否真的有效。
---
## 定義
故障（fault）是系統某部分停止正常運作（機器當機、硬碟壞掉）；失效（failure）是整個系統沒達到服務級別目標。容錯系統能在部分故障下仍對外服務；無法容忍的部分即單點故障（SPOF）。故障注入是主動向執行中系統製造故障（斷網、關機、磁碟損壞、程序暫停等）再觀察反應的技術，生產環境做故障注入通常稱混沌工程。另有模型檢查（形式化驗證是否違反不變量）與確定性模擬測試（DST，讓網路延遲、I/O、時鐘等非確定性來源由模擬器接管，可重現並窮舉更多執行順序）。

## 原理
硬體故障有已知統計機率，大規模系統下故障是常態；軟體缺陷則跨節點高度相關（同一套程式碼、同樣邊界條件），比隨機硬體故障更難靠冗餘解決。分散式系統的許多缺陷只在特定故障組合（如網路分區疊加節點暫停）才出現，單純功能測試幾乎測不到。故障注入框架（如 Jepsen）已多次在知名資料庫中發現嚴重一致性缺陷；DST 把「隨機故障」變成「可控制、可重放」的案例，遠比傳統故障注入更容易除錯。

## QA 視角
- 怎麼測：找出系統宣稱「可容錯」的節點/服務，實際關掉一個實例確認服務不中斷；針對關鍵路徑（領導者選舉、鎖/租約、跨服務交易）設計「斷網」「延遲注入（含長尾）」「節點重啟」「時鐘跳變」「磁碟寫滿/唯讀」組合測試，而非只測單一故障類型；對重試、逾時、熔斷等機制逐一單獨觸發，確認行為符合設計而非整體掛掉；對回歸測試中反覆出現的「偶發性失敗」，優先懷疑是否踩中未覆蓋的故障組合。
- 常見缺陷：文件宣稱高可用，實際某依賴服務是隱藏 SPOF、從未真的被關過驗證；重試/降級邏輯只在單元測試 mock 過，未曾在真實斷網情境下驗證是否無限重試或雪崩；同一套程式碼部署多份當「容錯」，但軟體缺陷會同時打中所有副本；混沌測試只做過一次就視為「已具備容錯能力」，未納入常態回歸；故障恢復後資料處於中間態（部分寫入）沒被檢查。
