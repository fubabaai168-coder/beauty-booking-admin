# Beauty Admin v2 — Status API Implementation Plan (v1)
（後端實作計畫，不含程式碼）

---

## 目的
在已鎖定 Frontend ↔ Backend Contract v1 的前提下，
定義「狀態變更 API」的**唯一正確實作順序**，
確保穩定、可回滾、可擴充。

---

## 一、API 行為定義（僅 1 個）

### 行為名稱
Change Reservation Status

### 使用情境
- 管理者在 Admin 預約詳細頁變更狀態

> 本階段 **只允許一筆一筆變更**

---

## 二、後端處理順序（不可調換）

### Step 1：輸入驗證（Input Validation）
- reservation_id 是否存在
- target_status 是否屬於 enum
- 缺一即拒絕

---

### Step 2：讀取現有狀態（Source of Truth）
- 從 Database 讀取目前 reservation.status
- DB 為唯一權威來源

---

### Step 3：狀態轉換合法性判斷
- 判斷「現在狀態 → 目標狀態」是否允許
- 所有規則集中於一處（未來可抽成 policy）

> ⚠️ 前端 **不得** 參與此判斷

---

### Step 4：寫入狀態
- 僅更新 status
- 更新 updated_at
- 不觸發其他副作用（例如通知、日曆）

---

### Step 5：回傳結果
- 回傳 reservation_id
- 回傳最新 status
- 回傳 updated_at

---

## 三、錯誤處理原則（簡化版）

- 任一階段失敗：
  - 不寫入 DB
  - 回傳 error_code + message
- 不做 retry
- 不做 partial success

---

## 四、交易（Transaction）原則

- 單筆操作必須包在 transaction 內
- 成功才 commit
- 失敗必須 rollback

---

## 五、擴充預留（本版不實作）

🚫 本版禁止
- Google Calendar 同步
- 發送通知（LINE / Email）
- Audit log
- Staff / Operator 紀錄
- Branch / 多店邏輯

> 以上全部留待 v2+，避免 MVP 失控

---

## 六、實作風險檢查清單（必過）

- [ ] Enum 與前端完全一致
- [ ] DB 是唯一真相來源
- [ ] 沒有隱性狀態變更
- [ ] 無背景任務、副作用
- [ ] 可安全回滾

---

## 七、CTO 最終裁定
- 本計畫為 **後端唯一實作依據**
- 若需求超出本文件範圍 → 必須升版（v2）
