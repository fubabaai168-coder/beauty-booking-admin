# Beauty Admin v2 — Frontend ↔ Backend Contract (v1)

目的：
在不實作任何 API、不修改 DB 的前提下，
先鎖定前後端「對接邊界與資料契約」，避免未來重工。

本文件為 **契約文件（Contract）**，非實作文件。

---

## 一、核心原則（鎖定）
- Frontend UI 已完成，不得為了後端改 UI
- Backend 可自由選擇實作方式，但 **不得違反此契約**
- 本版本只處理「單一預約的狀態管理」
- 不涉及多店（Branch）、權限、審計紀錄

---

## 二、Reservation 狀態定義（Enum）

> 前後端必須完全一致（大小寫、拼字）

```ts
ReservationStatus =
  | "PENDING"     // 待確認
  | "CONFIRMED"   // 已確認
  | "CANCELLED"   // 已取消
  | "WAITLIST"    // 候補
```

**說明：**
- 前端僅顯示與送出，不做狀態合法性判斷
- 狀態轉換規則由後端負責

---

## 三、前端 → 後端（預期 Payload 結構）

**使用情境：**
- 管理者在「預約詳細頁」執行狀態變更動作

**Payload（欄位名鎖定）：**
```json
{
  "reservation_id": "string",
  "target_status": "PENDING | CONFIRMED | CANCELLED | WAITLIST"
}
```

**備註：**
- 不包含使用者資訊
- 不包含時間、備註、原因
- 不處理 batch（一次一筆）

---

## 四、後端 → 前端（回傳結構）

**成功時（結構鎖定）：**
```json
{
  "reservation_id": "string",
  "status": "PENDING | CONFIRMED | CANCELLED | WAITLIST",
  "updated_at": "ISO-8601 datetime"
}
```

**失敗時（僅結構，錯誤碼自由）：**
```json
{
  "error_code": "string",
  "message": "string"
}
```

**前端責任：**
- 顯示錯誤文字
- 不推測原因
- 不重試、不 rollback

---

## 五、責任切分（非常重要）

**前端負責：**
- UI 呈現
- 發送狀態變更請求
- 顯示結果

**後端負責：**
- 狀態是否合法
- 是否允許轉換
- 資料一致性
- 實際寫入 DB

---

## 六、本階段「禁止事項」

**🚫 前端禁止：**
- 自行判斷哪些狀態可以轉換
- 假設成功流程
- 實作 optimistic update

**🚫 後端禁止：**
- 回傳 UI 不需要的欄位
- 自動改變前端未請求的狀態
- 引入 branch / staff / audit 欄位

---

## 七、版本說明

**v1：** 單一預約 × 狀態管理

**未來 v2 才會加入：**
- 多店（Branch）
- 操作者（Staff）
- 操作紀錄（Audit Log）