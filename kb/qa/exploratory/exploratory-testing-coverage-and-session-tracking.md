---
id: qa/exploratory/exploratory-testing-coverage-and-session-tracking
title: 探索式測試怎麼算「測夠了」：章程與 session 追蹤
aliases: [session-based test management, SBTM, 測試章程, charter, 探索式測試覆蓋率, test coverage outline, 探索式測試怎麼知道測完]
tags: [exploratory-testing, coverage, test-management, session-based-testing]
topic: qa-exploratory
confidence: author-material
updated: 2026-09-15
sources: [Bach "Exploratory Testing Explained" v1.3 §Practicing Exploratory Testing, §Managing Exploratory Testing pp.4-7 (2002-2003), Kaner "Exploratory Testing" BBST Fall 2006 lecture slides 96-108 (CC BY-SA 2.0)]
source_lang: en
related: [qa/exploratory/scripted-vs-exploratory-when-to-use, qa/exploratory/exploratory-tester-core-skills, qa/exploratory/session-based-test-management-modes-and-coverage-illusion]
summary: 探索式測試沒有固定案例清單可算完成率，改用章程界定任務範圍，判斷測夠了要看章程有沒有被完整履行、覆蓋輪廓有沒有涵蓋預期功能面。
---
## 定義
探索式測試沒有固定案例清單可以拿來算「完成百分比」，取而代之的是用「章程」（charter）界定每一段測試的任務與範圍，再用「session」（一段連續、有明確任務的測試時段）作為可追蹤、可回報的最小單位。Bach 稱這套做法為 session-based test management（SBTM），目的是讓探索式測試變得可稽核、可衡量，而不是失去追蹤依據。

## 原理
一個探索式測試 session 由時間、測試者、產品、任務（章程）、回報結果五個外部要素組成，過程是一個持續循環：對齊任務目標、構思能回答任務的問題、設計測試去回答問題、執行測試取得答案；答案不完整就調整測試再試一次，這個循環本身就是「探索」。章程可以自己選也可以由測試主管指派，常見寫法是「探索並分析產品某功能區塊，產出測試覆蓋輪廓（test coverage outline）」這類半開放任務，而非逐條列出操作步驟。判斷「有沒有測夠」不是看案例勾選完沒有，而是看章程有沒有被完整履行、覆蓋輪廓有沒有涵蓋預期的功能面、以及 session 筆記能不能經得起主管或同儕的審閱。

## QA 視角
- 怎麼測：開始一段探索前先寫下這段的章程（目標、範圍、預計用多少時間）；結束後回頭產出一份測試覆蓋輪廓，列出這次實際走過的功能點與刻意跳過的部分，讓下一輪或其他人能接續，而非只憑印象口頭交代；用章程清單本身當覆蓋依據——列出所有應該被章程涵蓋的功能區塊，逐一確認每塊都被分配到至少一個 session，而非靠案例計數。
- 常見缺陷：把「已經測了很久」誤當成「已經測夠了」的證據，實際上只是在同一種操作模式裡打轉，自己完全沒發覺路徑高度重複。
