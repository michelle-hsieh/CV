export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function getSectionId(heading: string): string {
  const slug = slugify(heading);
  return slug || 'section';
}

export function getAchievementId(number?: string, title?: string): string {
  if (number) return `achievement-${number}`;
  const slug = slugify(title ?? '');
  return slug ? `achievement-${slug}` : 'achievement';
}
