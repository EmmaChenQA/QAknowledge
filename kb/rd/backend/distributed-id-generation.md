---
id: rd/backend/distributed-id-generation
title: 分散式 ID 生成策略（Distributed ID Generation）
aliases: [ID生成器, 唯一ID, 分散式ID, 分片ID, snowflake, UUID, 自增主鍵]
tags: [distributed-systems, id-generation, causality]
topic: dist
confidence: book
updated: 2026-09-15
sources: [DDIA ch10 §ID生成器和邏輯時鐘]
related: [rd/backend/logical-clock-ordering, rd/backend/linearizability]
summary: 單節點自增 ID 線性一致但無法容錯；分片/UUID 等分散式方案能擴充但都犧牲了「ID 順序反映事件實際發生順序」的性質。
---
## 定義
單節點自增 ID（如資料庫自增主鍵）本身就是一種線性一致的 ID 生成器：若請求 A 在請求 B 開始前已完成，即使兩者從未通訊，B 的 ID 也一定更大；但無法容錯、跨機房會有延遲瓶頸。分片式（如奇偶分片各自遞增）、預分配區塊式、隨機 UUID 等替代方案雖能分散式產生 ID，卻都犧牲了「ID 順序反映事件實際發生順序」這個性質。

## 原理
線性一致的 ID 生成器要求全域順序，通常只能靠單一節點的原子計數器（搭配持久化與容錯複製）或依賴像 Spanner TrueTime 那樣有硬體支援的時鐘不確定區間來實現；分散式生成的方案為了可擴充、可容錯而放棄了這個保證，兩個 ID 之間誰大誰小不再能推論出誰先產生。呼叫端若沒意識到這個取捨，很容易誤把「分散式生成的 ID」當作「時間排序」使用。

## QA 視角
- 怎麼測：驗證跨服務/跨資料庫產生的 ID 或版本號，是否被誤用來判斷「誰先誰後」或做全域排序展示（如訊息串按 ID 排序卻用了分片式 ID 生成器，導致順序錯亂）。
- 常見缺陷：把分片產生的 ID（如「奇偶分片」「按範圍預分配區塊」）誤當作全序使用，前端排序或分頁邏輯因此出現錯亂；混用「單節點自增 ID 語意」（呼叫端誤以為 ID 越大越新）與實際上是分散式生成、順序不保證的 ID 生成器，造成排序類需求的隱性缺陷；系統擴充為多節點生成 ID 後，未同步檢查所有依賴「ID 遞增＝時間先後」假設的既有功能。
