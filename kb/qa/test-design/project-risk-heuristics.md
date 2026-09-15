---
id: qa/test-design/project-risk-heuristics
title: 專案層級風險啟發法與測試優先序（Project Risk Heuristics）
aliases: [project risk, 專案風險啟發法, 測試優先序, where to look for errors, 高風險區域, new changed complex critical, 線索疊加, 風險打分]
tags: [risk-based-testing, prioritization, test-strategy]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 2 §Project-Level Risk Analysis / Project Risk Heuristics: Where to Look for Errors, CC BY-SA 4.0, Kaner/Fiedler, bbst.courses]
related: [qa/test-design/risk-based-testing-fundamentals, qa/test-design/failure-mode-catalog-fmea, qa/test-design/invisible-vs-visible-risk]
summary: 用專案層級的線索（新/變更/複雜/關鍵/第三方等特徵）為待測範圍打分，找出該優先測的區域，線索會疊加。
---
## 定義
專案層級風險分析關注的不是「程式怎麼壞」，而是「什麼因素會讓專案整體失敗、落後時程、超支或得罪關鍵利害關係人」。這類分析對測試員的直接用途，是提供一批判斷「哪個區域該優先測」的線索：新功能／新技術、變更過的程式、趕工／臨時決策、疲勞的團隊、第三方或外部元件、規格模糊或需求衝突、已知常出包的區域、上下游依賴、開放式（無上限）的功能或資料、影響公眾形象或法律責任的功能、關鍵或必須精確符合規格的功能、容易被誤用的功能、高使用量或高知名度的功能、對 VIP 有影響的功能。另有一類特別容易被忽略的線索——失效時不會被立刻發現的隱性風險——獨立整理於〈隱性風險與可見風險〉。

## 原理
這些線索之所以有用，是因為它們反映了缺陷產生的結構性成因，而非單純猜測：新東西缺陷還沒被暴露出來是統計上的必然，變更會同時帶來新缺陷和破壞舊邏輯的雙重風險。這些線索本身彼此可以疊加：一個新功能如果同時是趕工做出來的、又涉及第三方元件，風險會比單一線索更高，測試優先序判斷要看疊加後的整體分數，而非只看單一線索是否命中。

## QA 視角
- 怎麼測：規劃回歸測試或有限時間內的測試分配時，先用這份線索清單為待測範圍打分，優先把資源投入命中多個線索的區域；對「規格模糊」或「需求衝突」的區域，測試前先把疑義攤開確認，因為模糊本身就是風險來源。
- 常見缺陷：把「舊功能沒改過」等同於「風險低」，忽略舊功能可能因周邊依賴變更而間接被破壞，跳過本該做的回歸測試；優先序只看單一線索（如只看「新不新」），沒考慮疊加效應，導致又新又複雜又涉及第三方的高風險區域，測試資源分配反而跟普通新功能一樣多。
