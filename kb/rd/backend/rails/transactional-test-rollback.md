---
id: rd/backend/rails/transactional-test-rollback
title: 測試交易自動回滾（Transactional Tests / Rollback）
aliases: [測試自動 rollback, use_transactional_tests, 測試隔離機制, transactional fixtures, 每測試獨立交易]
tags: [rails, 測試環境, 交易, 併發]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Testing Rails Applications §3.3, §15.3（CC BY-SA 4.0, guides.rubyonrails.org）]
related: [rd/backend/transaction-acid, rd/backend/isolation-snapshot, rd/backend/optimistic-vs-pessimistic-locking, rd/backend/rails/model-test]
summary: 每個測試預設包在一個交易裡、跑完就回滾，測試間互不可見；但這層交易會擋住真併發測試。
---
## 定義
Rails 預設把每個測試包在一個資料庫交易中，測試結束即回滾，建立的資料不會被其他測試看到也不留在資料庫。多寫入資料庫時各自一層交易、一起回滾。可用 `self.use_transactional_tests = false` 讓單一測試類別退出。

## 原理
這層自動交易只是框架的隔離手段，不影響應用層自己開的交易語意。關鍵陷阱：若測試要開多執行緒模擬真實併發交易，這些交易會巢狀在外層測試交易之下彼此鎖死，因為並非各自獨立的真交易。此時須關掉 `use_transactional_tests`，代價是資料不會自動回滾，得自行清理。

## QA 視角
- 怎麼測：驗證併發／鎖邏輯前先確認測試類別是否關閉交易包裹；沒關就跑多執行緒交易測試，觀察是否卡死（框架假象，非邏輯 bug）。
- 常見缺陷：誤以為關掉後仍會自動清資料，殘留污染後續測試；把「單元測試回滾正常」誤判為「併發鎖沒問題」；多資料庫場景只清了一個 writing DB 就當作清乾淨。
