---
id: qa/exploratory/exploratory-testing-common-misconceptions
title: 探索式測試常見誤解
aliases: [探索式測試迷思, exploratory testing myths, ad hoc 測試, ad hoc testing, 探索式測試沒紀錄, 探索式測試沒方法, 探索式測試等於亂測]
tags: [exploratory-testing, misconceptions, testing-discipline]
topic: qa-exploratory
confidence: author-material
updated: 2026-09-15
sources: [Kaner "Exploratory Testing" BBST Fall 2006 lecture slides 73-90 (CC BY-SA 2.0), Bach "Exploratory Testing Explained" v1.3 pp.1, 9-10 (2002-2003)]
related: [qa/exploratory/exploratory-testing-four-activities, qa/exploratory/exploratory-tester-core-skills, qa/exploratory/exploratory-testing-scope-and-method-misconceptions]
summary: 探索式測試常被誤當成隨便亂測、沒有紀錄、沒有方法；實際上它有明確可回溯的測試故事，區分有紀律的探索與真正的隨性亂測。
---
## 定義
探索式測試（ET）常被和「隨便亂測」「沒有紀錄」「沒有方法」畫上等號，Kaner 與 Bach 都直接反駁這種等同。Bach 特別指出 ET 又稱 ad hoc testing，但 ad hoc 一詞在日常用法裡太容易被理解成「馬虎草率」，這正是 Context-Driven School 在 1990 年代初改用「exploratory」一詞的原因——為了強調不經腳本的測試背後其實有主導性的思考過程，並把它發展成一門可教的學問。

## 原理
Bach 用親身案例反駁「ET＝沒紀錄」：他測試一套修圖軟體時，能清楚說出測了什麼、沒測什麼、測試怎麼跟任務目標對應，即使測試想法是臨場想到而非事先寫在文件裡——這種「說得出測試故事」的可追溯性，正是區分「有紀律的探索」與「真正的隨性亂測（unsystematic ad hoc testing）」的分界線：後者是連自己測過什麼、測試策略是什麼都說不出來、也無法重現失敗。

## QA 視角
- 怎麼測：探索過程中隨手記下做了什麼操作、看到什麼結果、接下來為什麼這樣測，讓事後能重述測試故事，而不是只留下一句「測過了，沒問題」。
- 常見缺陷：把探索式測試等同於「不用寫任何東西」，測完交不出測試範圍與覆蓋說明，稽核時完全無法回溯；把「隨性亂測」的壞名聲全部歸咎於探索式測試，反而讓真正有紀律的探索式測試被連坐貼上不專業標籤。
