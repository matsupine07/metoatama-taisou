// 配る形にまとめる（13.pineapp.jp ＝ Cloudflare Pages の pineapp13）。2026-11-25
//
// このフォルダには開発メモ（CLAUDE.md など）もあるので、公開するファイルだけを `_cloudflare/pineapp13/` に写す。
// ⛔写しは手で直さない（正本はこのフォルダの index.html など）。
//
//   node tools/配る形にまとめる.mjs
//   npx wrangler pages deploy "_cloudflare/pineapp13" --project-name pineapp13 --branch main --commit-dirty=true
//   ⚠️wrangler は claude フォルダで打つ（ほかのフォルダの wrangler.toml を拾わないように）

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT = path.join(HERE, '_cloudflare', 'pineapp13');
const FILES = ['index.html', 'privacy.html', 'manifest.webmanifest', 'sw.js', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
for (const f of FILES) fs.copyFileSync(path.join(HERE, f), path.join(OUT, f));
// サービスワーカーは毎回たしかめさせる（古い sw.js が残ると、新しい版に替わらない）
fs.writeFileSync(path.join(OUT, '_headers'), '/sw.js\n  Cache-Control: no-cache\n');
console.log(`写した ${FILES.length} 本＋_headers → ${path.relative(HERE, OUT)}`);
