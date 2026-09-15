---
id: qa/foundations/oracle-problem
title: Oracle 問題：如何判斷測試結果對不對（The Oracle Problem）
aliases: [oracle problem, 測試 oracle, 判斷對錯, pass fail 判斷, false alarm, miss, 誤判, 漏判, nontestable program]
tags: [testing-fundamentals, oracle, judgment]
topic: qa-foundations
confidence: author-material
updated: 2026-09-15
sources: [BBST Foundations Lecture 3 §Once Upon a Time / Oracle / The Need for Judgement / Fallible Decision Rules (CC BY-SA 4.0, Kaner/Bach, bbst.courses)]
source_lang: en
related: [qa/foundations/oracle-heuristics-types]
summary: 傳統「oracle 是判斷通過或失敗的機制」定義行不通，判斷對錯本質上需要人的判斷且會出錯。
---
## 定義
Oracle 原本被定義成「判斷程式通過或失敗測試的機制」，或「一個參照程式：把相同輸入分別餵給待測程式與參照程式，比對結果即可知道待測程式對不對」。但這兩個傳統定義站不住腳：研究指出若嚴格要求存在一個能在合理時間與成本內判斷正確答案的 oracle，那麼大多數程式依此定義都是不可測試的（nontestable）。即便把測試想成「比較實際結果與預期結果」，這個比較動作本身也需要基於對問題領域的理解所做的人類判斷，不是機械可以自動完成的事。

## 原理
即便使用參照程式比對，也只能控制部分輸入、觀察部分輸出，測試環境（作業系統版本、背景程序、系統資源）幾乎不可能被完整記錄與複製，比對因此永遠不完整。人的觀察也受限於選擇性注意——沒被留意到的條件就等於沒被檢查，這正是許多「無法重現」失敗的根源。正確的理解是：oracle 是一種啟發式（heuristic）原則或機制，用來幫你察覺「可能有問題」，而不是給出絕對正確答案的權威判定。啟發式判斷天生會犯兩類錯誤：漏判（Miss，程式實際壞了但判定通過）與誤判（False Alarm，程式沒壞卻被判定失敗），沒有任何判斷規則能同時避免這兩種錯誤。測試自動化同樣受制於此——能不能自動化，取決於能否用程式表達出一個夠好的 oracle，而不是取決於操作能不能被腳本化。

## QA 視角
- 怎麼測：每條測試案例動筆前先問自己的 oracle 是什麼——是跟歷史行為比、跟規格比、跟同類產品比，還是純靠人判斷合不合理，把判斷依據寫進案例而不是只寫「預期正確」。
- 常見缺陷：自動化回歸測試的斷言只驗了容易程式化的一小塊（例如只驗 HTTP 狀態碼），對真正該關注的業務正確性視而不見，長期累積出大量綠燈但沒測到重點的假安全感。
- 常見缺陷：把「沒有報錯」直接當成行為正確的證據，漏掉沒有明顯錯誤訊息但結果本身錯誤的缺陷。
- 常見缺陷：對「異常」的判斷只憑直覺又缺乏可信依據，回報後被 RD 以「這是正常的」駁回，因為沒有講清楚判斷所依據的 oracle 是什麼。
