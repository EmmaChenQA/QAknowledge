---
id: qa/bug-advocacy/hidden-critical-conditions-checklist
title: 難以重現缺陷的常見隱藏臨界條件清單
aliases: [critical condition, 臨界條件, 隱藏輸入變數, catalyst condition, race condition重現, 時間相依缺陷, 環境相依缺陷, hidden state]
tags: [bug-advocacy, reproducibility, root-cause, diagnostics]
topic: qa-bug-advocacy
confidence: author-material
updated: 2026-09-15
sources: [BBST Bug Advocacy Lecture 4 §Examples of Conditions Often Missed, slides 123-135 (CC BY-SA 4.0, Kaner/Fiedler, bbst.courses)]
source_lang: en
related: [qa/bug-advocacy/irreproducible-bug-reporting-practice, rd/backend/fault-injection-chaos-engineering, rd/backend/clock-skew-and-drift]
summary: 重現不出來時，先對照這份常見被忽略的臨界條件分類，逐項排除再判定無法重現。
---
## 定義
測試者踩到無法重現的失敗時，多半是漏看了某個實際上才是關鍵的條件，而不是這個失敗真的沒有規律。常見被忽略的條件可以分成幾類：延遲效應型，問題要累積多次操作、經過一段時間才顯現，例如記憶體洩漏；隱藏變數型，存在某個當初沒想到相關、因此沒去控制或記錄的輸入條件；催化劑型，某個因素不會直接造成失敗，但會讓失敗更容易出現，例如低記憶體讓洩漏更快現形、慢速環境讓競態更容易觸發；資料汙染型，要有特定的髒資料或不合法的既有狀態才會觸發；順序相依型，要照特定順序做多個操作才會觸發；時間相依型，只在特定時刻、月底或年底等時間點才出現；錯誤處理鏈型，要先觸發過一次錯誤讓程式進入某個異常狀態，第二個問題才會出現；初始狀態型，只在第一次安裝或啟動時出現一次；環境相依型，依賴特定硬體、背景程式、網路負載或機台專屬設定。

## 原理
這些分類的共通點是失敗背後一定有規律，只是規律牽涉到的條件不在測試者原本設想的範圍內。把這份清單當成排除法的檢查表，能系統性地縮小還沒檢查過的可能條件範圍，而不是靠運氣亂猜。

## QA 視角
- 怎麼測：重現不出來時，依序自問是不是需要重複操作多次才會累積出現、是不是有某個沒特別設定但其實有影響的環境變數或使用者狀態、是不是要照特定順序做前置操作、是不是跟時間點有關、是不是要先讓系統進入某個異常狀態；懷疑是時間延遲型問題時改用錄影或 log 工具記錄長時間的操作序列，而不是只憑記憶回想。
- 常見缺陷：只在單次操作下測試就判定不會重現，沒有嘗試重複操作看是否有累積效應；忽略了測試前做過的其他操作，其實才是真正的觸發條件；在效能較好的自己機台上測不出客訴回報的問題，卻沒有換成規格較弱或設定不同的機台去驗證是否為環境相依；重現失敗後沒有回頭記錄這次的關鍵條件是什麼，導致下次遇到類似狀況又要從頭摸索。
