---
id: rd/backend/rails/nested-routes-ownership-boundary
title: 巢狀路由與擁有權檢查點（Nested Resources & Ownership Boundary）
aliases: [nested resources, 巢狀資源路由, shallow nesting, "/users/:id/orders", 父子資源路由, IDOR 測試點, 擁有權檢查]
tags: [rails, routing, idor, authorization, test-design]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Routing §2.7 Nested Resources; §2.7.2 Shallow Nesting (CC BY-SA 4.0, guides.rubyonrails.org)]
related: [rd/backend/api-auth-error-401-403, rd/backend/untrusted-input-validation-boundary]
summary: 巢狀路由父層 id 隱含擁有權範圍，shallow 化後易漏測 IDOR。
---
## 定義
`resources :magazines do resources :ads end` 產生 `/magazines/:magazine_id/ads/:id` 巢狀路徑；`shallow: true` 讓 member 動作簡化為 `/ads/:id`，只有 collection 動作保留父層 id。

## 原理
URL 帶父層 id 不等於伺服器真做了「子資源屬於此父資源」的檢查；若 controller 只用子資源 id 查詢、不核對父層 id，父層 id 形同裝飾，shallow 化後連裝飾都沒有，更易讓人誤以為擁有權檢查也一併消失。

## QA 視角
- 怎麼測：交叉組合父子 id（A 的父層配 B 的子資源 id，或 shallow 下直接打別人子資源 id）驗證是否被擋；巢狀多層時逐層測中間層 id。
- 常見缺陷：show/update 只用子資源 id 查找、忽略父層 id，造成跨父資源存取（IDOR）；shallow 化後路由變短，誤以為功能變簡單而漏測擁有權；index 有父層過濾但 show（shallow 不帶）沒有，動作間權限不一致。
