import type { AchievementCard } from '../lib/parseCards';
import AchievementCardPanel from './AchievementCardPanel';
import { getAchievementId } from '../lib/slug';

export default function AchievementCards({ cards }: { cards: AchievementCard[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 max-w-3xl print:gap-3">
      {cards.map((card, idx) => (
        <div key={idx} id={getAchievementId(card.number, card.title)}>
          <AchievementCardPanel card={card} />
        </div>
      ))}
    </div>
  );
}
