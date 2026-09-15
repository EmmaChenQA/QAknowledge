---
id: qa/test-design/domain-testing-non-ordered-no-representative
title: 無序變數：無最佳代表時的樣本選擇（No Best Representative & Sample Selection）
aliases: [no best representative, 無最佳代表, 樣本選擇主觀性, sampling subjectivity, 供應商代表性不足, 分類等價誤判]
tags: [domain-testing, equivalence-class, compatibility-testing, sampling-strategy]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 5 "Domain Testing" p.407-408（CC BY-SA 4.0, Kaner/Fiedler, bbst.courses）]
source_lang: en
related: [qa/test-design/domain-testing-non-ordered-variables]
summary: 找不到最佳代表時該誠實記錄樣本選擇具主觀性，而非假裝有依據硬選一個
---
## 定義
有些無序集合（見〈無序變數的等價分組〉）確實沒有唯一最佳代表：如果沒有任何已知風險能讓你偏好某個成員勝過另一個，那麼隨便選哪個成員（或全部都選）在代表性上是等值的；此時該做的不是硬選一個假裝有依據，而是誠實記錄樣本選擇具主觀性。

## 原理
「找不到最佳代表」本身就是一種資訊——它代表你對這組變數的風險理解還不夠深，或這組變數真的每個成員風險相近；把這件事記錄下來，能提醒後續測試者：若未來對其中某個成員有新的風險認識，該回頭重新挑選代表，而不是把原本隨意的選擇誤當成已有依據的決策。

## QA 視角
- 怎麼測：找不到明顯理由偏好某成員時，誠實記錄「本組無最佳代表，樣本選擇具主觀性」，並優先抽樣涵蓋率最高、成本最低的幾個成員，而非隨機挑一個交差；對無序變數（如串接的金流或簡訊供應商清單）只測市占率最高一兩家不夠，需依「其他風險維度」（逾時處理方式差異、回傳格式差異）分組取樣。
- 常見缺陷：對無序變數（如串接的金流或簡訊供應商清單）只測了市占率最高的一兩家，卻沒有依其他風險維度分組，代表性不足的供應商行為差異完全沒被覆蓋到；把「同一分類群組」內任一成員的測試結果直接類推到全組，卻沒先確認該分類真的等價於目前要驗的風險，出現同組內行為其實不同卻被誤判為已覆蓋的情況。
