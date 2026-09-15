---
id: rd/backend/unreliable-network-timeout
title: 不可靠網路與逾時判斷（Unreliable Network & Timeout）
aliases: [網路分區, network partition, timeout, 逾時, 請求丟失, 部分失效, partial failure, 網路擁塞]
tags: [distributed-systems, network, timeout, reliability]
topic: dist
confidence: book
updated: 2026-09-15
sources: [DDIA ch9 §不可靠的網路, DDIA ch9 §故障與部分失效]
related: [rd/backend/clock-skew-and-drift, rd/backend/fencing-token, rd/backend/fault-injection-chaos-engineering]
summary: 網路只保證「盡力送達」，收不到回應無法判斷是請求丟失、對方當機還是回應丟失
---
## 定義
非同步分組網路（如乙太網、網際網路）不保證訊息何時送達或是否送達。傳送方發出請求後若未收到回應，唯一能確定的資訊只有「尚未收到回應」——無法區分請求丟失、對方當機、對方處理中、回應丟失、回應延遲這幾種情況。這種只有部分節點/部分功能失效、且失效方式不可預期的現象稱為部分失效，是分散式系統與單機系統最根本的差異。

## 原理
TCP 能偵測並重傳丟包、排序亂序封包，但無法保證「重傳一定送達」，也無法讓應用層知道對方是否真的處理完請求（TCP ACK 只代表對方作業系統核心收到，不代表應用程式已處理）。因故障判斷只能靠逾時：逾時設太長，使用者要等很久才知道失敗；設太短，容易把只是暫時變慢（負載尖峰、佇列塞爆、GC）的節點誤判為當機，觸發不必要的故障轉移，甚至引發連鎖過載。網路延遲的波動主因是排隊（交換機佇列、作業系統佇列、TCP 壅塞控制），系統越接近滿載，延遲波動越劇烈；共享資源環境（公有雲、多租戶）還會有「吵鬧鄰居」問題。

## QA 視角
- 怎麼測：用代理/防火牆規則製造「封包全丟」「只丟單向」「延遲注入（含長尾，分鐘級）」「連線建立後中途斷線」四種變體分別測，不要只測「服務直接關閉」這一種最乾脆的情境；同時測「A 通 B、B 通 C，但 A 不通 C」這種非對稱網路分區。
- 常見缺陷：逾時時間寫死導致環境延遲一高就整批誤判失敗；逾時後未收到回應就直接判定「操作沒發生」而重複送出造成重複扣款/重複建單；只測本地網路正常情境、從未驗證跨機房/高延遲鏈路下的行為；故障轉移後舊節點恢復卻繼續處理殘留請求（未做柵欄，見 fencing-token）。
