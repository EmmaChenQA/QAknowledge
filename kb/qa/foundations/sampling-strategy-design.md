---
id: qa/foundations/sampling-strategy-design
title: 抽樣測試策略與其盲點（Sampling Strategy & Its Blind Spots）
aliases: [抽樣策略, sampling strategy, 邊界值測試, boundary value testing, all-pairs testing, 兩兩組合測試, risk-based sampling, 風險導向抽樣]
tags: [testing-fundamentals, coverage, risk-based-testing]
topic: qa-foundations
confidence: author-material
updated: 2026-09-15
sources: [BBST Foundations Lecture 5 §Complete Testing / Test Every Input / The Basic Combination Rule / It's Not Just Configuration Testing (CC BY-SA 4.0, Kaner/Bach, bbst.courses)]
source_lang: en
related: [qa/foundations/exhaustive-testing-impossible, qa/foundations/path-sequence-testing-blind-spots, qa/foundations/cumulative-state-defects]
summary: 窮舉不可能時，測試靠有策略的抽樣（邊界值、all-pairs）補位，但抽樣本身仍有盲區，抓不到跨操作累積的狀態缺陷。
---
## 定義
抽樣不是隨意亂測，而是有策略的：對單一變數，優先抽最小值、最大值與鄰近的不合法值（邊界值測試）；對多變數組合，常用兩兩組合（all-pairs）等技法，用遠低於全組合數的測試量覆蓋大多數兩兩交互作用。這類技法的核心思路是：與其追求覆蓋全部組合（不可能，見 `exhaustive-testing-impossible`），不如針對「歷史上最容易藏缺陷」與「彼此交互影響」的地方優先分配有限的測試時間。

## 原理
但抽樣策略本身也有盲區——即使做到高覆蓋率的路徑測試，仍可能漏掉需要連續多次操作、跨越多次執行才累積出來的狀態性缺陷，這類缺陷不是靠增加單次抽樣密度就能抓到的。抽樣技法（邊界值、all-pairs）預設的模型是「每個測試案例彼此獨立」，但許多缺陷的觸發條件恰恰是「前面已經做過多少次操作、系統目前累積了什麼狀態」，這個維度不在傳統抽樣技法的設計範圍內，必須另外主動設計。

## QA 視角
- 怎麼測：只測試單次操作、單一路徑不夠，需額外設計連續重複同一操作多次的案例，才可能抓到資源洩漏、計數器溢位這類累積性缺陷（詳見 `path-sequence-testing-blind-spots` 與 `cumulative-state-defects`）。
- 常見缺陷：新的測試技法或工具上線後，只驗證它能抓到已知典型缺陷，沒有拿歷史上曾發生過的疑難雜症反向驗證這個技法是否真的能發現同類問題。
