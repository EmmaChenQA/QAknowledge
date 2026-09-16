---
id: qa/bug-advocacy/irreproducible-bug-reporting-practice
title: 無法重現的缺陷回報紀律（Dumpster 管理）
aliases: [irreproducible bug, 無法重現, non-reproducible failure, cannot reproduce, dumpster diving, 間歇性缺陷, 偶發性bug回報]
tags: [bug-advocacy, reproducibility, triage, bug-tracking]
topic: qa-bug-advocacy
confidence: author-material
updated: 2026-09-15
sources: [BBST Bug Advocacy Lecture 4 §Non-Reproducible Failures / Can You Reproduce the Problem / Throwing Bugs Into the Dumpster, slides 115-120, 136-138 (CC BY-SA 4.0, Kaner/Fiedler, bbst.courses)]
source_lang: en
related: [qa/bug-advocacy/hidden-critical-conditions-checklist, qa/bug-advocacy/bug-report-essential-fields]
summary: 無法重現不代表沒問題，回報方式與後續追蹤有固定紀律，不該急著關單。
---
## 定義
無法重現的失敗依然要回報，但要報得比一般缺陷更謹慎：明確標註這是無法重現而非隨便標成可重現；儘量精確描述失敗現象本身，包含錯誤訊息原文、畫面變化細節、有輸出到其他裝置或系統的訊息也要記錄，包含哪些原本該有動靜卻沒有動靜；記錄已經嘗試過哪些重現方式；發現當下先保留機器狀態，換一台機器試著重現。當花了很多時間仍重現不出來、但又不確定是不是真的沒問題時，可以先把它放進一個不列入待修統計、但沒有真正關閉的暫存狀態，定期例如每一兩週回頭掃一次暫存區，看有沒有出現類似的新回報可以互相佐證，專案後期再做最後一次總掃描決定去留。

## 原理
無法重現本身就是一種資訊：代表回報者的測試邏輯有漏洞，沒有意識到也沒有去檢查某個輸入條件或輸出條件其實才是觸發失敗的關鍵。因為多次獨立回報的同一個潛在缺陷，若每次都各自被以無法重現關掉，同一個嚴重問題可能被發現、回報、關閉好幾輪都沒人發現這是同一件事，所以保留暫存追蹤模式並定期比對是必要的防線。

## QA 視角
- 怎麼測：踩到之後立刻寫下能記得的一切，越晚寫忘得越多，包含這次測試之前做過什麼操作，因為失敗可能是延遲反應；換一台配置差異大的機器試著重現；查 bug tracking 系統裡有沒有敘述相似的舊回報，找出共同點；有錄影、log、proxy 抓封包工具就用，把現場證據留下來而不是只靠記憶描述。
- 常見缺陷：重現不出來就直接放棄不回報，讓同一個問題持續在生產環境發生卻沒有累積任何紀錄；把嘗試過一次沒重現直接寫成無法重現、建議關閉，沒有記錄已經試過哪些條件，後面的人只能從頭再試一次；因為專案管理用未關閉缺陷數當指標，被要求盡快關掉所有無法重現的項目，導致真正嚴重但難重現的問題被提早關閉、失去追蹤。
