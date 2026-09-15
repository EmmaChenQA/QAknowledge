---
id: qa/test-design/risk-based-testing-fundamentals
title: 風險導向測試的核心與風險三維度（Risk-Based Testing Fundamentals）
aliases: [risk-based testing, 風險導向測試, 風險三維度, how could fail likely consequence, 測試策略 context, information objectives, 資訊目標驅動測試]
tags: [risk-based-testing, test-strategy, prioritization]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 2 §Risk / Risk-Based Testing / Everyone Tests in a Context / Common Information Objectives, CC BY-SA 4.0, Kaner/Fiedler, bbst.courses]
related: [qa/test-design/htsm-guidewords, qa/test-design/failure-mode-catalog-fmea, qa/test-design/project-risk-heuristics, rd/backend/fault-injection-chaos-engineering]
summary: 風險導向測試的本質是「想像程式怎麼壞、設計測試去逼出這個壞」，但排優先序時常見誤區是只想機率、漏想後果與利害關係人。
---
## 定義
風險是「受害或受損的可能性」。在測試脈絡下，風險有三個維度：程式可能以什麼方式失敗（how could fail）、這種失敗發生的機率有多高（how likely）、失敗發生後的後果有多嚴重（what consequences）。對測試設計者而言，最核心的是第一個維度：想像程式可能怎麼壞，然後設計測試去揭露這種潛在失敗。機率與後果則更偏向專案管理層級的優先排序依據，決定要花多少資源去追這個風險。測試策略（testing strategy）是在特定專案情境（context）與資訊目標（information objectives）之下，決定要採用哪些測試技法的指導框架——沒有放諸四海皆準的「最佳做法」，只有「在目前的限制下能做到最好」。

## 原理
每個測試都在一個有限資源、有限時間的情境裡進行，測試不可能窮盡；同一種產品在不同專案情境（舊產品已有大量自動化迴歸腳本 vs. 新產品時程緊測試員不會寫程式但懂業務）下，最合理的測試策略完全不同，因為驅動策略的不是「產品像什麼」而是「這次要滿足誰的什麼資訊需求、在什麼限制下」。常見的資訊目標包括找出重要缺陷、評估產品品質、協助管理者做出貨決策、擋下不成熟的出貨、評估與其他產品的互通性等——不同目標會導出完全不同的測試工具與策略選擇，也會產出不同形式的測試文件與結果。

## QA 視角
- 怎麼測：規劃測試前先問清楚這次測試服務哪個資訊目標（找缺陷？評估出貨風險？合規稽核？），再回頭決定策略；針對風險三維度分別記錄——先窮舉「可能怎麼壞」，再標註「機率」與「後果」，避免只用其中一項排序；後果評估要具體問「誰會受影響、影響有多大」而不是抽象打分數。
- 常見缺陷：只憑機率高低排優先序，忽略低機率但高後果（如資金/資料損毀）的風險應該優先測，導致嚴重但罕見的缺陷被排到最後才測甚至沒測到；套用別的專案或別人推薦的「最佳實務」測試策略，沒有先核對自己專案的情境（時程、團隊技能、既有測試資產）是否適用，導致策略與實際限制脫節、執行不下去；把「風險已被想到」誤當「風險已被測試涵蓋」，列出風險清單後沒有對應設計測試去實際驗證，清單淪為擺設。

