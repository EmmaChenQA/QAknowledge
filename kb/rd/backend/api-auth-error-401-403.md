---
id: rd/backend/api-auth-error-401-403
title: 認證與權限錯誤：401 vs 403（Authentication vs Authorization Errors）
aliases: [401 未授權, 403 禁止, 認證失敗, 權限不足, unauthorized forbidden, 登入態失效, JWT 過期]
tags: [rest-api, auth, permission, status-code]
topic: api
confidence: book
updated: 2026-09-15
sources: [REST API Design Guide §3.4 4xx状态码]
related: [rd/backend/api-status-codes]
summary: 401 是「未認證/認證失敗」、403 是「已認證但無權限」，兩者常被混用，是越權類 TC 的核心判準依據。
---
## 定義
401 Unauthorized：使用者未提供憑證，或憑證無效/過期（實質是「未認證」，非「未授權」的字面誤導）。403 Forbidden：使用者身分已通過認證，但對該資源不具存取權限。API 常用 JWT 做認證，憑證缺失、格式錯、簽章錯、已過期都應回 401；憑證有效但角色/擁有權不符則應回 403。

## QA 視角
- 怎麼測：不帶 token 打 API 應得 401；帶已過期或竄改過的 token 應得 401（非 403 或 200）；帶合法 token 但操作非自己擁有的資源（如用 A 帳號的 token 存取 B 帳號的訂單 id）應得 403 或 404（視是否刻意隱藏資源存在性），這是 IDOR／越權測試的基本判準；同一權限錯誤情境跨端點抽測是否一致（有的端點回 401 有的回 403 代表判斷邏輯不統一）。
- 常見缺陷：401 與 403 回錯（無 token 卻回 403，讓客戶端誤導向「申請權限」而非「重新登入」）；權限不足時仍回 200 但回空資料或空列表，掩蓋掉本該讓使用者知道的權限邊界，且會被誤判為「查無資料」而非「越權被擋」；越權存取他人資源時直接回 200 拿到資料（真正的資安漏洞，而非狀態碼誤用）；token 過期判斷不精確，過期後仍可用一段時間（寬限期未明確定義且未經確認）。
