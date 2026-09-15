<!-- 本檔案為人工參考文件，非知識節點，build.js 不解析（檔名大寫開頭）。 -->
# QA / 測試書單彙整

彙整自 5 份英文原始清單，書名、分類與簡介為**翻譯／改寫**（非逐字翻譯原文簡介），出處連結見各書條目下方。

## 拆書結果（2026-09-15 完成）

`kb/qa/` 原本是空的候選缺口，現已用**作者公開發表的 CC BY / CC BY-SA 授權資料**（而非下方書單裡的商業書全文）拆出 71 個節點，`confidence` 一律標 `author-material`。理由與取捨見對話紀錄：兩本共識最高的書（《軟體測試中學到的教訓》《Explore It!》）沒有合法公開全文，改用同作者群（Cem Kaner／James Bach／Elisabeth Hendrickson）自己發表的免費課程與速查表，內容主題高度重疊。

| 來源 | 授權 | 產出節點 | 對應主題（`kb/_topics.json`）|
|---|---|---|---|
| BBST Foundations（Cem Kaner） | CC BY-SA 4.0 | 11 | `qa-foundations` 測試基礎與批判性思維 |
| BBST Test Design（Cem Kaner） | CC BY-SA 4.0 | 28 | `qa-test-design` 測試設計技法 |
| BBST Bug Advocacy（Cem Kaner） | CC BY-SA 4.0 | 10 | `qa-bug-advocacy` 缺陷主張與回報 |
| BBST Exploratory Testing（Cem Kaner）＋《Exploratory Testing Explained》（James Bach） | CC BY-SA | 15 | `qa-exploratory` 探索式測試（併同下列速查表）|
| Test Heuristics Cheat Sheet（Elisabeth Hendrickson 等） | 版權所有，作者公開免費提供下載 | 7 | `qa-exploratory` |
| A Context-Driven Approach to Automation in Testing（James Bach & Michael Bolton，2016） | 一般版權所有，作者免費公開，非 CC——節點內容**完全改寫不引原句** | 8 | `qa-automation` 自動化與工具化測試（新增主題）|
| Ruby on Rails Guides：Testing／Active Record Validations／Associations／Routing（官方文件） | CC BY-SA 4.0 | 27 | `rails` Rails 框架基礎（新增主題，`kb/rd/backend/rails/`）|

**知識庫最終統計**：188 個節點、778 題考題。

| 領域 | 節點數 |
|---|---|
| RD 知識（`kb/rd/backend`，含 DDIA／REST API） | 78 |
| RD 知識（`kb/rd/backend/rails`，Rails Guides） | 27 |
| RD 知識（`kb/rd/frontend`，Vue） | 4 |
| QA 技巧（`kb/qa/foundations`） | 11 |
| QA 技巧（`kb/qa/test-design`） | 28 |
| QA 技巧（`kb/qa/bug-advocacy`） | 10 |
| QA 技巧（`kb/qa/exploratory`） | 22 |
| QA 技巧（`kb/qa/automation`） | 8 |

**Rails 缺口說明**：原始書單建議的《Agile Web Development with Rails》未拆——使用者提供的電子書來源（dokumen.pub）判定為盜版商業書，拒絕使用；使用者提供的 `rubys/awdwr` repo 經查證為書籍配套的測試自動化工具（Ruby 程式碼，無書籍正文），也不可用。改用官方 Rails Guides（CC BY-SA 4.0）覆蓋核心框架知識，未涵蓋原書的教學式全站導覽（scaffold 流程、視圖層細節等），屬合理替代但非等價內容。

下方書單仍保留：`author-material` 只是替代來源，若之後取得書籍正文（掃描或購買電子書），仍可依原計畫拆書並與現有節點合併，不必重建。

## 原始清單（5 份）

| 清單 | 性質 | 連結 |
|---|---|---|
| awesome-testing | 大型分類收錄清單，含工具、部落格與一份「Books」書單 | https://github.com/TheJambo/awesome-testing |
| FreeLearningResourcesForSoftwareTesters | 自學測試者的免費資源與書單，脈絡偏 context-driven（依情境判斷，不照單全收固定流程） | https://github.com/PaulWaltersDev/FreeLearningResourcesForSoftwareTesters |
| Required Reading For The Absolute Test Beginner（Gist） | 給新手的入門必讀書單，用來建立對職涯與團隊分工的初步認知 | https://gist.github.com/ba2d7b740eed815e9297bf3c28492aec |
| software-testing-books | 純書單，源自 LinkedIn 社團「必讀測試書籍」討論串的整理 | https://github.com/micheletest/software-testing-books |
| Software Test Design（Packt 書籍附屬 repo） | 單一本書《Software Test Design》的勘誤/範例 repo，非清單，本身即候選書 | https://github.com/PacktPublishing/Software-Test-Design |

另加 Google SRE 官方免費書（非上述清單提及，使用者另外指定）：
https://sre.google/books/

---

## 共識最高（4 份清單皆收錄，優先讀／優先拆）

### 《軟體測試中學到的教訓》— *Lessons Learned in Software Testing: A Context-Driven Approach*
- 作者：Cem Kaner, James Bach, Bret Pettichord
- 出處：awesome-testing、software-testing-books、FreeLearningResources、Gist（4/5 清單收錄，awesome-testing 明文標為「史上最好的測試書之一」）
- 簡介（翻譯／改寫）：以短篇「課」為單位，講測試員實際會遇到的判斷情境，非理論教科書。強調 context-driven（依情境判斷），與 QA_AI_BOT 專案 `docs/harness/JUDGMENT.md` 的判斷式思維相近（不同 repo，僅精神類似）。
- 對本專案價值：**建議作為 `kb/qa/` 第一批拆書來源**，內容直接對應「測試思維與判斷」這塊。

### 《Explore It!》— *Explore It!: Reduce Risk and Increase Confidence with Exploratory Testing*
- 作者：Elisabeth Hendrickson
- 出處：awesome-testing、software-testing-books、FreeLearningResources、Gist（4/5 清單收錄）
- 簡介（翻譯／改寫）：探索式測試的操作手冊，教你怎麼一邊測一邊設計下一步測試，而不是先寫好全部案例再執行。
- 對本專案價值：**建議作為 `kb/qa/exploratory-*` 節點的直接來源**，AGENTS.md 已有 Explorer 角色，這本書可以補角色背後的方法論。

---

## 次高共識（2–3 份清單收錄）

### 《完美軟體的幻覺》— *Perfect Software: And Other Illusions about Testing*
- 作者：Gerald M. Weinberg
- 出處：software-testing-books、FreeLearningResources、Gist（3/5）
- 簡介：談「軟體測試不可能證明沒有 bug」這類測試的根本限制與心態校正。

### 《五十個改善測試的點子》— *Fifty Quick Ideas to Improve Your Tests*
- 作者：Gojko Adzic, David Evans, Tom Roden
- 出處：awesome-testing、FreeLearningResources（2/5）
- 簡介：條列式、可直接套用的測試改善技巧，適合當速查卡而非通讀。

### 《Google 如何測試軟體》— *How Google Tests Software*
- 作者：James A. Whittaker, Jason Arbon, Jeff Carollo
- 出處：software-testing-books、FreeLearningResources（2/5）
- 簡介：Google 內部測試組織與流程的第一手紀錄，偏組織與流程設計而非單一技法。

### 《領域測試工作手冊》— *The Domain Testing Workbook*
- 作者：Cem Kaner, Sowmya Padmanabhan, Douglas Hoffman
- 出處：software-testing-books、awesome-testing（2/5）
- 簡介：針對等價劃分與邊界值分析（QA_AI_BOT 專案 `docs/harness/TEST_DESIGN.md §1` 已有精簡版）做完整深入的技法書。

### 《敏捷測試》— *Agile Testing: A Practical Guide for Testers and Agile Teams*
- 作者：Lisa Crispin, Janet Gregory
- 出處：software-testing-books、awesome-testing（2/5）
- 簡介：敏捷團隊中測試員的定位與實作方式，含測試金字塔等概念的實務落地。

### 《快思慢想》— *Thinking, Fast and Slow*
- 作者：Daniel Kahneman
- 出處：software-testing-books、awesome-testing（2/5）
- 簡介：非測試專書，講人類判斷與決策的認知偏誤；兩份清單都推薦是因為測試設計與缺陷猜測（Error Guessing）本質上是在對抗認知偏誤。

### 《美麗的測試》— *Beautiful Testing: Leading Professionals Reveal How They Improve Software*
- 作者：多位業界專家合著
- 出處：software-testing-books、Gist（2/5）
- 簡介：多位測試專家各自分享一種測試觀點的合集，適合當廣度導覽，不是單一方法論教材。

---

## 單一清單收錄（依主題列出，供延伸參考）

**測試設計技法**
- 《軟體測試設計實踐指南》— *A Practitioner's Guide to Software Test Design*，Lee Copeland（software-testing-books）——與 QA_AI_BOT 專案 `docs/harness/TEST_DESIGN.md` 主題高度重疊，可視為該檔案的原始教材。
- 《Software Test Design》，Simon（Packt，本身是清單也是候選書；涵蓋探索式測試、規格撰寫、黑白箱測試、安全性/可用性/可維護性測試、破壞性測試、壓力測試）

**測試思維與品質管理**
- 《別讓我思考》— *Don't Make Me Think: A Common Sense Approach to Web Usability*，Steve Krug（awesome-testing）——可用性測試經典
- 《軟體測試》— *Software Testing*，Ron Patton（software-testing-books）
- 《軟體工程管理原則》— *Principles of Software Engineering Management*，Tom Gilb（software-testing-books）

**混沌工程與韌性測試**
- 《混沌工程》— *Chaos Engineering: Crash test your applications*（awesome-testing）——與 QA_AI_BOT 專案 `docs/harness/TEST_DESIGN.md §5`（失敗型態窮舉）、本 repo `kb/rd/backend/fault-injection-chaos-engineering.md` 主題直接對應

**API／單元測試（技術實作向，非測試思維）**
- 《測試 Web API》— *Testing Web APIs*（awesome-testing）
- 《單元測試的藝術（第三版）》— *The Art of Unit Testing, Third Edition*（awesome-testing）
- 《有效的軟體測試》— *Effective Software Testing*（awesome-testing）
- 《軟體測試技巧：找出真正重要的缺陷》— *Software Testing Techniques: Finding the Defects that Matter*（software-testing-books、FreeLearningResources）

**入門與職涯定位**（Gist 專用，給新手建立框架）
- 《網頁測試之道》— *The Way of the Web Tester*，Jonathan Rasmusson
- 《持續交付》— *Continuous Delivery*，Humble & Farley
- 《測試電腦軟體（第二版）》— *Testing Computer Software*，Kaner, Falk, Nguyen
- 《管理測試人員》— *Managing the Test People*

---

## Google SRE 免費書（官方線上全文，非清單推薦，使用者另外指定）

| 書名 | 簡介（翻譯） | 線上全文 |
|---|---|---|
| *Site Reliability Engineering* | Google SRE 團隊撰寫，說明 SRE 如何參與軟體生命週期各環節，協助大型系統的建置、部署、監控與維運 | https://sre.google/sre-book/table-of-contents/ |
| *The Site Reliability Workbook* | 前書的實踐手冊，收錄 Google 與外部客戶（Evernote、Home Depot、紐約時報等）的具體案例 | https://sre.google/workbook/table-of-contents/ |
| *Building Secure & Reliable Systems* | 談安全性與可靠性如何在大型正式環境系統的設計與維運中互相依存 | https://google.github.io/building-secure-and-reliable-systems/raw/toc.html |

對本專案價值：**已有 `kb/rd/backend/` 多個節點的內容脈絡與此高度重疊**（`sharding-*`、`fault-injection-chaos-engineering`、`slo-sla-tail-latency-amplification` 等），適合日後交叉補強「QA 怎麼驗證 SLO／可靠性設計」這塊，而非重新開一個新主題。

---

## 建議下一步

1. `kb/qa/` 已用 author-material 補上（見上方拆書結果）。**若之後取得《軟體測試中學到的教訓》《Explore It!》書籍正文**，可依同章節主題與現有節點合併改寫、`confidence` 升級為 `book`，不必重建整套。
2. 《軟體測試設計實踐指南》（Lee Copeland）與 QA_AI_BOT 專案既有的 `docs/harness/TEST_DESIGN.md` 主題重疊，也與本 repo 剛拆出的 `qa-test-design` 28 個節點重疊，取得書籍後三方核對再決定是否遷移合併（README 已記待辦，屬跨 repo 搬遷，需另外確認）。
3. 混沌工程與 SRE 三本書與既有 `kb/rd/backend/` 節點重疊，優先順位可排在後面，屬於「加深既有主題」而非「補新主題」。
4. 取得書籍後流程同已完成的 DDIA／Vue／REST／BBST 四批：取得原文（掃描/OCR 或現成 markdown）→ 派 subagent 依 `kb/_TEMPLATE.md` 規範拆章節產節點與考題 → 你校對。目前沒有自動化 `ingest.js`，是每批手動派工，內容量大時才需要考慮寫成腳本。
