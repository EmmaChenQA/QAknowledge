---
id: rd/backend/serializable-isolation
title: 可序列化隔離（Serializable Isolation）
aliases: [可序列化, serializable, 悲觀併發控制, 樂觀併發控制]
tags: [事務, 隔離級別, 支付]
topic: tx
confidence: book
updated: 2026-09-15
sources: [DDIA ch8 §可序列化]
related: [rd/backend/write-skew, rd/backend/lost-update, rd/backend/transaction-acid, rd/backend/two-phase-locking-vs-ssi]
summary: 唯一能自動擋下所有併發異常（含寫偏差、幻讀）的隔離級別，但效能代價高，各資料庫是否真支援、預設是否開啟差異很大。
---
## 定義
可序列化隔離保證：無論事務實際上如何併發交錯執行，最終結果都等同於某種「一個接一個」的序列執行順序。這是最強隔離級別，能自動防止髒讀、髒寫、丟失更新、寫偏差、幻讀等所有已知的併發異常（三種主流實現路徑的細節比較見 `two-phase-locking-vs-ssi`）。

## 原理
「這個資料庫支援可序列化」不代表預設開啟，也不代表所有資料庫對同名隔離級別行為一致（如 Oracle 的「可序列化」實際只是快照隔離），必須實際查證某資料庫、某設定下的真實行為。可序列化不是免費的：換取正確性的代價是延遲升高、吞吐降低、或事務中止率上升，因此許多系統刻意選擇較弱隔離級別搭配約束/樂觀鎖等局部手段。

## QA 視角
- 怎麼測：確認系統文件/設定宣稱的隔離級別，實際跑一次寫偏差／幻讀類的併發情境（見 `write-skew` 節點）驗證是否真的被擋下，而不是只信賴「聲稱支援 ACID/可序列化」的說法。
- 常見缺陷：以為切到「可序列化」隔離級別就萬事無憂，卻沒注意到某些資料庫該級別名不符實（實為快照隔離），寫偏差仍會發生；為了追求可序列化把所有查詢都包進大事務，導致其他不相關功能被鎖阻塞而效能全面下降。
