import matter from 'gray-matter';

export interface ResumeMeta {
  name: string;
  title: string;
  email: string;
  github: string;
  phone: string;
  avatar: string;
}

export interface ResumeSection {
  heading: string;
  body: string;
}

export interface ParsedResume {
  meta: ResumeMeta;
  sections: ResumeSection[];
}

// 移除 Markdown 的 **粗體** 標記
function stripBold(s: string): string {
  return s.replace(/\*\*/g, '').trim();
}

/**
 * 從 H1（如 "# 謝秀玟 — Software Engineer"）提取姓名與職位
 */
function extractNameAndTitle(content: string): { name: string; title: string } {
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (!h1Match) return { name: '', title: '' };

  const parts = h1Match[1].split(/[—–-]/).map((s) => s.trim());
  return {
    name: parts[0] ?? '',
    title: parts[1] ?? 'Software Engineer',
  };
}

/**
 * 從 ## Contact 區塊（- **Email：** xxx）提取聯絡資訊
 */
function extractContact(content: string): {
  email: string;
  github: string;
  phone: string;
} {
  const contactMatch = content.match(/##\s*Contact\s*\n([\s\S]*?)(?=\n##\s|\n---|\n$)/i);
  const block = contactMatch ? contactMatch[1] : content;

  // 允許 **Email：** 這種 markdown 粗體包圍的格式
  const emailMatch = block.match(/Email[：:\s*]*\**\s*([^\s\n*]+@[^\s\n*]+)/i);
  const githubMatch = block.match(/GitHub[：:\s*]*\**\s*(https?:\/\/[^\s\n*]+)/i);
  // Phone（手機/電話）— 也支援舊的 Location 欄位作為 fallback
  const phoneMatch =
    block.match(/(?:Phone|Mobile|Tel|手機|電話)[：:]\s*\**\s*([^\n*]+?)\s*\**\s*$/im) ??
    block.match(/Location[：:]\s*\**\s*([^\n*]+?)\s*\**\s*$/im);

  return {
    email: emailMatch?.[1]?.trim() ?? '',
    github: githubMatch?.[1]?.trim() ?? '',
    phone: stripBold(phoneMatch?.[1] ?? ''),
  };
}

export function parseResume(raw: string): ParsedResume {
  // 若有 frontmatter 優先使用；沒有則從內容推斷
  const { data, content } = matter(raw);

  const { name: parsedName, title: parsedTitle } = extractNameAndTitle(content);
  const contact = extractContact(content);

  const meta: ResumeMeta = {
    name: data.name ?? parsedName,
    title: data.title ?? parsedTitle,
    email: data.email ?? contact.email,
    github: data.github ?? contact.github,
    phone: data.phone ?? contact.phone,
    avatar: data.avatar ?? (parsedName ? parsedName.charAt(0) : '?'),
  };

  // 依 H2 拆分 sections，但跳過 Contact section（已提取到 meta）
  // 先統一換行符以處理 Windows CRLF
  const normalized = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = normalized.split('\n');
  const sections: ResumeSection[] = [];
  let currentHeading = '';
  let buffer: string[] = [];

  const flush = () => {
    // 移除 body 內的水平線 `---`
    const cleaned = buffer
      .filter((l) => l.trim() !== '---')
      .join('\n')
      .trim();
    if (currentHeading && !/^contact$/i.test(currentHeading) && cleaned) {
      sections.push({ heading: currentHeading, body: cleaned });
    }
    buffer = [];
  };

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+?)\s*$/);
    if (h2Match) {
      flush();
      currentHeading = h2Match[1].trim();
    } else if (!line.match(/^#\s+/)) {
      buffer.push(line);
    }
  }
  flush();

  return { meta, sections };
}
