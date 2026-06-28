Employee attendance & leave management system — Project Presentation (Kay Khaing Myint)

Short description
-----------------
Employee attendance & leave management system is a lightweight attendance and leave-management web application. It provides an API-driven backend for managing users, attendance check-in/check-out, and leave requests, plus a Vue 3 single-page frontend for employees, managers, and HR to interact with the system.

AI usage
--------
- The repo contains detection tooling that recognizes common AI agents (e.g., Claude, Copilot, Cursor) via environment variables; this is implemented through `laravel/agent-detector` and `laravel/pao` in `vendor/`

Tech stack
----------
- Backend: PHP 8.3, Laravel 13
- Frontend: Vue 3 (Vite), Vue Router
- Styling: Tailwind CSS v4 processed with PostCSS
- Dev tooling: Vite 8, npm, Composer
- Database: SQLite (recommended for local dev) or any Laravel-supported DB
- Auth: Laravel Sanctum (API token flows)

Key features
------------
- Role-based access (hr, manager, employee)
- Attendance check-in/check-out with late detection
- Leave request submission and approval workflow
- Dashboard with role-specific summaries and tables
- API-first design with a SPA frontend

Quick run (local dev)
---------------------
1. Install dependencies and set up env

```bash
composer install
cp .env.example .env
php artisan key:generate
```

2. Database & seed

```bash
# easiest: sqlite
touch database/database.sqlite
# set DB_CONNECTION=sqlite in .env then:
php artisan migrate --seed
```

3. JavaScript deps & dev server

```bash
npm install
composer run dev   # recommended: coordinated dev (Laravel + Vite)
# OR separately:
# npm run dev -- --host
# php artisan serve --host=localhost --port=8000
```

Demo credentials (from seeder)
-----------------------------
- HR: hr@company.com / password
- Manager: manager@company.com / password
- Employee: alice.johnson@company.com / password

Important files & where to look
-------------------------------
- Backend routes & controllers: `routes/api.php`, `app/Http/Controllers/Api/`
- Models: `app/Models/` (User, AttendanceRecord, LeaveRequest)
- Frontend entry: `resources/js/app.js`, pages in `resources/js/pages/`
- Tailwind/PostCSS: `tailwind.config.cjs`, `postcss.config.cjs`, `resources/css/app.css`
- Docs: `docs/DEVELOPER_GUIDE.md` (extended dev notes)

Contact / next steps
--------------------
If you want I can:
- Add a lightweight agent endpoint and UI to demo a running assistant.
- Install and configure Laravel Boost (or another agent framework) with an example skill.
- Create CI steps to run tests and build assets.

Generated on 2026-06-14
