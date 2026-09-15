---
id: qa/test-design/quicktest-theory-of-error
title: 速測與錯誤理論（Quicktests and Theory of Error）
aliases: [quicktest, 速測, theory of error, 錯誤理論, 常見錯誤清單, extreme value testing, 極端值測試, 速測主題清單]
tags: [quicktest, risk-based-testing, exploratory-testing]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 2 §Quicktests / Common Ideas for Quicktests / Quicktests Have Limits, CC BY-SA 4.0, Kaner/Fiedler, bbst.courses]
source_lang: en
related: [qa/test-design/domain-testing-equivalence-boundary, qa/test-design/risk-based-testing-fundamentals, qa/test-design/quicktest-interference-stale-value]
summary: 速測是針對「常見到值得專門優化」的錯誤類型設計的低成本測試，威力大但不能取代深入的風險分析
---
## 定義
速測（quicktest）是一種便宜、容易設計、不需要太多產品知識或準備時間就能執行的測試。每個速測背後都有一套「錯誤理論」（theory of error）：如果某類錯誤在許多不同應用程式、不同平台上都常見到一定程度，就值得針對這類錯誤設計專門優化的測試技法。常見的速測主題包括邊界值、溢位/下溢、非法運算、初始狀態、修改後的值殘留、控制流程錯誤、長序列重複操作、訊息損毀、時序/競爭條件、干擾測試、錯誤處理、失敗後處理、檔案系統邊界、負載、設定組合、多變數關係等；其中干擾測試與修改後的值殘留兩類的具體操作法，見〈速測技法：干擾測試與殘留值測試〉。

## 原理
速測之所以能黑箱進行而不必靠程式碼檢視，是因為測試員刻意選擇了成本效益比極高的切入點：只要某類錯誤發生的頻率夠高，即使不深入了解系統內部設計，也能用一套標準化、低知識門檻的操作把它逼出來。但速測的威力來自「常見錯誤」這個前提，一旦離開這個前提，速測就失去優勢——例如計算類邏輯通常涉及多個變數要精確搭配才能構造出有效測試，很難只靠速測公式化操作命中，需要測試員真正理解系統在算什麼。

## QA 視角
- 怎麼測：把速測當成測試的起手式，用來快速掃出常見缺陷（如邊界誤判、初始值未正確設定），節省下來的時間留給需要深入理解業務邏輯的部分。
- 常見缺陷：把速測當成探索式測試的全部內容，誤以為套完一輪常見速測清單就等於做完了風險分析，實際上速測只覆蓋「常見到值得標準化」的錯誤類型，抓不到該系統特有的深層邏輯缺陷；計算類功能只用速測（如塞極端值）驗證，沒有真正拆解業務公式逐項驗證，導致看似測過但關鍵計算邏輯沒被驗證到。
