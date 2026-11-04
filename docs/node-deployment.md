# Деплой стандартной сборки Next.js на VPS

Проект использует `next build` → `.next` → `next start`, без `output: "export"`
и без `output: "standalone"`. Нужен постоянно работающий Node.js-процесс.
Nginx принимает HTTPS: `/api/` направляется в `conditioners-server` на
`127.0.0.1:3235`, остальные запросы — в Next.js на `127.0.0.1:3000`.
Это стандартный [вариант размещения Node.js](https://nextjs.org/docs/app/getting-started/deploying#nodejs-server).

## Окружение и API

Для совместного размещения frontend и backend используйте Node.js 24 LTS
(backend фиксирует major 24) и Yarn 4.17.0 из `packageManager` frontend.
Версия Node.js при сборке и запуске должна совпадать. Установку зависимостей выполняйте
на целевой Linux-системе по `yarn.lock` через `yarn install --immutable`.

До сборки в каталоге релиза должна быть `.env.production.local` с рабочим
`NEXT_PUBLIC_API_URL=/api`. Поддерживается также отдельный HTTPS-адрес backend.
Отдельный backend принимает `/api/feedback`, `/api/call-clicks` и
`/api/v1/medtaxi/events`; запуск Next.js не создаёт эти обработчики.
Для внешнего API сохраняется необходимость корректного CORS.

На backend задайте `MEDTAXI_URL=https://medtaxi-evp.ru`, `HOST=127.0.0.1`,
`PORT=3235` и абсолютный `MEDTAXI_DB_PATH` вне каталогов релизов/публичных файлов.
Остальные переменные, установка SQLite-зависимости, уведомления, резервные копии,
восстановление и обслуживание описаны в README `conditioners-server`.
Токены TG/VK и персональные данные не помещаются в frontend-переменные.

Production-сборка отклоняет отсутствующий, локальный, небезопасный или некорректный
адрес API. Значения с credentials, query или hash тоже не принимаются.
Переменная `NEXT_PUBLIC_API_URL` публичная: её значение встраивается в браузерный
JavaScript при сборке. После изменения требуется новая сборка, одного перезапуска
недостаточно. Не помещайте в неё секреты. Это поведение описано в
[документации переменных окружения Next.js](https://nextjs.org/docs/app/guides/environment-variables#bundling-environment-variables-for-the-browser).

## Порядок обновления API и frontend

1. Подготовьте и запустите новый backend по его README. Он должен сохранить
   совместимость старых `/api/feedback` и `/api/call-clicks`, принять Medtaxi в SQLite
   и вернуть для формы `success`, `requestId`, `leadId` после commit.
2. Настройте отдельный `/api/` location в Nginx, проверьте `nginx -t`, затем reload.
3. Проверьте готовность без создания заявок:

   ```bash
   curl --fail --connect-timeout 5 --max-time 15 http://127.0.0.1:3235/api/readyz
   curl --fail --connect-timeout 5 --max-time 15 https://medtaxi-evp.ru/api/readyz
   ```

   Readiness проверяет возможность записи в БД; это не проверка доставки в TG/VK.
4. Соберите и переключите frontend с `NEXT_PUBLIC_API_URL=/api`.

**Backend разворачивается первым.** Новый frontend не считает старый ответ формы
без совпадающего requestId/leadId успехом. При откате frontend новый backend можно
сохранить; откат backend на прежний контракт при новом frontend требует согласованного
отката frontend. Запись в БД не зависит от доступности провайдеров уведомлений.

## Доставка исходников и сборка

Рекомендуемый порядок: отдельный новый каталог релиза → установка зависимостей
и сборка в нём → проверка → переключение сервиса. Не собирайте поверх каталога,
из которого сейчас работает production-процесс.

Можно получить код через Git на VPS или передать исходники с Mac через rsync.
В следующем примере **замените** адрес VPS и путь нового релиза своими значениями;
каталог назначения должен существовать и быть доступен пользователю приложения:

```bash
# На Mac из корня проекта. Передаём исходники, не macOS-сборку.
MEDTAXI_VPS="deploy@YOUR_VPS"
MEDTAXI_RELEASE="/srv/medtaxi/releases/RELEASE_ID"
rsync -avz \
  --exclude='.git/' --exclude='node_modules/' --exclude='.next/' \
  --exclude='out/' --exclude='.env*' --exclude='*.tsbuildinfo' \
  ./ "$MEDTAXI_VPS:$MEDTAXI_RELEASE/"
```

Локальные `.env` не копируются. В новом релизе создайте `.env.production.local`
из подтверждённых серверных настроек и выдайте доступ только пользователю приложения.
Затем **на VPS**, под этим пользователем:

```bash
cd /srv/medtaxi/releases/RELEASE_ID
yarn install --immutable
yarn build:production
yarn start --hostname 127.0.0.1 --port 3081
```

Последняя команда запускает проверочный процесс на свободном локальном порту.
Проверьте `curl -I http://127.0.0.1:3081/donetsk/moskva`, главную, `/donetsk`, страницу
услуги, sitemap и несуществующий адрес (HTTP 404). После проверки остановите этот
процесс через Ctrl+C. При ошибке сборки или `check:build` релиз не переключайте.

Вместо сборки на VPS допустим CI с совместимыми ОС, архитектурой, libc и версией
Node.js. Артефакты и зависимости должны происходить из одного проверенного релиза.
Не переносите с Mac Linux-серверу `.next` и `node_modules` без проверки совместимости.

## Что нужно для next start

Сохраняйте в каталоге релиза:

- полный `.next` из успешной сборки, включая `server`, `static` и manifest-файлы;
- `public`, включая фотографии и видео;
- `package.json`, `yarn.lock`, `.yarnrc.yml`, установленные зависимости;
- `next.config.ts`, `tsconfig.json` и `scripts/validate-production-api.mjs`;
- необходимые серверные переменные окружения.

Проще оставить полный каталог исходников после сборки. Не удаляйте вручную
devDependencies после `yarn install --immutable`: загрузка `next.config.ts`
использует TypeScript. `.next/standalone` и `out/` в этой схеме не используются.

## Постоянный процесс и Nginx

Для текущего VDS можно продолжать использовать PM2 и привычный каталог в `/root`.
Первый запуск из каталога **проверенного релиза**:

```bash
cd /root/medtaxi/front/medtaxi-evp
pm2 start node_modules/next/dist/bin/next --name medtaxi-front -- start --hostname 127.0.0.1 --port 3000
pm2 save
```

Команда `pm2 start` нужна для первого создания процесса. Если `medtaxi-front` уже
существует, не создавайте второй: сначала проверьте `pm2 describe medtaxi-front`
и его рабочий каталог/аргументы. При обновлении прежнего пути используйте
`pm2 restart medtaxi-front --update-env` только после успешной сборки и проверки.
Нельзя собирать поверх работающего релиза: для последовательного обновления
остановите процесс перед заменой файлов либо используйте отдельные каталоги релизов
и явно перенастройте путь PM2 на подготовленный каталог. При первой настройке
автозапуска выполните `pm2 startup`, затем указанную им команду и `pm2 save`.
Backend — отдельный процесс, его настройки приведены в его README.

Альтернатива PM2 — [пример systemd](../deploy/medtaxi-next.service.example).
Выберите один supervisor для frontend, иначе два процесса будут конкурировать за порт.
Для systemd адаптируйте пользователя, путь Node.js и каталог проекта.
`/srv/medtaxi/current` должен указывать
на проверенный релиз. При обновлении переключите эту ссылку и перезапустите
`medtaxi-next`; предыдущий релиз оставьте для отката. Один процесс с перезапуском
даёт небольшое окно недоступности, поэтому обновление лучше выполнять вне пика.
Переключение между двумя портами через Nginx можно организовать отдельно.

[Пример Nginx](../deploy/nginx-next.conf.example) размещается внутри существующего
HTTPS `server {}`. Сохраните сертификаты, HTTP→HTTPS перенаправление, заголовки
безопасности и несвязанные `location`. Существующий `/api/` замените примером,
не добавляйте вторую секцию с тем же путём. В `proxy_pass http://127.0.0.1:3235;`
нет завершающего `/`: backend должен получить полный `/api/feedback`, а не `/feedback`.
API не кешируется, его ошибки не подменяются HTML frontend. Лимит Nginx — 64 KiB,
чтобы пропускать Telegram webhook; для заявок и событий backend ограничивает тело
16 KiB. Удалите старое сопоставление
`try_files ... .html` и static `error_page 404 /404.html` для фронтенда: теперь
маршрутизацией и 404 управляет Next.js. Также замените старые `location`, которые
перехватывают `/_next/`, изображения или другие ресурсы и читают их из `out/`.

Next.js рекомендует reverse proxy и отключение буферизации для потоковых ответов.
Не добавляйте общий proxy-cache для HTML/RSC без учёта заголовков Next.js.
[Рекомендации самостоятельного размещения](https://nextjs.org/docs/app/guides/self-hosting).

После изменения Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Только если выбран systemd вместо PM2: `sudo systemctl daemon-reload`, затем
`sudo systemctl enable --now medtaxi-next`; при следующих релизах после переключения
ссылки — `sudo systemctl restart medtaxi-next`. В root-сессии `sudo` можно опустить.
Оба Node.js-процесса слушают только loopback; публичные порты обслуживает Nginx.
Изменение API и переключение frontend не требует смены A/NS домена.

## Временный резервный домен

Для `reserve.medtaxi-evp.ru` используйте [отдельный Nginx server](../deploy/nginx-reserve.conf.example):
он тоже направляет `/api/` на `127.0.0.1:3235`, остальные запросы — на Next.js:3000.
До открытия форм на этом домене добавьте **на backend**
`MEDTAXI_ADDITIONAL_ORIGINS=https://reserve.medtaxi-evp.ru` и перезапустите его
с обновлённым окружением. `MEDTAXI_URL=https://medtaxi-evp.ru` остаётся основным;
дополнительные origin задаются явно через запятую, без `*`, пути, query и hash.
Один неверный элемент останавливает запуск backend. Одного `CALL_CLICK_ALLOWED_ORIGINS`
недостаточно: этот список относится к прежним кликам других сайтов.

Frontend остаётся собранным с `NEXT_PUBLIC_API_URL=/api` и каноническим
`NEXT_PUBLIC_SITE_URL=https://medtaxi-evp.ru`. При таком значении API добавление
резервного origin не требует пересборки frontend. Backend сохраняет фактический
origin заявки/события; оба домена используют одну MedTaxi DB и те же каналы уведомлений.
После настройки A-записи, HTTPS и `nginx -t`/reload проверьте
`https://reserve.medtaxi-evp.ru/api/readyz`. Этот GET не создаёт заявок.

`X-Robots-Tag: noindex` задаётся только в server резервного домена. Не переносите
его в основной server: основной сайт должен индексироваться. Этот адрес помогает
при устаревшем DNS основного домена, но не заменяет отдельный VDS и резервную копию.

## Проверки

`yarn build:production` выполняет lint, тесты, Next build с проверкой типов и
`yarn check:build`. Последняя команда проверяет серверный manifest, HTML/RSC всех
URL sitemap, canonical, уникальные title/description, один H1 в видимом `main`,
JSON-LD, ссылки хлебных крошек и локальные ресурсы. Пустые используемые файлы
изображений/видео тоже вызывают ошибку. Это проверка текущей структуры Next.js 16;
после обновлений фреймворка проверяйте её соответствие артефактам.

После публикации проверьте работу на публичном HTTPS-домене, мобильную версию,
переходы между страницами, фото и видео, FAQ, телефонные ссылки, Telegram/MAX и
форму обратного звонка. Тестовая отправка формы создаёт реальную заявку в backend.
Дополнительно проверяйте страницы без JavaScript: бизнес-контент должен быть видим.
