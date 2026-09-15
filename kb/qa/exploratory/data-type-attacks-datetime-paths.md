---
id: qa/exploratory/data-type-attacks-datetime-paths
title: 日期時間與路徑檔案型別攻擊清單（Data Type Attacks: Time/Date & Paths/Files）
aliases: [日期邊界測試, 時區測試, 閏年測試, 路徑檔案測試, date boundary testing, timezone testing, file path edge cases, 日光節約時間測試]
tags: [boundary-value, datetime-testing, file-testing, input-validation]
topic: qa-exploratory
confidence: author-material
updated: 2026-09-15
sources: [Test Heuristics Cheat Sheet p1（CC BY-SA 4.0，Elisabeth Hendrickson／James Lyndsay／Dale Emery，Ministry of Testing）]
source_lang: en
related: [rd/backend/clock-skew-and-drift]
summary: 日期時間與檔案路徑最容易讓系統算錯或讀錯的具體測試值清單
---
## 定義
日期時間攻擊清單指針對「時區、格式、曆法邊界」系統性列出容易讓系統算錯或顯示錯的具體日期時間值；路徑檔案攻擊清單則針對檔案系統操作列出常見的異常檔案狀態。兩者都屬於資料型別攻擊中容易被忽略的類別，因為多數測試只驗證「今天」這種正常值就結案。

## 原理
日期時間攻擊值涵蓋逾時（timeout）情境、機器間時間差異、跨時區操作、閏日（2 月 29 日在非閏年不存在）、恆定無效日期（2 月 30 日、9 月 31 日）、同一日期的多種格式寫法（June 5, 2001；06/05/2001；06/05/01；06-05-01；6/5/2001 12:34）、國際化日期格式差異（dd.mm.yyyy 與 mm/dd/yyyy 容易互相誤判月與日）、12 小時制與 24 小時制混用、日光節約時間切換、以及系統時鐘被人為往前或往後調整。路徑檔案攻擊值涵蓋超長名稱（超過 255 字元）、名稱含特殊字元（空白、星號、問號、斜線、管線符號等）、路徑指向不存在的檔案、路徑指向已存在同名檔案、路徑含空格或不含空格、磁碟空間僅剩最小可用量、唯讀保護、檔案不可用、檔案被鎖定、檔案位於遠端機器、以及檔案本身已損毀。

## QA 視角
- 怎麼測：日期時間類挑選系統實際會用到的欄位（建立時間、到期時間、結算時間），分別用閏日、月底無效日、時區切換前後、系統時鐘手動調快調慢四種情境各跑一次，觀察排程、計算、顯示是否一致；路徑檔案類針對上傳／匯出／匯入功能，用超長檔名、含特殊字元檔名、唯讀目錄、磁碟將滿、鎖定中的檔案分別測一次上傳與讀取。
- 常見缺陷：跨時區操作時後端以 UTC 儲存但前端顯示未轉換，導致同一筆紀錄在不同時區帳號顯示的時間相差整數小時；日光節約切換當天的排程任務被跳過或重複執行一次；閏日建立的定期扣款規則在非閏年結算時找不到對應日期而整批失敗；檔案上傳功能在檔名含特殊字元時被靜默截斷，但資料庫索引仍記錄原始檔名，造成之後下載找不到檔案。
