export interface TimelineEntry {
  title: string;
  subtitle?: string;
  period: string;
  description?: string[];
}

/**
 * 解析 Work Experience 類型的 markdown:
 * **公司名稱｜職位｜2023.09 – 2026.05**
 * - 第一項職責
 * - 第二項職責
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

  return entries;
}

/**
 * 解析 Education 類型:
 * - **國立臺灣科技大學** ｜ 資訊管理所 ｜ 2021 - 2023
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
    });
  }

  return entries;
}
