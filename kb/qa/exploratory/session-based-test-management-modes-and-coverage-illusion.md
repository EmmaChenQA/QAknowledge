---
id: qa/exploratory/session-based-test-management-modes-and-coverage-illusion
title: 管理模式與覆蓋錯覺（Session-Based Test Management）
aliases: [session 筆記, 探索式測試管理, delegation 委派模式, participation 參與模式, 覆蓋錯覺, coverage illusion, 探索式測試重複測試漏測]
tags: [exploratory-testing, test-management, session-based-testing, coverage]
topic: qa-exploratory
confidence: author-material
updated: 2026-09-15
sources: [Bach "Exploratory Testing Explained" v1.3 §Practicing Exploratory Testing, §Managing Exploratory Testing pp.4-7 (2002-2003), Kaner "Exploratory Testing" BBST Fall 2006 lecture slides 96-108 (CC BY-SA 2.0)]
source_lang: en
related: [qa/exploratory/exploratory-testing-coverage-and-session-tracking]
summary: SBTM 用 session 結束產物與委派／參與兩種管理模式，堵住沒有紀律的探索式測試最容易失分的覆蓋錯覺——不自覺重複測試或漏測整塊區域。
---
## 定義
session-based test management（SBTM）除了用章程與 session 界定範圍之外，還規範每段 session 結束後要交出的產物，以及主管介入測試團隊的兩種管理模式；這套機制的另一個目的是防堵探索式測試最容易失分的「覆蓋錯覺」。

## 原理
Session 結束後至少要能交出一組缺陷報告；在 SBTM 做法下還要交出書面筆記供主管審閱，可能連帶產生新的測試資料或更新過的測試素材。管理上有兩種模式：委派（delegation，主管訂章程、測試者自行設計執行並回報，定期開會問「你最近找到最有趣的 bug 是什麼，秀給我看」）與參與（participation，主管親自下場跟大家一起測，即時帶動策略方向）。Kaner 指出，沒有紀律的探索式測試最容易出現的失分點正是覆蓋層面的錯覺：在不自覺的情況下重複測同樣的東西、在不自覺的情況下漏掉整塊區域、對自己測試的深度或覆蓋範圍有錯誤的認知、稽核時因缺乏可追溯性而失敗——這些正是章程加 session 筆記機制想解決的問題。

## QA 視角
- 怎麼測：每個 session 結束一律留下書面筆記（測了什麼、跳過什麼、發現什麼），不只交缺陷報告；多人協作時，session 開始前先查閱其他人近期的 session 筆記，避免同一塊功能被重複探索、另一塊完全沒人碰過；主管採委派模式時，定期用「秀出你最近找到最有趣的 bug」這類提問檢視進度，而非只看有沒有交報告。
- 常見缺陷：探索式測試完全不留任何 session 筆記，事後被問測了哪些範圍答不出來，也無法重現找到的問題；連續多個 session 之間互相不知道彼此測過什麼，導致覆蓋錯覺——重複測同樣的東西或漏掉整塊區域卻不自覺。
