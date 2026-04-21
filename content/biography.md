# 結構化自傳

## 問題處理方式

擅長處理 legacy 環境相容性、CI/CD 自動化重構與根因分析。

我的工作重心一直是：從複雜問題找到根因，再判斷要修補還是改架構。

例如在 AutoOpTune 視圖開發中，產品規格同時需要支援 CentOS 7.4 與 Ubuntu 20.04，但 JCEF 官方未提供能同時相容兩者的 binary——CentOS 7.4 的 GLIBC 2.17 過舊，直接降版本又會破壞 Ubuntu 20.04 的支援。最後透過 Docker 環境重建與手動編譯 JCEF（基於 CEF 126） binary，才讓功能得以在兩個環境內同時上線。

在 GUI 自動化測試頻繁失敗時，我從 `component not found` 追到根因是 Daemon 模式下 RMI 延遲與 Swing render 的 timing mismatch，確認後改的是架構，而非修改腳本。

## 技術選型原則

偏好可擴充、可驗證的設計。以 Multi-Project debugging 架構為例，我不是只補一個能動的功能，而是把原本難以承載複雜 SoC 的 chip profile 模型，抽象成 `TAP > target > core` 的分層描述，讓系統更能延展到多核心除錯情境。

做 MMU 與 Vector Register 視圖時，我會同時思考資料來源、非同步查詢成本、UI 呈現負擔與後續維護性，而不只看畫面是否顯示正確。這類設計的目的，最後都是讓工具能承接更複雜的 SoC 需求，而不是每次都重做核心架構。

## 工具化思維

**把重複性的人工轉換工作變成可執行的工具**，是貫穿工作的工程直覺。

在工作上，我把 AndeStar V5 System Privileged Architecture and CSR Specification (SPA) 規格文件中定義的數百個暫存器與 bitfield，轉成 JSON 描述檔、GDB XML 暫存器描述與 C 語言標頭檔，將 5 天的手工作業縮短至腳本執行數分鐘。

這套「從文件提取結構、產出機器可用格式」的思維，也延伸到 Travel Dashboard：我用 `pdfjs-dist`、`jszip` 解析 PDF 與 Office 文件底層內容，將非結構化旅遊資料自動轉成結構化 JSON 匯入系統。兩件事的本質相同，都是把「人看得懂但機器不懂」的資訊，變成程式可直接處理的結構。

## AI 協作方式

近期把 AI 納入開發體系，用來協助需求拆解、框架探索、log 歸納與重構草案。在 Travel Dashboard 中，我進一步把多模型 API 與 Function Calling 整合成可執行的 AI Agent 工作流。對我來說，AI 的價值是把時間留給架構決策與根因分析，而不是取代工程判斷。

## 未來方向

希望加入重視技術深度與交付效率的團隊，做出更高槓桿的工程輸出。
比較希望投入工具開發、平台、嵌入式除錯或自動化相關工作，持續處理複雜系統中的高難度問題。
