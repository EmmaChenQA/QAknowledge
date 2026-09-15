---
id: rd/backend/replication-consistency-anomalies
title: 複製延遲下的三種讀取異常
aliases: [read-your-writes, 讀己之寫, monotonic reads, 單調讀, consistent prefix reads, 一致字首讀, 最終一致性]
tags: [replication, consistency, database, testing]
topic: rep
confidence: book
updated: 2026-09-15
sources: [DDIA ch6 §複製延遲的問題]
related: [rd/backend/leader-failover-split-brain, rd/backend/quorum-read-write-leaderless, rd/backend/sync-vs-async-replication-tradeoffs]
summary: 從非同步追隨者讀取時可能看到自己剛寫入的東西消失、時間倒退、或先看到答案才看到問題。
---
## 定義
非同步複製下，追隨者資料可能落後領導者，這種暫時性不一致稱為最終一致性。三種常見異常：讀己之寫（使用者看不到自己剛提交的內容）、單調讀（連續讀取卻看到時間倒退）、一致字首讀（違反因果順序，如先看到答案才看到問題）。

## 原理
讀擴充套件架構把讀請求分散到多個追隨者以提高吞吐，但每個追隨者複製進度不同。讀己之寫可靠「自己的資料一律讀領導者」或「記住上次寫入的時間戳/日誌位置，確保讀到的副本至少追上該點」解決；單調讀靠「同一使用者固定讀同一副本」解決；一致字首讀在分片系統中最麻煩，因為不同分片複製速度不同、沒有全域寫入順序。

## QA 視角
- 怎麼測：寫入後立刻用同一使用者身分連續多次讀取（含刷新頁面、切換裝置），確認新資料不會消失又出現；針對多分片/多資源共同構成一個畫面的場景（如留言串），刻意讓某分片複製延遲加大，確認不會出現「回覆先於原PO出現」的畫面。
- 常見缺陷：
  - 使用者送出表單後導轉到列表頁,自己剛新增的那筆資料時有時無（讀到落後的追隨者）
  - 跨裝置寫後讀：手機新增資料，電腦立刻查詢卻看不到，因為兩裝置路由到不同地區的複本
  - 重新整理頁面後内容「倒退」到更早的狀態，之後又恢復，使用者以為資料被刪除又復原
  - 對話/評論類功能因分片複製延遲不同，出現「回覆先顯示、原留言後顯示」的因果錯亂
