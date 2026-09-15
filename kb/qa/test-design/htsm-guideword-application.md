---
id: qa/test-design/htsm-guideword-application
title: HTSM 引導詞套用法（單獨套用 vs 交叉組合）
aliases: [guideword crossing, 引導詞交叉組合, HTSM 套用法, cross guideword, 引導詞維護, 測試想法轉測試案例]
tags: [test-strategy, exploratory-testing, risk-based-testing]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 2 §Using HTSM to Guide Testing, CC BY-SA 4.0, Kaner/Fiedler, bbst.courses]
source_lang: en
related: [qa/test-design/htsm-guidewords]
summary: 引導詞可單獨套用或交叉組合逼出更細緻風險，但產出仍需轉成實際測試案例並隨專案更新
---
## 定義
引導詞（見〈啟發式測試策略模型的引導詞〉）不是列出來看看就好，實際套用時有固定操作法：先挑一個引導詞（例如「介面」），系統性列出待測系統所有符合這個引導詞的面向，再逐一問「這裡可能出什麼問題」。引導詞也可以跨類別組合使用（例如「產品元素：介面」交叉「專案環境：任務」），或同類別內組合（例如「產品元素：介面」交叉「產品元素：資料」），藉由交叉組合逼出單獨思考不會想到的風險角度。

## 原理
交叉組合之所以有效，是因為單一引導詞掃過一輪容易停在表面（列出面向卻想不出具體風險），把兩個引導詞疊在一起問「這兩者交會處會出什麼問題」，能逼出比單獨思考更細緻的測試想法；但這個過程產出的是風險/測試想法清單，還不是可執行的測試案例，必須再轉換一次才算完成，否則整套引導詞套用就只停在腦力激盪階段。

## QA 視角
- 怎麼測：針對一個複雜功能，嘗試交叉組合兩個引導詞（如「資料」交叉「時間」＝資料的時效性問題）來逼出更細緻的測試想法；每輪套用引導詞產出的想法，當場轉成具體測試案例或至少記錄成待辦，不要停留在腦力激盪清單；HTSM 隨專案演進要更新，新增的產品元素或品質風險應納入下一輪測試規劃，不是測完一次就丟。
- 常見缺陷：只用引導詞掃過一輪就結束，沒有把每個引導詞下產出的風險想法轉成實際測試案例，清單停在腦力激盪階段；把 HTSM 當成一次性文件，測完就丟，沒有隨專案演進更新，新增的產品元素或品質風險沒有被納入下一輪測試規劃。
