---
id: qa/automation/automation-value-evaluation-not-labor-replacement
title: 自動化測試的價值該怎麼衡量（不是取代人力）
aliases: [automation ROI, 自動化投資報酬, 自動化不是省人力, 自動化檢查維護成本, opportunity cost機會成本, 白象腳本white elephant]
tags: [automation, roi, maintenance-cost, test-strategy]
topic: qa-automation
confidence: author-material
updated: 2026-09-15
sources: [A Context-Driven Approach to Automation in Testing, Bach & Bolton 2016 §CASE #3: Automated checking, pp.20-22（Satisfice Inc. 版權所有，作者免費公開，非CC授權）]
related: [qa/automation/checking-vs-testing-distinction, qa/foundations/metrics-distortion-surrogate-measures]
summary: 自動化檢查價值要看開發、維護、機會成本三者總和，不是省了多少人力這麼單純。
---
## 定義
評估一支自動化檢查值不值得做，不能只看它能不能跑出結果，要合併考慮三種成本：一次性的開發成本、往後每次介面或邏輯變動都要跟著修的維護成本、以及把人力和時間投入寫這支腳本而不是投入更深入探索式測試所放棄掉的機會成本。一支自動化檢查如果找到問題主要不是因為它把檢查過程自動化了，而是後續由懂測試的人拿著工具去深入調查才找出真正的根因，那麼這支腳本帶來的價值其實主要來自人的調查工作，不是自動化這件事本身。

## 原理
一支檢查腳本上線後，只有在該區域之後真的又出現新問題時才算真正發揮長期價值；若該區域之後很少變動，腳本大概率會一直維持綠燈，長期幾乎不再抓到什麼，變成沒什麼產出卻仍要花心力維護的閒置資產。事前很難準確預測哪些檢查未來值回票價、哪些會變成閒置資產，這部分帶有猜測成分，需要靠經驗判斷該區域未來變動與風險大小來決定值不值得投資。

## QA 視角
- 怎麼測：導入新的自動化檢查前，先估算這支腳本涵蓋的功能區域未來半年內預期會有多少變動，變動頻率越高越值得投資，變動幾乎為零的區域優先考慮省下這筆開發與維護成本。
- 怎麼測：定期（例如每季）盤點既有腳本清單，找出長期維持綠燈、對應功能區域也很少變動的腳本，評估是否該下架或降低維護優先度，把騰出的人力挪去做探索式測試。
- 常見缺陷：只用跑起來要多久、省了多少人工點擊時間估算自動化投資報酬，完全沒算入日後每次改版都要跟著改腳本的長期維護成本，導致總成本被嚴重低估。
- 常見缺陷：把已經自動化的功能區域視為風險已解決，探索式測試資源全部撤出，結果腳本涵蓋不到的分支長期沒人再看過。
- 常見缺陷：腳本找到問題時把功勞全部歸給自動化本身，忽略真正定位根因靠的是人拿著各種工具交叉比對調查，導致高估自動化的獨立價值。
