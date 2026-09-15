---
id: rd/backend/api-pagination-filtering-sorting
title: 分頁、過濾、排序與搜尋設計（Pagination, Filtering, Sorting）
aliases: [page page_size, 分頁參數, query string 過濾, sort order, 搜尋參數, 列表 API, list API query]
tags: [rest-api, query-params, pagination, list]
topic: api
confidence: book
updated: 2026-09-15
sources: [REST API Design Guide §2.6 避免多级URL, §2.7 搜索排序筛选和分页]
related: [rd/backend/api-http-methods]
summary: 列表類查詢一律用 GET + query string 表達（搜尋/排序/過濾/分頁），不應設計成多級路徑或另開端點。
---
## 定義
搜尋用 `?search=`、排序用 `?sort=field&order=asc|desc`、過濾用 `?category=x&status=y`、分頁用 `?page=n&page_size=m`。同一資源的不同查詢維度應收斂在同一個 GET 端點的 query string，而非為每種篩選條件各開一支 API 或做多級路徑（如 `/products/discontinued`）。

## QA 視角
- 怎麼測：分頁邊界（page=0、page 超出總頁數、page_size=0 或負數、page_size 超大值）；過濾參數組合（多條件同時帶入、帶入不存在的欄位名、帶入非法值型別）；排序欄位不存在或方向拼錯時的降級行為；分頁與過濾同時使用時總筆數/總頁數是否以過濾後結果為準而非全集合。
- 常見缺陷：page_size 未設上限，客戶端傳超大值造成一次撈全表（效能/資安風險）；分頁 total_count 是過濾前的總數，導致前端頁碼算錯；排序欄位無效時直接 500 而非忽略或回預設排序；同時帶多個過濾參數時是 AND 還是 OR 語意未定義且前後端理解不一致；搜尋參數未做長度限制或未轉義，可能是注入風險的切入點。
