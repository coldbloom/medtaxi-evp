import styles from "./RecoveryMessage.module.css";

type RecoveryMessageProps = {
  onRetry: () => void;
};

/** Small standalone UI also works when the root layout itself has failed. */
export function RecoveryMessage({ onRetry }: RecoveryMessageProps) {
  return (
    <main className={styles.main} aria-labelledby="recovery-title">
      <section className={styles.card}>
        <p className={styles.eyebrow}>Медтакси</p>
        <h1 id="recovery-title" className={styles.title}>Не удалось открыть страницу</h1>
        <p className={styles.description}>
          Попробуйте ещё раз. Если вопрос срочный, свяжитесь с нами напрямую.
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.primary} onClick={onRetry}>
            Попробовать ещё раз
          </button>
          {/* Native links provide recovery even when client-side routing has failed. */}
          <a href="/contacts" className={styles.secondary}>Контакты</a>
          <a href="tel:+79490676701" className={styles.phone}>
            Донецк: +7 (949) 067-67-01
          </a>
          <a href="tel:+79789380221" className={styles.phone}>
            Евпатория: +7 (978) 938-02-21
          </a>
        </div>
      </section>
    </main>
  );
}
