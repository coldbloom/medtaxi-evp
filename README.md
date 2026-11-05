# Медтакси Евпатория

Сайт услуг на Next.js App Router. `yarn build` создаёт стандартную сборку `.next`,
а `yarn start` запускает сервер Next.js. На VPS он работает за Nginx.
Формы, телефонные клики и собственная аналитика обращаются к `conditioners-server`.
Для Medtaxi backend сохраняет заявки и события в SQLite, затем независимо доставляет
уведомления в Telegram и VK через постоянную очередь. Сбой провайдера уведомлений
не отменяет уже сохранённую заявку. Яндекс Метрика работает параллельно.
Страницы услуг по-прежнему предварительно формируются при сборке с готовым HTML.

## Разработка

```bash
yarn install --immutable
yarn dev --port 3079
```

Открыть [localhost:3079](http://localhost:3079). Главная страница находится в
`app/(home)/page.tsx`, региональная — в `app/donetsk/page.tsx`, маршрутная —
в `app/donetsk/moskva/page.tsx`. Для зависимостей используется `yarn.lock`.

## Production-сборка и запуск

Сначала развернуть обновлённый `conditioners-server` на `127.0.0.1:3235`
и Nginx-маршрут `/api/`, затем обновлять frontend: форма проверяет подтверждение
с совпадающим `requestId` и сохранённым `leadId`. Старый backend этого контракта не даёт.
До сборки задать `NEXT_PUBLIC_API_URL=/api` в `.env.production.local`.
Значение попадёт в клиентский код; при смене адреса API сайт нужно пересобрать.
Пример переменной — в `.env.example`. Production-сборка отклоняет отсутствующий,
локальный или некорректный адрес API. Настройки `.env*.local` исключены из Git.

Для резервного домена также нужен Nginx `/api/` и его явный HTTPS origin в
`MEDTAXI_ADDITIONAL_ORIGINS` backend; основной `MEDTAXI_URL` остаётся неизменным.
См. [настройку временного резервного домена](docs/node-deployment.md#временный-резервный-домен).

```bash
yarn build:production
yarn start --hostname 127.0.0.1 --port 3000
```

`yarn start` выполняет `next start`; каталог `out/` не используется.
`yarn build:production` выполняет ESLint, тесты, `next build` с проверкой TypeScript
и `check:build`: проверку серверных файлов, HTML, метаданных, локальных ресурсов
и данных навигации App Router. Для отдельной сборки: `yarn build && yarn check:build`.

Для VPS собирайте приложение на самом сервере в новом каталоге релиза либо
в совместимом Linux CI. Не переносите `.next` и `node_modules` с Mac вслепую:
сборка, версия Node.js и нативные зависимости должны соответствовать целевой системе.
Обычный `next start` требует `.next`, `public`, установленные зависимости,
`package.json`, конфигурацию Next.js и импортируемый ею `scripts/validate-production-api.mjs`.
Простой вариант — хранить полный каталог проекта и устанавливать зависимости на VPS.
Инструкция: [деплой Next.js на VPS](docs/node-deployment.md).

## Диагностика отправки формы

В DevTools → Network найдите POST `/api/feedback`: backend возвращает JSON с
`error`, `code` и `requestId` при отказе. Frontend читает JSON и при HTTP-ошибке,
а в Console пишет `[feedback] request failed` с HTTP-статусом, кодом,
`requestId` из ответа/`X-Request-Id` и `submissionId` отправленной формы.
`requestId` помогает найти конкретную попытку в логах backend; `submissionId`
остаётся одинаковым при повторе заявки после неопределённого результата.
Для валидации выводятся только имена неверных полей, без значений.
Контакты, комментарий, исходное тело ответа и текст исключения в Console не попадают.

`NETWORK_ERROR` означает, что fetch не получил доступного ответа (включая возможный
отказ CORS), `REQUEST_TIMEOUT` — истёк лимит 15 секунд, `NON_JSON_RESPONSE` — ответ
не удалось разобрать как JSON, `RESPONSE_READ_ERROR` — чтение тела оборвалось,
`INVALID_ACKNOWLEDGEMENT` — JSON не подтверждает сохранение именно этой заявки.
Форма сохраняет введённые данные и допускает повтор без создания нового ID.
Эти клиентские изменения требуют новой production-сборки frontend.

## Проверки и документация

```bash
yarn lint
yarn typecheck
yarn test
```

- [Учёт телефонных кликов и обратный звонок](docs/call-clicks.md).
- [Изображения и производительность Донецка](docs/donetsk-performance.md).
- [Пример Nginx reverse proxy](deploy/nginx-next.conf.example).
- [Пример systemd-сервиса](deploy/medtaxi-next.service.example).
- [Самостоятельное размещение Next.js](https://nextjs.org/docs/app/guides/self-hosting).

Метаданные превью всех публичных страниц собирает `app/lib/socialMetadata.ts`:
собственные URL, заголовок и описание, Open Graph и Twitter с одинаковым изображением.
Для `/donetsk` и направления Донецк → Крым используется
`public/donetsk/images/white-sprinter.png` (1254 × 1254, `image/png`).
Для `/donetsk/moskva` — `public/donetsk/images/mercedes-moskva-social.jpg`
(1200 × 900, `image/jpeg`); пересоздание из фотографии галереи: `yarn generate:moscow-og`.
Иллюстрация в блоке заявки по-прежнему использует AVIF/WebP (`yarn optimize:donetsk-images`).
`check:build` проверяет также наличие локальных изображений из OG/Twitter и JSON-LD.
Для `/donetsk` дополнительно проверяются единственные OG/Twitter-ссылки именно на
`white-sprinter.png`, MIME `image/png` и размеры 1254 × 1254 в собранном HTML.
Старый URL `/donetsk/og-donetsk.jpg` перенаправляется на этот PNG (308).

После изменения метаданных нужен `yarn build:production` и перезапуск приложения:
страницы предварительно генерируются, а донецкие используют `force-static`.
Соцсети могут хранить старые превью независимо от сервера. После деплоя сначала
проверьте HTML и URL картинки снаружи, затем обновите кэш соцсети (у VK есть
метод `pages.clearCache`) и отправьте ссылку заново. Старые сообщения могут сохранить
своё превью. Название и аватар отправителя в VK не задаются Open Graph сайта.

Проверка после переключения сборки на VDS (HTML должен содержать `white-sprinter.png`
в `og:image` и `twitter:image`, а старый адрес картинки — вести на PNG):

```bash
curl -fsS --compressed --max-time 15 -A 'TelegramBot (like TwitterBot)' \
  https://medtaxi-evp.ru/donetsk | tr '<' '\n' | grep -E '(og:image|twitter:image)'
curl -sSI --max-time 15 https://medtaxi-evp.ru/donetsk/og-donetsk.jpg
curl -sSI --max-time 15 https://medtaxi-evp.ru/donetsk/images/white-sprinter.png
```

Если HTML снаружи всё ещё содержит `og-donetsk.jpg` или `mercedas-optimized.jpg`
в метатегах, проверьте каталог процесса `pm2 describe medtaxi-front` и публикацию
новой `.next`: одного `git pull` или перезапуска старой сборки недостаточно.
Перенаправление помогает при повторном запросе старого изображения, но не удаляет
уже сохранённую картинку из кеша Telegram.
