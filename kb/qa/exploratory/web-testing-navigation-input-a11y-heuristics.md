---
id: qa/exploratory/web-testing-navigation-input-a11y-heuristics
title: Web 測試導航／輸入／偏好設定啟發法
aliases: [瀏覽器返回測試, URL hacking, HTML injection, browser back button testing, web navigation testing, 瀏覽器偏好設定測試]
tags: [web-testing, security-testing, input-validation]
topic: qa-exploratory
confidence: author-material
updated: 2026-09-15
sources: [Test Heuristics Cheat Sheet p2-3（CC BY-SA 4.0，Elisabeth Hendrickson／James Lyndsay／Dale Emery，另含 Ady Stokes 無障礙補充，Ministry of Testing）]
source_lang: en
related: [rd/backend/untrusted-input-validation-boundary, qa/exploratory/web-accessibility-testing-heuristics]
summary: 瀏覽器導航、輸入注入與偏好設定檢查，功能測試常漏掉但使用者一定會踩到的情境。
---
## 定義
Web 測試啟發法指瀏覽器環境特有、跟一般表單輸入測試不同的一組檢查面向，涵蓋瀏覽器導航行為、輸入注入攻擊、以及瀏覽器偏好設定差異。這些是純粹測「功能對不對」容易漏掉，但使用者實際操作瀏覽器時一定會踩到的情境。

## 原理
導航類要測上一頁（特別留意「已過期」訊息與重複送出交易）、重新整理、把當前頁面加入書籤、登出後點選書籤網址、直接竄改網址列參數（含移除必填參數，與資料型別攻擊清單合併測試）、同時開多個瀏覽器分頁操作同一帳號、以及觸控裝置的滑動／點按／縮放手勢。輸入類除了資料型別攻擊清單之外，要額外測 HTML/JavaScript 注入（讓使用者輸入任意 HTML 標籤與 JavaScript 指令，可能導致資安漏洞）、文字輸入框是否有定義最大長度、以及多行文字區塊輸入超過 5000 字元的行為。偏好設定類要測關閉 JavaScript、關閉 Cookie、瀏覽器安全性設定調到最高、縮放瀏覽器視窗大小、以及放大字體。

## QA 視角
- 怎麼測：對任何有付款或送出動作的頁面，完成一次送出後立刻按瀏覽器上一頁再重新整理，確認不會出現重複送出交易或頁面卡在「已過期」狀態；對登入態頁面，登出後點選之前加的書籤網址，確認會被導向登入頁而非直接顯示內容；對任何文字輸入框貼上 `<script>alert(1)</script>`，確認畫面上是否原樣顯示為文字而非被執行；關閉瀏覽器 JavaScript 後重新整理關鍵頁面，確認至少有基本可用的降級內容而非整頁空白。
- 常見缺陷：按上一頁後表單資料被瀏覽器快取，重新送出造成同一筆訂單建立兩次；網址列直接竄改參數（如把使用者 ID 改成別人的）繞過前端檢查直接看到不該看的資料；HTML 標籤未跳脫導致輸入內容被瀏覽器當成真的標籤渲染，破壞頁面版面甚至執行惡意腳本。
