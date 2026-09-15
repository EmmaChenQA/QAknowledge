---
id: qa/test-design/scenario-testing-object-event-benefit-lines
title: 情境測試的物件／事件／效益線索（Object Life History, System Events, Benefits）
aliases: [life history testing, 生命史測試, 系統事件清單測試, 效益端到端驗證, object life history, system events, benefit verification]
tags: [scenario-testing, test-design, coverage, risk-based]
topic: qa-test-design
confidence: author-material
updated: 2026-09-15
sources: [BBST Test Design Lecture 4 "Scenario Testing" p.297-315（CC BY-SA 4.0, Kaner/Fiedler, bbst.courses）]
source_lang: en
related: [qa/test-design/scenario-testing-lines-of-inquiry, qa/test-design/scenario-testing-story-elements]
summary: 物件生命史、系統事件、效益承諾是三條特別具體的情境線索，各自有容易被漏掉的固定階段
---
## 定義
情境測試線索清單（見〈情境測試的系統化來源〉）中有三條特別具體、值得獨立展開操作法：為系統中的物件寫生命史（如何被建立、如何被使用或修改、何時被銷毀或棄置）；列出系統事件與特殊事件（月結日、安裝升級期間、節假日、跨年、閏年）；列出系統承諾的效益並為每項效益設計端到端驗證情境。

## 原理
這三條線索分別對應三種常被漏掉的覆蓋面向：生命史容易漏掉「銷毀/過期」這種不常被想到的末端階段；事件清單容易只覆蓋常見事件、漏掉特殊事件；效益清單容易只信任官方文件版本，沒有核對不同關係人（PM/客服/RD）認定的效益是否一致。

## QA 視角
- 怎麼測：先列出系統中的「物件清單」（如訂單、優惠券、帳號），對每個物件寫生命史情境，特別確保涵蓋建立、使用/修改、銷毀/過期三個階段；再列「事件清單」，特別留意特殊事件（跨年、閏年、活動同時上下架、系統升級維護期間）；再列「效益承諾清單」，逐項寫出能端到端驗證該承諾的情境，並分別問不同關係人（PM/客服/RD）認定的效益是否一致。
- 常見缺陷：只覆蓋常見事件，特殊事件（跨年、閏年、活動同時上下架）沒人測過，等到真的發生才出事；生命史情境漏了「銷毀/過期」階段，只測建立與正常使用，資源回收或過期失效路徑完全沒人碰過。
