---
id: qa/test-design/domain-testing-primary-secondary-dimensions
title: 領域測試的主維度與次維度（Primary vs Secondary Dimensions）
aliases: [primary dimension, secondary dimension, 邊界值分析進階, boundary value analysis, delta 值, 變數維度分析]
tags: [domain-testing, boundary-value, equivalence-class, test-design]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 5 "Domain Testing" p.391-397（CC BY-SA 4.0, Kaner/Fiedler, bbst.courses）]
source_lang: en
related: [qa/test-design/domain-testing-equivalence-boundary, rd/backend/untrusted-input-validation-boundary, qa/test-design/domain-testing-risk-based-equivalence]
summary: 一個變數不只一個維度，須分清主維度與其他隱藏維度
---
## 定義

一個變數的主維度（primary dimension）是你真正想控制或想從中學到什麼的那個維度（例如頁寬欄位的數值本身，範圍 1 到 56）。次維度（secondary dimension）是同一個輸入欄位還能獨立變化的其他方式，與主維度所代表的意義無關——例如數字位數、字元集/編碼、前導或尾隨空白、數字之間的空格、前導正負號、小數點位數、地區化的千分位格式。傳統領域測試先對主維度做邊界/等價類表分析，之後再對每個相關的次維度分別重複同一套分析方式。

## 原理

選定邊界值需要先定義 Δ（delta，兩個相鄰合法值之間的最小可能差值）：整數的 Δ 通常是 1，帶 5 位小數的定點數 Δ 則是 0.00001。邊界值配對接著就是 UB（合法範圍內最大值）與 UB+Δ（超出範圍的最小無效值），下界同理為 LB 與 LB−Δ。並非每個維度都值得這套分析：對二元變數（是/否）做領域分析毫無意義，因為根本不存在可以省略不測的「等價值」；有些變數擁有多個互不相連的合法區間（例如成績等第 A/B/C/D/F），每個區間都需要各自獨立的邊界配對，不能只測整體的最外層邊界。

## QA 視角
- 怎麼測：對每個輸入欄位先確定該型別的 Δ（最小可辨差值），列出「主維度」的合法/不合法邊界配對；再另開一輪，針對「次維度」逐一檢視——字元數上限、允許的字元集、前導空白或零、正負號、小數點位數、千分位逗號、科學記號。這些次維度跟主維度正交，因為看起來跟業務邏輯無關，特別容易被漏測。
- 常見缺陷：只測主維度的數值邊界（如金額 0 或上限），完全沒測次維度（貼上帶千分位逗號的金額、全形數字、前導零），欄位過濾邏輯對這些次維度往往走的是另一套 regex，容易漏擋；多重合法區間（如分級制度）被誤當成單一連續區間處理，只測了外層總邊界，中間各級之間的交界（如 B 級上緣與 A 級下緣）完全沒驗證；對二元變數硬套邊界值分析，浪費測試資源在無意義的「中間值」上；沒有正確定義 Δ，導致「邊界值」測到的其實是等價類內部值（例如浮點欄位誤用 Δ=1 而非該欄位實際精度），根本沒碰到真正的邊界。
