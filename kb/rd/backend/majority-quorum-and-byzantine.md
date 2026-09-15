---
id: rd/backend/majority-quorum-and-byzantine
title: 多數決與拜占庭故障邊界（Quorum & Byzantine Fault Boundary）
aliases: [法定人數, quorum, 多數決, 拜占庭故障, byzantine fault, 誠實但不可靠]
tags: [distributed-systems, quorum, fault-tolerance]
topic: dist
confidence: book
updated: 2026-09-15
sources: [DDIA ch9 §知識、真相和謊言, DDIA ch9 §拜占庭故障]
related: [rd/backend/fencing-token, rd/backend/consensus-algorithms, rd/backend/two-phase-commit, rd/backend/untrusted-input-validation-boundary]
summary: 單一節點對自身狀態的判斷不可信，真相要靠多數節點投票決定；一般後端系統不必防範蓄意說謊的節點
---
## 定義
分散式系統中任何單一節點都無法確知自己是否「還活著」——它可能其實已被判定死亡而不自知，也可能長時間暫停後醒來仍以為只過了一瞬。因此可靠的分散式演算法不依賴單一節點的自我判斷，而是要求「多數節點（法定人數）」共同投票決定，例如宣告某節點死亡、選出領導者。多數決的關鍵性質是：系統中不可能同時存在兩個互相衝突的多數派，因此只要遵循多數決，就不會出現兩種矛盾結論同時被接受。拜占庭故障則是更極端的假設：節點可能主動說謊、發出偽造或自相矛盾的訊息（而非只是變慢或當機，對外部輸入的信任邊界見 `untrusted-input-validation-boundary`）。

## 原理
一般內部服務假設節點「不可靠但誠實」——它可能當機、變慢、傳遞過時狀態，但只要它有回應，回應內容是可信的，不會蓄意造假。拜占庭容錯（BFT）要處理節點主動作惡的情況，代價高昂，因此只用於區塊鏈、跨組織互不信任等特殊場景，企業內部資料中心的多數系統不需要 BFT。

## QA 視角
- 怎麼測：驗證系統的「誰死亡/誰是領導者」判斷是否真的走法定人數投票，而非讓某個節點自行宣告。
- 常見缺陷：以為「N 台裡有一半有回應」就等於決策安全，卻沒有處理「網路分區導致兩邊各自形成非多數投票」的情境（應該兩邊都不可寫，卻其中一邊仍寫入）；混淆「節點當機/變慢」與「節點惡意」兩種故障模型，用容錯機制去防禦資安問題（或反過來用資安手段處理單純的可用性故障）。
