---
id: qa/foundations/exhaustive-testing-impossible
title: 為什麼窮舉測試不可能（The Impossibility of Complete Testing）
aliases: [完整測試不可能, exhaustive testing, complete testing, combinatorial explosion, 組合爆炸, 測試不完整]
tags: [testing-fundamentals, coverage, risk-based-testing]
topic: qa-foundations
confidence: author-material
updated: 2026-09-15
sources: [BBST Foundations Lecture 5 §Complete Testing / Test Every Input / The Basic Combination Rule / It's Not Just Configuration Testing (CC BY-SA 4.0, Kaner/Bach, bbst.courses)]
related: [qa/foundations/coverage-multidimensional, qa/foundations/path-sequence-testing-blind-spots, qa/foundations/sampling-strategy-design]
summary: 完整測試須窮舉所有輸入、組合、序列與時序，數量呈組合爆炸，實務上不可能做到。
---
## 定義
若要達到嚴格意義上完整的測試，必須測試每個變數的每個可能輸入值、測試每組變數的每種組合、測試程式的每一種可能執行序列、測試每種可能的輸入時序（含逾時與競態）、測試每個可能發生中斷的每個時間點、測試每一種硬體軟體設定組合、測試與其他同時運作程式的每種互相干擾方式，以及使用者可能嘗試的每一種用法。這份清單裡任何一項單獨拿出來看都已經是天文數字：一個只吃 32 位元整數輸入的函式就有超過 40 億種合法輸入；若有 K 個獨立變數各有不同取值數，總組合數是這些數字的乘積，實務常見的設定組合（印表機、顯示卡、驅動版本、記憶體等）動輒需要數百到數千次測試。

## 原理
測試員能運用的時間永遠遠小於窮舉所需的時間，所以窮舉在現實條件下不是選項——這不是工具或人力不足能解決的問題，而是組合數學本身的性質：即使把測試速度提高一百倍、一千倍，K 個變數的組合數仍以乘積成長，很快又被更大的 K 值或更多取值數追上，超越任何可運用的時間預算。因此完整測試在實務上不存在，測試員唯一能做的是有意識地選擇放棄檢查哪些組合，而不是假裝自己測過了全部（有策略的抽樣做法見 `sampling-strategy-design`）。

## QA 視角
- 怎麼測：明確承認這輪測試一定是不完整的抽樣，把「這次測了哪些、刻意放棄了哪些」寫清楚，供之後檢討與風險溝通。
- 常見缺陷：把所有測試案例都通過誤讀成這個功能沒問題，忽略測試案例集合本身就只是全部可能情境中極小的抽樣。
