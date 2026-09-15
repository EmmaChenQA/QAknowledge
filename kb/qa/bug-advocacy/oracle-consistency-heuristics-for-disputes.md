---
id: qa/bug-advocacy/oracle-consistency-heuristics-for-disputes
title: 用一致性 Oracle 化解「這是設計不是缺陷」之爭
aliases: [consistency oracle, 一致性測試oracle, specification oracle, 這是功能不是bug, as designed 爭議, oracle heuristics, 判斷缺陷依據]
tags: [bug-advocacy, oracle, triage, dispute-resolution]
topic: qa-bug-advocacy
confidence: author-material
updated: 2026-09-15
sources: [BBST Bug Advocacy Lecture 5 §It's Not a Bug, It's a Feature / Use Oracles to Resolve Arguments / Remember Those Consistency Oracles, slides 148-153 (CC BY-SA 4.0, Kaner/Fiedler, bbst.courses)]
source_lang: en
related: [qa/bug-advocacy/motivating-programmer-to-fix]
summary: 爭論「是不是 bug」本質是爭論該用哪個 oracle 判斷，八種一致性 oracle 能把爭論變成可查證的依據。
---
## 定義
Oracle 是判斷這是不是問題所依據的原則或機制。當對方回覆這不是 bug、是功能，本質上是在說用他認的 oracle 來看這個行為沒問題，而不是客觀事實本身。光說符合規格不是萬能答案：規格本身可能不完整或有錯，程式行為可能表現得比規格寫的更好、處理了規格沒考慮到的情境、或照顧到規格遺漏的關係人需求，這些情況下符合規格反而不能作為沒問題的證明。除了規格一致性，還有多種一致性 oracle 可用：與產品內其他功能行為一致、與同類競品的慣例一致、與過去版本的行為一致、與公司想塑造的形象一致、與文件宣傳承諾一致、與外部法規標準一致、與使用者合理期待一致、與功能本身明顯的目的一致。

## 原理
爭論行為是不是缺陷時，各講各的直覺會沒完沒了。把爭論轉換成哪一個一致性 oracle 適用、這個行為違反了哪一個，能把主觀爭執變成可以攤開來核對的具體依據，也讓對方更容易被說服，因為反駁的對象變成一條明確的一致性原則，而不是回報者的個人主觀感受。

## QA 視角
- 怎麼測：被回 as designed 時，先問清楚對方依據的是哪個 oracle，規格原文還是過去行為；如果規格本身含糊或有缺口，改用其他一致性 oracle 佐證，例如同頁面另一個相同性質的欄位有做防呆，這個沒做就是內部不一致；或過去版本一直是這個行為，這次改版才變成現在這樣，屬於與歷史不一致。
- 常見缺陷：只會重複主張我覺得這是 bug 而說不出依據哪一種一致性原則，被對方用符合規格一句話擋回去；規格本身寫得不完整或含糊時，誤以為沒寫規格就不算 bug，沒有嘗試用產品內部一致性或使用者合理期待去論證；找到一致性依據卻沒有進一步指出對哪個關係人造成什麼具體影響，論證停在不一致，說服力打折。
