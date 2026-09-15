---
id: rd/backend/rails/model-test
title: Model Test（模型測試）
aliases: [ActiveSupport::TestCase, 模型單元測試, 業務邏輯測試, unit test rails]
tags: [rails, 測試分層, 單元測試]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Testing Rails Applications §4（CC BY-SA 4.0, guides.rubyonrails.org）]
related: [rd/backend/rails/fixtures, rd/backend/rails/assertion-conventions, rd/backend/rails/controller-functional-test]
summary: Model test 測 model 本身與其關聯邏輯，繼承 ActiveSupport::TestCase，不涉及 HTTP。
---
## 定義
Model test 放在 `test/models/`，測 model 本身邏輯（驗證規則、關聯、scope、自訂方法），繼承 `ActiveSupport::TestCase`，不像 controller test 有專屬子類別，完全不涉及 HTTP。

## 原理
這是測試金字塔最底層、最快也最穩定的一層：不啟動路由、controller、view，只直接操作 Ruby 物件與資料庫，最適合驗證「資料本身合不合法」這類與外層介面無關的規則。

## QA 視角
- 怎麼測：針對 validation（必填、格式、唯一性）、關聯（has_many/belongs_to 存取與 cascade）、自訂業務方法各寫案例，正向與邊界值都涵蓋。
- 常見缺陷：validation 規則與前端/API 表單驗證不一致；`dependent: :destroy`/`:nullify` 設定與實際刪除行為不符，造成孤兒資料或誤刪；自訂方法在邊界輸入（nil、空字串、極大數值）沒有測試，只測了正向案例。
