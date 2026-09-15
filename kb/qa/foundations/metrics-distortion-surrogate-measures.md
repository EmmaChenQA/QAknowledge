---
id: qa/foundations/metrics-distortion-surrogate-measures
title: 測試指標的替代測量與失真效應（Surrogate Measures & Measurement Distortion）
aliases: [surrogate measure, 替代測量, measurement distortion, 測量失真, Goodhart定律, construct validity, 建構效度]
tags: [testing-fundamentals, metrics, management]
topic: qa-foundations
confidence: author-material
updated: 2026-09-15
sources: [BBST Foundations Lecture 6 §Surrogate (or Proxy) Measures / We've Seen This Before (Coverage) / Distortion and Dysfunction / Recap (CC BY-SA 4.0, Kaner/Bach, bbst.courses)]
related: [qa/foundations/coverage-multidimensional, qa/foundations/metrics-gaming-in-testing]
summary: 測試品質、進度等屬性難以直接測量，常被 bug 數量或覆蓋率等替代指標取代，其有效性取決於建構效度。
---
## 定義
測試想評估的屬性（測試涵蓋面、有效性、產品品質、進度）大多沒有公認的直接測量方法，於是常改用替代測量——找一個容易測、假設跟真正想測的屬性相關的東西來代替，例如用 bug 數量代替測試員生產力、用結構覆蓋率代替測試完整度、用每週新增 bug 數的變化曲線代替還剩多少工作量或何時可以出貨。這類測量是否有效取決於建構效度，也就是它是否真的測到了你以為它測到的那個屬性；業界常直接跳過這個問題，逕自把替代指標當成真正的答案來用。

## 原理
一旦替代指標被拿來當作績效考核或決策依據，人會針對被測量的東西優化、犧牲沒被測量的東西，這稱為測量的失真；當失真嚴重到讓組織實際上更差時，就稱為功能失調。替代指標離真正想測的屬性越遠、被綁定的獎懲越直接，失真就越劇烈——測試情境裡具體會出現哪些行為模式（衝數字、挑軟柿子、延後回報等），見 `metrics-gaming-in-testing`。

## QA 視角
- 怎麼測：導入任何測試相關指標（覆蓋率、bug 數、通過率）前，先問這個數字真正代表什麼屬性、跟我想知道的東西關聯有多強，避免把單一替代指標直接綁定到個人績效考核。
- 常見缺陷：只看單一替代指標是否好看就下結論，沒有回頭檢查這個指標的建構效度是否真的支撐得住這個結論。
