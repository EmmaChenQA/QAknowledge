---
id: qa/test-design/test-technique-quality-attributes
title: 測試技法品質屬性（Attributes of a Good Test）
aliases: [test power, test validity, test credibility, 測試效力, 測試有效性, 資訊價值, opportunity cost, 可判讀性, non-redundant]
tags: [test-design, oracle, risk-based, metrics]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 4 "Scenario Testing" p.330-350（CC BY-SA 4.0, Kaner/Fiedler, bbst.courses）]
source_lang: en
related: [qa/test-design/scenario-testing-story-elements, qa/test-design/test-attribute-tradeoffs-pesticide-paradox]
summary: 用 power/validity/credibility 等一組屬性評估一個測試技法好壞，沒有單一屬性能定義「好測試」
---
## 定義

沒有單一屬性能定義「好測試」，不同技法會針對不同屬性組合去優化，包括：效力（power，是否設計成有機會揪出某類缺陷）、有效性（validity，揪出的問題是不是真的問題，而非不合理環境下的假象）、價值（value，能不能讓關係人得到他們想知道的資訊）、可信度（credible，關係人相信真的會有人這樣操作）、代表性（representative，聚焦在真實使用者實際會做的操作，而非只是可信但罕見的角落案例）、非冗餘（non-redundant，一個測試能代表整個等價類）、說服力（motivating，關係人真的會想修）、可執行性（performable，人或工具實際做得到）、可重用性、可維護性、資訊價值（information value，不管通過或失敗都能帶來新資訊）、覆蓋率、易判讀性、支援除錯、複雜度是否合宜（appropriately complex，隨程式穩定度調整）、可課責性（accountable）、可負擔性（affordable）與機會成本（opportunity cost，選了這個測試就放棄了別的測試）。屬性間常互相取捨，資訊價值與「殺蟲劑悖論」的細節見〈測試屬性取捨與殺蟲劑悖論〉。

## 原理

評估任何一個測試，應該相對於「可以想像的其他測試」，逐項判斷這個測試在每個對當下目標重要的屬性上表現如何，而不是把「好測試」當成一份固定不變的檢查清單套用；同一條測試對不同目標（早期找缺陷 vs 後期說服修復）重要的屬性組合並不相同。

## QA 視角
- 怎麼測：設計或挑選一條測試案例前，先問這條測試主要是為了買哪個屬性：早期測試偏重效力（快速找出明顯缺陷）、後期測試偏重代表性與說服力（貼近真實使用、能說服 RD 修）。
- 常見缺陷：把「跑過的測試數量」當成覆蓋率證明，實際上大量案例屬於同一等價類重複，非冗餘屬性被忽視，真實覆蓋遠低於帳面數字；對「無法重現的極端值」直接宣告缺陷，卻沒先確認這個測試對相關關係人來說是否可信、有價值，白白耗費說服成本。
