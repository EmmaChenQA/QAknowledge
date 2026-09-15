---
id: qa/exploratory/exploratory-heuristics-boundaries-crud-count-selection
title: 探索式測試核心啟發法：邊界、CRUD、計數與選取
aliases: [Boundaries heuristic, Goldilocks heuristic, CRUD testing, Count heuristic, Selection heuristic, 0/1/many 模板, exploratory testing heuristics, 探索式測試啟發法]
tags: [exploratory-testing, boundary-value, test-heuristic]
topic: qa-exploratory
confidence: author-material
updated: 2026-09-15
sources: [Test Heuristics Cheat Sheet p4（CC BY-SA 4.0，James Lyndsay／Elisabeth Hendrickson 等，Ministry of Testing）]
related: [rd/backend/untrusted-input-validation-boundary]
summary: 邊界、金髮姑娘、CRUD、0/1/多、部分/全無/全部等一組隨手可套用的測試思考模板
---
## 定義
這組啟發法是 James Lyndsay、Elisabeth Hendrickson 等人整理的探索式測試「隨手可套用」思考框架，每一個都是一個簡短口訣，用來在沒有詳細規格時快速產生測試點子，核心精神是把「這個功能有哪些可以變動的維度」拆解成幾個固定角度反覆套用。

## 原理
Boundaries（邊界）指測試「接近邊界」（差一點太大、差一點太小）與「剛好在邊界上」兩種情況。Goldilocks（金髮姑娘）是邊界的白話版本：太大、太小、剛剛好。CRUD 指任何資料物件都該測建立、讀取、更新、刪除四個操作，且要交叉測（例如刪除後再讀取、更新後確認其他關聯資料是否同步）。Count（計數）指套用 0、1、多（Many）這個萬用模板到任何可計數的東西，例如 0 筆交易、1 筆交易、多筆同時發生的交易。Selection（選取）指套用「部分、全無、全部」，例如部分權限、無權限、全部權限。Position（位置）指套用「開頭、中間、結尾」，例如在文字行首、行中、行尾編輯。Configurations（組態）指變動螢幕解析度、網路速度與延遲、訊號強度、記憶體、磁碟可用空間，並對任何周邊設備（螢幕、滑鼠、印表機）套用 Count 啟發法測 0 台、1 台、多台。Interruptions（中斷）指登出、關機、重開機、砍掉程序、斷線、休眠、逾時、取消這幾種強制中斷操作流程的方式。Starvation（資源耗盡）指讓 CPU、記憶體、網路或磁碟被佔到接近滿載時觀察系統行為。

## QA 視角
- 怎麼測：拿到一個新功能時，先問「這裡有什麼東西可以計數」，套用 0/1/多各測一次（例如出金申請 0 筆、1 筆、同時 50 筆）；再問「這是不是一個資料物件」，若是就跑一次完整 CRUD，並在每個操作後確認關聯資料（如統計數字、稽核紀錄）是否同步更新；針對任何長流程操作（如多步驟表單），在每一步都插入一次登出或關閉分頁的中斷測試，確認重新登入後狀態是否正確還原或提示清楚。
- 常見缺陷：列表頁在資料筆數為 0 時沒有處理空狀態，直接顯示錯誤或空白畫面；刪除主資料物件後，其關聯的明細資料變成孤兒紀錄仍可被其他功能查到；操作到一半被強制登出後，重新登入直接跳過中斷點繼續顯示未完成流程，導致重複扣款或重複建立；同時多筆（Many）操作觸發佇列或鎖的競爭問題，只在單筆測試時完全正常、多筆並發才會出現。
