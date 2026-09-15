---
id: qa/test-design/combination-testing-variable-independence
title: 判斷變數該不該組合測（Variable Independence & Relationship Analysis）
aliases: [variable independence, 變數相依分析, variable relationship tour, 組合測試選變數, 變數關係走查, 變數關係表, constrained variables]
tags: [combinatorial-testing, risk-based, test-design, relationship-analysis]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 6 "Multivariable Testing" p.489-513（CC BY-SA 4.0, Kaner/Fiedler, bbst.courses）]
source_lang: en
related: [qa/test-design/combination-testing-coverage-criteria, qa/test-design/combination-testing-breaking-constraints, rd/backend/untrusted-input-validation-boundary]
summary: 組合測試前先判斷變數是否獨立、有無約束關係，決定該套用機械覆蓋還是改測約束邊界本身
---
## 定義

這裡的「獨立」是指一個變數的值不會限制你能往另一個變數輸入什麼。全成對（all-pairs）等機械式組合測試能確認「不該有關係的變數之間確實沒有關係」，但不會告訴你該組合哪些變數、測哪些值，也不會告訴你遇到真的互相約束的變數該怎麼處理。當變數之間確實互相約束時（例如月份中的日期取決於是否閏年；表格列數乘欄數不能超過某個儲存格上限），天真套用角落值組合（如最大列數搭配最大欄數）可能根本不合法，這時應改測約束本身的實際邊界（如「列×欄 ≤ 255」的合法/不合法交界）。

## 原理

當變數多到糾纏不清、無法套用機械式成對測試時，建議改做「變數關係走查」：針對每個變數追蹤它在系統中流動的路徑，問它還跟哪些資料互動、被哪些功能使用，並找出對其他項目或功能而言不方便的值。一旦確認了真正的約束關係（如 V1 < V2），約束本身就成了值得專門測試的對象——後續是否要嘗試打破它、打破後該追什麼，見〈打破約束與組合後果驗證〉。

## QA 視角
- 怎麼測：組合測試前先畫「變數關係表」：列出每個變數的輸入來源、顯示位置、儲存或輸出去向，以及跟哪些其他變數有約束（如 V1 < V2）。有約束的變數改測約束邊界本身，而非套用假設獨立的角落值組合；確認彼此無約束才適合套用全成對等機械覆蓋準則（見〈組合測試覆蓋準則〉）。
- 常見缺陷：對有約束關係的欄位（如活動起訖日、額度與等級）套用假設獨立的邊界角落組合，測出一堆本來就不可能發生的無效組合，真正的約束邊界（如起日剛好等於訖日）反而沒被覆蓋；面對變數過多、彼此高度糾纏的畫面（如多欄位排版設定），直接放棄組合測試改成隨便點點看，而不是用變數關係走查系統性地縮小該測的組合範圍。
