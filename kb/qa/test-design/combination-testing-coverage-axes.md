---
id: qa/test-design/combination-testing-coverage-axes
title: 組合測試術語軸線與實務折衷（Exhaustive/Equivalence, Normal/Robust, Weak/Strong）
aliases: [weak vs strong coverage, normal vs robust testing, exhaustive vs equivalence, 強健測試, 正常測試, 組合測試術語軸線, robust all-singles]
tags: [combinatorial-testing, coverage, test-design, pairwise]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 6 "Multivariable Testing" p.446-449, 475-485（CC BY-SA 4.0, Kaner/Fiedler, bbst.courses）]
source_lang: en
related: [qa/test-design/combination-testing-coverage-criteria, qa/test-design/combination-testing-variable-independence]
summary: 除覆蓋層級外，組合測試還有窮舉vs等價、正常vs強健、弱vs強三組獨立軸線，實務上多半只對單一變數做強健測試
---
## 定義

除了「全單值/全成對/全三元組/全N元組」這條覆蓋層級（見〈組合測試覆蓋準則〉），組合測試還有三組彼此獨立的術語軸線：窮舉 vs 等價類（測每個值，或只測每個維度的代表值，如 TL/VL/VB/TB 這類典型值/合法下界/合法邊界/典型邊界代表點）、正常 vs 強健（normal 只用合法值、robust 連錯誤/無效值也納入）、弱 vs 強（weak 對應全單值、strong 對應全 N 元組）。

## 原理

這幾條軸線可以互相組合，例如「弱正常等價」＝只用合法邊界代表值做全單值覆蓋；「強強健等價」＝納入無效值的全 N 元組覆蓋，若每個維度取 4 個值（TL/VL/VB/TB），N 個獨立維度就需要 4^N 個測試案例，數量會迅速膨脹到不可行的地步，而且多重無效值組合只有在你確實懷疑「多個錯誤會彼此疊加影響」時才有意義。常見的實務折衷是：對單一變數各自做強健測試（涵蓋錯誤值），但組合測試只用正常（合法值）覆蓋，只有在特別懷疑某種交互風險時，才刻意加入無效值組合的測試案例。

## QA 視角
- 怎麼測：先決定要不要納入無效值（正常 vs 強健）：多重無效值組合（多個變數同時給無效值）只在懷疑錯誤之間會互相影響（如同時觸發兩個 fallback 邏輯）時才刻意設計，否則測出失敗也分不清是哪個變數造成的，難以定位根因；窮舉 vs 等價的選擇取決於變數值域大小，值域小可窮舉，值域大改測代表值。
- 常見缺陷：用全單值測出失敗後無法判斷是哪個變數造成的，因為每個測項同時給了多個無效值（強健全單值覆蓋的典型陷阱）；只套用機械覆蓋準則，卻沒補後續「這個組合實際造成什麼後果」的驗證，組合表產生完就結案，沒人跑完整流程確認輸出正確。
