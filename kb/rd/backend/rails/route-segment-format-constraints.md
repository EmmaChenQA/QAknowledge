---
id: rd/backend/rails/route-segment-format-constraints
title: 路由隱性參數造成的邊界案例（constraints／format）
aliases: [segment constraints, id 正則約束, format 隱性參數, 路由正則不可加錨點, request-based constraints, subdomain constraint, 路由邊界測試]
tags: [rails, routing, boundary-value, test-design]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Routing §3.8 Segment Constraints; §3.9 Request-Based Constraints; §3.12 Format Segments; §4.2 Specifying Constraints on id (CC BY-SA 4.0, guides.rubyonrails.org)]
related: [rd/backend/rails/restful-seven-actions]
summary: 路由正則不可加錨點、id 不吃點號、format 隱性可選，都是邊界來源。
---
## 定義
`constraints` 可限制動態片段格式（如 `id: /[A-Z]\d{5}/`）或 request 屬性；每條路徑預設隱含可選的 `.格式` 後綴（`params[:format]`），除非明確設 `format: false/true`。

## 原理
路由本身在頭尾錨定，約束正則自帶 `^`/`$` 會直接失效但不報錯；`id` 預設不接受點號（點被當格式分隔符），需另加約束才能接受；不同資源可能靠 id 值特徵共用同一路徑前綴，邊界值容易落錯 controller。

## QA 視角
- 怎麼測：對 id 約束端點打邊界外的值，預期是路由層 404（未進 action）而非業務碼；用 `.json`/`.xml` 格式後綴打同一端點，確認未設 `format: false` 時是否被默默接受；id 含點號單獨測一次。
- 常見缺陷：正則誤加 `^`/`$` 錨點，導致約束整條失效、本該擋的格式全放行；id 含點被誤解析成「id ＋ 格式」兩段；靠 id 特徵共用路徑的兩資源，邊界值（如 `123abc`）分類到非預期 controller。
