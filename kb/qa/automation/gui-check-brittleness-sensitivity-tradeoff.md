---
id: qa/automation/gui-check-brittleness-sensitivity-tradeoff
title: GUI check 抗變動與敏感度的取捨
aliases: [resilience vs sensitivity, GUI check過濾雜訊的代價, 忽略時間戳的風險, 抗脆弱測試腳本, false negative容忍過寬, GUI檢查遮蔽真實缺陷]
tags: [automation, gui, false-negative, test-design]
topic: qa-automation
confidence: author-material
updated: 2026-09-15
sources: [A Context-Driven Approach to Automation in Testing, Bach & Bolton 2016 §You can make GUI checking more resilient in the face of product change, at a price, pp.24-25（Satisfice Inc. 版權所有，作者免費公開，非CC授權）]
related: [qa/automation/gui-automation-practical-limits, qa/exploratory/scripted-testing-temporal-staleness-limitation]
summary: 讓 GUI check 對介面變動更有彈性，代價是同時失去偵測某些真實缺陷的能力。
---
## 定義
為了讓 GUI 檢查在介面小幅調整時不會動不動就誤判失敗，常見做法是刻意忽略某些細節，例如比對畫面時排除時間戳、排除當下登入的使用者名稱、只比對畫面局部區塊。這種做法能降低腳本因無關緊要的變動而誤報失敗的機率，但同一批被刻意忽略的細節，一旦真的出了問題，也會被同一套邏輯放過，檢查不出來。

## 原理
一支檢查腳本能同時做到介面小改不誤報、又所有細節都不放過，是矛盾的兩件事，兩者此消彼長。刻意放寬比對範圍換來的穩定性，本質上是用降低偵測靈敏度交換來的；而且每多寫一條特殊情況的排除邏輯，腳本本身複雜度也跟著提高，複雜度提高意味著日後修改腳本更容易改出新的錯誤，形成另一種脆弱。同樣道理出現在延遲判讀型的檢查上：為確保某個非同步動作完成才讀取結果，常見做法是加一段等待時間再讀取，代價是看不出這個動作的反應時間本身是否正逐漸變慢或不穩定，因為系統只在等待結束那個瞬間看一眼結果，忽略了過程。

## QA 視角
- 怎麼測：新增任何一條排除比對或忽略某欄位的邏輯前，先問這個欄位如果真的出錯業務上會不會造成問題，會的話就不能單純排除，要改成寬鬆但仍會抓異常的規則（如比對格式而非比對確切數值）。
- 怎麼測：對有非同步等待邏輯的檢查，額外抽樣記錄每次實際等待到結果出現所花的時間，定期複查這串時間有沒有出現持續變慢的趨勢，不只看有沒有超時這個二元結果。
- 常見缺陷：排除了使用者名稱比對而漏掉顯示錯誤使用者名稱這種身份混淆型缺陷，且長期沒被任何腳本抓到。
- 常見缺陷：等待時間設定過長，掩蓋系統回應正在逐漸退化的徵兆，直到使用者實際抱怨變慢才被發現。
- 常見缺陷：排除比對的特殊邏輯越疊越多，腳本本身變得難以閱讀與維護，改一處排除規則卻意外影響到另一個原本正常運作的斷言。
