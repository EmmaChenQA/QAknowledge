---
id: qa/test-design/domain-testing-equivalence-boundary
title: 領域測試：等價分類與邊界值（Equivalence Class & Boundary Value Testing）
aliases: [equivalence class, 等價類別, boundary value testing, 邊界值測試, equivalence-partitioning, off-by-one, domain testing, 領域測試]
tags: [domain-testing, boundary-value, equivalence-partitioning, test-design]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 1 §Equivalence Class Analysis / Boundary Testing, CC BY-SA 4.0, Kaner/Fiedler, bbst.courses]
related: [qa/test-design/quicktest-theory-of-error, qa/test-design/domain-testing-best-representative-scope]
summary: 等價類別是效果相同的輸入值集合，邊界值測試在此之上假設「邊界最容易被程式員寫錯」，優先測每類的上下界
---
## 定義
等價類別是一組被視為「效果相同」的輸入值：若其中一個值能測出某類缺陷，其他值大機率也能測出同一類缺陷；若某個值測不出，其他值大機率也測不出。等價分類測試把變數值域切成若干不重疊的子集，每個子集抽一到兩個值測試。邊界值測試在此之上再加一層風險假設：等價類別的邊界最容易被程式員寫錯（off-by-one 是常見錯誤），因此優先測每個類別的上下界。更廣義的「最佳代表」概念與領域測試涵蓋的範圍，見〈最佳代表與領域測試範圍擴展〉。

## 原理
等價分類的核心假設是「同類值的行為一致」，這個假設本身就是風險最集中的地方——真正的缺陷往往發生在分類假設不成立的地方，也就是類別邊界。邊界可能因為程式員寫錯判斷式（如用 `<=` 誤寫成 `<`）、規格本身寫錯分類規則、規格制定者誤解真實世界的邊界，或同一個邊界在程式不同部位被不一致地實作而出錯。因此邊界值不是「隨便挑一個好測的值」，而是承載了與該等價類別相同的一般風險、外加邊界特有的誤植風險。

## QA 視角
- 怎麼測：先明確列出每個變數的值域與合法/不合法的等價類別，再對每個類別挑出邊界值（下界-1、下界、下界+1、上界-1、上界、上界+1）逐一測試，不要跳過分類這一步直接套公式。
- 常見缺陷：只測類別中間的「安全值」沒測邊界，邊界誤判（如該排除的邊界值被接受、該包含的邊界值被拒絕）完全漏測；把邊界值測試等同於「測 0、負數、極大值」這種公式化操作，沒有先正確畫出等價類別，導致測到的邊界跟實際分類邏輯的邊界對不上。
