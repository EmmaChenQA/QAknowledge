---
id: rd/backend/rails/controller-functional-test
title: 控制器功能測試（Controller / Functional Test）
aliases: [functional test, controller test, 控制器測試, API response 測試, action 測試]
tags: [rails, 測試分層, controller]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Testing Rails Applications §5（CC BY-SA 4.0, guides.rubyonrails.org）]
related: [rd/backend/rails/integration-test, rd/backend/rails/assertion-conventions, rd/backend/api-status-codes]
summary: Controller test 驗證單一 controller action 對請求的處理結果，如狀態碼、跳轉、回應內容。
---
## 定義
Controller test 放在 `test/controllers/`，聚焦單一 action 如何處理請求：是否成功、是否正確跳轉、認證是否生效、回應內容是否正確。現行 Rails 它與 integration test 共用 `ActionDispatch::IntegrationTest`，差別在只聚焦單一 action，非跨 action 流程。

## 原理
這層測試實際模擬 HTTP request 並檢查 response，比 model test 多驗「路由＋controller 邏輯」，但不像 integration test 串多請求、也不像 system test 跑瀏覽器或執行 JS。

## QA 視角
- 怎麼測：驗證成功狀態碼、失敗/未授權時的狀態碼與導向、redirect 目標、回應 body 是否含預期資料。
- 常見缺陷：只測 200 就過，沒驗回應內容正確性；權限檢查只做在部分 action，漏了新增/刪除等破壞性 action；redirect 目標路徑寫死，路由改名後測試仍綠燈但實際導錯頁。
