---
id: qa/test-design/scenario-testing-story-elements
title: 情境測試的故事要素與說服力判準（Scenario Testing Story Elements）
aliases: [情境測試, scenario testing, 故事測試法, 使用者情境測試, credible scenario, 可信情境, 說服力測試]
tags: [scenario-testing, credibility, test-design, oracle]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 4 "Scenario Testing" p.293-295, 319-325（CC BY-SA 4.0, Kaner/Fiedler, bbst.courses）]
related: [qa/test-design/scenario-testing-lines-of-inquiry, qa/test-design/test-technique-quality-attributes]
summary: 情境測試須具備連貫故事、可信、有說服力、夠複雜、易判讀五要素
---
## 定義

情境測試（scenario test）用一個關於「某人如何使用（或嘗試使用）程式」的連貫故事來評估程式行為，不是單純的操作步驟清單。故事的組成要素包含場景設定、參與者（人或系統）、目標、動機與情緒、情節（一連串動作與事件），以及「動作與事件本身可能改變目標」這件事——使用者可能在過程中因為遇到狀況而改變原本想達成的目的。

## 原理

一個夠格的情境測試要同時具備五個特性：故事連貫（有清楚的目標與情緒脈絡，不是零散步驟拼湊）、可信（利害關係人會相信真的有人會這樣做）、有說服力（有影響力的關係人會因此主張要修這個缺陷）、夠複雜（複雜的操作、環境或資料組合，這正是情境測試比單一功能測試更能挖出深層缺陷的原因）、易於判讀（儘管複雜，仍要有清楚可辨的預期結果）。這五者彼此獨立：一個測試可能可信卻不具代表性（發生機率 0.05% 的情境），也可能有價值卻不足以說服人修（關係人承認問題存在但認為不重要）。分不清這些差異，寫出來的情境測試力道就會出不來。

## QA 視角
- 怎麼測：動筆寫情境前先依序問五個問題——誰會用、在什麼情境下用、想達成什麼目標、為什麼在意（動機與情緒、失敗的後果）、如何合理地增加複雜度（自然會搭配什麼、資料量多大、效應是否會持續影響後續操作）；最後才問「怎麼讓這條容易判讀」（能否用自我驗證的資料、能否算出已知的預期結果）。故事要具體到能寫出可觀察的預期結果，而不是停在「使用者想登入」這種抽象敘述。
- 常見缺陷：只寫「主路徑」情境，測試者自己想像的 happy path，沒有涵蓋失敗分支或真實使用者會遇到的挫折點；情境堆疊得很複雜但彼此不連貫，一旦某步驟出錯就卡住後續全部步驟（blocking bug），且難以判斷根因出在哪一環；情境寫得可信卻無法評估結果（產出大量資料只能靠肉眼逐一核對），導致缺陷被漏看；把「情境」跟「一串按鈕點擊清單」混為一談，沒有動機、情緒、後果，回報缺陷時利害關係人看不出為什麼該修。
