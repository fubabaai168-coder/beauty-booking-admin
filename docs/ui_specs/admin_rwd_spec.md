# 💻 Beauty Admin v2 系統框架 RWD 規範

**目的：** 確保 Admin 系統在不同終端設備（桌機、平板、手機）上提供一致且高效的營運體驗，特別優化平板觸控操作。

---

## 1. 核心斷點定義 (Core Breakpoints)

我們將採用三段式斷點規劃：

| 斷點名稱 | 寬度 (px) | 終端設備 (Focus) | 核心行為 (Key Behavior) |
| :--- | :--- | :--- | :--- |
| **Desktop** | **≥ 1280px** | 桌上型電腦 | 完整三欄版型 (Sidebar + Main + Optional Right Panel)。 |
| **Tablet** | **768px – 1279px** | 平板 (橫向/直向) | **重點優化區**。保持 Sidebar 可收合，確保 Main 內容區寬度適宜。 |
| **Mobile** | **< 768px** | 手機/小型平板 | **強制單欄**。Sidebar 完全收合，Topbar 優先顯示。 |

---

## 2. 框架元件 RWD 行為 (Component Behavior)

### 2.1 Sidebar (左側導航欄)

| 斷點 | 狀態 | 行為規範 (Implementation Rule) |
| :--- | :--- | :--- |
| **Desktop / Tablet** | 展開/收合 (Toggle) | **預設展開**。提供按鈕允許使用者手動收合 Sidebar，以擴大 Main Content 區域。收合後僅顯示 Icon。 |
| **Mobile (< 768px)** | **強制收合 (Collapsed)** | Sidebar 預設隱藏。需在 **Topbar 左側**顯示**漢堡選單 Icon** (Hamburger Menu)，點擊後 Sidebar 從畫面左側以 Overlay 方式滑入，覆蓋主內容區。 |

### 2.2 Topbar (頂部欄)

| 斷點 | 狀態 | 行為規範 (Implementation Rule) |
| :--- | :--- | :--- |
| **Desktop / Tablet** | 完整顯示 | 顯示系統名稱/Logo、Sidebar 切換按鈕、全域搜尋、通知 Icon、使用者頭像/名稱。 |
| **Mobile (< 768px)** | **精簡優先** | **左側：** 漢堡選單 Icon (用於展開 Sidebar)。**中間：** 專案名稱或 Logo。**右側：** 精簡化 Icon (只保留通知 Icon 和使用者頭像)。其他元素需隱藏或移至 Sidebar 內。 |

### 2.3 Main Content (主內容區)

| 斷點 | 狀態 | 行為規範 (Implementation Rule) |
| :--- | :--- | :--- |
| **Desktop / Tablet** | 流動寬度 | 根據 Sidebar 的展開/收合狀態調整 Main Content 寬度。內容區塊保持標準網格佈局。 |
| **Mobile (< 768px)** | **單欄優化** | 內容區塊自動轉為**單欄垂直堆疊**。所有表格 (Tables) 必須轉換為**卡片列表 (Card List View)** 或實作**水平滑動 (Horizontal Scroll)**，確保內容不溢出手機螢幕。 |






