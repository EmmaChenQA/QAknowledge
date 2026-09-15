---
id: qa/test-design/failure-mode-catalog-fmea
title: 失效模式目錄（Failure Mode Catalog / Risk Catalog / Bug Taxonomy）
aliases: [failure mode, 失效模式, 風險目錄, risk catalog, bug taxonomy, 缺陷分類法, 失效模式清單]
tags: [risk-based-testing, fmea, bug-taxonomy]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 2 §Failure Mode Lists/Risk Catalogs/Bug Taxonomies / Using Failure Mode Catalogs, CC BY-SA 4.0, Kaner/Fiedler, bbst.courses]
source_lang: en
related: [qa/test-design/risk-based-testing-fundamentals, qa/test-design/project-risk-heuristics, qa/test-design/fmea-effects-analysis, rd/backend/fault-injection-chaos-engineering]
summary: 失效模式目錄把「程式可能怎麼壞」的經驗整理成清單，用來生測試想法、稽核測試計畫、訓練新人風險思維
---
## 定義
失效模式（failure mode）是程式可能失敗的一種具體方式。把大量失效模式整理成清單，就是失效模式目錄（也稱風險目錄 risk catalog，或缺陷分類法 bug taxonomy）。這類目錄通常來自長期蒐集真實缺陷案例、跨產品類別歸納而成，用途包括：生出測試想法（把目錄當提示清單，逐項問「我的系統會不會有這種缺陷」）、稽核既有測試計畫（挑幾類抽查測試計畫有沒有涵蓋）、訓練新人建立風險導向的思維習慣。更正式、逐元件做效應評估的做法（FMEA），見〈FMEA 效應分析〉。

## 原理
使用失效模式目錄時的推理鏈是：先在目錄裡找一個潛在缺陷類型，問系統理論上有沒有可能出現這種缺陷；如果可能，再問如果真的存在要怎麼把它找出來；接著評估這種缺陷出現的可能性有多高、一旦出現後果有多嚴重；最後才決定要不要真的設計測試去追這個缺陷。

## QA 視角
- 怎麼測：把待測系統拆成元件/子功能，針對每個元件套用失效模式目錄逐項自問「這裡可能怎麼壞」，把可能且後果夠嚴重的項目轉成具體測試案例；用失效模式目錄反查既有測試計畫或已寫好的測試案例，抽查是否有目錄裡列出的常見缺陷類型完全沒被涵蓋到。
- 常見缺陷：只看失效模式本身是否「聽起來嚴重」就決定要不要測，沒有評估找出這個缺陷的實際成本，導致把時間花在低機率、低影響但「聽起來可怕」的項目上；把目錄當成窮舉式檢查表機械套用，套完就結案，沒有針對系統特有的業務邏輯做超出目錄範圍的延伸推演。
