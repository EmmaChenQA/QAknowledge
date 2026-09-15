---
id: rd/backend/rails/restful-seven-actions
title: RESTful 資源與七個標準動作（RESTful Routes & the Seven Actions）
aliases: [resources 路由, CRUD 七動作, index show new create edit update destroy, RESTful 端點清單, resource 單數資源, only except 路由範圍, rails routes 指令]
tags: [rails, routing, rest-api, test-design]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Routing §2.2 CRUD, Verbs, and Actions; §2.5 Singular Resources; §4.8 Restricting the Routes Created (CC BY-SA 4.0, guides.rubyonrails.org)]
related: [rd/backend/rails/member-collection-custom-actions, rd/backend/api-http-methods, rd/backend/api-status-codes]
summary: resources 產生七個標準路由，是該資源端點測試的基本清單。
---
## 定義
`resources :photos` 依動詞＋路徑自動產生 index／new／create／show／edit／update／destroy 七個路由；`resource`（單數）省略 index，只產生六個。

## 原理
同一路徑（如 `/photos`）依 GET／POST 分流到不同 action；`only`／`except` 可關閉部分動作，未開放的動作在路由層找不到規則，回應是路由層 404，而非進 controller 才被擋。

## QA 視角
- 怎麼測：先核對 routes.rb（或 `rails routes -c <controller>`）列出實際開放哪幾個動作，不要預設七個都在；刻意打未開放的動作（如 only 只留 index/show 卻打 DELETE），確認是路由層 404 而非業務碼。
- 常見缺陷：資源其實是 `resource`（單數）沒有 index，卻被當分頁列表去測致 404；only/except 漏配置使本該關閉的 destroy 仍可呼叫；new/edit 這兩個表單 GET 端點常被忽略，未納入測試清單。
