# 💅 Beauty Admin v2 預約狀態變更 UI 規格

**目的：** 提供預約詳細頁中，「狀態變更操作區塊」的標準介面設計，確保操作集中、清晰且符合 B2B 營運效率要求。

---

## 1. 狀態標籤 (Status Badge) 視覺規範

（此用於列表頁及詳細頁概覽區的**顯示**，不含操作）

| 狀態 (Status) | 顏色語義 | 標籤文字 (Text) | 樣式 (Style) |
| :--- | :--- | :--- | :--- |
| **Pending** | 🟠 橘色 (Warning) | **待確認** (Pending) | 圓角矩形，淺橘色背景，深橘色文字。 |
| **Confirmed** | 🟢 綠色 (Success) | **已確認** (Confirmed) | 圓角矩形，淺綠色背景，深綠色文字。 |
| **Cancelled** | 🔴 紅色 (Danger) | **已取消** (Cancelled) | 圓角矩形，淺紅色背景，深紅色文字。 |
| **Waitlist** | 🔵 藍色 (Info) | **候補中** (Waitlist) | 圓角矩形，淺藍色背景，深藍色文字。 |

---

## 2. 預約詳細頁 - 狀態操作區 (Status Action Panel)

**位置：** 預約詳細資訊頁面的**右上角**或**側邊固定欄**。

### 2.1 目前狀態顯示區 (Current Status Display)

* **功能：** 醒目顯示當前預約的最新狀態。

* **設計：** 大型、粗體文字 + 對應大型 Icon，讓狀態一目瞭然。

* **示例：** `目前狀態：🟢 已確認 (Confirmed)`

### 2.2 可執行的狀態按鈕區 (Action Buttons)

* **排版：** 按鈕**垂直堆疊**，佔據區塊寬度 (Full-width)，適合平板觸控。

* **目的：** 執行狀態轉換的核心管理動作。

| 動作 (Action) | 按鈕文字 (Text) | 樣式 (Style) | 說明 (Notes) |
| :--- | :--- | :--- | :--- |
| **轉換** | 確認預約 (Confirm) | **藍色 Primary 按鈕** | 從 Pending 轉換到 Confirmed 的主要入口。 |
| **轉換** | 標示為已完成 (Mark Completed) | **綠色 Primary 按鈕** | 服務結束後的主要動作。 |
| **轉換** | 轉為候補 (To Waitlist) | 灰色 Secondary 按鈕 | 資源排程衝突時的選項。 |

### 2.3 危險操作區 (Dangerous Actions)

* **目的：** 執行高風險、不可逆的動作。

* **區隔：** 必須使用**水平分隔線**與日常操作區隔開。

* **視覺：** 採用**紅色 (Danger) 樣式**（建議 Outline 或 Secondary 紅色）。

* **操作規範：** 點擊後**必須**觸發二次確認的**模態視窗 (Modal)**。

| 動作 (Action) | 按鈕文字 (Text) | 樣式 (Style) | 說明 (Notes) |
| :--- | :--- | :--- | :--- |
| **終止** | 取消預約 (Cancel Reservation) | 紅色 Secondary 按鈕 | 需在 Modal 中要求輸入取消原因。 |
| **銷毀** | 刪除記錄 (Delete Record) | 紅色 Text/Outline 按鈕 | 放置在更隱蔽的位置，屬於非日常操作。 |






