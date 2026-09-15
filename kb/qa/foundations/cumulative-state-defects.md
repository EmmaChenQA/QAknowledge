---
id: qa/foundations/cumulative-state-defects
title: 跨操作累積狀態缺陷（Cumulative State Defects Across Operations）
aliases: [累積狀態缺陷, cumulative state bug, state-based bug, stack overflow, Telenova, 長時間運行缺陷, resource leak, 資源洩漏測試]
tags: [testing-fundamentals, coverage, state]
topic: qa-foundations
confidence: author-material
updated: 2026-09-15
sources: [BBST Foundations Lecture 5 §Sequences / The Telenova Stack Failure (CC BY-SA 4.0, Kaner/Bach, bbst.courses)]
source_lang: en
related: [qa/foundations/path-sequence-testing-blind-spots, qa/foundations/exhaustive-testing-impossible, qa/foundations/sampling-strategy-design]
summary: 電話交換機堆疊溢位案例顯示，即使單次操作與分支覆蓋率全數過關，跨多次操作累積的系統狀態仍可能藏著只有長時間運行才會爆發的缺陷。
---
## 定義
真實案例（電話交換機的通話保留堆疊溢位缺陷）：每個功能單獨測試都正常，敘述與分支覆蓋率都做到 100%，缺陷卻只在保留通話堆疊連續累積超過設計上限、且中途沒有觸發清理時才會爆發，因為正常使用者操作路徑幾乎不可能主動把保留佇列堆到那麼滿。這類缺陷的本質是跨越多次操作累積出來的系統狀態，不是任何單次執行內就能觀察到的邏輯錯誤。

## 原理
任何只看單次操作、單一路徑的測試方法天生測不到這類缺陷，除非測試設計者對系統的狀態機模型與內部資源管理有一定程度的猜測，主動設計出連續重複某動作 N 次這種案例。這也是為什麼這類缺陷幾乎都在生產環境長時間、高頻使用後才被發現——測試環境的執行時間與操作次數通常遠低於觸發門檻，覆蓋率再高也量不到「次數」這個維度（見 `path-sequence-testing-blind-spots`）。

## QA 視角
- 怎麼測：對涉及佇列、快取、計數器、連線池等有內部累積狀態的功能，額外設計連續重複同一操作多次（不觸發清理路徑）的案例，而非只驗證單次操作的正確性。
- 常見缺陷：長時間穩定運行後才出現的異常（連線數緩慢上升、記憶體緩慢增加、佇列莫名滿載）在測試環境從未重現，因為測試案例執行時間太短，沒有模擬同一狀態累積路徑重複很多次的情境。
