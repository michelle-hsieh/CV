function InlineAnchorIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="achievement-link-icon inline-block w-3.5 h-3.5 ml-1 -translate-y-px text-gray-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6.5h8m0 0v8m0-8L4.5 14" />
    </svg>
  );
}

function openAchievementModal(href?: string) {
  if (typeof window === 'undefined' || !href) return;

  window.dispatchEvent(
    new CustomEvent('open-achievement', {
      detail: { id: href.replace(/^#/, '') },
    })
  );
}

export default function AchievementLink({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => openAchievementModal(href)}
      className="achievement-link inline-flex items-center text-ink underline decoration-gray-300 underline-offset-4 hover:decoration-ink transition print:no-underline"
    >
      {children}
      <InlineAnchorIcon />
    </button>
  );
}
