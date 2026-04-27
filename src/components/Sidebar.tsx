import { useEffect, useState } from 'react';
import type { ResumeMeta } from '../lib/parseResume';

// 把頭像照片放到 public/avatar.jpg 即可自動使用
// 若檔案不存在，會 fallback 顯示姓名首字母的圓圈
const AVATAR_SRC = `${import.meta.env.BASE_URL}avatar.jpg`;

export default function Sidebar({ meta }: { meta: ResumeMeta }) {
  const [mounted, setMounted] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <aside
      className={`sidebar lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-96 bg-gray-50 border-r border-gray-200 px-10 py-16 flex flex-col lg:items-start items-center print:hidden transition-all duration-[1000ms] ease-out ${
        mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
      }`}
    >
      {/* 頭像：優先載入 public/avatar.jpg，失敗時 fallback 顯示姓名首字母 */}
      <div className="w-36 h-44 rounded-md overflow-hidden bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center mb-8 shadow-sm">
        {!avatarFailed ? (
          <img
            src={AVATAR_SRC}
            alt={meta.name}
            className="w-full h-full object-cover"
            onError={() => setAvatarFailed(true)}
          />
        ) : (
          <span className="text-6xl font-serif font-bold text-white">{meta.avatar}</span>
        )}
      </div>

      {/* 姓名 - Libre Baskerville、優雅 serif */}
      <h1 className="font-serif text-5xl font-bold text-ink leading-[1.1] text-center lg:text-left mb-4">
        {meta.name}
      </h1>

      {/* 職位 - Lato、全大寫、字間距 */}
      <p className="text-xs text-muted uppercase tracking-[0.3em] font-medium mb-8 text-center lg:text-left">
        {meta.title}
      </p>

      {/* 分隔線 */}
      <div className="w-16 h-0.5 bg-gray-300 mb-10" />

      {/* 聯絡資訊 */}
      <nav className="space-y-4 text-sm text-muted w-full">
        {/* Email - 純文字，無超連結 */}
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          <span className="break-all">{meta.email}</span>
        </div>

        {/* Phone - icon + 手機號 */}
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
          </svg>
          <span>{meta.phone}</span>
        </div>

      </nav>

      {/* Icon 動作列：GitHub + 下載 PDF */}
      <div className="mt-6 pt-6 border-t border-gray-200 flex items-center gap-4 w-full">
        {/* GitHub - 純 icon 超連結 */}
        <a
          href={meta.github}
          target="_blank"
          rel="noopener"
          aria-label="GitHub"
          title="GitHub"
          className="inline-flex items-center hover:opacity-60 transition-opacity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-ink" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </a>

        {/* 下載 PDF - 隱藏 iframe 列印（about:blank 隱藏 URL + 清空 title，無額外視窗） */}
        <button
          onClick={() => {
            const main = document.querySelector('.resume-main');
            if (!main) return;

            // 複製目前頁面所有 <link> 與 <style>，讓 iframe 套用相同樣式
            const styleTags = Array.from(
              document.querySelectorAll('link[rel="stylesheet"], style')
            )
              .map((el) => el.outerHTML)
              .join('\n');

            // 建立完全隱藏的 iframe
            const iframe = document.createElement('iframe');
            iframe.setAttribute('aria-hidden', 'true');
            Object.assign(iframe.style, {
              position: 'fixed',
              right: '0',
              bottom: '0',
              width: '0',
              height: '0',
              border: '0',
              visibility: 'hidden',
            });
            document.body.appendChild(iframe);

            const doc = iframe.contentDocument;
            if (!doc) return;

            doc.open();
            doc.write(`<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="utf-8" />
<title> </title>
${styleTags}
<style>
  html, body { margin: 0; padding: 0; background: #fff; }
  @page { size: A4; margin: 14mm 12mm; }
</style>
</head>
<body>${main.outerHTML}</body>
</html>`);
            doc.close();

            const cleanup = () => {
              if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
            };

            const doPrint = () => {
              const win = iframe.contentWindow;
              if (!win) return cleanup();
              win.focus();
              win.print();
              win.addEventListener('afterprint', cleanup);
              // fallback：5 秒後若仍未清理則強制移除 iframe
              setTimeout(cleanup, 5000);
            };

            iframe.addEventListener('load', () => {
              const win = iframe.contentWindow;
              if (win?.document.fonts?.ready) {
                win.document.fonts.ready.then(() => setTimeout(doPrint, 150));
              } else {
                setTimeout(doPrint, 500);
              }
            });
          }}
          aria-label="下載 PDF"
          title="下載 PDF"
          className="inline-flex items-center hover:opacity-60 transition-opacity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
        </button>
      </div>
    </aside>
  );
}

