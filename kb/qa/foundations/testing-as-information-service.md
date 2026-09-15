---
id: qa/foundations/testing-as-information-service
title: 測試作為資訊服務（Testing as Information Service）
aliases: [testing mission, information objectives, 測試任務, 測試策略, test strategy, 測試的目的, 為什麼要測試, bug hunting vs quality advocacy]
tags: [testing-fundamentals, strategy, mission]
topic: qa-foundations
confidence: author-material
updated: 2026-09-15
sources: [BBST Foundations Lecture 2 §Many Different Information Objectives / Your Testing Mission / Testing Strategy (CC BY-SA 4.0, Kaner/Bach, bbst.courses)]
source_lang: en
related: [qa/foundations/software-testing-definition]
summary: 測試本質是資訊服務，不同資訊目標（任務）會導出完全不同的測試策略與產出物。
---
## 定義
測試永遠是在為某個「資訊目標」服務——找出重要缺陷、評估產品品質、協助管理層做出貨決策、阻擋不成熟版本上市、評估與其他產品的互通性、確認符合規格或法規，都是可能的目標。「任務（mission）」是對「為什麼要測試」這個問題的具體回答；「策略」是達成任務所採取的測試設計原則；「邏輯（logistics）」是資源調度方式；三者合起來構成完整的測試計畫。

## 原理
不同情境會要求完全不同的資訊目標，進而導出不同的工具與策略。例如同樣是「軟體出了問題」，一個即將上市、被認為品質堪憂的量產軟體團隊，會傾向做地毯式抓蟲以決定能不能出貨；而一個要為法律訴訟蒐證的鑑定團隊完全不做地毯式抓蟲，而是專注在「用多少種方式能重現特定已發生的故障」並研究廠商的品質紀錄。同一個專案在不同階段任務也會轉移：初期偏向探索性抓蟲，後期偏向涵蓋面調查與品質現況彙報。任務一旦分散成太多個目標，測試工作就會失焦、難以達成任何一個目標；把任務講清楚、寫下來，是排定測試工作優先順序的前提，也是選擇測試技法（如情境測試偏重可信度、領域測試偏重找 bug 威力）的依據。

## QA 視角
- 怎麼測：開工前先確認這輪測試的任務是什麼（抓 bug／出貨把關／回歸驗證／給利害關係人的品質現況報告），用任務反推要深挖還是要廣覆蓋，避免用同一套地毯式測試套用在所有情境。
- 常見缺陷：測試任務不明確或同時背負太多任務（既要趕出貨又要做完整涵蓋率調查），導致測試員疲於奔命卻沒有一項真正做完。
- 常見缺陷：專案後期仍套用初期探索式抓蟲的任務設定，沒有轉向涵蓋面調查與現況彙報，導致上線把關失焦。
- 常見缺陷：把測試等同於執行案例數，忽略資訊目標才是判斷測試是否足夠的依據，案例量大但沒回答到關鍵問題等於白測。
