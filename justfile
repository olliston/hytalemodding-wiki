install:
    bun install
    php artisan key:generate
    php artisan migrate --seed
    php artisan storage:link

refresh:
    php artisan migrate:fresh --seed

run-dev:
    bun run dev

run-server:
    php artisan serve
