export interface SkillCard {
  category: string;
  items: string[];
}

export interface AchievementCard {
  number?: string;
  title: string;
  bullets: AchievementBlock[];
}

export interface AchievementBlock {
  label?: string;
  content: string;
  sub?: { label: string; content: string }[];
}

/**
 * 解析 Skills 區塊：
 * - `Languages`: Java, JavaScript, ...
 * 或
 * - **Languages**: Java, JavaScript, ...
 */
export function parseSkills(body: string): SkillCard[] {
  const cards: SkillCard[] = [];
  const lines = body.split('\n').map((l) => l.trim()).filter((l) => l.startsWith('-'));

  for (const line of lines) {
    const cleaned = line.replace(/^-\s*/, '');
    // 匹配 `Category`: items 或 **Category**: items
    const m = cleaned.match(/^[`*]+([^`*]+)[`*]+\s*[:：]\s*(.+)$/);
    if (!m) continue;

    const category = m[1].trim();
    const items = m[2].split(/[,，]/).map((s) => s.trim()).filter(Boolean);
    cards.push({ category, items });
  }

  return cards;
}

/**
 * 解析 Key Achievements：
 * ### 1. 標題
 * - **Situation：** 內容
 * - **Action：**
 *   - **子項：** 內容
 * - **Result：** 內容
 */
export function parseAchievements(body: string): AchievementCard[] {
  const cards: AchievementCard[] = [];
  // 依 ### 切分
  const parts = body.split(/^###\s+/m).filter(Boolean);

  for (const part of parts) {
    const lines = part.split('\n');
    const titleLine = lines[0].trim();

    // 嘗試拆出編號 "1. 標題"
    const numMatch = titleLine.match(/^(\d+)\.\s*(.+)$/);
    const number = numMatch ? numMatch[1] : undefined;
    const title = numMatch ? numMatch[2].trim() : titleLine;

    const bullets: AchievementBlock[] = [];
    let currentBlock: AchievementBlock | null = null;

    for (let i = 1; i < lines.length; i++) {
      const raw = lines[i];
      if (!raw.trim()) continue;

      // Top-level bullet "- **Label：** content" or "- **Label：**"
      const topMatch = raw.match(/^-\s+(.*)$/);
      // Sub bullet "  - **Label：** content"
      const subMatch = raw.match(/^\s{2,}-\s+(.*)$/);

      if (subMatch && currentBlock) {
        const text = subMatch[1];
        const lm = text.match(/^\*\*([^*]+?)[：:]\*\*\s*(.*)$/);
        currentBlock.sub = currentBlock.sub || [];
        if (lm) {
          currentBlock.sub.push({ label: lm[1].trim(), content: lm[2].trim() });
        } else {
          currentBlock.sub.push({ label: '', content: text.replace(/^\*\*|\*\*$/g, '').trim() });
        }
      } else if (topMatch) {
        const text = topMatch[1];
        const lm = text.match(/^\*\*([^*]+?)[：:]\*\*\s*(.*)$/);
        if (lm) {
          currentBlock = { label: lm[1].trim(), content: lm[2].trim() };
          bullets.push(currentBlock);
        } else {
          currentBlock = { content: text };
          bullets.push(currentBlock);
        }
      }
    }

    if (title) cards.push({ number, title, bullets });
  }

  return cards;
}
