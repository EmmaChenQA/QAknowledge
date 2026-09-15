---
id: qa/exploratory/exploratory-tester-idea-generation-and-resource-skills
title: 探索式測試員的構思多樣性與資源累積技能
aliases: [探索式測試 heuristics, Satisfice heuristic test strategy model, 17種攻擊法, 測試資源庫, 測試構想多樣性, 覆蓋錯覺, 探索式測試技能不足藏不住]
tags: [exploratory-testing, skills, heuristics, coverage]
topic: qa-exploratory
confidence: author-material
updated: 2026-09-15
sources: [Bach "Exploratory Testing Explained" v1.3 §Practicing Exploratory Testing pp.5-6 (2002-2003), Kaner "Exploratory Testing" BBST Fall 2006 lecture slides 96-105 (CC BY-SA 2.0)]
related: [qa/exploratory/exploratory-tester-core-skills]
summary: 優秀探索式測試員靠啟發式清單放大構想多樣性、靠平常累積的資源庫加速施測，技能不足時問題會直接反映成覆蓋錯覺與重複測試。
---
## 定義
探索式測試員除了測試設計、觀察、批判性思考之外，還需要兩項支撐構思與效率的能力：能持續產生多樣化測試想法，以及平常就累積好可隨時取用的測試資源。Kaner 特別提醒，這兩項能力不足時，問題不會像腳本測試那樣被流程蓋住，而是直接反映成看得見的覆蓋漏洞。

## 原理
第四是產生多樣化想法的能力：優秀測試員能想出比新手更多、更好的測試構想，常借助啟發式（heuristics，如清單、口訣、經驗法則）達成，例如 Satisfice Heuristic Test Strategy Model、「17 種攻擊法」這類整理過的測試手法清單，團隊內測試者的背景與性格差異也可以透過集體腦力激盪放大這個效果。第五是豐富的資源庫：優秀測試員平常就累積工具、資訊來源、測試資料與可以請教的人脈，測試當下能敏銳察覺這裡可以用上哪個資源。Kaner 也提醒，探索式測試對技能不足的問題比腳本測試更容易藏不住——腳本測試就算測試者資淺，照著腳本跑至少能保證固定的覆蓋；探索式測試一旦測試者技能不足，問題會直接反映成覆蓋錯覺、重複測試、缺乏可追溯性等徵狀。

## QA 視角
- 怎麼測：測試前先花時間為手上的功能領域建立一份簡單的啟發式清單（常見輸入類型、常見狀態轉換、過去這類功能出過的缺陷模式），測試時主動比對這份清單找靈感，而不是空想；平常主動累積測試資源（可重用的測資、常用工具、熟悉這塊業務的人），測試當下才不必從零摸索。
- 常見缺陷：資淺測試者被指派做探索式測試卻沒有搭配輔助的啟發式清單或章程，測試想法枯竭後開始重複相同的操作而不自覺；長期不累積測試資源（工具、測試資料、可請教的人），每次探索都從零開始摸索，效率遠低於資深測試員。
