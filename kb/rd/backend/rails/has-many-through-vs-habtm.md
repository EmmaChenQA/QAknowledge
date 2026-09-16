---
id: rd/backend/rails/has-many-through-vs-habtm
title: 多對多關聯的兩種寫法（has_many :through vs habtm）
aliases: [habtm, join table, 中介表, join model, 多對多關聯, 聯合表格]
tags: [rails, associations, data-integrity]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Active Record Associations §2.4/§2.6/§3.2 (CC BY-SA 4.0, guides.rubyonrails.org)]
related: [rd/backend/rails/dependent-gotchas, rd/backend/relational-vs-document-model]
summary: habtm 的 join 表只是無主鍵資料表，has_many :through 才有可稽核、可驗證的 join model。
---
## 定義
兩者都表達多對多關係，差別在中介的 join 資料是否被視為獨立模型。

## 原理
habtm 直接建立關聯，中介只是無主鍵、僅兩外鍵的資料表；若額外加欄位，透過關聯讀到的記錄視為唯讀，Rails 無法儲存變更，官方已標不建議。has_many :through 透過真正的 join model 連接，可有主鍵、驗證、callback 與額外屬性，也才支援 :dependent 管理刪除。has_many :through 賦值集合時，Rails 自動新增/刪除對應 join 記錄，但這是直接操作資料庫，不觸發 destroy callback。

## QA 視角
- 怎麼測：habtm 的 join 表加額外欄位後存值，驗證是否唯讀；:through 批次賦值集合後，驗證 join model 的 destroy callback 是否真沒被觸發。
- 常見缺陷：habtm 的 join 表被誤加業務欄位卻期待可寫入；has_many :through 批次賦值直接刪 join 記錄，遺漏 callback 清理；同一多對多關係混用兩型態，定義不一致。
