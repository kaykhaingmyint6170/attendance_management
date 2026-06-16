---
name: attendance-leave-management
description: Rules for processing employee attendance logs, validating leave requests, and styling status badges using Laravel, Vue 3, and Tailwind CSS. Use this skill whenever building or modifying features related to check-ins, leave balances, and dashboard metrics.
---

# Attendance & Leave Application Rules Skill

This skill enforces strict formatting, validation, and coding standards specifically tailored for managing workforce attendance and leave operations.

## Architecture & Code Standards
- **Laravel Best Practices:** Controllers must remain skinny. Move heavy leave approval logic or working hour calculations into separate Service classes.
- **Form Validation:** All check-in inputs and leave applications must have tight validation constraints (e.g., `start_date` must be before or equal to `end_date`, dates must not overlap with existing approved leaves).
- **Date/Time Handling:** Always use standard Laravel/Carbon date formats (`Y-m-d`) and time stamps for tracking check-ins. Keep time-zone configurations consistent.

## UI & UX Conventions
- **Status Badges:** Use consistent Tailwind colors for attendance and leave statuses:
  - `Approved` / `Checked-In`: Green (`bg-green-500` / `text-white`)
  - `Pending`: Yellow/Amber (`bg-amber-500` / `text-white`)
  - `Rejected` / `Absent`: Red (`bg-red-500` / `text-white`)
- **Responsive Layouts:** All components fetched via Magic MCP or written manually must be fully responsive, prioritizing mobile-friendly check-in buttons and clear desktop admin grids.
