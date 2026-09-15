---
id: qa/test-design/touring-coverage-inventory
title: 巡覽建立測試清單（Touring for Coverage Inventory）
aliases: [tour, 測試巡覽, feature tour, 功能巡覽, 探索式巡覽主題, touring heuristic, 清單導向測試, inventory-driven testing]
tags: [exploratory-testing, coverage, test-design]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 1 §Tours and Exploration / A Tour Yields an Inventory / Suggestions for Touring, CC BY-SA 4.0, Kaner/Fiedler, bbst.courses]
related: [qa/test-design/test-technique-classification-dimensions]
summary: 巡覽是圍繞一個主題（功能/變數/錯誤訊息/資料等）快速掃過系統以產出清單，之後才對清單逐項深入測試。
---
## 定義
巡覽（tour）是圍繞某個主題對系統做一輪探索，目的是產出一份清單（inventory），而不是當場找缺陷。常見主題包括：功能巡覽（找出所有功能/選單/操作方式）、變數巡覽（找出所有可被使用者改變的值）、資料巡覽（找出資料元素及其來源）、錯誤訊息巡覽（列出所有錯誤訊息）、狀態巡覽（列出所有可觀察的系統狀態）、交易巡覽（找出完整的使用者任務序列）。巡覽本質上是覆蓋導向技法的起手式：先建清單，再決定要用什麼程度的完整性去測清單上的每一項。

## 原理
測試員不會天生就知道系統有哪些功能或變數，必須先用巡覽學習系統的樣貌。巡覽可以類比為結構化腦力激盪：擅長快速浮現大量候選項目，之後才逐一深入。不同主題的巡覽會讓測試員從不同角度切入同一個系統，產出的清單彼此互補；沒有人會用完所有種類的巡覽，但巡覽種類越多樣，團隊整體能覆蓋到的面向就越廣。巡覽可以兩人合作（比單人測兩倍時間更有效）、也可以拆成多個時段完成，不需要一次做完。

## QA 視角
- 怎麼測：開始測一個陌生功能或系統前，先花固定時間（如 30–60 分鐘）做一輪功能巡覽或變數巡覽，只記錄「有什麼」不深入判斷對錯，產出清單後再排優先序決定深入測哪些項目；針對特定風險改用對應主題的巡覽，例如懷疑邊界值有問題就做 extreme value tour（刻意找超大/超小/型別不符/空值輸入），懷疑錯誤處理有問題就做錯誤訊息巡覽。
- 常見缺陷：巡覽做完就當作已經測試完成，實際上巡覽只建立清單、沒有深入驗證，清單項目從未被逐一測試就結案；只做過一種巡覽（通常是功能巡覽）就以為涵蓋全貌，遺漏了資料、狀態、交易等其他維度可能藏的問題；巡覽中發現的「順手看到的異常」沒有被記錄下來，事後想不起在哪個路徑看到過。

