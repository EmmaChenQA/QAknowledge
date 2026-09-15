---
id: rd/backend/sync-vs-async-replication-tradeoffs
title: 同步／非同步複製的取捨
aliases: [synchronous replication, asynchronous replication, 半同步複製, semi-synchronous, 複製延遲]
tags: [replication, durability, availability, database]
topic: rep
confidence: book
updated: 2026-09-15
sources: [DDIA ch6 §單主複製, DDIA ch6 §同步複製與非同步複製]
related: [rd/backend/replication-consistency-anomalies, rd/backend/leader-failover-split-brain]
summary: 同步複製保證追隨者跟上但一個節點沒回應就整體卡住寫入，非同步複製快但領導者失效時可能丟資料。
---
## 定義
單主複製中，領導者把寫入轉發給追隨者：同步複製要等追隨者確認收到才回報使用者成功；非同步複製發完就不等，不保證追隨者何時跟上。實務上常見「半同步」：只有一個追隨者同步，其餘非同步，兼顧可靠性與可用性。

## 原理
若把所有追隨者都設為同步，任一節點停機或變慢就會讓整個系統無法寫入，因此純同步在多追隨者場景不現實。完全非同步的風險是：領導者失效且無法恢復時，所有還沒送達追隨者的寫入都會遺失，即使系統已經回報客戶端「寫入成功」。多數系統選擇折衷（半同步或法定人數式的多數同步）。

## QA 視角
- 怎麼測：對回報「寫入成功」的請求，立刻讓領導者斷線（模擬崩潰），檢查該筆寫入是否真的在其他副本上找得到；刻意讓一個追隨者延遲或斷線，確認系統是否如預期卡住寫入（同步配置）或繼續正常寫入（非同步配置）。
- 常見缺陷：
  - 系統回報寫入成功後，領導者立即當機，該筆資料在其他副本上完全查無此單（非同步複製削弱永續性卻沒讓使用者知情）
  - 誤把同步複製配置成全部追隨者同步，某個追隨者網路異常時，全站寫入卡死卻難以第一時間定位是哪個節點造成
  - 半同步配置下，原同步追隨者失效，系統切換另一個非同步追隨者頂替為同步時的短暫視窗內，仍可能遺失剛提交的寫入
