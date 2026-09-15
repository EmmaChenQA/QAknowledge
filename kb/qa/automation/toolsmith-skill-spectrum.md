---
id: qa/automation/toolsmith-skill-spectrum
title: 測試員該不該自己寫程式/工具（toolsmith 技能光譜）
aliases: [toolsmith, 技術測試員, 測試員要不要會寫程式, manual測試員vs自動化測試員二分法的問題, 團隊技能光譜, 造工具的測試員]
tags: [automation, skill, team-composition, toolsmith]
topic: qa-automation
confidence: author-material
updated: 2026-09-15
sources: [A Context-Driven Approach to Automation in Testing, Bach & Bolton 2016 §First: Call them tools (not "test automation") / CASE #1: Tool use without checking, pp.5-6,16（Satisfice Inc. 版權所有，作者免費公開，非CC授權）]
related: [qa/automation/tool-not-automation-terminology, qa/exploratory/exploratory-tester-core-skills]
summary: 不是每個測試員都得會寫程式，但團隊裡至少要有能自己造工具的人可求助。
---
## 定義
把測試員區分成手動測試員跟自動化測試員兩種角色，是一種會誤導人的分法，因為所有稱職的測試員本來就都在用某種工具輔助工作，差別只在工具的種類與複雜度。真正有意義的區分，是有沒有人具備自己動手寫程式、造出專屬輔助工具的能力，這種人適合稱作造工具的人（toolsmith）。造工具的能力能讓某些測試活動被延伸、加速、強化，但這件事做的是幫助測試，不是取代測試，寫程式能力本身並不會讓一個人自動變成更會判斷產品品質的測試員。

## 原理
不是每個測試員都需要會寫程式，但團隊裡最好要有人具備這種能力，讓其他成員在需要大量測試資料、抽取或比對日誌、跑特殊用途小工具時有內部資源可求助，而不是每次都等外部資源或乾脆放棄。判斷一個人適不適合承擔造工具角色，看的是他能不能針對眼前的具體測試困難快速組出堪用的小工具，而不是有沒有正式的軟體工程資歷。

## QA 視角
- 怎麼測：盤點團隊目前遇到的重複性人力負擔（大量造測資、比對日誌、抽字串），找出其中適合寫成小工具解決的項目，優先培養或指定一位成員負責累積這類工具，而不是要求每個人都得會寫。
- 怎麼測：評估新進成員的技術契合度時，把重點放在能否針對具體測試困境組出堪用的解法，而不是有沒有正式工程背景，同樣適用於評估要不要投資訓練現有成員寫腳本。
- 常見缺陷：團隊裡沒有任何人具備造工具能力，遇到需要大量測資或日誌比對的情境時只能人工蠻幹，效率極差且容易漏測。
- 常見缺陷：把會不會寫程式當成測試員能力高低的唯一標準，導致擅長判斷產品品質、擅長探索式測試但不寫程式的資深測試員被低估。
- 常見缺陷：把造工具的人力全部投入單一大型腳本框架，一旦這個人離職或框架過時，團隊失去維護能力，形成單點故障。
