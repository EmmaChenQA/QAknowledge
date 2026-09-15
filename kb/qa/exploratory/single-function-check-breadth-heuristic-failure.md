---
id: qa/exploratory/single-function-check-breadth-heuristic-failure
title: 單一功能檢查廣度啟發法 FAILURE
aliases: [FAILURE heuristic, Ben Simo FAILURE, 功能檢查廣度, 單一測試案例檢查面向, Recovery 面向測試, Log 面向測試, 情緒反應測試]
tags: [test-heuristic, test-design, regression-testing]
topic: qa-exploratory
confidence: author-material
updated: 2026-09-15
sources: [Test Heuristics Cheat Sheet p6（CC BY-SA 4.0，原創者 Karen N. Johnson、Ben Simo，經 Ministry of Testing 彙整）]
source_lang: en
related: [qa/exploratory/risk-based-regression-heuristics-rcrcrc-failure]
summary: 七字訣定單一功能檢查廣度，避免只驗證表面功能正確就放行，漏掉日誌、連帶影響、異常恢復等面向。
---
## 定義
FAILURE（Ben Simo）是一組記憶口訣，用來決定「怎麼具體檢查一個功能是否失敗」，解決的是單一測試案例的檢查廣度問題，避免只驗證表面功能正確就放行。

## 原理
FAILURE 七個字母對應一個功能點要檢查的七個面向：Functional（功能本身是否正確）、Appropriate（結果是否符合當下情境，不只是技術上正確而是脈絡上合理）、Impact（這個行為對其他功能或資料有沒有連帶影響）、Log（系統日誌／紀錄是否正確寫入，供事後稽核）、UI（畫面呈現是否正確）、Recovery（發生錯誤後系統能否正常恢復，而不是卡死或損毀資料）、Emotions（使用者操作當下的情緒反應，例如是否感到困惑、挫折，即使功能技術上沒有錯）。

## QA 視角
- 怎麼測：針對任何單一測試案例，除了驗證畫面顯示正確（UI）之外，額外用 FAILURE 檢查該操作有沒有寫入正確的稽核日誌（Log）、有沒有波及其他關聯功能（Impact），並刻意讓它失敗一次觀察系統能否正常恢復（Recovery）。
- 常見缺陷：功能操作本身結果正確，但相關的稽核日誌或通知沒有觸發（Log 面向遺漏），事後稽核或客訴時查無紀錄；系統在異常情境下（如網路中斷）沒有回到可用狀態而是卡死或資料半寫入（Recovery 面向失敗），但因為正常路徑都測過而被放行。
