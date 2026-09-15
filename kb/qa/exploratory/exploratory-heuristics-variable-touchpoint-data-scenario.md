---
id: qa/exploratory/exploratory-heuristics-variable-touchpoint-data-scenario
title: 探索式測試啟發法：變數、接觸點、資料追蹤與情境模擬
aliases: [Variable Analysis, TouchPoints, Follow the Data, Constraints heuristic, Sorting heuristic, Users & Scenarios, 資料追蹤測試, 違反限制條件測試]
tags: [exploratory-testing, test-heuristic, data-flow, scenario-testing]
topic: qa-exploratory
confidence: author-material
updated: 2026-09-15
sources: [Test Heuristics Cheat Sheet p4-5（CC BY-SA 4.0，James Lyndsay／Elisabeth Hendrickson 等，Ministry of Testing）]
source_lang: en
related: [qa/exploratory/exploratory-heuristics-state-sequence-dependency-mapmaking]
summary: 從找出變數與觀測點出發，追蹤資料完整性、刻意違反限制條件、並用情境模擬補齊單點測試設計漏掉的組合缺陷
---
## 定義
這組啟發法是探索式測試構想的起點：先找出系統裡「什麼會變」與「觀察控制點」，再沿資料生命週期追蹤，並刻意違反限制條件或套用貼近真實使用者的情境，補足邊界／CRUD 類啟發法只驗證單一操作點的不足。

## 原理
Variable Analysis（變數分析）指找出任何值會改變的東西，變數可能是明顯的（輸入欄位）、隱晦的（隱藏參數）或看不見的（背景設定、全域旗標）。TouchPoints（接觸點）指找出任何可以觀察或控制系統的公開或私有介面，作為挑起問題、監控狀態、驗證結果的施力點。Follow the Data（跟著資料走）指執行一連串涉及同一筆資料的操作，並在每一步都驗證資料完整性，例如輸入→搜尋→產出報表→匯出→匯入→更新→檢視，確認資料在整條鏈路上沒有失真。Constraints（限制）指刻意違反限制條件：必填欄位留空、依賴欄位填入不相容組合、輸入重複的 ID 或名稱，並要搭配 Input Method（輸入方式：打字、複製貼上、匯入、拖放、不同介面如 GUI 與 API）一起測。Sorting（排序）指比較字母排序與數字排序的差異，並測試跨多頁排序是否一致。Users & Scenarios（使用者與情境）指用 Use Case、肥皂劇式情境、人物誌、極端人格等角度設計測試情境。

## QA 視角
- 怎麼測：對一條資料鏈路（如建立優惠券→套用→結算報表），完整跑一輪核對每個節點資料是否一致；針對依賴欄位組合（如「年齡」與「婚姻狀態」），刻意填入不相容的值（未成年＋已婚），確認是否交叉驗證擋下；同一批資料分別用打字與 API 兩種輸入方式測試，確認驗證邏輯一致。
- 常見缺陷：資料跨步驟傳遞時中間做了格式轉換卻沒回頭驗證，導致報表數字跟原始輸入對不上；依賴欄位允許填入不相容組合（如「未成年」卻能勾選「已婚」），因兩欄位各自驗證沒有交叉驗證；GUI 與 API 兩種輸入方式驗證規則不一致，API 能寫入 GUI 會擋下的不合法資料；排序跨頁基準不一致，資料在不同頁重複出現或漏掉。
