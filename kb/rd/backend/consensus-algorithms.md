---
id: rd/backend/consensus-algorithms
title: 共識演算法與領導者選舉（Consensus & Leader Election）
aliases: [共識, consensus, Raft, Paxos, 領導者選舉, leader election, 腦裂, split brain]
tags: [distributed-systems, consensus, leader-election]
topic: dist
confidence: book
updated: 2026-09-15
sources: [DDIA ch10 §共識]
related: [rd/backend/linearizability, rd/backend/two-phase-commit, rd/backend/fencing-token, rd/backend/majority-quorum-and-byzantine, rd/backend/coordination-service-misuse]
summary: 共識演算法本質是「自動故障轉移且不會腦裂的單主複製」，靠多數決避免兩個節點同時自認為是領導者
---
## 定義
共識是讓多個節點對某個決定（誰是領導者、下一筆日誌內容、事務要不要提交）達成一致、且事後不能反悔的問題。Raft、Paxos、Zab、Viewstamped Replication 等主流共識演算法本質上都是「帶自動領導者選舉與故障轉移的單主複製」：每輪選舉產生一個遞增的紀元/任期編號，同一紀元內只會有一個合法領導者，紀元編號較高者說了算，藉此避免腦裂。

## 原理
共識演算法需要多數節點（法定人數）正常運作才能持續運作——容忍一個節點故障至少要三個節點、容忍兩個故障至少要五個；每次操作都要跟法定人數的節點溝通，因此節點越多不代表吞吐量越高，反而可能因協調開銷變慢。共識演算法的安全性（不會有兩個衝突的決定）在任何情況下都必須成立，但「活性」（最終一定會有回應）只在多數節點存活、網路最終恢復的前提下保證。網路品質很差時（例如某條特定鏈路持續不穩定），部分共識演算法（含 Raft）已知會出現領導權在節點間不斷跳動、系統遲遲無法真正做事的邊界情況（協調服務如 ZooKeeper/etcd 的使用邊界見 `coordination-service-misuse`）。

## QA 視角
- 怎麼測：對採用共識/協調服務的系統做「切斷少數節點」（應仍可用）與「切斷多數節點或製造網路分區讓多數派分裂」（應變得不可用而非各自為政）兩種測試，確認系統邊界行為正確；針對領導者選舉，測試「舊領導者網路暫時中斷後恢復」是否會與新領導者衝突，或被正確識別為過期紀元而拒絕其寫入。
- 常見缺陷：只測過「單一節點故障」場景，從未驗證「多數節點同時不可達」時系統是否正確變為不可用（而非錯誤地選出兩個領導者）；共識叢集節點數設定錯誤（如偶數節點、或只有兩個節點卻期待能容錯一台），導致實際容錯能力與預期不符。
