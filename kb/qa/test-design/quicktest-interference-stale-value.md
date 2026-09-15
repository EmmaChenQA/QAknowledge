---
id: qa/test-design/quicktest-interference-stale-value
title: 速測技法：干擾測試與殘留值測試（Interference Testing & Stale Value Testing）
aliases: [interference testing, 干擾測試, stale value, 殘留值測試, 修改後的值殘留, 中斷任務測試, extreme value testing]
tags: [quicktest, risk-based-testing, exploratory-testing]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 2 §Common Ideas for Quicktests, CC BY-SA 4.0, Kaner/Fiedler, bbst.courses]
source_lang: en
related: [qa/test-design/quicktest-theory-of-error]
summary: 干擾測試（中斷/取消/搶佔）與殘留值測試（上游改了下游沒重算）是兩類特別具體、常抓到缺陷的速測技法
---
## 定義
干擾測試（interference testing）與「修改後的值殘留」測試是速測清單（見〈速測與錯誤理論〉）中兩類特別具體、常抓到缺陷的技法。干擾測試是在操作進行中製造中斷、更換、取消、暫停、資源搶佔、換出任務等情境，觀察系統恢復後狀態是否正確；殘留值測試是先設定一個值觸發下游計算，再回頭修改上游輸入，確認下游是否正確重新計算，而非殘留舊值繼續使用。

## 原理
這兩類速測之所以特別值得標準化，是因為「操作被打斷」與「上游值被修改後下游沒重新計算」都是極常見、跨系統反覆出現的錯誤根源，且都可以用固定操作步驟黑箱誘發，不需要理解系統內部設計。

## QA 視角
- 怎麼測：針對「中斷任務」類速測，具體設計成在操作進行中製造中斷、取消、暫停、資源搶佔、切換分頁/裝置等情境，觀察任務恢復後的狀態是否正確；針對「修改後的值」類速測，先設定一個值觸發下游計算，再回頭修改上游輸入，確認下游是否正確重新計算而非殘留舊值；不論哪一類，速測執行完都要記錄「測了什麼、為什麼測」，避免看似隨機亂點，難以向他人說明測試依據或重現。
- 常見缺陷：速測執行完沒有記錄「測了什麼、為什麼測」，變成看似隨機亂點，難以向他人說明測試依據或重現；只測「中斷後畫面看起來正常」就結案，沒有進一步確認中斷前已寫入的資料是否完整、有沒有產生重複或遺失的紀錄。
