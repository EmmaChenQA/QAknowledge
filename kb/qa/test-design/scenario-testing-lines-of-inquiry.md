---
id: qa/test-design/scenario-testing-lines-of-inquiry
title: 情境測試的系統化來源（Lines of Inquiry for Scenario Suites）
aliases: [情境測試來源, lines of inquiry, disfavored users, 反向使用者測試, tour, 巡覽, 單線索深入原則]
tags: [scenario-testing, test-design, coverage, risk-based]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 4 "Scenario Testing" p.297-315（CC BY-SA 4.0, Kaner/Fiedler, bbst.courses）]
source_lang: en
related: [qa/test-design/scenario-testing-story-elements, qa/test-design/scenario-testing-object-event-benefit-lines]
summary: 用固定提問線索系統化產生情境，一次只沿一條線索深入走完，而非隨意混合編故事
---
## 定義

要系統化地產生一整組可信情境，比較好的做法是一次只沿著一條「探詢線索」（line of inquiry）走，而不是把多條線索隨便混在一起編故事。常見的線索包括：列出可能的使用者類型並分析其興趣與目標；實地觀察真實使用者的操作方式；訪談使用者過去踩過的失敗經驗；找出使用者實際想完成的具體交易（如開戶、送出訂單）；整理常見的任務執行順序；考慮「不受歡迎的使用者」會怎麼濫用系統；列出使用者會處理的表單/文件；研究競品或前代系統的客訴紀錄；嘗試匯入前代系統的真實資料。另外三條特別值得展開的線索——物件生命史、系統事件、效益承諾——見〈情境測試的物件/事件/效益線索〉。

## 原理

單獨徹底地走完一條線索，效果就像一趟「巡覽」（tour）：即使情境測試整體無法保證程式碼覆蓋率，針對某一條線索深入覆蓋，仍能達到該面向的有意義覆蓋。反之，把多條線索隨意混在一起編故事，容易產生不連貫、可信度低的情境；先鎖定一條線索列出項目清單，再對清單上每一項分別套用情境建構問題（要素見「情境測試的故事要素」），才能兼顧系統性與可信度。

## QA 視角
- 怎麼測：規劃情境測試前，先從清單挑一條線索深入走完，而不是同時想很多條卻每條都淺；針對使用者導向的線索，不只從開發者角度想情境，主動納入「不受歡迎的使用者」（惡意刷單、濫用優惠、批量灌測試帳號）這條線；沿用競品或前代系統的資料匯入，事先訂好明確的判定依據（oracle），不能只憑「看起來正常」結案。
- 常見缺陷：只從開發者角度想情境，漏掉「不受歡迎的使用者」這條線，導致濫用類缺陷完全漏測；沿用競品或前代系統的資料匯入沒有明確的判定依據（oracle），測完「看起來正常」就結案，實際欄位對應早就錯了卻沒人發現。
