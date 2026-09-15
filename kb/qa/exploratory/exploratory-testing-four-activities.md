---
id: qa/exploratory/exploratory-testing-four-activities
title: 探索式測試的四個認知活動（學習/設計/執行/詮釋）
aliases: [探索式測試, exploratory testing, ET, 同時學習設計執行, simultaneous learning design execution, 探索式測試定義, ad hoc testing, 即興測試, 邊測邊學]
tags: [exploratory-testing, test-design, cognition, learning]
topic: qa-exploratory
confidence: author-material
updated: 2026-09-15
sources: [Kaner "Exploratory Testing" BBST Fall 2006 lecture slides 32-70 (CC BY-SA 2.0), Bach "Exploratory Testing Explained" v1.3 §Exploratory Testing Defined pp.1-3 (2002-2003)]
source_lang: en
related: [qa/exploratory/scripted-vs-exploratory-when-to-use, qa/exploratory/exploratory-testing-common-misconceptions]
summary: 探索式測試不是單一動作，是學習、設計、執行、詮釋四個認知活動同時進行、互相回饋，測試者隨時決定下一步。
---
## 定義
Kaner 把探索式測試定義為一種測試風格：強調測試者個人的自由與責任，透過把「測試相關學習」「測試設計」「測試執行」「測試結果詮釋」當作互相支援、貫穿全程平行進行的活動，持續優化自己工作的價值。Bach 給出更精簡的定義：探索式測試是「同時進行的學習、測試設計與測試執行」——測試者主動掌控測試設計，邊執行邊用測試中學到的資訊設計出更好的下一個測試。兩人的定義並非對立，是同一件事的兩種切法：Kaner 拆成四段認知活動，Bach 強調三者同時發生這個核心機制，並額外指出詮釋（判斷 pass/fail）也是不可分割的一環。

## 原理
四個活動的內容各不相同：學習是任何能指引「測什麼、怎麼測、怎麼辨認問題」的資訊來源（專案脈絡、失敗歷史、規格、心智模型）；設計是把計畫在腦中構思出來（設計不等於腳本，計畫的文字化表示不是計畫本身，探索者的設計仍可重複使用）；執行是實際跑測試並蒐集結果，可自動化也可手動；詮釋是判斷程式在這次測試下的表現告訴我們什麼——關於產品本身，也關於我們測試方法本身。Bach 用拼圖比喻：解拼圖時不會先把所有步驟寫好才動手，而是一邊摸索邊看圖案浮現，策略隨之調整，這正是「探索改變了探索本身」的核心洞察，對測試、開發、科學研究、偵探辦案都成立。

## QA 視角
- 怎麼測：每完成一個小測試，先問「這結果告訴我什麼」再決定下一步，而不是機械跑完預先列好的清單；把當下學到的東西（新發現的欄位、意外行為、可疑的日誌訊息）立刻轉成下一個測試的輸入；刻意在測試過程中交替「執行」與「回頭想」，避免陷入單一節奏。
- 常見缺陷：把探索式測試簡化成「隨便點點看」，跳過學習與詮釋兩段，測完不知道自己驗證了什麼；測試者只顧埋頭執行，沒有把「這次結果」回饋進下一步設計，導致測試路徑重複或錯過線索；把設計等同於寫腳本，誤以為沒寫成正式步驟就不算「有設計」，因而低估自己測試的系統性。
