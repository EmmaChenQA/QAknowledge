---
id: rd/backend/pacelc-latency-consistency-tradeoff
title: PACELC 延遲與一致性取捨（PACELC）
aliases: [PACELC, 延遲一致性取捨, latency consistency tradeoff, ELC]
tags: [distributed-systems, cap, consistency, latency, tradeoff]
topic: rep
confidence: book
updated: 2026-09-15
sources: [DDIA ch10 §線性一致性的代價]
related: [rd/backend/cap-theorem-misuse, rd/backend/linearizability]
summary: 即使沒有網路分區，系統也常為了降低延遲而犧牲一致性——PACELC 補上 CAP 只談分區、不談日常延遲取捨的盲點。
---
## 定義
PACELC 是對 CAP 定理的補充：若發生分區（Partition），要在可用性（A）與一致性（C）間取捨（即 CAP 本身）；否則（Else，網路正常時），也要在延遲（L）與一致性（C）間取捨。也就是說「一致性換可用性」不是只有分區時才會發生，平常沒有分區的日子也天天在取捨。

## 原理
要提供線性一致性，讀寫通常要等待跨節點協調（如等主節點確認、等法定人數回應），這會拉高回應時間；系統若想壓低延遲，常見做法是直接讀本地/最近副本，但可能讀到還沒同步完成的舊值。CAP 只在「網路分區」這種罕見故障下才逼你二選一，PACELC 指出即使系統從未真正分區，只要它天天在服務請求，就一直在延遲與一致性之間做選擇——這個選擇往往比分區應對策略更常影響使用者體感。

## QA 視角
- 怎麼測：在網路正常、無故障的情況下，量測「寫入後立即讀取」在不同副本/區域下的成功率與延遲分佈，確認系統實際選擇的一致性等級與宣稱是否相符；針對標榜「低延遲」的讀取路徑，設計「剛寫入即讀」情境驗證是否讀到舊值，並確認業務是否能接受。
- 常見缺陷：只驗證過分區情境下的 CAP 行為，從未測過網路正常時「為了低延遲讀最近節點」造成的舊值讀取；把 PACELC 的延遲/一致性取捨誤判為隨機性 bug，而非系統設計上的必然結果；業務方要求「低延遲」與「強一致」同時滿足卻未被提前指出兩者互斥，等上線後才發現實際犧牲了其中一項。
