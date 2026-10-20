"use client";

import { RecoveryMessage } from "@/src/components/ui/RecoveryMessage";

export default function ErrorPage({ retry }: { error: unknown; retry: () => void }) {
  return <RecoveryMessage onRetry={retry} />;
}
