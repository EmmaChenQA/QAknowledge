---
id: qa/bug-advocacy/rimgen-followup-testing
title: RIMGEN 六字訣：缺陷報告前的後續調查（Follow-up Testing）
aliases: [RIMGEN, Replicate Isolate Maximize Generalize Externalize Neutral, 後續調查, follow-up testing, 缺陷放大測試, uncorner corner case, 缺陷精煉]
tags: [bug-advocacy, test-design, reproducibility, severity]
topic: qa-bug-advocacy
confidence: author-material
updated: 2026-09-15
sources: [BBST Bug Advocacy Lecture 2 §Researching the Failure Conditions / Follow-Up Testing for Severity, slides 44-71; Lecture 3 §To Report a Bug Well, slides 80-90 (CC BY-SA 4.0, Kaner/Fiedler, bbst.courses)]
source_lang: en
related: [qa/bug-advocacy/bug-report-essential-fields, qa/bug-advocacy/defending-corner-case-and-unimportant-bugs]
summary: 找到失敗現象後先做六類後續調查再報告，讓缺陷以最有說服力的樣貌呈現。
---
## 定義
第一次踩到的失敗只是一個症狀，不代表已經找到最能說明問題嚴重度與範圍的呈現方式。RIMGEN 是報告前的六個後續調查方向：Replicate（確認可重現）、Isolate（去掉非必要步驟，縮到最短能重現的路徑，且一份報告只放一個缺陷）、Maximize（變換操作／設定／資料／環境四個面向，找出更嚴重的失敗，例如當機或資料損毀）、Generalize（把極端測資換成主流測資，證明問題不只發生在刁鑽情境，或證明在多種環境／機台都會發生）、Externalize（把技術現象轉譯成對關係人的具體影響與成本）、Neutral tone（用中性不帶情緒的語氣敘述，避免指責式用詞折損可信度）。

## 原理
同一個底層錯誤可能引發很多種不同的失敗表現，第一個踩到的往往不是最嚴重的那個。缺陷報告只要看起來像刁鑽的極端情境，就容易被以「不現實」為由打回票；只要看起來只影響一台機器，就容易被以「你的環境問題」為由駁回。先做完六類調查再寫報告，能把「這只是個例外情況」的反駁空間先堵掉。

## QA 視角
- 怎麼測：踩到失敗後先原地重複操作與加快操作速度看有無累積效應；換一組不影響現象本身的程式設定重跑；換一份不同的測試資料重跑；換一台規格差異大的機器或不同瀏覽器／裝置重跑；如果是用了極端測資才重現，換成中間值測資再測一次，能重現就用中間值測資寫報告，可信度最高。
- 常見缺陷：報告只描述第一次踩到的症狀，沒有嘗試放大成更嚴重的失敗，被判為低影響；用極端邊界值（如金額 0、超大字串）才重現的問題直接拿邊界值案例送出，被當成刁鑽案例打回；同一報告混雜兩個不同的失敗現象，導致一半修好一半沒修卻整張關單；報告文字帶情緒化用詞，讓對方先反感而非先評估技術內容。
