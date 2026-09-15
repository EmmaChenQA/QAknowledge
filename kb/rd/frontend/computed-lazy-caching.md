---
id: rd/frontend/computed-lazy-caching
title: computed 的惰性求值與快取（dirty 標記）
aliases: [計算屬性, computed 快取, dirty flag, 計算屬性不更新, computed 沒重新計算]
tags: [vue, reactivity, frontend, computed]
topic: vue
confidence: book
updated: 2026-09-15
sources: [Vue.js 設計與實現 ch4 §4.8 計算屬性 computed 與 lazy]
related: [rd/frontend/reactive-dependency-tracking, rd/frontend/watch-flush-timing]
summary: computed 只在依賴變動後、且下次被讀取時才重算一次；沒人讀就不會白算，但也代表「讀之前」畫面看到的值可能是舊快取。
---
## 定義

computed 屬性內部維護一個「dirty（是否已過期）」標記。依賴的原始資料一改變，只把 dirty 設成 true，並不立即重新計算；真正的計算延後到「有人下一次讀取這個 computed 值」才發生，算完把 dirty 設回 false 並快取結果。這種「有人問才算、算過就存起來」的設計是 computed 相對於一般函式呼叫的效能優勢來源。

## 原理

computed 本身也是一份響應式資料：讀它的值時要「登記依賴」（讓外層 effect 訂閱它），依賴改變時要「通知外層」重新讀值（等同觸發 trigger），這兩件事都要手動補上，否則 computed 只是一個會快取的普通函式，改變依賴後外層畫面不會自動更新。

## QA 視角
- 怎麼測：修改 computed 依賴的來源欄位後，先不觸碰任何畫面，直接檢查「顯示 computed 值的地方」是否自動刷新為新結果（不用手動觸發任何互動）。
- 怎麼測：連續快速修改依賴欄位多次（如輸入框連續輸入），確認 computed 只在真正被讀取時算最新一次結果，而不是每次修改都重算一次造成明顯卡頓。
- 常見缺陷：改了依賴資料，畫面上顯示 computed 值的地方沒有任何反應，要等使用者做其他操作觸發重繪才更新為正確值（快取沒被正確標記為過期，或外層沒有訂閱到這個 computed）。
- 常見缺陷：computed 內部呼叫了非同步或有副作用的邏輯（如打 API），導致每次「被讀取觸發重算」時重複發送請求，且發送時機難以預期（因為讀取次數不受控）。
- 常見缺陷：多個畫面元件共用同一個 computed，其中一處改了依賴值，理論上所有引用處都該同步更新，但實測只有部分元件刷新（部分元件在資料變動時已被銷毀或還沒掛載，沒訂閱到這次變動）。
