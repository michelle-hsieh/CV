# 謝秀玟 — Software Engineer

## Contact

- **Email：** michelleok168@gmail.com
- **GitHub：** https://github.com/michelle-hsieh
- **Phone：** 0917-618-960

---

## Summary

軟體工程師，具備工具平台開發、視覺化應用、全端系統與 CI/CD 自動化的實戰經驗，累積近 3 年產品交付，代表成果包含 CI/CD 自動化重構與規格解析工具開發（5 天 → 數分鐘）。
擅長 legacy 環境根因分析與系統重構，能將不穩定問題轉為可維護、可自動化的工程解法。
近期也以 AI Agent 工作流與 Function Calling 為工具，整合多模型 API、文件解析與座標自動補齊，應用於全端 PWA 開發。

---

## Experience

**晶心科技股份有限公司｜高級工程師｜2023.10 – 2026.05**
- 負責嵌入式開發環境的開發工具界面與視圖、工具平台功能開發，包括效能分析、暫存器視覺化與多核心除錯。
- 重構 GUI 自動化測試流程，解決 flaky test 與 pipeline 阻塞問題（[Key Achievements #1](#achievement-1)）
- 開發 SPA 規格解析工具，將手工作業由 5 天縮短至數分鐘（[Key Achievements #3](#achievement-3)）
- 完成 AutoOpTune Web View 與舊環境相容性處理，並推進 Multi-Project / Multi-core Debug 與視圖重構（[Key Achievements #2](#achievement-2)、[#5](#achievement-5)、[#6](#achievement-6)）

**新光人壽保險股份有限公司｜實習生（資訊專業人員）｜2021.02 – 2021.06**
- 開發企業內部需求連署平台，協助集中彙整員工需求並提升需求管理效率。
- 使用 Oracle 資料庫、Java Spring Boot 後端、Git 與 TFS 進行開發與版本控制。

**Personal Travel Dashboard｜個人 Side Project｜2026.03 – Present**
- **Project Link：** [Personal Travel Dashboard | 個人旅遊儀表板](https://michelle-hsieh.github.io/travel-dashboard/)
- 負責 Offline-first PWA 全端開發、AI Agent 工作流設計、多模型 API 整合與文件解析（[Key Achievements #4](#achievement-4)）

---

## Skills

- `Languages`: Java, JavaScript/TypeScript, Python
- `Frameworks & Libraries`: React, Vite, Eclipse RCP / CDT / DSF, JCEF, Firebase
- `Infrastructure & Tools`: Docker, Jenkins, Git, Linux, GDB, QF-Test
- `AI Integration`: AI models, Function Calling, Prompt Engineering, AI Agent Workflow

---

## Education
- **國立臺灣科技大學** ｜ 資訊管理所 ｜ 2021 - 2023
- **私立輔仁大學** ｜ 資訊管理學系 ｜ 2017 - 2021

---

## Key Achievements

### 1. QF-Test GUI 自動化測試架構重構與 CI/CD 整合
- **Situation：** 團隊 GUI 自動化測試頻繁出現 `component not found`，造成頻繁人工重跑。
- **Task：** 找出不穩定根因，重建一套可在 Jenkins 內穩定執行的 GUI 自動化測試流程。
- **Action：**
  - **根因分析：** 透過 runlog、錯誤訊息與執行時序比對，確認問題來自 Daemon 模式下的跨程序通訊延遲，與 Java Swing/AWT 渲染時序產生不同步。
  - **架構調整：** 將自動化測試改為 Jenkins Agent 本地執行，降低跨程序與跨主機延遲。
- **Result：** `component not found` 錯誤從頻繁出現降至基本零，消除了人工重跑成本。

### 2. Andes AutoOpTune 視圖開發與 JCEF 舊環境相容性攻克
- **Situation：** 開發 Andes AutoOpTune 視圖，以 Web View（JCEF）呈現自動調優分析結果；但產品官方宣稱支援已停止維護（End-of-Life，EOL）的 CentOS 7.4，該環境無現成 JCEF binary 且 GLIBC 版本過舊（2.17），導致新功能無法在承諾的相容性範圍內啟動。
- **Task：** 在不放棄 Web View 架構的前提下，讓 JCEF 瀏覽器核心能在 CentOS 7.4 環境穩定運作，確保 AutoOpTune 視圖符合產品的相容性承諾。
- **Action：**
  - **環境重建：** 建立 Docker 編譯環境，重現產品官方支援的 CentOS 7.4 EOL 環境，處理套件源下線與編譯工具鏈版本相容性問題。
  - **相依件排查與手動編譯：** 在缺少現成二進位套件的條件下，手動編譯 JCEF 126 與相依元件並完成部署驗證。
  - **架構保留：** 相容性修復後維持 Web View 設計，保留 AutoOpTune 視圖後續移植彈性。
- **Result：** 讓 AutoOpTune 視圖得以在 **CentOS 7.4** 環境如期上線，確保產品兌現對舊環境的相容性承諾。

### 3. SPA 規格文件自動轉換 CPU Register 描述工具
- **Situation：** 工具需要為數百個 CSR（Control and Status Registers）提供 JSON 格式描述檔才能正確顯示 bitfield 數值與名稱；但 CSR 定義散落於公司官方所釋出的規格文件中，人工逐一轉換既耗時且容易出錯。
- **Task：** 開發自動化轉換工具，將 SPA 規格文件中的 CSR 描述解析並輸出為 JSON 描述檔、GDB target description 檔與 C 語言標頭檔。
- **Action：**
  - **文件解析：** 分析 SPA 規格文件結構，設計解析邏輯以提取暫存器名稱、位址、bitfield 定義與說明文字。
  - **跨團隊協作：** 與 Architecture Team 確認規格歧義，並將回饋納入轉換邏輯。
- **Result：** 將原本需要 **5 天**的手工作業縮短至腳本執行數分鐘；後續版本更新可直接重新執行腳本快速產出，顯著降低版本維護成本。

### 4. 個人 Side Project：Travel Dashboard（Offline-first + AI Agent）
- **Situation：** 旅遊規劃同時包含匯入 PDF、Excel 等格式之行程資訊與多人協作需求，傳統表單人工輸入耗時且容易遺漏資料。
- **Task：** 打造一套可離線操作、可即時同步、可由 AI 直接協助建檔與操作的旅遊管理系統。
- **Action：**
  - **前端架構與雙向同步：** 以 React + Vite 建立 PWA，並實作 Firestore 以支援離線操作與連線後自動同步。
  - **AI Agent 與 Function Calling：** 整合不同 AI 模型服務，開發相關工具鏈以支援自動操作頁面、建立行程與批次補齊座標。
- **Result：** 完成支援 **3 種模型供應商**、**6 類工具呼叫** 的 AI-Ready PWA；顯著降低人工整理行程與重複輸入成本，並提供可在離線情境下持續操作的使用體驗。

### 5. Eclipse CDT Multi-Project / Multi-core Debug 架構
- **Situation：** 傳統 chip profile 難以描述複雜 SoC 與 multi-core debugging 情境，限制開發工具在高階嵌入式除錯場景中的適用性。
- **Task：** 建立可管理多子專案、可對應 SoC 拓樸、可支援 multi-core debug 的新專案模型。
- **Action：**
  - **專案模型重構：** 設計父專案管理子專案的 Multi-Project 架構，支援新增、匯入、連結子專案與統一建置。
  - **除錯模型升級：** 將固定 chip profile 重構為使用者可定義的 `TAP > target > core` 分層模型，提升複雜 SoC 場景的表達能力。
- **Result：** 讓 AndeSight IDE 在不修改除錯核心架構的前提下，支援更複雜的多核 SoC 拓樸與除錯配置。

### 6. Vector Register / MMU 視圖重構
- **Situation：** 傳統暫存器視圖不適合呈現 vector register 陣列資料；MMU 功能受限於 UI 框架耦合與硬編碼邏輯，難以擴充。
- **Action：** 依資料型別重設計 vector register 視圖；將 MMU 配置外部化為 JSON，並以 Web View 重構呈現層，解除 UI 框架緊耦合。
- **Result：** 視圖可讀性與易維護性提升；外部化配置後具備移植至其他開發環境的彈性。
