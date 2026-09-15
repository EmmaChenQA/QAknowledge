---
id: qa/exploratory/exploratory-testing-scope-and-method-misconceptions
title: 探索式測試的範圍與方法誤解
aliases: [ET 誤解, quicktest, 攻擊測試, 探索式測試範圍誤解, ET 不限黑箱測試, 情境測試準備, 探索式測試四階段]
tags: [exploratory-testing, misconceptions, test-scope, tooling]
topic: qa-exploratory
confidence: author-material
updated: 2026-09-15
sources: [Kaner "Exploratory Testing" BBST Fall 2006 lecture slides 73-90 (CC BY-SA 2.0), Bach "Exploratory Testing Explained" v1.3 pp.1, 9-10 (2002-2003)]
source_lang: en
related: [qa/exploratory/exploratory-testing-common-misconceptions, qa/exploratory/exploratory-testing-four-activities]
summary: 探索式測試常被窄化理解成只測功能、不能用工具、不能事前準備；實際上範圍、工具與準備程度都不受限，關鍵在學習與選擇。
---
## 定義
除了「沒紀錄、沒方法」這種對紀律面的誤解，探索式測試也常在「涵蓋範圍」與「能不能搭配工具、能不能有事前準備」這些方法論細節上被窄化理解。Kaner 整理「23 年後」對這些具體誤解逐一澄清。

## 原理
ET 不等於 quicktest（quicktest／attack 是一種從「錯誤理論」出發、準備成本低廉的技法，可以用探索式心態執行也可以用腳本化心態執行，取決於測試者當下的思路，兩者不是同一回事）；ET 不只是功能測試（品質是對利害關係人的價值，若可用性、安全性、效能等面向影響價值，就在測試員的職責範圍內，ET 關乎「學習與選擇」而非「範圍限制」）；ET 可以搭配任何種類的工具（跟傳統「自動化測試」一樣可以高度借助工具，甚至像電話交換機案例，用模擬器生成大量隨機事件、配合探針記錄異常，這種做法屬於自動化的白箱測試，同時也是典型的探索式測試）；ET 不是只發生在執行階段，而是貫穿學習、設計、執行、詮釋全程；ET 可以涉及需要大量事前準備的複雜測試（情境測試就是典型例子）；ET 也不限定只能是黑箱測試。

## QA 視角
- 怎麼測：把探索式測試涵蓋的範圍主動延伸到可用性、效能、安全等非純功能面向，不因為票面只提功能就自我限縮；需要時大方使用工具或簡單腳本輔助探索（如寫一支小腳本批次產生邊界測資），不因為「這是探索式」就排斥自動化；規劃階段就把「學習產品」與「設計測試」算進探索式測試的一部分，而不是只把執行當下算數。
- 常見缺陷：把探索式測試窄化成只在功能面繞，明明是效能或安全風險卻因「不在腳本範圍」而沒人測；誤以為探索式與自動化互斥，遇到重複性高的驗證仍堅持手動點擊，浪費本可以工具化的時間；誤以為探索式測試不能事前準備，遇到需要複雜前置資料的情境測試時直接放棄改採簡化版本。
