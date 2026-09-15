---
id: qa/exploratory/scripted-testing-temporal-staleness-limitation
title: 腳本測試的時間序列侷限：為何測試會過時
aliases: [腳本測試時間序列弱點, 回歸測試只證明固定批次, 腳本測試過時, 評估設計而非評估製造品質, regression testing limitation, 風險輪廓演變]
tags: [test-strategy, scripted-testing, regression-testing, risk]
topic: qa-exploratory
confidence: author-material
updated: 2026-09-15
sources: [Kaner "Exploratory Testing" BBST Fall 2006 lecture slides 5-17 (CC BY-SA 2.0)]
source_lang: en
related: [qa/exploratory/scripted-vs-exploratory-when-to-use, qa/exploratory/risk-based-regression-heuristics-rcrcrc-failure]
summary: 腳本測試在專案早期設計好就反覆執行，需求與環境卻持續演變，回歸全過只能證明通過固定批次，無法證明沒有新型設計缺陷。
---
## 定義
腳本測試在專案早期就設計好，之後多次反覆執行、每次都找同樣的東西，這個時間序列上的特性是它的根本弱點——需求會變、不同工程師會犯不同的錯、環境（平台、競爭者、使用者期待、新的攻擊手法）會隨時間演變，腳本設計得越早就越容易脫離當下真正的風險。

## 原理
腳本設計得越早，測試者對程式與風險輪廓理解得越少，測出來的東西也就越不貼合當下真正的風險。軟體測試本質是「評估設計」而非「評估製造品質」，一批回歸測試全部通過只能證明「程式通過了這批固定的測試」，不能證明沒有新種類的設計缺陷——這正是回歸測試需要搭配 RCRCRC 之類啟發法決定優先順序、且不能單靠固定腳本全部通過就安心的根本原因。

## QA 視角
- 怎麼測：定期回頭檢視既有回歸腳本是否還貼合當下風險，需求或架構有重大變動時，優先安排一輪探索式測試重新摸清風險輪廓，再決定要不要調整或汰換舊腳本；不要把「這批回歸腳本全過」直接當成「這個版本沒有新缺陷」的證據，仍需搭配針對本次異動的探索式測試。
- 常見缺陷：把整份測試計畫在專案初期就一次寫死成腳本，後續需求微調後測試仍照舊跑，測不到真正變動的風險；用同一組腳本反覆跑迴歸，長期只驗證「已知不會壞的東西」，新類型缺陷完全測不到。
