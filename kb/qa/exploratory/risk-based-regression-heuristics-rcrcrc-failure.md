---
id: qa/exploratory/risk-based-regression-heuristics-rcrcrc-failure
title: 風險導向回歸測試範圍優先順序啟發法 RCRCRC
aliases: [RCRCRC, regression testing scope, 回歸測試範圍, risk-based regression, Karen Johnson RCRCRC, 回歸測試優先順序]
tags: [regression-testing, risk-based-testing, test-heuristic]
topic: qa-exploratory
confidence: author-material
updated: 2026-09-15
sources: [Test Heuristics Cheat Sheet p6（CC BY-SA 4.0，原創者 Karen N. Johnson、Ben Simo，經 Ministry of Testing 彙整）]
source_lang: en
related: [qa/exploratory/single-function-check-breadth-heuristic-failure]
summary: 六字訣定回歸測試優先順序，時間有限、不可能每次全部回歸時，用來決定先測哪些、後測哪些。
---
## 定義
RCRCRC（Karen N. Johnson）是一組記憶口訣，用來決定「有限時間內回歸測試該優先測哪裡」，解決的是測試範圍的優先順序問題。

## 原理
RCRCRC 六個字母對應六個問句：Recent（最近異動的程式碼周邊該想到什麼測試）、Core（哪些是絕對不能壞的核心功能）、Risky（哪些功能或程式碼區塊本質上風險較高，例如金流、併發、第三方整合）、Configuration Sensitive（哪些程式碼的行為依賴環境設定，換一個環境跑就可能不同）、Repaired（哪些程式碼是為了修某個缺陷而改過的，改完可能又製造新問題）、Chronic（哪些功能是過去測試紀錄裡經常反覆壞掉的老毛病）。這六個角度合起來構成一份回歸測試的優先順序清單，在時間有限、不可能每次全部回歸的情況下，用來決定先測哪些、後測哪些。

## QA 視角
- 怎麼測：拿到一份修改清單準備排回歸測試優先順序時，先用 RCRCRC 六個角度各列出對應的功能點，再依「風險高且核心」優先、「組態敏感但邊緣功能」次之的順序排測試計畫，而不是照票號順序或碰運氣測。
- 常見缺陷：只測改動的那一行程式碼對應的功能，沒有回頭測「這段程式碼被哪些其他功能共用」（Core 漏測），導致修好 A 壞了 B；過去測試紀錄裡反覆出現同一個功能壞掉（Chronic），但每次都當新缺陷處理，沒有把它排進固定回歸清單優先測。
