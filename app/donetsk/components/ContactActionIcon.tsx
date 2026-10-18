export function ContactActionIcon({ kind }: { kind: "phone" | "message" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
      {kind === "phone" ? (
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z" />
      ) : (
        <path d="M21 11.5a9 9 0 0 1-9 9 9.5 9.5 0 0 1-4-.9L3 21l1.4-5a9.5 9.5 0 0 1-.9-4 9 9 0 0 1 9-9 9 9 0 0 1 8.5 8.5Z" />
      )}
    </svg>
  );
}
