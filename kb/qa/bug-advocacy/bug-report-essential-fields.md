---
id: qa/bug-advocacy/bug-report-essential-fields
title: 缺陷報告的必要欄位與填寫原則
aliases: [bug report fields, 缺陷報告欄位, severity vs priority, 嚴重度與優先度, report type, expected vs actual, problem description, reproducible 欄位]
tags: [bug-advocacy, bug-report-fields, writing, triage]
topic: qa-bug-advocacy
confidence: author-material
updated: 2026-09-15
sources: [BBST Bug Advocacy Lecture 3 §Typical Fields in a Problem Report, slides 91, 94-105; §Fields I Avoid, slides 106-110 (CC BY-SA 4.0, Kaner/Fiedler, bbst.courses)]
related: [qa/bug-advocacy/failure-when-bug-summary, qa/bug-advocacy/rimgen-followup-testing]
summary: 一份好缺陷報告要有的欄位骨架，以及哪些欄位不該硬塞資料造成垃圾進垃圾出。
---
## 定義
一份完整的缺陷報告除了標題，還需要：報告類型（區分是程式錯誤、設計爭議、需求缺口、還是規格與文件不一致，避免設計爭議被誤讀成程式錯誤）；逐步重現步驟（從一個已知起點開始，一步一步編號，每隔幾步就標出應該看到什麼，方便讀者對照走到哪一步走偏了）；預期結果與實際結果的對照（不能只寫「出現錯誤」，要寫清楚原本應該發生什麼）；是否可重現的明確標註（可重現／不可重現／間歇性，且不可以在沒有實際重現過的情況下標可重現）；嚴重度（回報者對影響程度的評估）與優先度（決策者對何時該修的決定，兩者常被混淆，嚴重度高不代表優先度一定高，兩個欄位該分開填、分開討論）。

## 原理
欄位設計的核心原則是管不了準確度的資料就不要收集：根因、修復模組、修復成本這類欄位表面上很有用，但通常只有工程師知道答案，而工程師不一定會主動填，測試者若自行從版控猜測填入，容易寫錯，最後變成垃圾進垃圾出，反而誤導後續決策。

## QA 視角
- 怎麼測：填報告時先問這是程式錯誤還是設計爭議還是需求缺口，選錯類型會讓對方用錯誤的心態評估；重現步驟寫完後自己照著走一遍，確認每一步都寫了、沒有跳步；預期結果欄位寫應該看到的具體值或畫面而不是「應該正常」；嚴重度與優先度分開陳述，例如嚴重度高（資料寫入錯誤金額），優先度建議由 PM 決定。
- 常見缺陷：把設計爭議寫成程式錯誤類型，對方直接回「as designed」草草結案；重現步驟跳過中間步驟，其他人照著走重現不出來，被標記無法重現；沒實際重現過就把可重現欄位打勾，之後被要求當面重現卻做不到，損及可信度；報告裡塞入自己猜測的根因技術判斷，猜錯時被質疑專業度。
