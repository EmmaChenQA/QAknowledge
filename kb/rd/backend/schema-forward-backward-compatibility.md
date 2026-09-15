---
id: rd/backend/schema-forward-backward-compatibility
title: 向前／向後相容（Schema Compatibility）
aliases: [forward compatibility, backward compatibility, 欄位新增刪除相容性, API 版本相容, 滾動升級相容性, 新舊版本共存]
tags: [encoding, schema, api, versioning, compatibility]
topic: api
confidence: book
updated: 2026-09-15
sources: [DDIA ch5 §編碼資料的格式, DDIA ch5 §欄位標籤與模式演化]
related: [rd/backend/protobuf-avro-schema-evolution, rd/backend/database-rolling-upgrade-dataflow, rd/backend/api-versioning, rd/backend/json-numeric-precision-pitfalls]
summary: 新舊程式碼與新舊資料格式同時存在時，欄位增刪是否會讓某一端讀壞或寫壞資料。
---
## 定義
向後相容指較新的程式碼可以讀取較舊程式碼寫入的資料；向前相容指較舊的程式碼可以讀取較新程式碼寫入的資料。滾動升級、客戶端版本不一致，都會讓新舊版本同時存在，兩種相容性缺一不可。

## 原理
向後相容通常較容易：新程式碼作者知道舊格式長相，可以顯式處理。向前相容較難：舊程式碼必須忽略自己不認識的新欄位，且理想上應該原樣保留該欄位（而非解碼成物件時遺失），否則舊版本讀出、修改、寫回時會把新欄位資料弄丟。

## QA 視角
- 怎麼測：用新版寫入含新欄位的資料，改用舊版程式碼/舊版 API 讀出再寫回，確認新欄位未被清空或覆蓋為預設值；反向測試舊資料被新版讀取時是否正確補上預設值而非報錯。
- 常見缺陷：
  - 新增必填欄位沒給預設值，舊資料被新版讀取時整批失敗或欄位變 null 卻被當成合法值處理
  - 舊版 client 更新一筆資料時把自己不認識的新欄位整個清掉（PUT 覆蓋而非 PATCH 語意）
  - 刪除欄位後舊 client 仍在送該欄位，新版沉默丟棄造成使用者以為設定生效實際未生效
  - 灰度發版期間，新舊版本對同一資料表現不一致，只在部分使用者身上重現，難以復現
