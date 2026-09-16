---
id: rd/backend/rails/uniqueness-validator-not-db-constraint
title: 驗證不等於資料庫唯一約束（uniqueness／Race Condition）
aliases: [uniqueness validator, 唯一性驗證, has already been taken, 重複帳號競態, scope 唯一性, 唯一索引]
tags: [rails, validation, race-condition, uniqueness]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Active Record Validations §2.10 uniqueness（CC BY-SA 4.0, guides.rubyonrails.org）]
related: [rd/backend/uniqueness-requires-consensus, rd/backend/lost-update]
summary: uniqueness 驗證只是存檔前查一次 SQL，不建立資料庫約束，高併發下仍可能寫入重複值。
---
## 定義
`validates :x, uniqueness: true` 是存檔前查一次 SQL 確認無重複，查不到才放行，不會建立資料庫唯一索引。官方文件明講：兩個連線可能各自查詢都「查不到」，幾乎同時寫入同一值，產生重複資料。須另建唯一索引（`scope` 對應多欄位組合索引）防止。

## 原理
典型 check-then-act 競態，`scope`/`case_sensitive` 只改查詢條件，不改本質。與「唯一性本質是共識問題」同源，見 `uniqueness-requires-consensus`。

## QA 視角
- 怎麼測：對有 `uniqueness` 的欄位用乾淨素材設計高併發同值請求，驗證最終只有一筆成功；確認該欄位資料庫層是否真有唯一索引，沒有即高風險。
- 常見缺陷：只測過單執行緒「重複送出被擋」就判定沒問題，未驗高併發同時到達；`scope` 多欄位組合只建了單欄位索引；批次匯入繞過 `create`/`save`（見 `skip-validation-methods-risk`），完全不經 uniqueness 查詢。
