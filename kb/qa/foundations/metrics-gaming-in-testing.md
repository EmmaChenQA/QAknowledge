---
id: qa/foundations/metrics-gaming-in-testing
title: 測試指標常見的博弈行為（Common Gaming Patterns Around Testing Metrics）
aliases: [bug count 當KPI, coverage 當KPI, bug count gaming, 衝bug數, coverage gaming, 衝覆蓋率, 缺陷灌水, duplicate bug]
tags: [testing-fundamentals, metrics, management]
topic: qa-foundations
confidence: author-material
updated: 2026-09-15
sources: [BBST Foundations Lecture 6 §Surrogate (or Proxy) Measures / We've Seen This Before (Coverage) / Distortion and Dysfunction / Recap (CC BY-SA 4.0, Kaner/Bach, bbst.courses)]
related: [qa/foundations/metrics-distortion-surrogate-measures, qa/foundations/coverage-multidimensional]
summary: bug 數量、覆蓋率、出貨曲線等替代指標一旦綁績效或催出貨，會誘發挑軟柿子、灌水拆分、延後回報等具體博弈行為。
---
## 定義
具體到測試情境，替代指標（見 `metrics-distortion-surrogate-measures`）被拿來考核或催出貨日期時，常見三種博弈行為：用 bug 數量獎勵測試員，測試員會傾向少寫測試文件、少互相輔導、把同一個失敗拆成多個變體回報以衝數字，卻減少難度高但真正重要的缺陷調查；用結構覆蓋率衡量測試完整度，會誘使工程師寫大量只為了跑過那行程式碼的低品質測試；用每週新增 bug 數畫出的曲線推算出貨日期，專案前期會被誘導去找大量容易的重複性 bug 衝高早期數字，後期則出現延後回報、把不相關缺陷歸類成重複、把測試員調去做不相關工作等一系列刻意壓低數字的行為。

## 原理
這三種模式的共通點是：測試員的行為永遠會朝「讓數字好看」而非「讓產品變好」收斂，因為數字才是被獎懲的對象。越接近出貨日期，這個誘因越強，因為此時「數字好看」與「保住時程／考績」的關聯最直接，這些行為都與找出真正重要的缺陷背道而馳。

## QA 視角
- 常見缺陷：團隊為了衝高覆蓋率或 bug 數字，優先挑容易寫、容易抓的低價值測試或缺陷，難測但風險高的區域反而被系統性忽略。
- 常見缺陷：出貨前夕觀察到本週新增 bug 數下降就直接判斷品質轉好、可以準備出貨，未排除是測試員被要求減少回報、或把心力轉去做狀態彙報等非測試工作所致。
- 常見缺陷：把同一個根本缺陷拆成多筆回報，或反過來把不同根因的缺陷合併標記為重複，以配合當期指標好看，事後追蹤時完全失去真實的缺陷分布資訊。
