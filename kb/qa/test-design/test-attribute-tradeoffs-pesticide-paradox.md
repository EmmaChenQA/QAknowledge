---
id: qa/test-design/test-attribute-tradeoffs-pesticide-paradox
title: 測試屬性取捨與殺蟲劑悖論（Attribute Tradeoffs & Pesticide Paradox）
aliases: [pesticide paradox, 殺蟲劑悖論, information value, 資訊價值遞減, 回歸測試資訊價值, 屬性取捨, attribute tradeoff]
tags: [test-design, oracle, risk-based, metrics]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 4 "Scenario Testing" p.330-350（CC BY-SA 4.0, Kaner/Fiedler, bbst.courses）]
source_lang: en
related: [qa/test-design/test-technique-quality-attributes]
summary: 測試品質屬性彼此經常互相取捨，資訊價值在重複執行的回歸測試中會遞減，稱為殺蟲劑悖論
---
## 定義

沒有任何測試技法能同時把所有品質屬性（見〈測試技法品質屬性〉）都優化到最高，屬性之間經常互相取捨。資訊價值（information value）是其中特別值得獨立討論的一項：不管通過或失敗都能帶來新資訊的測試才有高資訊價值，回歸測試在這項普遍偏低——同一批測試對已修復過的程式碼反覆執行，愈跑愈測不出新東西，這種現象稱為「殺蟲劑悖論」（pesticide paradox）。

## 原理

一個測試可能可信卻不具代表性（發生機率 0.05% 的情境）；有價值卻不夠有說服力（關係人承認問題存在但不認為值得修）；效力很強卻不可執行（太複雜以致人手動測不完）。殺蟲劑悖論的根源在於：測試案例一旦被固定下來重複執行，程式碼會逐漸「適應」這批測試（對應的缺陷都已修掉），資訊價值隨執行次數遞減，除非持續注入新組合、新路徑、新資料。

## QA 視角
- 怎麼測：維護回歸測試組時不要只堆疊資訊價值偏低的舊案例，要定期補上資訊價值高的新組合（新路徑、新資料組合、新環境），否則會陷入殺蟲劑悖論；長時間執行的複雜情境測試，事前設計支援除錯的機制（如事件紀錄），避免失敗後無法定位是哪一步出錯。
- 常見缺陷：一路只維護舊回歸測試組，沒有評估其資訊價值已趨近於零，因而錯失把資源投入更高資訊價值新測試的機會；長時間執行的複雜情境測試失敗後，因為事前沒設計支援除錯的機制，完全無法定位是哪一步出錯，變成不可判讀的測試。
