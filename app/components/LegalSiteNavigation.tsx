import Link from "next/link";

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export function LegalSiteNavigation() {
  return (
    <nav className="flex flex-col gap-2" aria-label="Основные страницы сайта">
      <Link
        href="/donetsk"
        className="group inline-flex min-h-10 items-center justify-between gap-3 rounded-md bg-[#10211d] px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-[#1b3a32] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f6757]"
        aria-label="Перейти на главную страницу Медтакси Донецк"
      >
        <span>Медтакси Донецк</span>
        <ArrowUpRightIcon />
      </Link>
      <Link
        href="/"
        className="group inline-flex min-h-10 items-center justify-between gap-3 rounded-md border border-blue-200 px-3 py-2 text-sm font-bold text-blue-700 transition-colors hover:border-blue-400 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        aria-label="Перейти на главную страницу Медтакси Евпатория"
      >
        <span>Медтакси Евпатория</span>
        <ArrowUpRightIcon />
      </Link>
    </nav>
  );
}
