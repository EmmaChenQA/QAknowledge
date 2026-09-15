---
id: qa/foundations/path-sequence-testing-blind-spots
title: 路徑與循序測試的盲點（Path/Sequence Testing Blind Spots）
aliases: [path testing, 路徑覆蓋, data flow testing, 資料流測試, set-use pair]
tags: [testing-fundamentals, coverage, state]
topic: qa-foundations
confidence: author-material
updated: 2026-09-15
sources: [BBST Foundations Lecture 5 §Paths and Subpaths / Data Flows / Sequences / The Telenova Stack Failure (CC BY-SA 4.0, Kaner/Bach, bbst.courses)]
related: [qa/foundations/exhaustive-testing-impossible, qa/foundations/coverage-multidimensional, qa/foundations/cumulative-state-defects]
summary: 達到 100% 敘述與分支覆蓋率的少數路徑，仍可能漏掉資料流路徑，且覆蓋率天生量不到操作次數這個維度。
---
## 定義
一條路徑從程式進入點開始，到離開點結束；子路徑可以在任意地方起訖。達到 100% 分支覆蓋率通常只需要少數幾條路徑，但這遠不等於測過所有資料流路徑——資料流描述某變數在哪裡被設值、又在哪裡被使用，同一個變數常在不同分支被設成不同值，走完分支覆蓋的路徑組合未必涵蓋了每一組設值點與使用點的配對。此外，一個程式從進入點到離開點可能存在的完整序列數量，會隨著迴圈次數與分支數量以指數方式增長，即便是不算複雜、含有迴圈與少量分支的程式，可能路徑數也能輕易達到百兆量級。

## 原理
這類分析暴露出結構覆蓋率的深層盲點——不只是有沒有走過這條線，還有這個變數在這次執行裡實際被設成什麼值、又如何被後續程式碼使用。這個盲點還有更深一層：覆蓋率指標完全看不到「這次操作之前系統已經累積了多少次前面的操作」，因為覆蓋率是以單次執行為單位計算的；一個真實案例（電話交換機的通話保留堆疊溢位缺陷）示範了這個盲點如何造成生產事故，見 `cumulative-state-defects`。

## QA 視角
- 怎麼測：不要只驗證設值後立刻讀值這種最短路徑，也要驗證同一變數經過多個分支後最終被使用時是否被正確的值覆蓋，避免條件邏輯改動後悄悄回歸卻沒被抓到。
- 常見缺陷：把某個 bug 條件很極端、真實使用者不太可能碰到當成不用測的理由，卻低估了生產環境長時間、高併發運行下觸發這類邊角路徑的機率。
