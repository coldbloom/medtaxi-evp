# Медтакси Евпатория

Сайт услуг на Next.js App Router. `yarn build` создаёт стандартную сборку `.next`,
а `yarn start` запускает сервер Next.js. На VPS он работает за Nginx.
Формы и учёт телефонных кликов обращаются к отдельному существующему backend.
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

До сборки задать рабочий `NEXT_PUBLIC_API_URL` в `.env.production.local`.
Значение попадёт в клиентский код; при смене адреса API сайт нужно пересобрать.
Пример переменной — в `.env.example`. Production-сборка отклоняет отсутствующий,
локальный или некорректный адрес API. Настройки `.env*.local` исключены из Git.

```bash
yarn build:production
yarn start --hostname 127.0.0.1 --port 3081
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

Возможное дальнейшее улучшение: отдельное изображение Open Graph размером
1200 × 630 для `/donetsk` вместо существующего почти квадратного изображения.
