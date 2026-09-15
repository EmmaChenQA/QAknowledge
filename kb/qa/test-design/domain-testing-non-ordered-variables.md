---
id: qa/test-design/domain-testing-non-ordered-variables
title: 無序變數的等價分組（Non-Ordered Variable Equivalence）
aliases: [non-ordered variables, 相容性測試分組, 無邊界變數, compatibility equivalence, 分類型變數測試, 離散變數等價分組]
tags: [domain-testing, equivalence-class, compatibility-testing, sampling-strategy]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 5 "Domain Testing" p.407-408（CC BY-SA 4.0, Kaner/Fiedler, bbst.courses）]
related: [qa/test-design/domain-testing-risk-based-equivalence, qa/test-design/domain-testing-non-ordered-no-representative]
summary: 無法排序的變數（如印表機相容性）沒有邊界值，要用相似度分組而非邊界值思維抽樣
---
## 定義

很多變數根本無法從小排到大，因此不存在所謂的「邊界值」——例如測試與數千種印表機的相容性、依角色分組使用者（正職員工 vs 非員工、全職 vs 兼職 vs 約聘）、等價的輸出事件（任何一種報表格式都能回答「程式能不能印報表」這個問題）、等價的環境組合（同作業系統但不同語系）。這些變數仍然需要抽樣策略，因為可能值太多測不完，只是分組依據是相似度，而不是數值大小順序。

## 原理

無序等價類的最佳代表值，是相對於某個「另一個」、與排序無關的風險而挑出來的——例如在「相容印表機」這組裡，最有可能觸發記憶體管理缺陷的那台，才是針對這個風險的最佳代表，不是單純市占率最高的那台。有些無序集合確實找不到唯一最佳代表，這種情況與樣本選擇的主觀性，見〈無序變數：無最佳代表時的樣本選擇〉。

## QA 視角
- 怎麼測：遇到無法排序的離散選項集合（裝置型號、瀏覽器、地區設定、串接的第三方服務商）時，不要硬套邊界值思維去找「最大/最小」，改成先按相似度分組（依內部實作共用程度、依已知風險曝露程度分組），再從每組挑一個在其他風險維度上最極端的成員當代表。
- 常見缺陷：誤把離散分類（會員等級、角色權限）當成可排序數值硬做邊界值測試（只測最高權限與最低權限），漏掉權限矩陣中間層級各自獨有的行為差異；環境組合（語言 × 作業系統）被當成純笛卡兒積機械窮舉，沒有依實際共用程式碼路徑做等價分組，資源浪費在真正等價、無需重複測的組合上。
