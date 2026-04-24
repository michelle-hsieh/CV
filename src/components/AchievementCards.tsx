import type { AchievementCard } from '../lib/parseCards';

// 把 `code` 與 **bold** inline markdown 轉為 span
function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('`')) {
      parts.push(
        <code
          key={key++}
          className="px-1.5 py-0.5 bg-gray-100 rounded text-[12.5px] font-mono text-ink"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else {
      parts.push(
        <strong key={key++} className="font-sans font-bold text-ink">
          {token.slice(2, -2)}
        </strong>
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

// 將某個 label 對應到顏色（Situation/Task/Action/Result 各有色調）
function labelColor(label: string): string {
  const l = label.toLowerCase();
  if (l.includes('situation')) return 'bg-amber-100 text-amber-900 border-amber-200';
  if (l.includes('task')) return 'bg-blue-100 text-blue-900 border-blue-200';
  if (l.includes('action')) return 'bg-purple-100 text-purple-900 border-purple-200';
  if (l.includes('result')) return 'bg-emerald-100 text-emerald-900 border-emerald-200';
  return 'bg-gray-100 text-gray-900 border-gray-200';
}

// 排序：Result 置頂（先結果），再 Situation → Task → Action → 其他
function rankLabel(label?: string): number {
  const l = (label ?? '').toLowerCase();
  if (l.includes('result')) return 0;
  if (l.includes('situation')) return 1;
  if (l.includes('task')) return 2;
  if (l.includes('action')) return 3;
  return 4;
}

export default function AchievementCards({ cards }: { cards: AchievementCard[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 max-w-3xl print:gap-3">
      {cards.map((card, idx) => {
        const sorted = [...card.bullets].sort((a, b) => rankLabel(a.label) - rankLabel(b.label));
        return (
        <article
          key={idx}
          className="group relative bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-ink transition-all duration-300 break-inside-avoid page-break-inside-avoid print:shadow-none print:border-gray-300 print:p-3 print:rounded"
        >
          {/* 頂部編號圓形 */}
          {card.number && (
            <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center font-serif text-sm font-bold shadow-md print:hidden">
              {card.number}
            </div>
          )}

          {/* 卡片標題 */}
          <h3 className="font-serif text-xl font-bold text-ink leading-snug mb-5 pt-2 pr-4 print:text-base print:mb-2 print:pt-0">
            {card.number && (
              <span className="print:inline hidden mr-2 text-muted">{card.number}.</span>
            )}
            {card.title}
          </h3>

          {/* 內容條目 */}
          <div className="space-y-3 print:space-y-1.5">
            {sorted.map((b, i) => (
              <div key={i} className="text-[14px] leading-[1.75] print:text-[9.5pt] print:leading-normal">
                {b.label && (
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider border mr-2 mb-1 ${labelColor(
                      b.label
                    )} print:text-[8pt] print:px-1.5 print:py-0`}
                  >
                    {b.label}
                  </span>
                )}
                <span className="text-gray-700">{renderInline(b.content)}</span>

                {b.sub && b.sub.length > 0 && (
                  <ul className="mt-2 ml-2 space-y-1 list-none print:mt-1 print:space-y-0.5">
                    {b.sub.map((s, j) => (
                      <li key={j} className="flex gap-2 text-[13px] text-gray-700 print:text-[9pt]">
                        <span className="text-gray-400 mt-1">›</span>
                        <span>
                          {s.label && (
                            <strong className="font-bold text-ink">{s.label}：</strong>
                          )}
                          {renderInline(s.content)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </article>
        );
      })}
    </div>
  );
}
