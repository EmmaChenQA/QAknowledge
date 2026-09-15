---
id: qa/bug-advocacy/failure-when-bug-summary
title: 缺陷標題的 FAILURE-WHEN 結構
aliases: [FAILURE-WHEN, bug summary, 缺陷摘要寫法, problem summary, 缺陷標題, 一行摘要, report title]
tags: [bug-advocacy, writing, bug-report-fields]
topic: qa-bug-advocacy
confidence: author-material
updated: 2026-09-15
sources: [BBST Bug Advocacy Lecture 3 §Typical Fields: Problem Summary, slides 92-93 (CC BY-SA 4.0, Kaner/Fiedler, bbst.courses)]
related: [qa/bug-advocacy/bug-report-essential-fields]
summary: 缺陷標題應遵循 FAILURE-WHEN 結構，讓關係人光看標題就能判斷要不要展開細看。
---
## 定義
缺陷報告的一行標題（摘要）是整份報告最重要的部分：多數關係人瀏覽待修清單時只看標題，只有標題夠有意思的項目才會被點開細看。理想的標題遵循 FAILURE-WHEN 結構：先具體描述失敗現象本身，具體到讀者能在腦中想像出畫面或行為，而不是空泛的「某功能異常」；再說明這個失敗的限制或依賴條件，讓讀者知道這是普遍會發生還是要特定條件才發生；最後帶出足以讓讀者感受後果嚴重度的線索，但不是直接寫一個嚴重度等級數字。

## 原理
標題是篩選機制。一個只寫「登入失敗」的標題無法讓任何人判斷這件事值不值得現在處理；一個寫出具體現象、觸發條件與後果的標題，讀者不用點開內文就能判斷風險等級與是否要優先處理。

## QA 視角
- 怎麼測：寫標題時檢查是否同時包含具體失敗現象、觸發條件或適用範圍、隱含後果三個要素，缺一就補；避免用「異常」「有問題」「不正確」這類空泛詞，換成具體可見的行為描述。
- 常見缺陷：標題只寫功能名稱加「異常」，讀者得點開內文才知道是什麼問題，降低被優先處理的機率；標題把適用範圍寫得比實際更廣，沒註明只在特定站台或角色發生，造成對方用不受影響的環境驗證後判定無法重現；標題塞入嚴重度形容詞卻沒有具體現象支撐，過度渲染反而降低可信度。
