import type { TimelineEntry } from '../lib/parseTimeline';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import AchievementLink from './AchievementLink';

interface TimelineProps {
  items: TimelineEntry[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative pl-8 print:pl-6">
      {/* 垂直時間軸線 */}
      <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-300 print:bg-gray-400" />

      <div className="space-y-8 print:space-y-4">
        {items.map((item, idx) => {
          return (
            <div
              key={idx}
              className="relative timeline-item break-inside-avoid page-break-inside-avoid"
            >
              {/* 時間軸圓點 */}
              <div
                className="absolute -left-[26px] top-2 w-4 h-4 rounded-full bg-ink border-4 border-white shadow-md print:shadow-none print:w-3 print:h-3 print:-left-[22px]"
              />

              {/* 內容 */}
              <div className="pb-2">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-muted print:text-[9pt] print:tracking-[0.15em]">
                    {item.period}
                  </span>
                </div>

                {/* 標題 */}
                <h3 className="font-serif text-xl font-bold text-ink mb-1 leading-snug print:text-base">
                  {item.title}
                </h3>

                {/* 副標題 */}
                {item.subtitle && (
                  <p className="font-serif text-sm italic text-muted mb-3 print:text-[9pt]">
                    {item.subtitle}
                  </p>
                )}

                {/* 描述 */}
                {item.description && item.description.length > 0 && (
                  <ul className="list-disc list-outside ml-5 mt-2 space-y-1.5 text-gray-800 text-sm print:text-[9.5pt] print:space-y-0.5">
                    {item.description.map((desc, i) => (
                      <li key={i} className="leading-relaxed">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => <>{children}</>,
                            a: ({ href, children }) => {
                              const isAchievementLink = href?.startsWith('#achievement-');
                              const isHashLink = href?.startsWith('#');
                              if (isAchievementLink) {
                                return <AchievementLink href={href}>{children}</AchievementLink>;
                              }
                              return (
                                <a
                                  href={href}
                                  target={isHashLink ? undefined : '_blank'}
                                  rel={isHashLink ? undefined : 'noopener'}
                                  className="text-ink underline decoration-gray-300 underline-offset-4 hover:decoration-ink transition print:no-underline"
                                >
                                  {children}
                                </a>
                              );
                            },
                            code: ({ children }) => (
                              <code className="px-1.5 py-0.5 bg-gray-50 border border-gray-200 rounded text-[13px] font-mono text-gray-700">
                                {children}
                              </code>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-sans font-bold text-ink">{children}</strong>
                            ),
                          }}
                        >
                          {desc}
                        </ReactMarkdown>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
