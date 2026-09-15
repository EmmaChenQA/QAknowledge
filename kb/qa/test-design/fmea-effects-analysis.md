---
id: qa/test-design/fmea-effects-analysis
title: FMEA 效應分析（Failure Mode and Effects Analysis）
aliases: [FMEA, Failure Mode and Effects Analysis, 失效模式與效應分析, 效應分析, 後果對象後果嚴重度找出成本, 修復成本評估]
tags: [risk-based-testing, fmea, bug-taxonomy]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 2 §Failure Mode & Effects Analysis, CC BY-SA 4.0, Kaner/Fiedler, bbst.courses]
related: [qa/test-design/failure-mode-catalog-fmea, qa/test-design/project-risk-heuristics]
summary: FMEA 針對每個元件逐一評估失效的影響對象、嚴重度與修復/找出成本，決定值不值得花力氣去追
---
## 定義
FMEA（失效模式與效應分析，Failure Mode and Effects Analysis）是比失效模式目錄（見〈失效模式目錄〉）更正式的做法：把產品拆成元件，針對每個元件逐一想像可能的失效模式，再做效應分析——這個失效會影響誰、影響程度落差有多大、平均嚴重度多高、修復成本多高，最後據此判斷值不值得花成本去找這個缺陷。

## 原理
FMEA 的效應分析階段特別強調「後果」不是單一數字——同一個失效模式對不同利害關係人的影響程度可能天差地遠，修復成本與偵測成本也要一併納入決策，而不是只看「這個缺陷聽起來嚴不嚴重」的直覺。找出成本高但後果輕微的缺陷，可能反而不值得投入資源去追，這個判斷必須靠三項條件並列比較才做得出來，不能只看其中一項。

## QA 視角
- 怎麼測：對於難以判斷優先序的候選缺陷，明確寫出「後果對象、後果嚴重度、找出成本」三欄再決定測不測，而不是憑感覺排序；效應分析逐一列出會受影響的不同角色（一般使用者、代理商、營運人員、客服），分別評估後果嚴重度，而非只評一個整體分數。
- 常見缺陷：效應分析只考慮單一利害關係人（通常是開發團隊自己），忽略同一個失效對不同角色的後果差異巨大，導致對某些角色影響嚴重的缺陷被低估；只評「影響有多嚴重」卻沒評「找出這個缺陷要花多少成本」，導致資源投入決策失衡，把力氣花在難找但影響輕微的項目上。
