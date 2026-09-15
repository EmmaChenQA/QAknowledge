---
id: qa/foundations/coverage-multidimensional
title: 覆蓋率的多種定義與侷限（Coverage is Multidimensional）
aliases: [test coverage, 測試覆蓋率, structural coverage, 結構覆蓋率, statement coverage, branch coverage, 敘述覆蓋率, 分支覆蓋率, coverage 迷思]
tags: [testing-fundamentals, coverage, metrics]
topic: qa-foundations
confidence: author-material
updated: 2026-09-15
sources: [BBST Foundations Lecture 4 §Coverage / Structural Code Coverage / Complete Coverage / Other Coverages / Coverage as a Measurement (CC BY-SA 4.0, Kaner/Bach, bbst.courses)]
source_lang: en
related: [qa/foundations/exhaustive-testing-impossible, qa/foundations/metrics-distortion-surrogate-measures]
summary: 覆蓋率是某類事物中已測比例，可依任何清單定義，任一單一覆蓋率再高都不等於測試完整。
---
## 定義
覆蓋率指某種特定類型的可能測試中，已完成測試的比例——分子是已測數量，分母是該類型全部可能的數量。最常被討論的是結構覆蓋率，包含敘述覆蓋率（執行到每一行程式碼）、分支覆蓋率（執行到每個判斷的兩個分支）、多條件覆蓋率（邏輯運算式的所有組合都測過）。但覆蓋率不限於程式碼結構——任何能列成清單的東西都能拿來算覆蓋率，例如規格條款覆蓋率、UI 元件覆蓋率、設定組合覆蓋率、風險項目覆蓋率等，實務上見過的覆蓋率類型遠比教科書列的結構覆蓋率豐富。

## 原理
即使做到 100% 敘述與分支覆蓋率，仍會漏掉大量明顯缺陷，因為這類測量對程式的許多面向視而不見，包括未預期的極端值、變數在邊界值時的穩定性、資料組合、資料流、遺漏的程式碼（研究顯示近半數缺陷源自該寫的沒寫，而非寫錯）、時序、與其他系統或背景工作的互動、使用者介面錯誤等。結構覆蓋率只看程式碼的一個切面，黑箱測試人員也很難直接量測它，通常要靠程式端工具。更根本的問題是：一旦把某種覆蓋率拿來當測試完成度的績效指標，人會傾向優化被測量的東西、犧牲沒被測量的東西——追求高覆蓋率容易催生大量低價值、只為了跑過那一行程式碼而寫的測試，反而稀釋了真正有找 bug 能力的測試案例。

## QA 視角
- 怎麼測：規劃測試涵蓋面時，主動列出對這個功能而言哪些清單值得算覆蓋率（規格條款、輸入等價類、狀態轉移、角色權限組合、瀏覽器裝置組合），而不是預設只看程式碼結構覆蓋率。
- 常見缺陷：把覆蓋率達標直接等同於測試做完了，忽略覆蓋率天生對資料組合、時序、遺漏程式碼等面向視而不見。
- 常見缺陷：單元測試覆蓋率很高但都是為了衝數字而寫（斷言薄弱、只是把敘述跑過一次），真正的邏輯錯誤沒被任何斷言攔到。
- 常見缺陷：只追蹤單一種覆蓋率當指標，導致測試員把心力集中在容易衝高那項指標的測試類型上，風險最高但難衡量覆蓋的部分（如併發、跨系統整合）長期被忽略。
