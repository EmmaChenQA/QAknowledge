---
id: qa/test-design/domain-testing-best-representative-scope
title: 最佳代表與領域測試範圍擴展（Best Representative & Domain Testing Scope）
aliases: [best representative, 最佳代表值, domain testing scope, 領域測試範圍, 輸出值域邊界, 多變數組合邊界, 2月30日]
tags: [domain-testing, boundary-value, equivalence-partitioning, test-design]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 1 §Best Representative Testing / Domain Testing, CC BY-SA 4.0, Kaner/Fiedler, bbst.courses]
related: [qa/test-design/domain-testing-equivalence-boundary, qa/test-design/domain-testing-non-ordered-variables, qa/test-design/domain-testing-result-variables, qa/test-design/domain-testing-primary-secondary-dimensions]
summary: 最佳代表把邊界值測試推廣到不可排序的變數；領域測試範圍也擴及輸出值域與多變數組合邊界
---
## 定義
最佳代表（best representative）進一步推廣邊界值測試（見〈領域測試：等價分類與邊界值〉）的概念：不一定是邊界值，而是該子集中「最可能讓程式失敗」的那個值——若值域可排序，最佳代表通常就是邊界值；若值域無法排序（如列舉型別），則要考慮多種風險維度來挑選（細節見〈無序變數的等價分組〉）。領域測試（domain testing）是這一整套思路的統稱，範圍還擴大到輸出值域（不只輸入，見〈領域測試：結果變數〉）、次要維度（不只主要用途，見〈領域測試：主要與次要維度〉）、多變數與多維度變數的組合邊界。

## 原理
把「邊界值」推廣成「最佳代表」的意義在於：邊界只是「最可能讓程式失敗的值」在可排序值域下的特例，一旦跳出可排序值域（非數值、多變數組合），還是要回到「這個子集裡哪個值最可能觸發已知風險」這個更根本的問題，而不是機械地找「邊界」這個字面意義。多變數組合下，單獨看每個變數都合法，組合起來卻可能是無效狀態（如 2 月 30 日），這種邊界必須專門設計組合測試才能發現。

## QA 視角
- 怎麼測：當變數無法排序時，改問「這個子集裡哪個值最可能踩到已知的實作弱點」而不是隨手挑一個代表；領域測試除了輸入值域，也要對輸出值域（程式能產生的結果範圍）與多變數組合下的邊界做同樣分析。
- 常見缺陷：只測輸入邊界，沒測輸出邊界（例如計算結果超過顯示欄位長度、超過資料型別範圍）與多變數組合邊界（單獨看每個變數都合法，組合起來卻是無效狀態，如 2 月 30 日）。
