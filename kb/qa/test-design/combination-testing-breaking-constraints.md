---
id: qa/test-design/combination-testing-breaking-constraints
title: 打破約束與組合後果驗證（Breaking Constraints & Combination Consequences）
aliases: [constraint breaking, 打破約束測試, 組合後果驗證, breaking a constraint, downstream invariant, 不變量測試, 組合值後果測試]
tags: [combinatorial-testing, risk-based, test-design, relationship-analysis]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 6 "Multivariable Testing" p.489-513（CC BY-SA 4.0, Kaner/Fiedler, bbst.courses）]
source_lang: en
related: [qa/test-design/combination-testing-variable-independence, qa/test-design/combination-testing-coverage-criteria]
summary: 確認約束關係後，刻意打破它並追蹤下游後果，比只驗證輸入被接受更有說服力
---
## 定義

當變數關係走查（見〈判斷變數該不該組合測〉）確認了真正的約束（如 V1 < V2）後，下一步不是只驗證約束是否被擋下，而是刻意嘗試打破它——讓程式接受違反規則的組合（例如 V1=100、V2=20）。打破成功代表程式內部假設這條規則成立的不變量已經不成立，比單純的邊界違規更有說服力，因為它會牽連所有依賴這條規則的下游功能。同樣重要的是：設定好一組組合值之後，真正的測試重點是這個組合造成的「後果」，而不只是確認表單接受了這些值。

## 原理

打破約束之所以有價值，是因為系統內部各處往往假設某條規則恆成立（如「訖日一定晚於起日」），一旦這個假設在某個入口被繞過（例如前端擋住但後端沒有二次驗證），所有依賴這條規則寫成的下游邏輯都成為潛在缺陷的候選對象——比「約束本身被打破」這件事更貼近真實業務影響，也更能說服關係人修復。同理，組合值設定完成後，若只停在「表單接受了」就結案，等於放棄了驗證這組值實際會如何影響下游的機會。

## QA 視角
- 怎麼測：確認約束關係後，主動嘗試繞過前端直接呼叫 API 帶入違反約束的組合，確認後端是否有獨立的二次驗證；約束成功被打破後，逐一追蹤下游哪些功能假設了這條規則（排序邏輯、狀態機判斷、報表統計），分別驗證是否因此壞掉；組合值設定後，一定要延伸測這個組合實際的後果（畫面呈現、計算結果、跨功能影響），不能只停在「表單接受了」。
- 常見缺陷：只驗證「輸入被接受」就結案，沒有繼續追蹤這個組合造成的下游後果（如金額與幣別組合送出成功後，後台顯示、報表、對帳是否也正確處理）；沒有主動嘗試打破已知約束，因此漏掉「約束只在 UI 層擋、後端沒有二次驗證」這類典型缺陷。
