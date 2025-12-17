# Beauty Admin v2 — Status Change UI Scope
（僅前端 UI，不含任何邏輯或 API）

---

## 一、設計原則（鎖定）
- 狀態變更是「管理動作」，不是編輯表單
- 所有操作只存在於「預約詳細頁」
- 列表頁只顯示狀態，不提供任何操作
- 本階段只做 UI 示意，不觸發任何實際行為

---

## 二、狀態定義與 Badge 視覺

### 狀態枚舉（不可新增）
- Pending（待確認）
- Confirmed（已確認）
- Cancelled（已取消）
- Waitlist（候補）

### Badge 視覺規範
- Pending：灰色／中性色（Default）
- Confirmed：綠色（Success）
- Cancelled：紅色（Danger）
- Waitlist：橘色（Warning）

### 使用位置
- 預約列表（Table 欄位）
- 預約詳細頁（標題區）

---

## 三、預約詳細頁 — 狀態操作區 UI

### 位置
- 頁面右側上方（或標題列右側）
- 與「基本資料卡片」視覺分離

### 區塊內容
1. 目前狀態顯示（Badge + 文字）
2. 狀態操作按鈕（僅 UI）
   - 確認預約（Primary）
   - 取消預約（Danger）
   - 設為候補（Secondary）
3. 危險操作視覺提示
   - Cancelled 類操作需使用紅色系
   - 可加上「⚠ 此操作不可逆」的說明文字（靜態）

---

## 四、互動限制（非常重要）
- 所有按鈕不綁定 onClick 行為
- 不出現 modal、不出現 confirm dialog
- 不模擬成功或失敗結果
- 不切換狀態（純畫面）

---

## 五、交付標準
- 預約詳細頁新增一個「狀態操作 UI 區塊」
- UI 與既有 Admin Layout 視覺一致
- 可 render、可點擊（但無行為）
