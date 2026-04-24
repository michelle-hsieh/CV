import { useEffect, useState } from 'react';
import type { ResumeMeta } from '../lib/parseResume';

export default function Sidebar({ meta }: { meta: ResumeMeta }) {
  const [mounted, setMounted] = useState(false);

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
      {/* 頭像 */}
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-6xl font-serif font-bold text-white mb-8 shadow-sm">
        {meta.avatar}
      </div>

      {/* 姓名 - 大字體、serif 字族 */}
      <h1 className="font-serif text-5xl font-bold text-ink leading-tight text-center lg:text-left mb-3">
        {meta.name.split(' ')[0]}
        <br />
        {meta.name.split(' ')[1]}
      </h1>

      {/* 職位 - 灰色、小一些 */}
      <p className="text-lg text-muted tracking-wide mb-8 text-center lg:text-left">
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
          <span className="break-all text-xs">{meta.email}</span>
        </div>

        {/* Location - icon + 地址 */}
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <span>{meta.location}</span>
        </div>

        {/* GitHub - icon 超連結 */}
        <div className="pt-4">
          <a
            href={meta.github}
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-ink text-white hover:bg-gray-700 transition-all hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </div>
      </nav>
    </aside>
  );
}

