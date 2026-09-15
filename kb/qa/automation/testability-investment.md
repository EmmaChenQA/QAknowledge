---
id: qa/automation/testability-investment
title: 投資可測試性——工具能發揮作用的前提
aliases: [testability, 可測試性, observability可觀察性, controllability可控制性, 產品設計影響自動化成本, 內建可測試性]
tags: [automation, testability, product-design, observability]
topic: qa-automation
confidence: author-material
updated: 2026-09-15
sources: [A Context-Driven Approach to Automation in Testing, Bach & Bolton 2016 §Invest in testability, p.15（Satisfice Inc. 版權所有，作者免費公開，非CC授權）]
related: [qa/automation/gui-automation-practical-limits, qa/automation/automation-value-evaluation-not-labor-replacement]
summary: 可測試性是產品設計內建的特質，決定工具介入測試時省不省力，不是測試端能單方面補救的。
---
## 定義
可測試性是產品設計本身內建的一組特質，決定了工具介入測試時省不省力，主要包含可觀察性（系統的狀態與輸出能不能被看到、被讀取到）與可控制性（系統能不能被工具方便地操作、設定到指定狀態）。可測試性差的產品不是工具寫得不夠好造成的，是產品本身在設計階段沒有替後續要跟它互動的工具留下接口。

## 原理
工具要能可靠操作產品、可靠讀出產品的狀態，前提是產品願意把這些接口暴露出來，例如有可程式化呼叫的介面、有結構清楚容易解析的紀錄檔。用標準控制項建構的介面通常比用大量自製客製控制項堆出來的介面更容易被工具辨識與操作；有明確 API 的系統通常比只能透過畫面互動的系統更容易被穩定驗證。可測試性沒有內建進產品，測試團隊後續投入再多自動化人力，也只是在彌補設計階段留下的缺口，成本永遠比一開始就把可測試性納入設計考量來得高。

## QA 視角
- 怎麼測：新功能開發階段就主動要求提供可程式化驗證的入口（API、可查詢的內部狀態、結構化紀錄檔），不要等到功能做完才回頭想辦法用畫面湊出驗證方式。
- 怎麼測：遇到自訂控制項（非標準下拉選單、自繪元件）導致自動化工具讀不到狀態時，回報這個現象給開發，作為下次設計可測試性的具體案例，而不是每次都在測試端想辦法繞過。
- 常見缺陷：功能上線後才發現關鍵狀態完全無法從畫面外部查證，只能靠肉眼看畫面顯示，回歸測試時效率極差且容易漏判。
- 常見缺陷：客製控制項沒有暴露標準屬性給自動化工具讀取，導致同一個判斷邏輯在不同頁面要用不同繞路寫法實作，維護成本倍增。
- 常見缺陷：日誌紀錄格式不固定、關鍵欄位時有時無，讓原本可以用程式比對日誌驗證的檢查，退化成得靠人工肉眼掃描。
