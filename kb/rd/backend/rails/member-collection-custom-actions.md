---
id: rd/backend/rails/member-collection-custom-actions
title: 自訂路由：七動作之外的額外端點（member／collection）
aliases: [member do, collection do, "on: member", "on: collection", 自訂資源動作, 額外端點測試, 非標準 CRUD 動作]
tags: [rails, routing, attack-surface, test-design]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Routing §2.10 Adding More RESTful Routes (CC BY-SA 4.0, guides.rubyonrails.org)]
related: [rd/backend/rails/restful-seven-actions, rd/backend/untrusted-input-validation-boundary]
summary: member/collection/:on 是七動作外的額外端點，需獨立列測。
---
## 定義
`member do...end` 對單一資源加動作（如 `/photos/1/preview`），`collection do...end` 對整個集合加動作（如 `/photos/search`），也可用 `:on` 省略 block 寫法。

## 原理
這些路由不算標準七動作，是手動加開的額外進入點；member 動作仍收 `params[:id]`，理論上也該做擁有權檢查，但常被排除在制式測試模板外。

## QA 視角
- 怎麼測：routes.rb 的 resources 區塊內看到 member/collection/:on，代表有 CRUD 外的端點，需列成獨立測項；member 動作用他人 id 測擁有權，collection 動作測分頁邊界。
- 常見缺陷：自訂 member 路由沒做擁有權檢查，換別人 id 仍操作成功；collection 搜尋類路由無速率限制或分頁，可打出全量資料；新功能只寫 controller action 忘記開路由，打得 404 卻誤判成「功能沒做」。
