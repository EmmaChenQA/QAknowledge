---
id: qa/exploratory/exploratory-heuristics-state-sequence-dependency-mapmaking
title: 探索式測試啟發法：狀態、序列、依賴與地圖繪製
aliases: [State Analysis heuristic, Sequences heuristic, Dependencies heuristic, Map Making heuristic, 狀態轉移測試, 基準狀態探索法, 依賴關係測試]
tags: [exploratory-testing, state-machine, test-heuristic, data-flow]
topic: qa-exploratory
confidence: author-material
updated: 2026-09-15
sources: [Test Heuristics Cheat Sheet p4-5（CC BY-SA 4.0，James Lyndsay／Elisabeth Hendrickson 等，Ministry of Testing）]
source_lang: en
related: [qa/exploratory/exploratory-heuristics-variable-touchpoint-data-scenario]
summary: 針對狀態轉移、操作序列、資料依賴與系統地圖繪製四種啟發法，補齊單點驗證漏測「跨步驟跨狀態組合出錯」的問題
---
## 定義
這組啟發法著重「跨步驟、跨狀態」的測試視角，補足邊界／CRUD／計數類啟發法偏向單點驗證的不足，用來設計「一連串操作組合起來會不會出錯」的測試案例。

## 原理
State Analysis（狀態分析）指找出系統的所有狀態與狀態之間的事件／轉移，畫成圖或表，通常要跟 Sequences 與 Interruptions 兩個啟發法搭配使用才完整。Sequences（序列）指變化操作的順序：反過來做、復原／重做、反轉、合併步驟、同時執行。Dependencies（依賴關係）指找出資料物件之間「擁有」的關係（一個客戶擁有多張發票、一張發票擁有多筆明細），再對這個關係套用 CRUD、Count、Position、Selection 等啟發法，例如刪除最後一筆明細後再讀取、更新第一筆明細、部分／全無／全部明細課稅、刪除擁有 0/1/多張發票的客戶。Map Making（繪製地圖）指先找出一個「基準狀態」，往一個方向走一步再回到基準狀態，重複這個過程逐步探索整個系統地圖，適合用來系統性地走查一個尚不熟悉、狀態轉移複雜的功能區塊。

## QA 視角
- 怎麼測：對涉及主從資料關係的功能（如訂單與訂單明細），先畫出依賴關係，再套用「刪除最後一筆明細後讀取」「刪除擁有多筆訂單的客戶」等組合實測；對有狀態流轉的單據（審核單、出金單），先畫出狀態轉移圖，測試「正常順序」與「跳過中間狀態直接呼叫下一步 API」兩種路徑；探索不熟悉的複雜功能時，先找一個基準狀態，每次只走一步再回到基準狀態，逐步繪製地圖，避免越走越深迷失方向。
- 常見缺陷：刪除父物件時子物件未被級聯刪除，造成指向不存在父物件的孤兒紀錄；狀態機允許直接呼叫非法轉移（如「待審核」跳到「已出款」略過「審核中」），因 UI 無按鈕但 API 沒擋；只測正向順序，沒測反過來做、復原／重做，漏掉「撤銷後狀態沒完整還原」的缺陷；探索時沒有固定基準狀態，越走越深忘了原本出發點，覆蓋東拼西湊、無法回溯。
