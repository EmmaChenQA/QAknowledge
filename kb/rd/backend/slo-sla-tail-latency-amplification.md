---
id: rd/backend/slo-sla-tail-latency-amplification
title: SLO/SLA 與尾部延遲放大（SLO/SLA and Tail Latency Amplification）
aliases: [服務級別目標, 服務級別協議, service level objective, service level agreement, 尾延遲放大, 多次後端呼叫]
tags: [sla, slo, performance, reliability, architecture]
topic: perf
confidence: book
updated: 2026-09-15
sources: [DDIA ch2 §響應時間指標的應用]
related: [rd/backend/response-time-percentiles, rd/backend/queueing-delay-and-throughput]
summary: 一次請求呼叫越多後端服務，出現慢呼叫的機率越高，整體變慢比例會被放大，SLO 需以分位數定義。
---
## 定義
SLO（服務級別目標）是內部承諾的效能/可用性指標，例如「p50<200ms、p99<1s、99.9% 請求無錯誤」；SLA 是對外合約，規定未達 SLO 時的後果（如退款）。尾部延遲放大指一次終端請求若依賴多個並行的後端呼叫，只要其中一個慢，整體就慢；後端呼叫數越多，遇到慢呼叫的機率越高。

## 原理
即使每個後端服務只有 1% 的請求慢，當一次頁面渲染需要呼叫 20 個服務時，「至少一個慢」的機率會遠高於 1%，因此高分位數的重要性隨呼叫鏈變長而放大，這也是微服務架構下效能問題常被低估的原因。

## QA 視角
- 怎麼測：找出頁面/交易背後實際扇出呼叫了幾個下游服務，針對呼叫數量多的頁面單獨做效能測試；模擬其中一個下游服務變慢（延遲注入），觀察整體回應時間是否被放大、有無逾時保護；核對 SLO 文件寫的是平均值還是分位數，平均值型的 SLO 本身就有問題要提出質疑。
- 常見缺陷：
  - 首頁/結帳頁扇出呼叫十幾個微服務，任一服務偶發變慢就整頁變慢，卻找不到單一「兇手」
  - SLA 承諾用平均響應時間衡量，實際使用者體感由 p99 決定，兩者脫節
  - 下游服務逾時設定過長或沒有逾時，慢呼叫拖垮整條呼叫鏈
  - 壓測只測單一服務，沒有測完整呼叫鏈的疊加延遲
