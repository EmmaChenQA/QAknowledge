---
id: qa/test-design/test-technique-classification-dimensions
title: 測試技法的分類維度（Test Technique Classification Dimensions）
aliases: [技法分類, 如何選測試技法, scope coverage testers risks activities oracle, 測試策略七要素, technique attributes, 測試技法怎麼選]
tags: [test-design, test-strategy, technique-selection]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 1 §Driving Ideas Behind Many Techniques / Classifying the Techniques, CC BY-SA 4.0, Kaner/Fiedler, bbst.courses]
source_lang: en
related: [qa/test-design/risk-based-testing-fundamentals, qa/test-design/domain-testing-equivalence-boundary]
summary: 每個測試技法只回答範圍/覆蓋/執行者/風險/做法/oracle/目標中的一到三項，選技法要看它補了哪一塊、漏了哪一塊。
---
## 定義
測試技法（test technique）是一套設計、執行、解讀測試結果的方法。任何一個技法通常只針對以下七個面向中的一到三項給出具體指引，其餘面向留給測試員自行填補：範圍（測什麼）、覆蓋（測多完整）、執行者（誰來測）、風險（在找哪種問題）、做法（怎麼實際操作）、評估依據／oracle（怎麼判斷通過或失敗）、目標結果（是否服務於某個特定決策或文件）。例如「功能測試」只講清楚範圍（逐一測每個功能）和覆蓋（每個功能都測到），完全沒講該由誰測、要抓哪種缺陷、怎麼操作、怎麼判定結果。

## 原理
同一個技法可能因為使用意圖不同而被歸到不同類別——例如功能整合測試，若你在檢查「每個功能跟其他功件搭配是否正常」就是覆蓋導向；若你心裡有一套「功能互動會怎麼出錯」的理論，同一個技法就變成風險導向。這代表分類本身不是技法的固有屬性，而是使用者當下關注的面向。這也是為什麼死記技法清單沒有用：技法之間的差異不在名稱，而在它們各自把七個面向中的哪幾項講清楚、哪幾項留白。

## QA 視角
- 怎麼測：面對一個新技法或新方法論，先問「它明確講了七個面向中的哪幾項，又留白了哪幾項」，再用其他技法或自己的判斷把留白處補上（例如功能測試沒講 oracle，就另外決定用規格比對還是回讀資料庫判定通過）；規劃測試計畫時，把待測系統的風險清單、覆蓋清單、可用執行者分開列，再挑技法逐一對應，而不是先選一個技法再削足適履。
- 常見缺陷：把技法當成一次性套用的「配方」，忽略它留白的面向沒人補，導致測試看似做了但漏了關鍵判斷依據（如只做了功能覆蓋、卻沒人定義失敗如何判定）；混用兩個技法時沒意識到它們在同一面向給出矛盾指引（例如覆蓋導向要求測完全部，風險導向卻要求只測高風險項），計畫互相打架卻沒人發現；把「覆蓋率達成」等同於「風險已被涵蓋」，實際上覆蓋率只保證某個面向被走過，不保證抓到對應風險。

