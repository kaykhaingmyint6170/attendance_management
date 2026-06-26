// Generate static index.html for Cloudflare Pages from Vite manifest
const fs = require('fs');
const path = require('path');

const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'build', 'manifest.json'), 'utf8'));
const jsEntry = manifest['resources/js/app.js'];
const cssEntries = jsEntry.css || [];
const allCss = [manifest['resources/css/app.css'], ...cssEntries.map(f => ({ file: f }))].filter(Boolean);

const cssLinks = allCss.map(c => `    <link rel="stylesheet" href="/build/${c.file}">`).join('\n');
const scriptTag = `    <script type="module" src="/build/${jsEntry.file}"></script>`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Attendance System</title>
    <link rel="icon" href="/favicon.ico">
${cssLinks}
</head>
<body>
    <div id="app"></div>
${scriptTag}
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'public', 'build', 'index.html'), html);
console.log('✅ Generated public/build/index.html from manifest.json');
