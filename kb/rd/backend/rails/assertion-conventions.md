---
id: rd/backend/rails/assertion-conventions
title: 斷言慣例（Assertion Conventions）
aliases: [assert_equal, assert_response, minitest assertions, Rails 專用斷言, assert 系列]
tags: [rails, 測試設計, 斷言]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Testing Rails Applications §2.5, §2.6, §2.7（CC BY-SA 4.0, guides.rubyonrails.org）]
related: [rd/backend/rails/model-test, rd/backend/rails/controller-functional-test, rd/backend/idempotency]
summary: Rails 測試基於 Minitest 斷言，並疊加 assert_response/assert_difference 等框架專屬斷言。
---
## 定義
Rails 沿用 Minitest 基本斷言（`assert_equal`、`assert_nil`、`assert_raises`），並加框架斷言：`assert_response`（驗狀態碼區間）、`assert_redirected_to`（驗跳轉目標）、`assert_difference`（驗數值變化）、`assert_queries_count`（驗 SQL 次數）。一測試可含多條斷言，全過才算 pass。

## 原理
`assert_difference` 把前後狀態差當斷言標的，比分別斷言兩值更貼近「改變了什麼」；`assert_queries_count` 把查詢次數當指標，用於抓 N+1 回歸。

## QA 視角
- 怎麼測：資料異動優先用 `assert_difference` 驗筆數/餘額變動指定量，而非只驗 2xx；狀態碼優先用 `assert_response :success`。
- 常見缺陷：只斷言狀態碼未驗資料是否寫入；`assert_difference` 差值寫死為 1，未涵蓋批次操作；多條不相關斷言塞同方法，失敗分不清哪條炸的。
