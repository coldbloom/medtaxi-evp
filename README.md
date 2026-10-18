# Медтакси Евпатория

Сайт услуг на Next.js App Router. Production-сборка создаёт статический сайт в
`out/`: его можно загрузить на VPS через rsync и раздавать Nginx без процесса Next.js.
Формы и учёт телефонных кликов обращаются к отдельному существующему backend.

## Разработка

```bash
yarn install --immutable
yarn dev --port 3079
```

Открыть [localhost:3079](http://localhost:3079). Главная страница находится в
`app/(home)/page.tsx`, региональная — в `app/donetsk/page.tsx`, маршрутная —
в `app/donetsk/moskva/page.tsx`. Для зависимостей используется `yarn.lock`.

## Сборка и локальная проверка экспорта

До сборки задать рабочий `NEXT_PUBLIC_API_URL` в `.env.production.local`.
Значение попадёт в клиентский код; при смене адреса API сайт нужно пересобрать.
Пример переменной — в `.env.example`. Production-сборка отклоняет отсутствующий,
локальный или некорректный адрес API. Настройки `.env*.local` исключены из Git.

```bash
yarn build:export
yarn start --port 3081
```

`yarn start` раздаёт готовый `out/` для локальной проверки; это не `next start`.
`yarn build:export` последовательно выполняет ESLint, тесты, сборку с проверкой
TypeScript и проверку HTML, метаданных, ресурсов и файлов навигации App Router.
Подробности настройки API, Nginx и загрузки на VPS:
[статический экспорт и деплой](docs/static-export.md).

## Проверки и документация

```bash
yarn lint
yarn typecheck
yarn test
```

- [Учёт телефонных кликов и обратный звонок](docs/call-clicks.md).
- [Изображения и производительность Донецка](docs/donetsk-performance.md).
- [Пример конфигурации Nginx](deploy/nginx-static.conf.example).
- [Статический экспорт в документации Next.js](https://nextjs.org/docs/app/guides/static-exports).

Возможное дальнейшее улучшение: отдельное изображение Open Graph размером
1200 × 630 для `/donetsk` вместо существующего почти квадратного изображения.
