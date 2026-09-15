---
id: rd/backend/rails/test-environment
title: 測試環境（Test Environment）
aliases: [RAILS_ENV=test, 測試資料庫隔離, test env, config/environments/test.rb, 獨立測試庫]
tags: [rails, 測試環境, 資料庫]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Testing Rails Applications §2.3, §3.1（CC BY-SA 4.0, guides.rubyonrails.org）]
related: [rd/backend/rails/fixtures, rd/backend/rails/transactional-test-rollback]
summary: Rails 測試跑在獨立 test 環境與獨立資料庫，與 dev/prod 資料互不干擾。
---
## 定義
Rails 預設分 development / test / production 三環境，各有獨立設定檔與獨立資料庫。執行 `bin/rails test` 時 `RAILS_ENV` 自動設為 `test`。

## 原理
測試 DB 需與目前 schema 同步：開跑前檢查有無未執行的 migration，有則直接報錯中止，不會默默用舊 schema 跑；schema 改過需 `bin/rails test:db` 重建。測試全程不動 dev/prod 真實資料。

## QA 視角
- 怎麼測：確認 CI/本機測試連線指向獨立 test DB；改 schema 後故意不跑 migration，驗證測試會直接報錯而非跑出假陽性。
- 常見缺陷：環境變數誤設導致測試打到 dev/prod；CI 快取舊 schema 繞過檢查跑出過時行為；多資料庫專案某個 writing DB 沒被納入檢查，用舊 schema 卻不報錯。
