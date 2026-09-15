---
id: qa/foundations/software-testing-definition
title: 軟體測試的定義與侷限（Software Testing Definition）
aliases: [測試的定義, what is testing, testing definition, empirical technical investigation, 沒有標準測試定義, working definition, 測試不是尋找bug]
tags: [testing-fundamentals, definition, critical-thinking]
topic: qa-foundations
confidence: author-material
updated: 2026-09-15
sources: [BBST Foundations Lecture 1 §Software Testing / Working Definitions, Lecture 2 §Defining Testing (CC BY-SA 4.0, Kaner/Bach, bbst.courses)]
source_lang: en
related: [qa/foundations/testing-as-information-service]
summary: 測試沒有唯一正確定義；本課程採「為利害關係人提供品質資訊的實證技術調查」作為工作定義。
---
## 定義
軟體測試是一種「為利害關係人（stakeholder）提供產品或服務品質資訊」的實證（empirical）、技術（technical）調查（investigation）。實證代表資訊來自實際觀察與實驗，而非單靠理論推導；技術代表可運用邏輯、數學、模型、工具等手段；調查代表這是主動、有組織的追問過程——設計並執行有挑戰性的案例、仔細檢視結果，而不是被動確認畫面看起來正常。

## 原理
業界對「測試」沒有唯一正確定義：有人定義成「執行程式以找出錯誤的過程」，有人定義成「對產品提問以評估它」，也有人定義成「驗證程式是否符合規格」。這些定義代表對測試角色的不同願景，彼此常互相矛盾，硬要統一反而抹煞了這個領域的多樣性。重要的不是背誦哪個定義「正確」，而是每次溝通前先確認對方用的是哪個定義，否則討論會各說各話。以「利害關係人」為核心的定義，把重點放在「誰會因為這個產品的成敗、行為、或服務效果而受影響」；測試員因此要能替不同利害關係人（開發商、使用者、法務、客服⋯）尋找不同種類的資訊，同一套系統面對不同任務目標，會被判定出不同的品質——品質本身也是主觀的，取決於評價的人是誰。

## QA 視角
- 怎麼測：開工前先問清楚這次測試要回答的問題是什麼（例如找嚴重 bug、評估上線可行性、比對規格、或為爭議事件蒐證），不同目標會導向完全不同的測試範圍與深度，不能預設同一套流程通吃所有情境。
- 常見缺陷：把「測試」窄化成照著案例把畫面點過一遍，忽略主動追問、判讀結果的調查性質，導致明顯異常被視而不見。
- 常見缺陷：不同角色（RD／PM／QA）對「測完了」各有預設定義卻沒先對齊，導致驗收爭議（PM 認為過了、QA 認為還沒測完）。
- 常見缺陷：把驗證規格當成測試的全部，規格沒寫到但使用者會實際受害的行為完全沒被涵蓋。
