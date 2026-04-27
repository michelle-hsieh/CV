import { useEffect, useMemo, useState } from 'react';
import type { AchievementCard } from '../lib/parseCards';
import AchievementCardPanel from './AchievementCardPanel';
import { getAchievementId } from '../lib/slug';

export default function AchievementModal({ cards }: { cards: AchievementCard[] }) {
  const cardMap = useMemo(
    () =>
      new Map(cards.map((card) => [getAchievementId(card.number, card.title), card])),
    [cards]
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const customEvent = event as CustomEvent<{ id?: string }>;
      const nextId = customEvent.detail?.id;
      if (!nextId || !cardMap.has(nextId)) return;
      setActiveId(nextId);
      requestAnimationFrame(() => setIsVisible(true));
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveId(null);
      }
    };

    window.addEventListener('open-achievement', onOpen as EventListener);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('open-achievement', onOpen as EventListener);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [cardMap]);

  useEffect(() => {
    if (!activeId) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeId]);

  useEffect(() => {
    if (!activeId) {
      setIsVisible(false);
    }
  }, [activeId]);

  const closeModal = () => {
    setIsVisible(false);
    window.setTimeout(() => setActiveId(null), 220);
  };

  const card = activeId ? cardMap.get(activeId) : null;
  if (!card) return null;

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center px-4 py-8 print:hidden transition-all duration-200 ${
        isVisible ? 'bg-[rgba(39,38,35,0.34)] backdrop-blur-[2px]' : 'bg-transparent backdrop-blur-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="achievement-modal-title"
      onClick={closeModal}
    >
      {/* 外層：圓角裁切 + 動畫 */}
      <div
        className={`relative max-h-[85vh] w-full max-w-[44rem] overflow-hidden rounded-2xl border border-stone-200 bg-[#f6f3ec] shadow-[0_18px_48px_rgba(35,31,24,0.14)] transition-all duration-300 ${
          isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-[0.985] opacity-0'
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        {/* 內層：可滾動 */}
        <div className="max-h-[85vh] overflow-y-auto">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-200 bg-[#f6f3ec]/95 px-4 py-3 backdrop-blur-sm sm:px-6">
            <div>
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-muted">
                Project Case
              </p>
            </div>
            <button
              type="button"
              onClick={closeModal}
              aria-label="關閉案例視窗"
              className="inline-flex items-center gap-2 rounded-lg border border-transparent px-2 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 transition hover:border-stone-300 hover:bg-stone-100 hover:text-ink"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                className="h-3.5 w-3.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
              <span>Close</span>
            </button>
          </div>

          <div className="px-4 py-4 sm:px-6 sm:py-5">
            <div className="mb-4 border-l-2 border-stone-300 pl-4">
              <h3 id="achievement-modal-title" className="font-serif text-[1.65rem] font-bold text-ink leading-snug">
                {card.number ? `${card.number}. ` : ''}
                {card.title}
              </h3>
            </div>

            <AchievementCardPanel
              card={card}
              showFloatingNumber={false}
              showTitle={false}
              className="border-none bg-transparent p-0 shadow-none hover:border-transparent hover:shadow-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
