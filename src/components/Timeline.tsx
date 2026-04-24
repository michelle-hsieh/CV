interface TimelineItem {
  title: string;
  subtitle?: string;
  period: string;
  description?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative pl-8 print:pl-6">
      {/* 垂直時間軸線 */}
      <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-300 print:bg-gray-400" />

      <div className="space-y-8 print:space-y-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="relative timeline-item break-inside-avoid page-break-inside-avoid"
          >
            {/* 時間軸圓點 */}
            <div className="absolute -left-[26px] top-2 w-4 h-4 rounded-full bg-ink border-4 border-white shadow-md print:shadow-none print:w-3 print:h-3 print:-left-[22px]" />

            {/* 內容卡片 */}
            <div className="pb-2">
              {/* 時間 - Lato 全大寫、字間距 */}
              <div className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-muted mb-2 print:text-[9pt] print:tracking-[0.15em]">
                {item.period}
              </div>

              {/* 標題 - Libre Baskerville 優雅 serif */}
              <h3 className="font-serif text-xl font-bold text-ink mb-1 leading-snug print:text-base">
                {item.title}
              </h3>

              {/* 副標題 - italic serif，Wix 經典風格 */}
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
                      {desc}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
