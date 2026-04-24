import type { SkillCard } from '../lib/parseCards';

export default function SkillsGrid({ cards }: { cards: SkillCard[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 print:grid-cols-2 print:gap-3">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="group relative bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-ink transition-all duration-300 hover:-translate-y-0.5 break-inside-avoid page-break-inside-avoid print:shadow-none print:p-3 print:rounded"
        >
          {/* 左上裝飾線 */}
          <div className="absolute top-0 left-0 w-10 h-0.5 bg-ink print:hidden" />

          {/* 類別標題 - Lato 全大寫 */}
          <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-muted mb-3 print:text-[9pt] print:tracking-[0.15em] print:mb-2">
            {card.category}
          </h3>

          {/* 技能標籤 */}
          <div className="flex flex-wrap gap-2 print:gap-1">
            {card.items.map((item, i) => (
              <span
                key={i}
                className="inline-block px-3 py-1 bg-white border border-gray-200 rounded-full text-[13px] font-sans text-ink hover:bg-ink hover:text-white transition-colors print:bg-transparent print:border-gray-400 print:px-2 print:py-0 print:text-[9pt] print:rounded"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
