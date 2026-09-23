# Учёт кликов «Позвонить» — MVP

`tel:` → `fetch` с `keepalive: true` → `POST /api/call-clicks` → лог backend → Telegram.

Сервер фиксирует получение клика в строке `[call-click]` с JSON и после ответа
браузеру отправляет оператору Telegram-карточку с кнопкой заполнения результата.
Базы данных и гарантированной повторной доставки пока нет. Черновики формы живут
в памяти backend, а итоговая карточка — в Telegram. `202` означает, что API принял
событие, а не что клиент совершил звонок или Telegram уже доставил уведомление.

## Как добавить кнопку

```tsx
import { TrackedPhoneLink } from "@/app/components/tracking/TrackedPhoneLink";

<TrackedPhoneLink phone="+79895052785" trackingId="hero" className="button">
  Позвонить
</TrackedPhoneLink>
```

`phone` — номер без пробелов и скобок; `trackingId` — постоянное имя расположения
в snake_case. Другие атрибуты (`aria-label`, `target`, `title`) передаются как обычной ссылке.
Сочетание `page` + `trackingId` определяет кнопку. Все существовавшие телефонные ссылки
размечены, в том числе в Header, Footer, 404, контактах, ценах, услугах и модальном окне.
На `/donetsk` обёртка `DonetskPhoneLink` также сохраняет существующие цели Метрики.
Новая ссылка без разметки тоже отправит событие, но получит ID `unlabelled`.

## Как это работает

- `TrackedPhoneLink` рендерит обычный `<a href="tel:...">` на сервере.
- Маленький `PhoneClickTracking` в корневом layout ставит один listener на document.
  `page` и `layout` остаются Server Components. При отключённом JS работают ссылки,
  но аналитика не отправляется; до hydration tracking тоже ещё не активен.
- `initializeCallTracking` запоминает первый источник и UUID в
  `sessionStorage.medtax_call_session_v1`. Повторный effect в Strict Mode использует
  тот же объект, cleanup удаляет предыдущий listener.
- Переход `/donetsk?utm_source=yandex` → `/prices` сохраняет начальные UTM/yclid/referrer,
  а событие содержит актуальный `page: "/prices"`. Это first-touch на сессию вкладки:
  повторный вход с другими UTM в ту же вкладку не перезаписывает источник.
- При клике создаётся новый `eventId`, затем запускается `fetch`. Нет `await`,
  `preventDefault` или ручного перехода на `tel:`. Телефон открывает сам браузер.
- `keepalive` позволяет продолжить запрос после ухода со страницы. Доставка при
  закрытии браузера/отсутствии интернета не гарантируется.
- Если storage запрещён, источник и сессия доступны только в памяти до reload.
  Дублирование вкладки может скопировать её sessionStorage; это не идентификатор человека.

## Локальная отладка

1. Запустить backend: `npm run dev` в `conditioners-server` (порт из его `.env`, обычно 3235).
2. Создать frontend `.env.local`:

   ```dotenv
   NEXT_PUBLIC_API_URL=http://localhost:3235/api
   ```

3. Перезапустить `npm run dev` frontend и открыть `http://localhost:3000/donetsk`.
4. В DevTools → Network → Fetch/XHR включить Preserve log и фильтр `call-clicks`.
5. Нажать «Позвонить». Проверить URL, Payload и статус `202`.
6. В development Console видны `[call-click] POST` с payload и `[call-click] HTTP` со статусом.
   На backend появляется `[call-click] { ... }` с `receivedAt`, `userAgent`, page и кнопкой,
   а в настроенном Telegram-чате — карточка с кнопкой «Оформить заявку».

В production URL берётся из `NEXT_PUBLIC_API_URL` во время сборки Next.js. При смене
URL нужно пересобрать frontend. Для теста localhost → production backend добавьте
`http://localhost:3000` в `CALL_CLICK_ALLOWED_ORIGINS` на backend и перезапустите его.
Локальный backend допускает localhost в development. CORS новой ручки изолирован
от существующей формы `/api/feedback` и не меняет разрешения других сервисов.

Если ответ `404 Cannot POST /api/call-clicks`, новый backend ещё не развёрнут:
нужно собрать его и перезапустить существующий процесс. Если `403`/CORS — проверить
Origin. Если `(failed)` — доступность API, порт и блокировщики запросов.
Изменения на production эта задача автоматически не выкладывает.

Пример события:

```json
{
  "eventId": "8039e6de-b47c-4c6e-8507-b128e1739e6c",
  "sessionId": "8ff232a0-66fc-4ee0-bcad-64c2b8614452",
  "trackingId": "hero",
  "phone": "+79895052785",
  "page": "/donetsk",
  "utm": { "source": "yandex", "campaign": "donetsk" },
  "yclid": "1234567890",
  "referrer": "https://yandex.ru/",
  "clientTimestamp": "2026-09-20T12:34:00.000Z"
}
```

Тесты: `npm run test:tracking` (Node test runner + уже установленный TypeScript).
Они проверяют non-blocking fetch, ошибки сети, Strict Mode-style повторную
инициализацию, attribution при переходе, запрет storage и HTML ссылки без JS.

Справка: [fetch keepalive](https://developer.mozilla.org/en-US/docs/Web/API/Request/keepalive),
[переменные NEXT_PUBLIC](https://nextjs.org/docs/app/guides/environment-variables).
