---
id: qa/foundations/oracle-heuristics-types
title: Oracle 的啟發式類型與各自侷限（Types of Heuristic Oracles）
aliases: [consistency oracle, 一致性 oracle, regression oracle, 回歸測試 oracle, 自我驗證資料, self-verifying data, 部分 oracle, partial oracle, statistical oracle]
tags: [testing-fundamentals, oracle, heuristics]
topic: qa-foundations
confidence: author-material
updated: 2026-09-15
sources: [BBST Foundations Lecture 3 §Consistency Oracles / Another Look at Oracles / More Types of Oracles (CC BY-SA 4.0, Kaner/Bach, bbst.courses)]
source_lang: en
related: [qa/foundations/oracle-problem]
summary: oracle 有多種啟發式類型（一致性、回歸、模型、統計⋯），每種都只驗部分面向、各自有明確盲區。
---
## 定義
既然沒有「完整 oracle」這種能偵測所有錯誤的東西存在，實務依賴的都是各種「部分 oracle」，每一種只驗證輸出的某個切面。最常見的一族是一致性 oracle：判斷行為是否與產品內部其他功能、同類產品、過去行為（回歸）、公司形象、文件規格廣告宣稱、外部法規標準、使用者期望、產品明顯用途保持一致，任何一種不一致都可能（但不一定）代表有問題。其他常見類型還有：約束型 oracle（檢查不可能的數值或關係，如 ZIP code 必須是 5 或 9 碼）、回歸測試 oracle（拿上一版結果當參照）、自我驗證資料（把正確答案內嵌在測資裡）、狀態模型／計算型／反向運算型 oracle 等。

## 原理
每一種 oracle 都是用簡化過的模型代表真實世界的某個面向，模型的簡化正是它有用的原因，也正是它侷限的來源。回歸測試 oracle 只要程式設計真的改了就會產生大量假警報，且完全抓不到舊版本就有、從沒被抓到的缺陷；一致性 oracle 之間彼此可能互相矛盾（符合歷史行為卻不符合使用者期望）；統計型 oracle 允許同時漏判與誤判；參照程式若剛好和待測程式共享同一個底層缺陷，比對也測不出問題。挑選 oracle 從來不是找到正確答案，而是在成本、覆蓋面與可信度之間做取捨，通常需要同時搭配多種 oracle 交叉檢驗，才能降低單一 oracle 的盲區風險。

## QA 視角
- 怎麼測：懷疑某行為有問題但說不出所以然時，優先套一致性 oracle 清單（跟自己產品其他地方比、跟歷史行為比、跟文件宣稱比、跟使用者期望比），找出具體站得住腳的依據再回報，比只憑直覺更有說服力。
- 常見缺陷：回歸測試長期只比對上一版結果，從未回頭檢查這個舊行為本身是不是就一直是錯的，把長年存在的缺陷誤當基準線。
- 常見缺陷：用約束型 oracle（格式檢查、範圍檢查）當作全部驗收依據，值落在合法範圍內但實際錯誤（例如金額型別對但金額本身算錯）完全沒被攔到。
- 常見缺陷：不同一致性 oracle 給出矛盾結論時（例如符合規格但不符合使用者期望），沒有意識到這是正常現象，因此為了哪個才對而爭執不下，而不是把落差列成待確認項。
