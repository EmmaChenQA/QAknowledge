---
id: qa/exploratory/story-evolving-into-test-hypothesis-design
title: 故事演化成測試：假說式測試設計流程
aliases: [假說式測試設計, hypothesis-driven testing, 故事演化成測試, story evolving into test, 從失敗故事設計測試, 測試假說磨嚴苛, FMEA]
tags: [test-design, exploratory-testing, hypothesis, risk-based-testing]
topic: qa-exploratory
confidence: author-material
updated: 2026-09-15
sources: [Kaner "Exploratory Testing" BBST Fall 2006 lecture slides 50-57 (CC BY-SA 2.0)]
source_lang: en
related: [qa/exploratory/test-idea-to-test-design-challenge]
summary: 從失敗案例拆出多個假說，逐步把測試磨嚴苛，直到有信心判斷假說是否成立，是從風險出發設計測試最具體的操作方法。
---
## 定義
「故事演化成測試」是 Kaner 提出的假說式測試設計流程，用來把一則抽象的失敗故事逐步磨成具體可執行、能真正檢驗假說是否成立的測試，是「從風險出發設計測試」這個挑戰裡最具體的一套操作方法。

## 原理
從一個真實或假設的失敗案例出發，針對可能造成這個失敗的成因產生多個假說（例如某智慧裝置在執行某功能時當機，可能假說包括野指標、堆疊溢位、不尋常的時序問題、資料的不尋常組合），然後把每個假說逐步磨成越來越嚴苛的測試，直到有信心「如果程式通過這一系列測試，這個假說大概就不是真正原因」為止；操作上可以先找一個看起來與失敗相關、有潛力的測試技法，設計出一個貼近失敗情境的起始範例來試跑，如果很容易就重現失敗就停手，重現不了就繼續打磨這個測試（強化這類測試原本擅長的強項，或刻意把測試延伸到這類技法通常不會特別強調的屬性上）。

## QA 視角
- 怎麼測：拿到一個籠統的風險描述（如「併發下可能扣款算錯」）時，先把它拆成幾個具體假說（鎖沒鎖對、讀寫順序有 race、重試導致重複扣款），再分別設計最容易驗證哪個假說成立的測試，而不是直接憑感覺寫一條測試就交差；測試沒重現預期的問題時，不要就此判定沒事，先問這個假說是不是還不夠嚴苛，調高強度（更極端的併發量、更邊界的輸入）再試一次。
- 常見缺陷：拿到抽象風險描述直接跳過假說拆解，設計出一條含糊、驗證不到具體成因的測試，測不出東西也不知道究竟排除了什麼可能性；同一個假說只用一種強度測過一次就結案，沒有逐步加壓到足以讓人相信這假說站不住腳的程度，漏掉只在極端情境才現形的缺陷。
