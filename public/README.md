# 靜態資源資料夾

此資料夾的所有檔案會以**根路徑**部署（例如 `public/avatar.jpg` → `https://your-site/avatar.jpg`）。

## 頭像照片替換方式

把你的頭像照片重新命名為 **`avatar.jpg`**（或 `avatar.png`、`avatar.webp`）並放到此資料夾即可。

### 規格建議

| 項目 | 建議值 |
|------|--------|
| 尺寸 | 至少 256×256（正方形） |
| 格式 | JPG / PNG / WebP |
| 檔名 | `avatar.jpg`（預設）|
| 大小 | < 200KB |

### 自訂檔名

若想使用不同檔名（例如 `me.png`），請編輯 [src/components/Sidebar.tsx](../src/components/Sidebar.tsx) 找到：

```tsx
const AVATAR_SRC = '/avatar.jpg';
```

改為你的檔名即可。

### 沒放照片時的 fallback

若此資料夾沒有 `avatar.jpg`，網頁會自動顯示**姓名首字母**的圓形頭像（從 resume.md 的姓名解析），不會出錯。
