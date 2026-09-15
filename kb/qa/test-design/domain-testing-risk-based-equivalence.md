---
id: qa/test-design/domain-testing-risk-based-equivalence
title: 風險導向等價類與最佳代表值（Risk-Based Equivalence & Best Representative）
aliases: [risk equivalence, best representative, 最佳代表值, 風險導向等價, 等價相對於風險, equivalence relative to risk]
tags: [domain-testing, risk-based, equivalence-class, boundary-value]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 5 "Domain Testing" p.402-416（CC BY-SA 4.0, Kaner/Fiedler, bbst.courses）]
source_lang: en
related: [qa/test-design/domain-testing-primary-secondary-dimensions, qa/test-design/domain-testing-result-variables, qa/test-design/domain-testing-hidden-boundary, rd/backend/fault-injection-chaos-engineering]
summary: 等價與否取決於針對哪個風險判斷，非固定不變，最佳代表值是最有機會觸發該風險的成員
---
## 定義

兩個測試是否等價，永遠是相對於某個具體風險（程式可能失敗的某種方式）而言，同一組值在某個風險下等價，換一個風險就可能不等價。例如針對「數值過大」風險，超過上限的所有值都屬於同一個等價類；但這個類別裡緊貼邊界的那個值（UB+Δ），對「邊界誤判」風險而言又自成一類，對「輸入溢位」風險而言卻不成立（溢位風險是依數字位數分類，跟邊界值無關）。最佳代表值（best representative）是等價類中最有機會觸發該類別對應風險的那個成員——常見但不一定是邊界值；一個等價類可能有多個最佳代表值，也可能完全沒有（無序變數的情況，見〈無序變數的等價分組〉）。

## 原理

由於等價與否是風險導向的，單一份以變數為單位的經典邊界/等價表，往往無法同時呈現多種風險——同一個值面對不同風險時該歸入哪個等價類、該不該當代表值，答案都不一樣。更進階的風險/等價表做法與系統內部隱藏邊界的問題，見〈風險/等價表與隱藏邊界〉。

## QA 視角
- 怎麼測：先用經典邊界表快速掃過明顯的太大/太小/空值風險；隨著對系統理解加深，改用風險導向思維，逐一風險判斷「不該觸發」與「可能觸發」兩組並各自選出最佳代表值，不要只套用固定的「邊界±1」公式。
- 常見缺陷：把「離邊界最近的無效值」當成唯一測法，卻漏了同一個等價類底下其實藏著另一種風險（如超過上限的值同時也可能觸發溢位，兩種風險的最佳代表值並不相同）；誤把「同一個等價類」套用到所有風險，導致代表值選錯，測出來的結果只覆蓋了其中一種失敗模式，另一種風險完全沒被驗證到。
