---
id: rd/backend/rails/integration-test
title: Integration Test（整合測試）
aliases: [跨 controller 測試, 使用者流程測試, workflow test, ActionDispatch::IntegrationTest]
tags: [rails, 測試分層, 整合測試]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Testing Rails Applications §6（CC BY-SA 4.0, guides.rubyonrails.org）]
related: [rd/backend/rails/controller-functional-test, rd/backend/rails/system-test]
summary: Integration test 驗證多個 controller 串起來的完整流程，比單一 action 測試更貼近使用情境。
---
## 定義
Integration test 放在 `test/integration/`，繼承 `ActionDispatch::IntegrationTest`，測試多個部分如何互動，通常對應一段完整使用者流程，而非只測單一 action。測試內依序發出多個請求，遇 redirect 需手動呼叫 `follow_redirect!` 才會繼續。

## 原理
比起單一 controller test，integration test 把「一連串請求＋跳轉」串成一個場景，能抓出單一 action 測試各自綠燈、串起來卻銜接不上的問題（如 redirect 目標頁其實壞掉）。

## QA 視角
- 怎麼測：挑核心業務流程（註冊、下單、送出表單後查看結果頁）串成一條測試，每個跳轉點都斷言頁面內容，不只驗最後一步。
- 常見缺陷：漏呼叫 `follow_redirect!` 導致斷言實驗證跳轉前頁面而誤判通過；流程中某 action 權限調整後，只有端到端測試會發現斷鏈；只走 happy path，沒涵蓋中途失敗該回到哪一頁。
