---
id: rd/backend/rails/dependent-gotchas
title: :dependent 選項常見陷阱
aliases: [dependent through, orphan record, 孤兒記錄, scoped dependent destroy, 級聯刪除陷阱, 雙向刪除迴圈]
tags: [rails, delete, associations, data-integrity]
topic: rails
confidence: author-material
source_lang: en
updated: 2026-09-15
sources: [Rails Guides: Active Record Associations §8.1.2 :dependent (CC BY-SA 4.0, guides.rubyonrails.org)]
related: [rd/backend/rails/dependent-delete-modes, rd/backend/rails/has-many-through-vs-habtm]
summary: :dependent 搭配 :through、scope、雙向設定時易與直覺不符，會留下孤兒記錄。
---
## 定義
:dependent 搭配 :through 關聯、帶 scope 的 has_many、或雙向刪除設定時，行為容易與直覺不符。

## 原理
:dependent 在 has_many :through 上被忽略，刪除只影響中介 join 記錄。has_many 帶 scope（如只抓 published: true）並設 dependent: :destroy，只刪符合 scope 的子記錄，其餘留下孤兒外鍵。habtm 不支援直接設 :dependent，需改用 :through。belongs_to 與對向 has_many 兩邊都設 dependent: :destroy，易互相刪除成迴圈。

## QA 視角
- 怎麼測：scoped 關聯準備「符合」與「不符合」兩組子記錄，刪除後驗證是否清除；:through 測刪 join 記錄後來源是否還在。
- 常見缺陷：scoped dependent:destroy 誤以為全清，實留孤兒外鍵；habtm 誤期待 :dependent 生效；雙向設 dependent:destroy 造成連鎖刪除。
