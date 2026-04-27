export type TimelineType = 'full-time' | 'internship' | 'side-project' | 'education';

export interface TimelineEntry {
  title: string;
  subtitle?: string;
  period: string;
  description?: string[];
  start?: Date;
  end?: Date; // undefined 代表 Present（進行中）
  type?: TimelineType;
  concurrent?: boolean; // 與時間軸上的另一條目時段重疊
}

/**
 * 解析時間區間字串：
 *   "2023.09 – 2026.05"  → { start: 2023-09, end: 2026-05 }
 *   "2026.03 – Present"  → { start: 2026-03, end: undefined }
 *   "2021 - 2023"        → { start: 2021-01, end: 2023-01 }
 */
function parsePeriod(period: string): { start?: Date; end?: Date } {
  const cleaned = period.replace(/[–—]/g, '-').trim();
  const parts = cleaned.split(/\s*-\s*/).map((s) => s.trim());

  const parseOne = (s: string): Date | undefined => {
    if (!s) return undefined;
    if (/present|現在|至今/i.test(s)) return undefined;
    const m = s.match(/(\d{4})(?:[.\/-](\d{1,2}))?/);
    if (!m) return undefined;
    return new Date(parseInt(m[1]), parseInt(m[2] ?? '1') - 1);
  };

  return {
    start: parseOne(parts[0]),
    end: parts.length > 1 ? parseOne(parts[1]) : parseOne(parts[0]),
  };
}

/**
 * 從標題與副標推斷類型：
 *   含 Intern / 實習 → internship
 *   含 Side Project / Personal / 個人 → side-project
 *   其他 → full-time
 */
function detectType(title: string, subtitle?: string): TimelineType {
  const text = `${title} ${subtitle ?? ''}`;
  if (/intern|實習/i.test(text)) return 'internship';
  if (/side\s*project|personal|個人|side-project/i.test(text)) return 'side-project';
  return 'full-time';
}

/**
 * 排序並標記重疊：
 *  - 依「開始時間倒序」（最新的在最上面，Present 視為現在）
 *  - 偵測時段重疊：若新項目的開始時間落在某個已存在條目的時段內，則 concurrent = true
 */
function enrichTimeline(entries: TimelineEntry[]): TimelineEntry[] {
  const enriched = entries.map((e) => {
    const { start, end } = parsePeriod(e.period);
    return { ...e, start, end, type: e.type ?? detectType(e.title, e.subtitle) };
  });

  enriched.sort((a, b) => {
    const aStart = a.start?.getTime() ?? 0;
    const bStart = b.start?.getTime() ?? 0;
    return bStart - aStart;
  });

  // 兩兩比對是否重疊
  const now = new Date();
  for (let i = 0; i < enriched.length; i++) {
    const curr = enriched[i];
    if (!curr.start) continue;
    for (let j = 0; j < enriched.length; j++) {
      if (i === j) continue;
      const other = enriched[j];
      if (!other.start) continue;
      const otherEnd = other.end ?? now;
      // 重疊條件：curr 開始時，other 還在進行中
      if (curr.start >= other.start && curr.start < otherEnd && curr !== other) {
        // 只標記非 full-time 與 full-time 重疊的情況（避免雙向標記都重疊）
        if (curr.type !== 'full-time' || other.type === 'full-time') {
          enriched[i].concurrent = true;
          break;
        }
      }
    }
  }

  return enriched;
}

/**
 * 解析 Work Experience:
 *   **公司名稱｜職位｜2023.09 – 2026.05**
 *   - 第一項職責
 */
export function parseWorkExperience(body: string): TimelineEntry[] {
  const entries: TimelineEntry[] = [];
  const blocks = body.split(/\n\s*\n/).filter((b) => b.trim());

  for (const block of blocks) {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;

    const headerLine = lines[0].replace(/^\*\*|\*\*$/g, '').trim();
    const parts = headerLine.split(/[｜|]/).map((s) => s.trim());

    if (parts.length < 2) continue;

    const period = parts[parts.length - 1];
    const title = parts[0];
    const subtitle = parts.slice(1, -1).join(' · ');

    const description = lines
      .slice(1)
      .filter((l) => l.startsWith('-'))
      .map((l) => l.replace(/^-\s*/, '').trim());

    entries.push({ title, subtitle, period, description });
  }

  return enrichTimeline(entries);
}

/**
 * 解析 Education:
 *   - **國立臺灣科技大學** ｜ 資訊管理所 ｜ 2021 - 2023
 */
export function parseEducation(body: string): TimelineEntry[] {
  const entries: TimelineEntry[] = [];
  const lines = body.split('\n').map((l) => l.trim()).filter((l) => l.startsWith('-'));

  for (const line of lines) {
    const cleaned = line.replace(/^-\s*/, '').replace(/\*\*/g, '').trim();
    const parts = cleaned.split(/[｜|]/).map((s) => s.trim());
    if (parts.length < 2) continue;

    entries.push({
      title: parts[0],
      subtitle: parts.slice(1, -1).join(' · '),
      period: parts[parts.length - 1],
      type: 'education',
    });
  }

  return enrichTimeline(entries);
}
