---
id: rd/backend/rails/route-match-order-wildcard-shadowing
title: 路由比對順序與萬用字元造成的路由遮蔽
aliases: [路由順序, path shadowing, 萬用字元路由, route globbing, catch-all 路由, resources 吃掉自訂路由, 路由優先權]
tags: [rails, routing, wildcard, test-design]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Routing §2.2 CRUD, Verbs, and Actions; §3.11 Wildcard Segments (CC BY-SA 4.0, guides.rubyonrails.org)]
related: [rd/backend/rails/restful-seven-actions]
summary: 路由由上而下比對，resources 與萬用字元易遮蔽宣告在後的具體路由。
---
## 定義
routes.rb 依宣告順序比對，第一條符合就勝出，之後同路徑的路由永不會被觸發；萬用字元片段（`*glob`）會貪婪比對路徑剩餘全部內容。

## 原理
`resources :photos` 的 `/photos/:id` 範圍極廣，任何字串都能當 `:id`；若 `get "photos/poll"` 放在 `resources :photos` 之後，`poll` 會被當成 `:id` 先命中 show；catch-all 萬用字元路由同理，放太早會搶走本該給更具體路由處理的請求。

## QA 視角
- 怎麼測：拿到 routes.rb diff，檢查新路由宣告在對應 resources 區塊之前還是之後；對可疑路徑發請求，從回應結構反推命中哪個 controller#action。
- 常見缺陷：新增靜態路徑放在 resources 之後，被 `:id` 誤判成某筆記錄；catch-all fallback 太早，吃掉宣告在後面的具體路由；`/users/new` 被 `/users/:id` 搶先命中，變成查詢 id 為 "new" 的使用者。
