import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ResumeSection as ResumeSectionType } from '../lib/parseResume';
import { parseWorkExperience, parseEducation } from '../lib/parseTimeline';
import { parseSkills, parseAchievements } from '../lib/parseCards';
import Timeline from './Timeline';
import SkillsGrid from './SkillsGrid';
import AchievementCards from './AchievementCards';
import FadeIn from './FadeIn';

/**
 * 每個 section 被包裹在 <section> 元素中，
 * 搭配 CSS 的 `break-inside: avoid`，確保列印時不會被分頁截斷。
 */
export default function ResumeSection({
  section,
  delay = 0,
}: {
  section: ResumeSectionType;
  delay?: number;
}) {
  const heading = section.heading.toLowerCase();
  const isWorkExperience = heading.includes('work') || heading.includes('experience');
  const isEducation = heading.includes('education');
  const isSummary = heading.includes('summary');
  const isSkills = heading.includes('skill');
  const isAchievements = heading.includes('achievement');

  let timelineItems = null;
  if (isWorkExperience) timelineItems = parseWorkExperience(section.body);
  else if (isEducation) timelineItems = parseEducation(section.body);

  const skillCards = isSkills ? parseSkills(section.body) : null;
  const achievementCards = isAchievements ? parseAchievements(section.body) : null;

  return (
    <FadeIn delay={delay}>
      <section className="resume-section mb-14 print:mb-6 break-inside-avoid page-break-inside-avoid">
        <h2 className="font-serif text-3xl font-bold text-ink mb-8 pb-3 border-b border-gray-300 uppercase tracking-[0.15em] print:text-xl print:mb-4 print:pb-2 print:tracking-[0.1em]">
          {section.heading}
        </h2>

        {timelineItems && timelineItems.length > 0 ? (
          <Timeline items={timelineItems} />
        ) : skillCards && skillCards.length > 0 ? (
          <SkillsGrid cards={skillCards} />
        ) : achievementCards && achievementCards.length > 0 ? (
          <AchievementCards cards={achievementCards} />
        ) : (
          <div className={`prose-custom ${isSummary ? 'summary-body' : ''}`}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Achievement 條目標題：Libre Baskerville serif，優雅大字
                h3: ({ children }) => (
                  <h3 className="font-serif text-2xl font-bold text-ink mt-10 mb-4 leading-snug first:mt-0 print:text-lg print:mt-4 print:mb-2">
                    {children}
                  </h3>
                ),
                // Summary 段落：serif italic 大字（Wix 經典介紹段落風格）
                // 其他段落：Lato sans-serif，寬鬆行距
                p: ({ children }) => (
                  <p
                    className={
                      isSummary
                        ? 'font-serif text-lg italic leading-[1.9] text-gray-700 mb-5 print:text-sm print:leading-relaxed'
                        : 'font-sans text-[15px] leading-[1.8] text-gray-700 mb-4 print:text-sm print:leading-relaxed print:mb-2'
                    }
                  >
                    {children}
                  </p>
                ),
                // 列表：Lato，適度間距，灰色 bullets
                ul: ({ children }) => (
                  <ul className="list-disc marker:text-gray-400 list-outside ml-5 mb-6 space-y-2 print:mb-2 print:space-y-1">
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li className="font-sans text-[15px] leading-[1.75] text-gray-700 pl-1 print:text-[10pt] print:leading-normal">
                    {children}
                  </li>
                ),
                // 粗體：保留稍微強調（Lato Bold）
                strong: ({ children }) => (
                  <strong className="font-sans font-bold text-ink">{children}</strong>
                ),
                // inline code：移除背景色，改用細微的底色 + serif 風格
                code: ({ children }) => (
                  <code className="px-1.5 py-0.5 bg-gray-50 border border-gray-200 rounded text-[13px] font-mono text-gray-700">
                    {children}
                  </code>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener"
                    className="text-ink underline decoration-gray-300 underline-offset-4 hover:decoration-ink transition print:no-underline"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {section.body}
            </ReactMarkdown>
          </div>
        )}
      </section>
    </FadeIn>
  );
}
