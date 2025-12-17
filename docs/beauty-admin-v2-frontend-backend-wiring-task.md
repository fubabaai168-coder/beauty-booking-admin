# 任務：Beauty Admin v2 — 前後端接線（狀態變更）

角色定位：
你是前端工程師，負責把「既有狀態 UI」接到「已完成的狀態 API」。
不得修改後端、不新增功能。

## 依據文件（必讀）
1. docs/beauty-admin-v2-backend-contract-v1.md
2. docs/beauty-admin-v2-status-api-implementation-plan-v1.md

---

## 任務範圍（只做這些）
- 在「預約詳細頁」的狀態操作 UI 上：
  - 綁定 API 呼叫
  - 傳送 reservation_id + target_status
- 成功時：
  - 重新取得該筆預約資料或更新畫面狀態顯示
- 失敗時：
  - 顯示後端回傳的 message（最簡單方式即可）

---

## 嚴格限制（違反即失敗）
- 不得新增狀態
- 不得做 optimistic update
- 不得假設成功
- 不得改 UI 結構
- 不得處理 batch
- 不得新增 loading flow（最簡單即可）

---

## 驗收條件
- 點擊「確認 / 取消 / 候補」會實際呼叫 API
- 狀態變更後，畫面顯示與後端一致
- 非法轉換會顯示錯誤訊息
- 其餘行為不變

---

## 回報格式（精簡）
1. 修改了哪些前端檔案
2. API 呼叫位置
3. 成功 / 失敗各一個測試結果
