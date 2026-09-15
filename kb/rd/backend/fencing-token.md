---
id: rd/backend/fencing-token
title: 分散式鎖與柵欄令牌（Distributed Lock & Fencing Token）
aliases: [柵欄令牌, fencing token, 分散式鎖, distributed lock, 條件寫入, conditional write, 序列器, epoch number]
tags: [distributed-systems, lock, lease, consistency]
topic: dist
confidence: book
updated: 2026-09-15
sources: [DDIA ch9 §分散式鎖和租約]
related: [rd/backend/process-pause-gc-stw, rd/backend/majority-quorum-and-byzantine, rd/backend/consensus-algorithms]
summary: 光靠「誰持有鎖」不夠安全，資源端必須拒絕帶有過期令牌的寫入才能真正防止腦裂
---
## 定義
柵欄令牌是鎖服務每次授予鎖/租約時附帶的一個單調遞增數字。要求客戶端每次寫入資源時都帶上自己拿到的令牌，資源服務端則只接受令牌值遞增的寫入、拒絕令牌比目前已處理過的最大值更小的請求。這樣即使舊持鎖者（殭屍）因暫停恢復後誤以為自己仍持鎖並發出寫入，也會因令牌過舊而被資源端擋下。

## 原理
單靠鎖服務本身無法阻止殭屍節點造成的腦裂，因為問題發生在「資源端」而非「鎖服務端」——必須讓實際儲存/處理寫入的那個服務具備「拒絕過期令牌」的能力，鎖機制才真正安全。嘗試用「主動關掉可疑節點」（STONITH）來隔離殭屍效果有限：擋不住已經在網路中延遲很久、稍後才抵達的舊寫入請求；也可能因誤判互相關停彼此。等效手段是資源端支援條件寫入（compare-and-set，如物件儲存的條件寫入/ETag 比對）：只有「自上次讀取後沒有其他人動過這筆資源」才允許寫入成功。

## QA 視角
- 怎麼測：模擬「客戶端 A 拿到鎖後暫停很久 → 客戶端 B 拿到新鎖並成功寫入 → A 恢復後仍嘗試用舊令牌寫入」的時序，確認資源端會拒絕 A 的寫入而不是直接覆蓋 B 的結果；檢查請求延遲極大（分鐘級）到達時是否仍受令牌檢查保護，而不只靠「連線已斷開」這種容易繞過的判斷。
- 常見缺陷：只驗證「同時只有一個人能拿到鎖」，卻沒驗證「舊持鎖者的遲到寫入會不會通過」；用「踢掉舊連線/關閉舊 session」代替令牌檢查，遇到請求已經在網路排隊中就防不住；令牌比較邏輯用等於判斷（只擋相同令牌）而非「大於等於當前已處理值」，退化成無法真正遞增拒絕的假保護。
