---
id: rd/backend/logical-clock-ordering
title: 邏輯時鐘與事件排序（Logical Clock & Event Ordering）
aliases: [邏輯時鐘, logical clock, Lamport時鐘, Lamport timestamp, 混合邏輯時鐘, HLC, causality]
tags: [distributed-systems, logical-clock, causality]
topic: dist
confidence: book
updated: 2026-09-15
sources: [DDIA ch10 §ID生成器和邏輯時鐘]
related: [rd/backend/clock-skew-and-drift, rd/backend/linearizability, rd/backend/distributed-id-generation]
summary: 邏輯時鐘用遞增計數器保證有因果關係的事件順序一致，但不足以實現唯一性約束等需要「知道自己最小」的功能
---
## 定義
邏輯時鐘不度量真實時間，而是用遞增計數器追蹤「事件之間的相對先後」；只要 A 事件先於 B 事件發生（有因果關係），A 的邏輯時間戳就一定小於 B 的。Lamport 時間戳是最簡單的實作：每個節點維護一個計數器，每次操作遞增並附上節點 ID 作決勝；混合邏輯時鐘（HLC）進一步結合物理時間，讓時間戳同時具備「大致對應真實時刻」與「順序與因果一致」兩種特性。

## 原理
邏輯時鐘只保證「看得見的因果關係」被正確排序：兩個節點若從未通訊過，各自的邏輯時鐘可能相差懸殊，無法看出誰先誰後；因此邏輯時鐘無法回答「我的時間戳是不是全系統最小的」這種需要知道所有其他節點狀態才能確定的問題——這正是唯一性約束、分散式鎖等場景仍需要共識演算法而非只靠邏輯時鐘的原因（分散式 ID 生成方式的取捨見 `distributed-id-generation`）。

## QA 視角
- 怎麼測：針對用邏輯時鐘/版本向量做快照隔離或衝突偵測的功能，測試兩筆從未互相依賴、幾乎同時發生的操作，確認系統把它們正確識別為「併發」而非武斷指定順序。
- 常見缺陷：併發建立的兩筆記錄各自拿到邏輯時間戳後，系統誤以為兩者有先後關係並依此做出「誰蓋過誰」的錯誤決策；把邏輯時鐘的因果排序誤用於需要全域嚴格排序的場景（如唯一性判斷），造成看似隨機的衝突判斷錯誤。
