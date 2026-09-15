---
id: rd/backend/protobuf-avro-schema-evolution
title: 二進位制模式演化（Protobuf／Avro 欄位規則）
aliases: [protocol buffers, avro, field tag, 欄位標籤, schema registry, writer schema reader schema]
tags: [encoding, schema, protobuf, avro, grpc]
topic: api
confidence: book
updated: 2026-09-15
sources: [DDIA ch5 §Protocol Buffers, DDIA ch5 §Avro]
related: [rd/backend/schema-forward-backward-compatibility, rd/backend/api-versioning]
summary: gRPC/Avro 类系统怎麼靠欄位標籤或讀寫雙模式做到安全的新增/刪除/改型別欄位。
---
## 定義
Protocol Buffers 用數字欄位標籤（不是欄位名）辨識欄位，資料裡不含欄位名；Avro 不用標籤，靠寫入者模式與讀取者模式在解碼時逐欄比對欄位名來協調差異。

## 原理
Protobuf：新增欄位要給新標籤號，舊程式碼看到不認識的標籤直接跳過；刪除欄位後該標籤號永久保留不可重用，否則舊資料會被誤讀成新型別。欄位型別可改但可能截斷（如 32 轉 64 位再轉回會丟資料）。Avro：只有帶預設值的欄位新增/刪除才保相容；沒有預設值的新增欄位會讓向後相容失效，沒有預設值的刪除欄位會讓向前相容失效。

## QA 視角
- 怎麼測：模擬「舊 client 呼叫新 server」與「新 client 呼叫舊 server」兩個方向，各自送出/接收含新舊欄位混合的 payload，比對欄位是否正確保留、缺欄位是否正確補預設值。
- 常見缺陷：
  - 誤將已刪除的欄位標籤號重新分配給新欄位，造成舊資料被誤解讀成新語意（資料錯亂而非報錯，最難查）
  - Avro 新增欄位忘記加 default，導致舊資料在新版服務上直接解碼失敗（比 protobuf 更容易踩，因為 Avro 靠讀寫雙模式比對而非單純跳過）
  - int32 改 int64 後，舊版仍以 32 位儲存，超界的值被截斷卻沒有任何錯誤訊息
  - 欄位改名以為安全，實際上 Avro 靠別名對應，若忘記宣告別名會直接讀不到舊資料的值
