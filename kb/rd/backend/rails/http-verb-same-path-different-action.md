---
id: rd/backend/rails/http-verb-same-path-different-action
title: 同路徑換方法對應不同動作的測試盲點（HTTP verb／action）
aliases: [同一 URL 多動詞, "via: :all 風險", match via, HTTP 動詞路由比對, CSRF 繞過, verb-based routing, 換動詞測試]
tags: [rails, routing, http, security, test-design]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Routing §2.2 CRUD, Verbs, and Actions; §3.7 HTTP Verb Constraints (CC BY-SA 4.0, guides.rubyonrails.org)]
related: [rd/backend/api-http-methods, rd/backend/api-status-codes]
summary: 同路徑換動詞可能命中不同 action，手測常漏其他動詞。
---
## 定義
路由比對同時看 HTTP 動詞與路徑，故 `/photos` 對 GET 命中 index、對 POST 命中 create，是兩條獨立規則；`match ... via: :all` 可讓任何動詞都命中同一 action。

## 原理
`via: :all` 讓 GET 也能命中原本設計給寫入用的 action，而 GET 不會被檢查 CSRF token，等於用動詞混用繞過 CSRF 防護；換動詞不只是換呼叫方式，可能換到防護等級完全不同的程式路徑。

## QA 視角
- 怎麼測：對同一路徑輪流打 GET/POST/PUT/DELETE，不只測 UI 實際觸發的那個動詞；看到 `match` 或 `via: :all`，用 GET 打一次該端點，確認資料未被寫入、且沒帶 CSRF token 也不能通過。
- 常見缺陷：只測表單送出的動詞，沒發現同路徑其他動詞也命中同一寫入 action；`via: :all` 讓 GET 就能觸發刪除等副作用；換動詞後預期 404，實際命中另一個 action，出乎意料的行為被誤判正常。
