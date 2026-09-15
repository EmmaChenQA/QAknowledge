---
id: qa/exploratory/data-type-attacks-strings-numbers
title: 字串與數字資料型別攻擊清單（Data Type Attacks: Strings & Numbers）
aliases: [字串邊界測試, 數字邊界測試, string boundary values, numeric boundary values, SQL injection 測試, 特殊字元測試, 型別攻擊清單]
tags: [boundary-value, input-validation, string-testing, numeric-testing]
topic: qa-exploratory
confidence: author-material
updated: 2026-09-15
sources: [Test Heuristics Cheat Sheet p1-2（CC BY-SA 4.0，Elisabeth Hendrickson／James Lyndsay／Dale Emery，Ministry of Testing）]
related: [rd/backend/untrusted-input-validation-boundary, rd/backend/json-numeric-precision-pitfalls]
summary: 字串與數字輸入驗證要測的具體邊界值清單，不是抽象的「測邊界」而已
---
## 定義
字串與數字是輸入驗證測試中最常用到的兩類資料型別攻擊素材，指針對「字串長度、字元集、特殊符號」與「數字量級、進位、格式」系統性列出容易讓系統出錯的具體測試值，而非只寫「測試邊界值」這種抽象分類。

## 原理
字串類攻擊值涵蓋超長字串（255、256、257、1000、1024、2000、2048 字元以上）、重音字元（àáâãäåçèéêëìíîðñòôõöö）、東亞文字（中日韓字元）、常見分隔符與特殊字元（雙引號、單引號、反引號、直線、斜線、反斜線、逗號、分號、冒號、and 符號、角括號、星號、問號、Tab）、留白（完全空白、單一空格、多重空格、前導空格）、行尾字元、SQL injection 片語（如 `' select * from customer`）、以及 emoji；這些值要套用到「輸入、搜尋、更新」等所有會用到該欄位的操作，不能只在建立時測一次。數字類攻擊值涵蓋 0、2 的冪次邊界（32768/32769、65536/65537）、32 位元有號邊界（2147483648/2147483649）、32 位元無號邊界（4294967296/4294967297）、科學記號（1E-16）、負數、小數（0.0001）、含千分位逗號（1,234,567）、歐洲式千分位與小數點寫法（1.234.567,89），並且要把這些值全部代入計算欄位（加總、換算、匯率）再測一次，不能只驗證單一欄位顯示正確。

## QA 視角
- 怎麼測：針對每個文字輸入欄位，先確認欄位有無定義最大長度，逐一輸入清單中的長度級距與特殊字元組合，並在建立、搜尋、更新三種操作路徑各測一次；針對數字欄位，先以型別／精度推算系統可能使用的整數位元寬度（32/64 位元），取邊界值與邊界值+1 各測一次，並把這些值代入涉及金額計算的欄位，驗證進位與四捨五入行為。
- 常見缺陷：超長字串未截斷導致資料庫寫入失敗但前端顯示成功（假性成功）；特殊字元或 emoji 未跳脫導致頁面渲染錯亂，或後續用同一字串搜尋時比對失敗；SQL injection 片語未參數化導致查詢異常甚至資料外洩；數字欄位在 2^31 邊界發生整數溢位變成負數；含千分位逗號的輸入被誤判為多個數值而解析失敗或被截斷成前段數字。
