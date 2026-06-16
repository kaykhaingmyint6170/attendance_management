DEVELOPER GUIDE

This project is a small Laravel (v13) application providing attendance and leave-management APIs and a Vue 3 SPA frontend built with Vite.

This guide collects essential developer information: quick start, run commands, architecture notes, troubleshooting tips (especially Tailwind/Vite issues), and locations of important files.

## Quick start — setup (fresh machine)

1. Clone the repo and change directory:

```bash
git clone <repo-url> project
cd project
```

2. PHP dependencies and environment:

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
```

Use a local database (SQLite is simplest):

```bash
# create an sqlite file and set DB_CONNECTION=sqlite in .env
touch database/database.sqlite
php artisan migrate --seed
```

3. JavaScript dependencies and build:

```bash
npm install
npm run dev    # for development (vite watch + dev-server)
npm run build  # production build (generates assets into public/build)
```

4. Run the Laravel dev server (if not using composer dev script):

```bash
php artisan serve --host=localhost --port=8000
```

Alternatively use the project's composer dev script which coordinates multiple processes:

```bash
composer run dev
```

## What the composer `dev` script does

The `composer run dev` script in this repository runs a coordinated development environment (Laravel server, queue worker, logs, and Vite dev server). It's the recommended way to work locally when actively developing both backend and frontend.

## Project structure highlights

- `app/Http/Controllers/Api` — API controllers (AuthController, UserController, AttendanceController, LeaveRequestController, DashboardController).
- `app/Models` — Eloquent models: `User`, `AttendanceRecord`, `LeaveRequest`.
- `database/migrations` — DB schema and constraints (note unique constraint on attendance_records by user+date, and handled_by FK on leave_requests).
- `database/seeders/DatabaseSeeder.php` — Seeds demo users (HR, Manager, Employees) plus attendance and leave requests.
- `resources/js` — Vue 3 SPA entry (`app.js`), components and pages.
- `resources/css/app.css` — Tailwind entry CSS.
- `resources/views/welcome.blade.php` — SPA hosting Blade view; uses `@vite([...])` to include assets.
- `vite.config.js` — Vite + Laravel plugin configuration.

## Dev notes and conventions

- PHP: 8.3, Laravel 13.
- Frontend: Vue 3, Vite, Tailwind CSS v4 processed via PostCSS.
- Auth: Laravel Sanctum used for API tokens.
- Pagination: controllers typically use `->paginate(20)` for listing APIs.
- Model casts: models define a protected `casts()` method (follow that style if adding casts).
- User attributes: `User` uses PHP 8 attributes for fillable/hidden metadata.

## Tailwind / PostCSS / Vite troubleshooting (common issues)

This repository uses `"type": "module"` in `package.json`. That makes Node treat `.js` config files as ESM. Many PostCSS/Tailwind tools expect CommonJS. To avoid ESM/CommonJS issues this repo uses `.cjs` files for PostCSS and Tailwind config.

If you see runtime errors like "module is not defined" or "ERR_REQUIRE_ESM", check the following:

- Ensure `postcss.config.cjs` and `tailwind.config.cjs` exist in the project root.
- Delete any conflicting `postcss.config.js` or `tailwind.config.js` files (these will be interpreted as ESM when `type: module` is set and can cause failures).
- Ensure dev dependencies are installed:

```bash
npm install --save-dev tailwindcss@4 autoprefixer @tailwindcss/postcss
```

Start the dev environment:

```bash
# recommended
composer run dev
# OR start Vite and the Laravel server separately
npm run dev -- --host
php artisan serve --host=localhost --port=8000
```

Important note about hostnames and dev-client URLs

When Laravel injects Vite dev URLs into Blade it uses the request host. If your browser or `php artisan serve` request uses IPv6 loopback (`[::1]`) while Vite is bound to `localhost`/`127.0.0.1`, the browser might try to fetch assets from `http://[::1]:5173/...` and fail. To avoid this:

- Open the app at `http://localhost:8000` (explicit `localhost`) in your browser.
- Or start Vite with `--host` so it listens on all interfaces and Laravel will inject compatible host URLs:

```bash
npm run dev -- --host
```

If CSS still doesn't load:

- Remove `public/build` so Blade will reference the dev server instead of built assets:

```bash
rm -rf public/build
composer run dev
```

- Use browser DevTools Network tab to inspect where `@vite/client` and your CSS/JS are being requested from. Look for mismatched hostnames or port numbers.

## How to create a demo user and seed data

The `DatabaseSeeder` creates an HR user, Manager, several employee users, and sample attendance and leave records. To seed:

```bash
php artisan migrate:fresh --seed
```

The seeder prints demo logins in the seeder output (look at console when running `php artisan db:seed` or `migrate:fresh --seed`).

## Running tests

Run PHPUnit tests provided in the `tests/` directory:

```bash
composer test
# or
php artisan test
```

## Useful commands quick reference

```bash
# install PHP deps
composer install
# install JS deps
npm install
# run coordinated dev environment (recommended)
composer run dev
# or run separately
npm run dev -- --host
php artisan serve --host=localhost --port=8000
# build for production
npm run build
# run tests
composer test
# seed demo data
php artisan migrate:fresh --seed
```

## Key files to check when making changes

- Backend: `app/Http/Controllers/Api/*`, `app/Models/*`, `database/migrations/*`, `database/seeders/DatabaseSeeder.php`.
- Frontend: `resources/js/app.js`, `resources/js/components`, `resources/js/pages`, `resources/css/app.css`, `vite.config.js`.
- Dev tooling: `package.json`, `postcss.config.cjs`, `tailwind.config.cjs`.

## Automation/Extras

- `tools/screenshot-dashboard.js` — small Puppeteer script added to capture screenshots of the SPA (useful for demos). It attempts to use system Chrome if local Chromium isn't available.

## Next steps and optional improvements

- Add CI steps to run `composer test` and `npm run build` and publish artifacts.
- Consider adding a `Makefile` or `dev` script wrapper for local convenience.
- If you want an integrated "skill agent" (e.g., Laravel Boost), say which agent and I can prepare an installation and a minimal skill example.

## Contact / notes

If you hit an environment-specific error (OS X Chrome path, firewall, Node version), include exact error output and the output of `node -v`, `npm -v`, and `php -v` so the guide can be updated with targeted fixes.


---
Generated on 2026-06-13
