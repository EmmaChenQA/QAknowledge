---
id: qa/automation/tool-not-automation-terminology
title: 為何用「工具」取代「自動化」更準確
aliases: [tool not automation, 工具化測試, automation一詞的誤導, tacit knowledge, 內隱知識, 測試不可被自動化的原因]
tags: [automation, terminology, tacit-knowledge, testing-philosophy]
topic: qa-automation
confidence: author-material
updated: 2026-09-15
sources: [A Context-Driven Approach to Automation in Testing, Bach & Bolton 2016 §First: Call them tools (not "test automation"), pp.4-6（Satisfice Inc. 版權所有，作者免費公開，非CC授權）]
related: [qa/automation/checking-vs-testing-distinction, qa/foundations/software-testing-definition]
summary: 「自動化」暗示測試能被機器整套複製，但測試判斷大量來自無法寫成規則的內隱知識。
---
## 定義
把「工具」定義成任何能幫助人達成目的的人造物，測試工具則是被拿來輔助測試工作的任何契約物，不限於軟體。用「工具」取代「自動化」這個詞，是因為「自動化」暗示有一整套人類活動可以被機器原封不動接手，而「工具」正確傳達了機器只是延伸並放大一個技術純熟的人的能力，離開了人的引導就不會動作這個事實。

## 原理
測試員操作產品時，大量反應與判斷是無意識、當下即時發生的——注意到畫面顏色瞬間跑掉、注意到某個動作偶爾多花一點時間、注意到某個地方感覺怪怪的——這些反應建立在測試員長期累積、卻從未被明確寫下來的經驗與直覺上，屬於只能靠人身體力行才能運用、無法完整轉寫成文字或程式碼的知識。既然測試員自己都無法把這些判斷完整寫成一份步驟清單，這些判斷當然也就無法被寫進程式裡讓機器執行。稱呼這整件事為自動化，容易讓人誤以為只要投入夠多工具，就能把測試員的判斷力也一併複製掉，進而低估測試需要的技能與思考。

## QA 視角
- 怎麼測：規劃新腳本前先問這支腳本要頂替的是「動作」（點擊、輸入、送出）還是「判斷」（這個結果合不合理），只自動化前者，後者留給人在腳本跑完後親自複核關鍵畫面。
- 怎麼測：溝通測試計畫時把「這項要自動化」改問成「這項要用什麼工具輔助、由誰負責判讀結果」，逼自己把人的判斷角色講清楚，不讓詞彙含糊帶過責任歸屬。
- 常見缺陷：把腳本涵蓋率當成測試完整度的唯一指標，忽略涵蓋率高不代表判斷品質高，容易漏掉需要人眼辨識的視覺或語意類缺陷。
- 常見缺陷：用「已經自動化」暗示不需要人再看，導致回歸測試變成只看腳本燈號，沒人再做探索性複核。
- 常見缺陷：把撰寫斷言邏輯的工作交給不懂測試設計的人，寫出只驗證表面、驗證不到業務語意的腳本。
