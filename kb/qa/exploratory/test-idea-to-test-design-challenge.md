---
id: qa/exploratory/test-idea-to-test-design-challenge
title: 從風險或故事構思出可執行測試的設計挑戰
aliases: [test idea, 測試構想轉測試案例, 風險轉測試案例, 找人問找資料測試法, 技法清單輔助測試設計]
tags: [test-design, exploratory-testing, risk-based-testing]
topic: qa-exploratory
confidence: author-material
updated: 2026-09-15
sources: [Kaner "Exploratory Testing" BBST Fall 2006 lecture slides 50-57 (CC BY-SA 2.0)]
related: [qa/exploratory/exploratory-testing-four-activities, qa/exploratory/exploratory-tester-core-skills, qa/exploratory/story-evolving-into-test-hypothesis-design]
summary: 從抽象風險或失敗故事出發沒有固定公式，Kaner 給出找人問、找資料、翻技法清單、寫故事演化四種輔助手段。
---
## 定義
探索式測試設計常遇到的挑戰不是「怎麼把一個技法套進測試」（例如找出所有變數逐一做定義域測試、找出所有規格段落各造一個測試），而是難度高得多的「怎麼把一個抽象的風險或一則失敗故事，轉成具體可執行的測試」。Kaner 稱這種從技法出發的映射相對容易，但從風險出發的映射（程式會當機、會有野指標、會記憶體洩漏、會操作困難、會弄壞資料庫）沒有通用公式可套。

## 原理
當抽象的失敗風險無法直接對應到某個測試技法時，Kaner 給出四種常見輔助手段：找人問（請教更熟悉這類問題的人）、找資料（搜尋這類失敗現象或這類缺陷成因的討論，看別人是怎麼從缺陷推回測試方法的）、翻自己累積的技法清單（找有沒有特性相符的測試類型）、把失敗寫成一則故事再逐步演化（詳見「故事演化成測試」的假說式設計流程）。

## QA 視角
- 怎麼測：遇到不熟悉的風險類型（如某種硬體層級的異常），先查資料或找熟悉這塊的同事討論，看別人過去怎麼從類似缺陷推回測試方法，而不是憑空亂猜；平常整理一份自己慣用的測試技法清單，拿到新風險時先比對清單有沒有特性相符的技法可以直接套用。
- 常見缺陷：遇到不熟悉的風險類型不知道從何下手時，沒有主動查資料或找人討論，直接放棄或用最表面的方式帶過；沒有平常累積技法清單，每次遇到新風險都從零摸索，錯失能直接套用既有技法的機會。
