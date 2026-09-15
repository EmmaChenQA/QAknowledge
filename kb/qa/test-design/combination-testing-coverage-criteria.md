---
id: qa/test-design/combination-testing-coverage-criteria
title: 組合測試覆蓋準則（All Singles / All Pairs / All Triples / All N-tuples）
aliases: [combination testing, all-pairs testing, pairwise testing, all singles, all triples, 組合覆蓋準則, all n-tuples]
tags: [combinatorial-testing, coverage, test-design, pairwise]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 6 "Multivariable Testing" p.446-449, 475-485（CC BY-SA 4.0, Kaner/Fiedler, bbst.courses）]
related: [qa/test-design/combination-testing-variable-independence, qa/test-design/combination-testing-coverage-axes]
summary: 組合測試覆蓋層級由弱到強分全單值/全成對/全三元組/全N元組，層級越高越能抓多變數交互缺陷但案例數也越膨脹
---
## 定義

假設獨立變數 V1 到 Vk 分別有 N1 到 Nk 個可能值，窮舉測試需要 N1×N2×...×Nk 個測試案例，通常不可行，因此需要抽樣策略。覆蓋準則由弱到強依序是：全單值覆蓋（All Singles，每個變數的每個值都至少出現在某個測試案例裡一次，測試數只需等於最大的 Ni）、全成對覆蓋（All Pairs，每對變數的每對值組合都至少在某個測試案例中一起出現過，即 pairwise testing）、全三元組覆蓋（All Triples）、全 N 元組覆蓋（All N-tuples，等同於窮舉）。這條層級之外還有三組彼此獨立的術語軸線（窮舉 vs 等價、正常 vs 強健、弱 vs 強），見〈組合測試術語軸線與實務折衷〉。

## 原理

覆蓋準則的層級選擇本質上是在測試成本與交互風險之間取捨：全成對只保證兩兩共現，需要三個變數同時作用才會出現的缺陷完全不會被抓到，若要抓，得升到全三元組甚至更高，但案例數會迅速膨脹，因此層級選擇要對應該功能實際的交互風險高低，而非一律套用同一個準則。

## QA 視角
- 怎麼測：先決定要測哪幾個變數、每個變數取幾個代表值（值越少組合數才可控），再選覆蓋準則：早期或簡單功能用全單值快速掃過；有交互作用風險的功能用全成對；對高風險關鍵路徑（金流、權限判斷）才考慮全三元組或更高。
- 常見缺陷：直接套用 pairwise 工具產生的組合表，卻沒有先確認變數之間彼此獨立——實際上變數間有約束關係（如某狀態只能搭配特定角色），機械生成的組合裡混入大量不可能發生的無效組合，浪費測試資源；誤以為做完全成對覆蓋就等於「測過所有交互風險」，但全成對只保證兩兩共現，需要三個變數同時作用才會出現的缺陷（如三重狀態疊加才觸發的競態）完全不會被抓到。
