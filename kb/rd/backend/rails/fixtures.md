---
id: rd/backend/rails/fixtures
title: Fixtures（測試固定資料）
aliases: [夾具, 測試資料集, YAML fixtures, 測試種子資料, seed data for tests]
tags: [rails, 測試資料, 測試環境]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Testing Rails Applications §3.2（CC BY-SA 4.0, guides.rubyonrails.org）]
related: [rd/backend/rails/test-environment, rd/backend/rails/model-test]
summary: Fixtures 是測試前預先灌入 DB 的固定資料集，每個 model 一份 YAML 檔。
---
## 定義
Fixtures 是一致的測試資料集，用 YAML 描述、存在 `test/fixtures/`，每個 model 一檔。載入時清空對應資料表、灌入資料，並以方法形式提供給測試（如 `users(:david)`）。Fixture 間可用名稱互相參照關聯，不必手動指定 id。

## 原理
Fixtures 只設計來放共用的預設資料，不是覆蓋每種資料狀態；載入前會嘗試停用參照完整性觸發器清空舊資料，需相應 DB 權限。YAML 先經 ERB 前處理，可用迴圈批次生成資料。Fixture 物件本質就是 Active Record 實例。

## QA 視角
- 怎麼測：檢查關聯 fixture 參照名稱是否對得上（拼錯不會馬上報錯）；用 `model(:name).attr` 直接讀值核對前置資料。
- 常見缺陷：fixture 被多支測試共用又被意外修改而互相污染；ERB 動態生成資料量過大拖慢開機；權限不足時觸發器停用失敗，導致載入卡住或殘留舊資料。
