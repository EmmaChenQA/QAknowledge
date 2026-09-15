---
id: qa/automation/checking-vs-testing-distinction
title: checking 與 testing 的分野（自動化能做什麼不能做什麼）
aliases: [checking vs testing, 檢查與測試的差異, output checking, 演算法規則比對, 好的checking是testing的子集, 自動化的邊界]
tags: [automation, oracle, testing-philosophy, checking]
topic: qa-automation
confidence: author-material
updated: 2026-09-15
sources: [A Context-Driven Approach to Automation in Testing, Bach & Bolton 2016 §Second: Think of testing as much more than output checking / Distinguish between checking and testing, pp.6-8（Satisfice Inc. 版權所有，作者免費公開，非CC授權）]
related: [qa/foundations/oracle-problem, qa/foundations/testing-as-information-service, qa/exploratory/scripted-vs-exploratory-when-to-use]
summary: 自動化能可靠做套規則比對的 checking，做不到需要人類學習與判斷的 testing。
---
## 定義
把「用固定規則判斷觀察結果」與「透過探索和實驗建立對產品狀態的理解」這兩件事分開來看。前者只要有明確的規則與預期值，機器就能可靠重複執行判斷；後者依賴人對情境的學習、對「合理」與「異常」的當下判斷，這個判斷會隨測試員對產品理解加深而不斷調整，本質上不是一套能事先窮舉完的規則。

## 原理
通過一組預先寫死的比對，不等於「這個功能沒問題」，只代表「目前設定的規則沒被違反」。品質評估是一個持續修正的假設，不是一次性可驗證的事實，因為沒被抓到的問題永遠可能存在，也可能在條件改變後才浮現。有價值的自動化檢查，一定是先由懂測試的人設計出該檢查什麼、在什麼情境下檢查、看到什麼結果算異常，機器只是照設計執行比對動作，因此這類檢查應被理解成整套測試思考裡的一個環節，而不是能獨立取代測試判斷的東西。

## QA 視角
- 怎麼測：把現有自動化腳本逐支攤開問「這支到底在斷言什麼規則」，找出只斷言 HTTP 狀態碼或頁面沒崩潰、卻沒斷言業務語意（金額、狀態、文案）的腳本，補斷言或明確標成煙霧測試而非功能驗證。
- 怎麼測：自動化全綠時額外挑一兩條路徑用探索方式走一遍，刻意找腳本涵蓋規則之外的異常組合，驗證全綠不是因為問題剛好落在腳本沒斷言到的地方。
- 常見缺陷：腳本斷言寫得太寬鬆（只驗證頁面有回應、沒有 500），實際業務邏輯錯誤仍全數放行，是最隱蔽的漏測型態。
- 常見缺陷：把「自動化跑過」直接當成「這個功能沒問題」寫進驗收結論，沒有人再用眼睛看過實際畫面或資料。
- 常見缺陷：新增功能時只補了新的自動化斷言，沒有人做過一次探索式測試找規則之外的問題，導致只找得到已經想得到要防的錯。
