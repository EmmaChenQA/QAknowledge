---
id: qa/test-design/htsm-guidewords
title: 啟發式測試策略模型的引導詞（HTSM Guidewords）
aliases: [HTSM, Heuristic Test Strategy Model, 引導詞, guide words, HAZOP, product elements project environment quality criteria, 測試策略模型]
tags: [test-strategy, exploratory-testing, risk-based-testing]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 2 §Guidewords / Heuristic Test Strategy Model, CC BY-SA 4.0, Kaner/Fiedler, bbst.courses]
source_lang: en
related: [qa/test-design/risk-based-testing-fundamentals, qa/test-design/failure-mode-catalog-fmea, qa/test-design/htsm-guideword-application]
summary: HTSM 提供三層引導詞（產品元素/專案環境/品質標準），逼團隊系統性掃過系統各面向而非只靠直覺
---
## 定義
引導詞（guidewords）源自工業安全領域的 HAZOP（危害與可操作性研究），概念是團隊用一份固定的提示詞清單逐一檢視系統的每個部分，避免只靠個人直覺遺漏風險類別。啟發式測試策略模型（HTSM）把這個概念搬進軟體測試，提供三層可自訂的引導詞集合：專案環境（如任務目標、資訊來源、與開發團隊的關係、測試團隊組成、設備工具、時程、待測項目、交付物）、產品元素（結構、功能、資料、介面、平台、操作、時間）、品質標準（能力、可靠性、易用性、安全性、可擴展性、相容性、效能、可安裝性等操作面標準，以及可支援性、可測試性、可維護性、可移植性、可在地化等開發面標準）。

## 原理
這套方法的價值不在引導詞本身的內容，而在「強迫掃過每一類，而不是只挑自己熟悉或想得到的部分」這個紀律，具體怎麼實際套用（單獨或交叉組合）見〈HTSM 引導詞套用法〉。

## QA 視角
- 怎麼測：測試規劃時，逐一套用產品元素引導詞（結構/功能/資料/介面/平台/操作/時間）掃描待測系統，針對每個引導詞至少寫出一個對應的風險或測試點，避免只從功能面切入而漏掉資料、介面、時間等維度；把品質標準引導詞（可靠性、安全性、易用性、相容性等）當作檢查清單，確認每一類是否至少被規劃過測試，即使該類別最終判定「本票不適用」也留下判斷記錄。
- 常見缺陷：只慣性套用「功能」與「資料」這兩類熟悉的引導詞，長期忽略「時間」「操作」等較少被想到的維度，導致與時效性、操作順序相關的缺陷系統性地被漏測。
