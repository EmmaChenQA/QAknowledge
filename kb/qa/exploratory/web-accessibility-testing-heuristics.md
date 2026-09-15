---
id: qa/exploratory/web-accessibility-testing-heuristics
title: Web 無障礙測試啟發法
aliases: [無障礙測試, accessibility testing, 鍵盤操作測試, a11y testing, 螢幕報讀軟體測試, 焦點管理測試, 色盲友善測試]
tags: [web-testing, accessibility, a11y]
topic: qa-exploratory
confidence: author-material
updated: 2026-09-15
sources: [Test Heuristics Cheat Sheet p2-3（CC BY-SA 4.0，Elisabeth Hendrickson／James Lyndsay／Dale Emery，另含 Ady Stokes 無障礙補充，Ministry of Testing）]
related: [qa/exploratory/web-testing-navigation-input-a11y-heuristics]
summary: 檢查鍵盤操作、語境資訊與內容呈現是否讓所有使用者（含依賴輔助科技的使用者）都能正常使用，純功能測試最容易忽略。
---
## 定義
無障礙（A11y）啟發法是 Web 測試中專門檢查鍵盤操作、語境資訊與內容呈現是否讓所有使用者（含依賴輔助科技的使用者）都能正常使用的一組檢查面向，純功能測試最容易忽略。

## 原理
無障礙類至少涵蓋鍵盤操作（能否用 Tab 導航、跳過重複區塊、選單不會困住焦點、目前焦點有清楚視覺標示、彈出視窗接手焦點且可關閉）、語境資訊（連結文字本身要有意義、圖片替代文字要恰當或裝飾性圖片要隱藏、表單欄位要有標籤）、以及內容呈現（不要全大寫、不要文字齊行、要能放大到 200%、不能只靠顏色表達成功／失敗）。

## QA 視角
- 怎麼測：純鍵盤操作（不用滑鼠）走完一次關鍵流程，確認每個互動元素都能被 Tab 到且有清楚焦點框；開啟彈出視窗（Modal）後直接按 Tab，確認焦點被限制在視窗內而不會跑到背景頁面；檢查關鍵圖片是否有替代文字、裝飾性圖片是否對輔助科技隱藏；把瀏覽器字體放大到 200%，確認版面沒有文字被截斷或重疊。
- 常見缺陷：彈出視窗（Modal）開啟後鍵盤焦點沒有移進去，使用者按 Tab 還是在背景頁面裡繞；連結文字只寫「點此」而沒有描述目的地，螢幕報讀軟體使用者無法判斷連結內容；只靠顏色（如紅／綠）表達成功或失敗，色盲使用者無法分辨結果。
