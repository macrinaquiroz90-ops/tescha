#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const OUT_DIR = path.resolve(__dirname, '..', 'out');
const EXTRACT_DIR = path.join(OUT_DIR, '_next', 'extracted');
if (!fs.existsSync(EXTRACT_DIR)) fs.mkdirSync(EXTRACT_DIR, { recursive: true });

function sha384base64(buf) {
  return crypto.createHash('sha384').update(buf).digest('base64');
}

let fileCount = 0;
const htmlFiles = fs.readdirSync(OUT_DIR).filter(f => f.endsWith('.html'));
for (const file of htmlFiles) {
  const p = path.join(OUT_DIR, file);
  let html = fs.readFileSync(p, 'utf8');

  // Match inline <script>...</script> blocks without src
  const scriptRegex = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  const replacements = [];
  while ((match = scriptRegex.exec(html)) !== null) {
    const code = match[1];
    const trimmed = code.trim();
    if (!trimmed) continue;

    fileCount += 1;
    const fileName = `extracted-${path.basename(file, '.html')}-${fileCount}.js`;
    const outPath = path.join(EXTRACT_DIR, fileName);
    fs.writeFileSync(outPath, trimmed, 'utf8');

    const buf = Buffer.from(trimmed, 'utf8');
    const hash = sha384base64(buf);
    const integrity = `sha384-${hash}`;

    const replacement = `<script src="/_next/extracted/${fileName}" integrity="${integrity}" crossorigin="anonymous"></script>`;
    replacements.push({ from: match[0], to: replacement });
  }

  for (const r of replacements) {
    html = html.replace(r.from, r.to);
  }

  fs.writeFileSync(p, html, 'utf8');
  if (replacements.length) console.log(`Processed ${file}: extracted ${replacements.length} scripts`);
}

console.log(`Done. Extracted ${fileCount} scripts to ${EXTRACT_DIR}`);
