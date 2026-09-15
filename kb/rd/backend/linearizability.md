---
id: rd/backend/linearizability
title: 線性一致性（Linearizability）
aliases: [線性一致性, linearizability, 強一致性, strong consistency, 新鮮度保證, recency guarantee, 讀到舊資料, stale read]
tags: [distributed-systems, consistency, replication]
topic: rep
confidence: book
updated: 2026-09-15
sources: [DDIA ch10 §線性一致性]
related: [rd/backend/consensus-algorithms, rd/backend/cap-theorem-misuse, rd/backend/logical-clock-ordering, rd/backend/linearizability-use-cases]
summary: 系統表現得像只有一份資料，寫入完成後任何後續讀取都必須看到最新值，否則就是讀到舊資料
---
## 定義
線性一致性是一種「新鮮度保證」：一旦某次寫入已經完成，之後開始的所有讀取都必須看到這次寫入的結果（或更新的結果），不能看到更舊的值；即使系統內部有多個副本，也必須表現得彷彿只有一份資料。它只針對單一物件的讀寫，不涉及多物件的事務隔離（那是「可序列化」要解決的問題，兩者常被混淆但完全不同）。

## 原理
不是所有複製方式都能提供線性一致性：單主複製由領導者處理讀寫時通常可以做到（但要小心「自認為仍是領導者」的舊領導者仍在回應請求）；多主複製與無主複製（Dynamo 風格）通常做不到，即使滿足「讀寫法定人數 w+r>n」的仲裁條件，也可能因為網路延遲不均而讀到舊值。線性一致性的代價是效能與可用性：網路延遲越不確定，線性一致的讀寫回應時間下限就越高；發生網路分區時要嘛選一致（暫時不可用）要嘛選可用（回傳可能過舊資料），這正是 CAP 定理的取捨（典型應用場景見 `linearizability-use-cases`）。

## QA 視角
- 怎麼測：針對「寫入後立刻讀取」（同一使用者或不同使用者）的場景設計測試，特別是切換到副本/唯讀節點時是否仍能讀到剛寫入的值。
- 常見缺陷：唯讀副本/快取層延遲導致「剛儲存的設定沒生效」被誤判為功能異常（其實是複製延遲，不是 bug，但也可能是缺陷——需先辨別業務是否要求線性一致）；跨服務流程假設「A 寫完 B 立刻能讀到」卻沒有實際驗證過複製延遲窗口，只在低併發/單機開發環境測過從未暴露問題。
