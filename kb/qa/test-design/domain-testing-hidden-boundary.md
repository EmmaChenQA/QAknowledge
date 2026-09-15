---
id: qa/test-design/domain-testing-hidden-boundary
title: 風險/等價表與隱藏邊界（Risk-Equivalence Table & Hidden Boundary）
aliases: [risk equivalence table, 風險等價表, hidden boundary, 隱藏邊界, 未公開門檻, 內部實作邊界, 行為突變點]
tags: [domain-testing, risk-based, equivalence-class, boundary-value]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 5 "Domain Testing" p.402-416（CC BY-SA 4.0, Kaner/Fiedler, bbst.courses）]
related: [qa/test-design/domain-testing-risk-based-equivalence, qa/test-design/domain-testing-non-ordered-variables]
summary: 對系統理解夠深時改用風險/等價表；系統內部可能存在黑箱測試看不見的隱藏邊界
---
## 定義

當你對程式實際如何使用某個變數已經有一定理解後，改用以風險為單位的風險/等價表（風險名稱、不該觸發此風險的類別、可能觸發此風險的類別、對應的最佳代表測試案例），會比以變數為單位的經典表更有用。系統內部還可能存在隱藏邊界：某些內部實作細節（例如演算法在某個未公開門檻切換不同公式）會造成黑箱測試者看不見的等價類分裂。

## 原理

把值歸入哪個等價類，本質上是一種主觀判斷，而非機械式演算法能完全代勞的事——尤其當邊界是隱藏的，黑箱測試完全沒有線索能推斷它的存在，只能靠對系統理解加深、或觀察到異常行為才會發現。

## QA 視角
- 怎麼測：對已有一定理解的變數，建立風險/等價表逐一風險列出「不該觸發」與「可能觸發」兩組並各自選出最佳代表值；懷疑系統內部可能有隱藏邊界（如效能/精確度在某個量級突然改變）時，用漸進式加大/縮小輸入掃描是否存在行為突變點，而非只測公開文件上寫的邊界。
- 常見缺陷：對非數值/非排序型變數（相容性清單、環境組合）硬套邊界值思維，找不到「邊界」就放棄測試，實際上應改用風險等價分組挑代表；內部演算法在某個未公開的門檻切換公式（隱藏邊界），黑箱測試完全沒碰到那條線，除非額外做原始碼比對或觀察行為異常才會發現。
