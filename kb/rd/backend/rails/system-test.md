---
id: rd/backend/rails/system-test
title: System Test（系統測試／瀏覽器端對端測試）
aliases: [Capybara 測試, Selenium 測試, 瀏覽器端對端測試, E2E rails, ApplicationSystemTestCase]
tags: [rails, 測試分層, e2e, 瀏覽器測試]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Testing Rails Applications §7（CC BY-SA 4.0, guides.rubyonrails.org）]
related: [rd/backend/rails/integration-test, rd/backend/end-to-end-argument]
summary: System test 用真實或無頭瀏覽器跑，從使用者視角測完整互動與 JS，最真實但也最慢最脆弱。
---
## 定義
System test 放在 `test/system/`，用 Capybara 驅動真實或無頭瀏覽器，從使用者操作視角測試整個應用，能測到 JS 互動，是唯一真的跑瀏覽器的測試層級。近版 scaffold 不再預設產生，需顯式生成。

## 原理
System test 與 integration test 都測多元件互動，差別在於前者是真實使用者操作（點擊、填表單、看渲染結果）驅動，後者直接發 HTTP request。因此更慢、更易因時序或 UI 變動不穩定，應只留給核心流程與 JS 邏輯，不是每個功能都要有。

## QA 視角
- 怎麼測：優先挑「API/UI 邏輯測不到」的情境，如 JS 動態渲染、多步驟表單、跨頁面狀態保持；善用失敗自動截圖除錯不穩定案例。
- 常見缺陷：每個小功能都補 system test，導致整套測試慢又常因時序問題假紅；斷言只等固定秒數而非等元素出現；行動裝置尺寸未另外配置，RWD bug 在桌面尺寸測不出來。
