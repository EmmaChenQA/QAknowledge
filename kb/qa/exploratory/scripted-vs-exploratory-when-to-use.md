---
id: qa/exploratory/scripted-vs-exploratory-when-to-use
title: 腳本式與探索式測試的選用時機
aliases: [scripted testing, exploratory testing 選用, charter 測試章程, tour bus principle, 測試策略選擇, 何時用探索式測試]
tags: [test-strategy, exploratory-testing, scripted-testing]
topic: qa-exploratory
confidence: author-material
updated: 2026-09-15
sources: [Kaner "Exploratory Testing" BBST Fall 2006 lecture slides 5-17 (CC BY-SA 2.0), Bach "Exploratory Testing Explained" v1.3 §Where ET Fits pp.7-8 (2002-2003)]
related: [qa/exploratory/exploratory-testing-four-activities, qa/exploratory/exploratory-testing-coverage-and-session-tracking, qa/exploratory/scripted-testing-temporal-staleness-limitation]
summary: 腳本適合風險已充分理解且固定的情境；探索式適合風險輪廓還在變動、需要快速學習或找最重要缺陷的情境，多數專案該混用兩者。
---
## 定義
腳本先寫好測試操作、預期結果與比對方式，之後可反覆執行、可稽核、可換人做，適合「設計固定、風險已充分理解、同一批錯誤會反覆出現」的情境（如製造業品管，每件產品驗同一組規格）。探索式測試則讓測試者依當下對產品風險的理解即時決定測什麼，適合「風險輪廓還在變動」的情境。兩者不是對立選項，Bach 明白指出多數情境受益於混合策略，腳本與探索式可以搭配使用。

## 原理
Bach 從實務角度列出探索式測試特別合用的情境：需要對新功能快速回饋、需要快速摸熟一個產品、已經用腳本測過想換角度找更多問題、想在最短時間內抓到最重要的一個 bug、想獨立驗證另一位測試者的工作、要深入調查並孤立特定缺陷、要先評估某風險區域是否值得投入寫腳本。反之，回饋迴路很弱、很慢、很貴的情境，或某段測試特別需要稽核、高度受管理或客戶核可監督時，適合退回腳本。Bach 另提出「tour bus 原則」：探索有主線（章程 charter），但允許短暫偏離主線去追一個突發的想法，只要不因此徹底脫團或睡著。

## QA 視角
- 怎麼測：新功能剛上、規格還在變動、你對系統風險輪廓還不熟時，優先用探索式先摸熟再決定要不要把重點路徑固化成腳本；已知高度穩定且需要每次驗證同一組規格的迴歸項（如金流計算精度、跨版本相容性），才值得投入寫成可重複腳本；用「章程」框住探索範圍與目標（例如「測試某頁面的資料輸入邊界，重點看空值與超長字串」），避免探索式測試變成沒有主線的閒晃。
- 常見缺陷：探索時毫無章程，測試路徑東拉西扯，事後說不出測了什麼、還剩什麼沒測；把腳本與探索當成互斥的二選一，沒有依情境混用兩種策略。
