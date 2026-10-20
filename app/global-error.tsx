"use client";

import { RecoveryMessage } from "@/src/components/ui/RecoveryMessage";

export default function GlobalError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="ru">
      <head><title>Не удалось открыть страницу | Медтакси</title></head>
      <body style={{ margin: 0 }}>
        <RecoveryMessage onRetry={retry} />
      </body>
    </html>
  );
}
