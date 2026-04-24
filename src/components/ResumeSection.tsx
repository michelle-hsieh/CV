import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ResumeSection as ResumeSectionType } from '../lib/parseResume';
import { parseWorkExperience, parseEducation } from '../lib/parseTimeline';
import Timeline from './Timeline';
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

  let timelineItems = null;
  if (isWorkExperience) timelineItems = parseWorkExperience(section.body);
  else if (isEducation) timelineItems = parseEducation(section.body);

  return (
    <FadeIn delay={delay}>
      <section className="resume-section mb-14 print:mb-6 break-inside-avoid page-break-inside-avoid">
        <h2 className="font-serif text-4xl font-bold mb-8 pb-3 border-b-2 border-gray-300 print:text-2xl print:mb-4 print:pb-2 text-ink">
          {section.heading}
        </h2>

        {timelineItems && timelineItems.length > 0 ? (
          <Timeline items={timelineItems} />
        ) : (
          <div className="prose-custom space-y-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h3: ({ children }) => (
                  <h3 className="font-serif text-2xl font-semibold mt-7 mb-3 text-ink print:text-lg print:mt-3">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-4 leading-relaxed text-gray-800 text-base print:mb-2 print:text-sm">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-outside ml-6 mb-5 space-y-2.5 text-gray-800 print:mb-2 print:space-y-0.5">
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li className="text-gray-800 leading-relaxed text-base print:text-sm">
                    {children}
                  </li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-ink">{children}</strong>
                ),
                code: ({ children }) => (
                  <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-gray-700">
                    {children}
                  </code>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener"
                    className="text-blue-600 hover:underline print:text-ink print:no-underline"
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
