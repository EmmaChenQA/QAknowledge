---
id: qa/bug-advocacy/motivating-programmer-to-fix
title: 讓工程師想修與抗拒修的誘因清單
aliases: [motivating the fixer, overcoming objections, 說服工程師修bug, 為什麼RD不想修, bug triage 心理因素, 修復動機, 抗拒修復理由]
tags: [bug-advocacy, stakeholder-motivation, triage, persuasion]
topic: qa-bug-advocacy
confidence: author-material
updated: 2026-09-15
sources: [BBST Bug Advocacy Lecture 2 §Motivating the Bug Fixer, slide 43; Lecture 4/5 §Overcoming Objections, slides 114, 142-143, 147, 154, 156 (CC BY-SA 4.0, Kaner/Fiedler, bbst.courses)]
source_lang: en
related: [qa/bug-advocacy/bug-report-as-persuasion, qa/bug-advocacy/credibility-building-and-destroying-behaviors]
summary: 工程師願不願意花時間修一個缺陷，取決於一組可預期的心理誘因與抗拒理由，報告可針對性回應。
---
## 定義
工程師比較願意修的缺陷通常符合以下至少一項：看起來後果嚴重；影響很多人；改起來輕而易舉；違反了合約承諾；同類問題曾讓公司或競爭對手出糗；問題本身像個有趣的謎題；有影響力的人明確表態想修；回報者本人有信譽、對方信任回報者的判斷。反過來，工程師會抗拒修的常見理由是：重現不了；看不懂報告在講什麼；要花太多力氣才能搞懂回報者實際做了什麼；覺得情境不切實際，像是刁鑽案例或要一長串不太可能發生的步驟才會觸發；覺得沒有實際客戶影響；主張這是功能不是缺陷；改動風險太高或太花時間；管理層不重視這類問題；不信任或不喜歡回報者。

## 原理
這兩份清單本質上對應同一件事的兩面：一份是怎麼做能提高修復意願，一份是哪些沒做到會變成藉口。缺陷報告寫作與後續調查的目的，很大一部分就是針對性地補上這些誘因、拆掉這些抗拒理由，而不是單純把技術現象記錄下來。

## QA 視角
- 怎麼測：報告送出前逐條核對抗拒清單，能提前補的先補，例如附上重現影片降低重現不了的風險、附上受影響會員規模或站台範圍降低沒有客戶影響的反駁空間；如果預期會被質疑這是設計如此，主動在留言附上依據，而不是等對方先提出來才回應。
- 常見缺陷：報告只講技術細節不講影響範圍，對方直覺判斷這種情境很少見就低優先處理；明明可以附上重現影片或錄屏卻沒附，讓對方花額外時間才能理解操作步驟，選擇先擱置；面對這是設計如此的回覆時只回一句我覺得是 bug，沒有具體依據可以反駁；報告語氣帶指責，讓對方在情緒上先抗拒而非先看技術內容。
