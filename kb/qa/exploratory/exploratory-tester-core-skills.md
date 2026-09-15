---
id: qa/exploratory/exploratory-tester-core-skills
title: 探索式測試員需要的核心技能
aliases: [探索式測試技能, careful observation, critical thinking, 觀察與批判性思考, 探索式測試不是誰都能做好, 觀察與推論分離]
tags: [exploratory-testing, skills, critical-thinking]
topic: qa-exploratory
confidence: author-material
updated: 2026-09-15
sources: [Bach "Exploratory Testing Explained" v1.3 §Practicing Exploratory Testing pp.5-6 (2002-2003), Kaner "Exploratory Testing" BBST Fall 2006 lecture slides 96-105 (CC BY-SA 2.0)]
related: [qa/exploratory/exploratory-testing-common-misconceptions, qa/exploratory/exploratory-testing-coverage-and-session-tracking, qa/exploratory/exploratory-tester-idea-generation-and-resource-skills]
summary: 探索式測試表面像日常技能，實際需要專業級的測試設計、細心觀察與批判性思考能力，技能不足會直接反映成覆蓋漏洞。
---
## 定義
探索式測試表面看起來人人都會（就像聽、讀、思考、講故事一樣是日常技能），但要做好它需要的技能水準遠超一般水準——正如心理治療師必須是專業級的傾聽者、律師必須是專業級的閱讀者，探索式測試員也需要把日常認知能力練到專業級。Bach 把探索式測試表現優劣的關鍵拆成幾項內在能力，而不是外顯的流程步驟。

## 原理
第一是測試設計能力：任何人都可能不小心設計出一個測試，優秀的探索式測試員則能有系統地設計出真正能檢驗產品的測試，這需要分析產品、評估風險、運用工具、批判性思考等綜合能力。第二是細心觀察：腳本化測試員只需要照腳本指示去看該看的東西，探索式測試員必須對任何異常或可疑之處保持警覺，還要在壓力下清楚區分「觀察到的事實」與「自己的推論」，避免先入為主的假設蒙蔽了本該注意到的測試或行為。第三是批判性思考：優秀的探索式測試員能回頭檢視並說明自己的邏輯，找出自己思路裡的漏洞，這在回報 session 狀態或調查缺陷時特別關鍵。

## QA 視角
- 怎麼測：記錄觀察時嚴格區分「畫面顯示了什麼」和「我認為這代表什麼」兩件事，例如先寫「餘額顯示 0」再另外寫「懷疑扣款沒有寫入成功」，避免推論污染了原始觀察紀錄；回報缺陷前回頭檢視自己的判斷邏輯，找出推理鏈裡站不住腳的環節再送出。
- 常見缺陷：把觀察與推論混在一起寫進紀錄，回報缺陷時因為摻雜了未經查證的推論而被開發方輕易反駁；測試設計只停留在「跑過去看一下」，沒有系統性評估風險與分析產品就直接動手，漏掉真正該檢驗的路徑。
