---
id: qa/exploratory/oracle-heuristics-consistency-checks
title: Oracle 啟發式：沒有唯一正確答案時怎麼判斷 pass/fail
aliases: [oracle, 測試 oracle, oracle heuristics, pass fail 判斷, 測試判準, consistency heuristics, 一致性啟發式, 預期結果怎麼定, oracle problem]
tags: [oracle, interpretation, test-design, heuristics]
topic: qa-exploratory
confidence: author-material
updated: 2026-09-15
sources: [Kaner "Exploratory Testing" BBST Fall 2006 lecture slides 65-67 (CC BY-SA 2.0)]
related: [qa/exploratory/exploratory-testing-four-activities]
summary: Oracle 是判斷測試通過或失敗的啟發式機制，非萬用公式；同一結果換不同一致性判準可能得出不同判定，需選最貼近測試目的的一種。
---
## 定義
Oracle 是判斷程式在某次測試中「通過」或「失敗」的機制。Kaner 強調 oracle 是啟發式的：不完整、也會出錯，並非有一套可套用到任何情境的「正確答案」。詮釋（interpretation）這個認知活動的核心工作之一，就是針對眼前這個測試與結果，判斷哪一種 oracle 才適用。

## 原理
Kaner 整理出多種「一致性」判準，各自對應不同的比對基準：與產品內部一致（這個行為跟產品內其他類似功能或模式的表現一不一致）、與同類產品一致（跟市場上可比較的產品的類似功能表現一不一致）、與模型預測一致（跟你對這個功能建立的心智模型或正式模型所預期的一不一致）、與過去表現一致（現在的行為跟這個產品過去的行為一不一致）、與組織形象一致（跟公司想對外塑造的形象一不一致）、與宣稱一致（跟文件或廣告宣稱的一不一致）、與規格或法規一致（跟必須符合的規格或法規要求一不一致）、與使用者期待一致（跟認為使用者想要的一不一致）、與目的一致（跟這功能表面上該達成的目的一不一致）。同一個測試結果，換一種 oracle 檢視可能得出不同的判定——例如某行為雖然不符合舊文件（與宣稱不一致），但完全符合新規格（與規格一致），這時要判斷用哪個 oracle 更貼近這次測試真正想回答的問題，而非機械套用第一個想到的標準。

## QA 視角
- 怎麼測：規格沒明講預期結果時，改問「這行為跟系統裡其他類似功能一致嗎」「跟這產品過去的版本一致嗎」「跟使用者合理的期待一致嗎」，用多個 oracle 交叉檢視同一個結果，而不是找不到書面依據就直接放行；發現某個 oracle 判定「異常」時，追問是否有另一個更權威的 oracle（如新版規格）已經改變了預期基準，避免拿舊文件當唯一真理。
- 常見缺陷：只認「有沒有寫在規格裡」一種 oracle，規格沒寫就當作沒問題放行，漏掉明顯違反使用者期待或產品內部一致性的缺陷；把「與過去行為一致」當唯一標準，導致舊版本就存在的缺陷被誤判為正常，忽略它同時違反了「與宣稱一致」或「與目的一致」；判定 bug 時只引用單一 oracle 就下結論，被開發方用另一個 oracle（如「規格本來就沒這樣寫」）輕易反駁。
