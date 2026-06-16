// Puppeteer script to register/login a demo employee, seed some attendance via API, and capture the dashboard
// Usage: node tools/screenshot-dashboard.js

import puppeteer from 'puppeteer';
import fetch from 'node-fetch';
import fs from 'fs';

const BASE = 'http://127.0.0.1:8000';
const SCREENSHOT_PATH = 'screenshots/dashboard-employee.png';

async function registerAndLogin() {
  const email = 'demo.employee@example.test';
  const password = 'password';

  // Register
  let res = await fetch(BASE + '/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Demo Employee', email, password, password_confirmation: password }),
  });
  if (!res.ok) {
    // Maybe user exists, try login
    res = await fetch(BASE + '/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  }
  const body = await res.json();
  return body.token || body.token;
}

async function seedAttendance(token) {
  // Create a couple of attendance records via check-in (today) and backfill others
  await fetch(BASE + '/api/attendance/check-in', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  });

  // No need to create more; Dashboard uses recent_attendance and today_record
}

(async () => {
  try {
    if (!fs.existsSync('screenshots')) fs.mkdirSync('screenshots');

    const token = await registerAndLogin();
    if (!token) throw new Error('Failed to obtain token');

    await seedAttendance(token);

    // Try to detect a system Chrome/Chromium on macOS. If CHROME_PATH env is set, use it.
    const possible = [];
    if (process.env.CHROME_PATH) possible.push(process.env.CHROME_PATH);
    // macOS common install locations
    possible.push(
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium'
    );

    let launchOpts = { args: ['--no-sandbox', '--disable-setuid-sandbox'] };
    for (const p of possible) {
      try {
        if (p && fs.existsSync(p)) {
          launchOpts.executablePath = p;
          break;
        }
      } catch (e) {
        // ignore
      }
    }

    const browser = await puppeteer.launch(launchOpts);
    const page = await browser.newPage();
    // Set token in localStorage before loading SPA
    await page.goto('about:blank');
    await page.evaluateOnNewDocument((t) => {
      localStorage.setItem('auth_token', t);
    }, token);

    // Navigate to dashboard
    await page.goto(BASE + '/', { waitUntil: 'networkidle2' });
    // Wait for dashboard element
    await page.waitForSelector('h1', { timeout: 10000 });
  // Wait a little for data to render (portable delay)
  await new Promise((resolve) => setTimeout(resolve, 1500));

    await page.screenshot({ path: SCREENSHOT_PATH, fullPage: true });
    console.log('Saved', SCREENSHOT_PATH);
    await browser.close();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
