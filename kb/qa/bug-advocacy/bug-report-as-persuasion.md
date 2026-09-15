---
id: qa/bug-advocacy/bug-report-as-persuasion
title: 缺陷報告是說服文件（Bug Report as Persuasion）
aliases: [bug advocacy, 缺陷主張, 缺陷報告的本質, 品質主觀性, quality is value to some person, 說服工程師修bug, 缺陷報告即銷售, selling bugs]
tags: [bug-advocacy, communication, stakeholder-value, persuasion]
topic: qa-bug-advocacy
confidence: author-material
updated: 2026-09-15
sources: [BBST Bug Advocacy Lecture 1 §What Is Quality / The Definitions in This Course, slides 26-35 (CC BY-SA 4.0, Kaner/Fiedler, bbst.courses); Lecture 2 §Bug Advocacy = Selling Bugs, slides 40-43]
related: [qa/bug-advocacy/motivating-programmer-to-fix, qa/bug-advocacy/credibility-building-and-destroying-behaviors]
summary: 品質是對某人的價值，缺陷報告的作用是說服握有決策權的人採取行動，不只是記錄現象。
---
## 定義
缺陷（bug）不是客觀存在的實體，而是「降低對某個受重視關係人的價值、或提高對不受重視關係人的價值，且沒有足夠大的補償效益」的產品屬性。品質本身也是主觀的：品質等於對某個人的價值。同一個問題，對某個關係人是嚴重缺陷，對另一個關係人可能無關痛癢，兩種判斷都可能同時成立。因此缺陷報告的核心不是把觀察到的現象寫下來存檔，而是主張「這個產品本來可以更好」，並說服有影響力、握有修復決策權的人相信這個主張值得投入時間處理。

## 原理
一個問題會不會被修，關鍵往往不是技術上的嚴重度，而是報告的溝通品質與是否連結到關係人在意的價值。時間永遠不夠、每個人都過載，報告缺陷因此本質上是一種銷售行為：目標是讓對方主動想修，而不是逼對方不得不修。技術上正確但寫法無力的報告，命運常常是被擱置。

## QA 視角
- 怎麼測：寫報告前先自問這件事具體降低了誰的價值，把答案（哪個角色、哪個場景會受害）寫進 Jira 留言的第一段，不只寫技術現象；同一個問題換不同關係人角度（一般會員／客服／風控／財務）評估影響是否一致，不一致時在留言明講對某角色影響大、對另一角色可忽略，避免對方用自己的角度單方面判定不重要。
- 常見缺陷：留言只寫「畫面異常」「行為不符預期」而不說明受害對象與情境，被判讀為低優先直接關閉；同一個技術現象因為敘述角度不同，前後兩次回報被打成不同嚴重度，彼此矛盾；用「這明顯是 bug」取代具體說明違反了哪個關係人的哪個期待，讓對方無從評估。
