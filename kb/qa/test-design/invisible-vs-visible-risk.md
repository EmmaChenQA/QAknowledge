---
id: qa/test-design/invisible-vs-visible-risk
title: 隱性風險與可見風險（Invisible Risk vs Visible Risk）
aliases: [invisible risk, 隱性風險, visible risk, 可見風險, silent failure, 靜默失敗, 主動偵測缺陷, 資料緩慢腐化]
tags: [risk-based-testing, prioritization, test-strategy]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 2 §Project-Level Risk Analysis / Project Risk Heuristics: Where to Look for Errors, CC BY-SA 4.0, Kaner/Fiedler, bbst.courses]
source_lang: en
related: [qa/test-design/project-risk-heuristics, qa/test-design/failure-mode-catalog-fmea]
summary: 失效不會被立刻發現的隱性風險最容易被低估，因為沒有立即回饋迴路，必須主動設計偵測手段
---
## 定義
專案風險線索中最容易被忽略的一類，是失效時不會被立刻發現的隱性風險（invisible risk），跟失效時馬上被使用者發現、造成明顯抱怨的可見風險（visible risk）相對。可見風險靠使用者回報就能自然浮現，隱性風險則不會——它可能潛伏在背景計算、非同步任務、累積型統計、很少被人工核對的資料流程裡。

## 原理
隱性風險特別危險是因為它不會產生立即回饋迴路：沒人抱怨不代表沒問題，只是問題還沒被人發現，等到終於被發現時，可能已經累積造成更大的損害（例如長期累積才被發現的資料錯誤、報表偏差）。也因為缺乏回饋迴路，隱性風險無法靠「多觀察一陣子、看有沒有人反映」這種被動方式來判斷風險高低，必須主動設計偵測手段才會浮現。

## QA 視角
- 怎麼測：規劃測試時主動列出「哪些功能即使壞了使用者也不會馬上發現」（背景計算、非同步任務、累積型統計、對帳類流程），對這類功能特別設計主動偵測手段（如定期資料一致性稽核、監控告警、抽樣覆核），不要等使用者回報才發現；把隱性風險項目獨立列在測試計畫裡，避免它們因為「沒人抱怨」而被自然排到優先序最後。
- 常見缺陷：只憑「使用者會不會馬上抱怨」判斷風險高低，導致隱性風險（如背景計算錯誤、資料緩慢腐化）長期被排在測試優先序最後甚至完全沒被想到；沒有為隱性風險設計主動偵測手段，只依賴被動的使用者回報或客訴，等到問題被發現時往往已經累積大量錯誤資料，修復與清理成本遠高於及早發現。
