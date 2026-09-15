---
id: qa/bug-advocacy/credibility-building-and-destroying-behaviors
title: 可信度怎麼建立與怎麼被摧毀
aliases: [tester credibility, 可信度, signal detection theory, hit miss false alarm, bias-risky conduct, 缺陷回報偏誤, 測試者信譽]
tags: [bug-advocacy, credibility, bias, communication]
topic: qa-bug-advocacy
confidence: author-material
updated: 2026-09-15
sources: [BBST Bug Advocacy Lecture 6 §Your Choices and Your Credibility / Decisions Are Subject to Bias / Signal Detection & Recognition / Bias-Risky Conduct, slides 160-181 (CC BY-SA 4.0, Kaner/Fiedler, bbst.courses)]
related: [qa/bug-advocacy/bug-report-as-persuasion, qa/bug-advocacy/motivating-programmer-to-fix]
summary: 缺陷能否被修，很大程度取決於回報者的長期可信度，而可信度由一連串日常選擇累積或摧毀。
---
## 定義
整個缺陷處理流程是一連串在時間壓力下、資訊不完整、後果未知的情況下做出的決策，這些決策必然受到決策者的直覺與偏誤影響，而不只是理性計算。訊號偵測理論把這種判斷拆成四種結果：命中，真的有問題也回報了；漏報，真的有問題但沒回報；假警報，其實沒問題卻回報了；正確拒絕，其實沒問題也沒回報。回報者的長期可信度會直接影響對方對每一次新回報要用哪種傾向去解讀。建立可信度的做法包括：報告寫得清楚、分析紮實、對嚴重度的描述誠實不誇大、有數據就給數據沒數據就承認是直覺判斷、對工程師與其他關係人保持禮貌尊重，即使對方不值得也一樣。摧毀可信度的做法包括：用帶指責語氣的用詞、誇大嚴重度、對方已明確拒絕仍不斷糾纏、報告寫得讓人看不懂或過度冗長、對使用者或客戶流露輕視態度。

## 原理
可信度是累積出來的資產：每一次回報的品質、每一次對這值不值得修的判斷準確度，都會疊加影響對方未來看待你回報的態度。可信度高的人，同樣技術內容的報告會被更快、更認真地評估；可信度低的人，即使報告內容正確，也容易被優先忽略或延後處理。這解釋了為什麼兩個技術能力相近的測試者，缺陷修復率可以差很多。

## QA 視角
- 怎麼測：送出報告前檢查語氣是否中性，把帶情緒的字眼改掉；沒有把握的嚴重度判斷要明講這是我的直覺判斷、沒有實測數據佐證，不要用肯定語氣包裝不確定的內容；對已經被明確拒絕的項目，只在真的有新資訊時才重新提出，不做無實質內容的重複催促。
- 常見缺陷：為了不漏報而把每個細微現象都當高嚴重度回報，長期下來對方學會忽略這個人的嚴重度標籤；報告內容誇大，被對方發現後往後的回報都被打折看待；用指責性語句暗示對方沒認真測過，讓對方在情緒上先抗拒而不願理性討論技術內容；同一個已被拒絕的項目反覆用相同理由再提，沒有補充新證據，被視為糾纏而非合理申訴。
