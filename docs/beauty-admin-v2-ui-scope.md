# Beauty Admin v2 — Frontend UI Scope（僅骨架，不含邏輯）

## 原則（不可違反）
- 僅建立 UI / Layout / Route 殼
- 不寫 API、不假資料、不串後端
- 所有資料以 placeholder / mock label 呈現
- 目標是「畫面可被看到、可被點到」

---

## 一、整體 Layout
- AdminLayout
  - Sidebar（固定寬度）
  - Topbar（頁面標題 / 返回）
  - Main Content（頁面內容）

---

## 二、Sidebar 結構（中英對照）
- 儀表板 Dashboard → `/admin`
- 預約管理 Reservations → `/admin/reservations`
- 客戶 Customers → `/admin/customers`
- 服務項目 Services → `/admin/services`
- 行事曆 Calendar → `/admin/calendar`
- 系統設定 Settings → `/admin/settings`

---

## 三、預約管理頁
### `/admin/reservations`
- 預約列表（Table UI）
  - 預約編號
  - 客戶
  - 服務
  - 日期 / 時段
  - 狀態（badge）

點擊列 → 導向詳細頁

---

## 四、預約詳細頁
### `/admin/reservations/[id]`
- 返回列表連結
- 標題：預約詳細資料
- 卡片式資訊區塊（純顯示）
  - 預約編號
  - 預約狀態（badge）
  - 客戶姓名 / 電話
  - 服務項目
  - 日期 / 時段
  - 來源
  - 備註
  - 建立時間

---

## 五、交付標準
- Next.js App Router 路由存在
- 頁面可正常 render
- 無任何實際資料依賴
