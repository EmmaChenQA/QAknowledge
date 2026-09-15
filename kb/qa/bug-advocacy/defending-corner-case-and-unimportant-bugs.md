---
id: qa/bug-advocacy/defending-corner-case-and-unimportant-bugs
title: 缺陷被打為「不重要 / 不現實」時的辯護方式
aliases: [corner case 辯護, uncorner your corner cases, no customer impact, 極端案例, 不切實際的失敗, unrealistic failure, 客戶影響評估]
tags: [bug-advocacy, triage, severity, edge-case]
topic: qa-bug-advocacy
confidence: author-material
updated: 2026-09-15
sources: [BBST Bug Advocacy Lecture 2 §Showing a Bug Is More General / Corner Cases, slides 59-62; Lecture 5 §The Unrealistic Failure / No Customer Impact, slides 144-146, 155 (CC BY-SA 4.0, Kaner/Fiedler, bbst.courses)]
source_lang: en
related: [qa/bug-advocacy/rimgen-followup-testing, qa/bug-advocacy/motivating-programmer-to-fix]
summary: 面對「只在極端情況發生」或「沒有客戶影響」的打回票，有具體的反制與辯護做法。
---
## 定義
角落案例（corner case）是同時用了至少兩個變數的極端值組合出來的測試，第一直覺容易被視為不切實際。反制方式是把極端值換成主流或中間值，只要中間值仍能重現，就用中間值版本寫報告，這會比極端值版本可信得多；如果換成中間值就不重現，代表問題確實只發生在窄範圍，這時報告要老實標出這個窄範圍，而不是硬拗成普遍問題，讓後續決策者自己判斷這種窄範圍值不值得修。當缺陷被以沒有客戶影響駁回時，要反問對方這個判斷是根據什麼，因為多數時候這只是直覺猜測，接著去找真正握有數據或第一線經驗的角色核實，而不是自己跟對方各執一詞。

## 原理
兩種打回票的話術背後邏輯相似：都是在沒有實際驗證的情況下，用直覺替代查證做出不重要的判斷。回報者如果拿不出數據反駁，爭論只會停在各自主觀認定；但只要能提供換成主流值仍重現、或客服/營運確認過有實際客訴這類具體證據，就能把主觀爭論轉成可查證的事實。

## QA 視角
- 怎麼測：極端測資踩到的問題，換一組正常會員實際會用到的數值再測一次，重現就在報告主打這組主流測資；查不到客訴或既有資料佐證沒有影響時，去問客服、營運或風控是否曾遇過類似狀況再下結論，不要單憑自己猜測回應對方。
- 常見缺陷：只用邊界值測出問題就直接送出報告，被以這種輸入現實中不會發生打回，其實換成常見數值也一樣會重現卻沒去驗證；被回沒有客戶影響就直接放棄，沒有去查客服或營運端是否真的沒人反映過；把只在窄範圍發生的問題硬寫成所有情境都會發生，事後被抓包誇大，連帶影響後續報告的可信度。
