# このプロジェクトについて

「めとあたまの たいそう」── 目と頭を毎日たのしく使う習慣をつくるアプリ。
視力回復・認知症対策をうたうのではなく、「習慣づくり」を目的とする
（医学的に治す・防ぐとは言わない）。

## つくっている人について（大事）

- **プログラミング初学者**です。学習しながら実装を進めたい。
- そのため、実装するときは **「何をしているか」「なぜそうするか（考え方）」を
  解説しながら** 進めること。コードを出して終わり、にしない。
- 専門用語はできるだけ避け、使うときは短く意味を添える。
- 一度にたくさん変えず、小さいステップで進め、各ステップで何が起きたか説明する。

### 解説のしかた（守ること）
- 変更の前に「これから何を・なぜやるか」を一言。
- 変更の後に「いま書いたコードはこう動く」をやさしく説明。
- 新しい考え方（関数・変数・イベント・保存 など）が出たら、その場で短く解説。
- 「ここはこう書くのが定番」という理由も添える。

## 技術メモ（このアプリの作り）

- **本体は `index.html` 1個**。HTML・CSS・JavaScript をすべてこの中にまとめている。
  ビルド作業や追加ソフトは不要。
- 外部ライブラリは使わない（素のJavaScript＝バニラJS）。
- データ保存は **localStorage**（その端末の中だけに保存。ログイン・サーバー不要）。
  保存キーは `kinokaifuku_v1`。名前・文字サイズ・音・**むずかしさ(level)**・実施日の一覧を保存。
- 画面切り替えは、`<section class="screen">` を表示/非表示で出し分ける方式。
  `show("画面id")` で切り替え、ホームへは `goHome()`（タイマー全停止＋連続モード解除）で戻る。
- トレーニングは4種：目の体操(eye)／遠近ピント(focus)／記憶ゲーム(memory)／けいさん(calc)。
  「きょうのトレーニング」は eye→focus→memory の3つを自動で連続実行（calc は単体メニューのみ）。
- **むずかしさ**は `levelCfg()` で一括管理（easy/normal/hard）。目の速さ・記憶の枚数と時間・
  けいさんの数の大きさに反映。
- **PWA対応**（ホーム画面に追加・オフライン起動）のため、`index.html` 以外に次のファイルがある：
  `manifest.webmanifest`（アプリ情報）、`sw.js`（オフライン用サービスワーカー）、
  `icon-192.png` / `icon-512.png` / `apple-touch-icon.png`（アイコン）。
  ※サービスワーカーは `file://` では動かない。簡易サーバーか公開後（https）で有効。
- スマホ・タブレット・PCのどのブラウザでも同じように動くようにする（レスポンシブ）。
- コードはセクションごとにコメントで区切る（共通／目の体操／ピント／記憶／けいさん／記録／設定）。

## 動作確認のしかた

- `index.html` をダブルクリックしてブラウザで開く。
- ローカルで確認する場合は `python -m http.server 8765` で簡易サーバーを立てられる
  （`.claude/launch.json` に設定済み）。

## 公開（2026-11-25 から 13.pineapp.jp）

- ⭐**本物の住所は https://13.pineapp.jp/**（Cloudflare Pages の `pineapp13`。pineさん「発信している物はすべてjpでナンバリングする」）。前の GitHub Pages（`matsupine07.github.io/metoatama-taisou/`）は、新しい住所へ移すだけのページにした（枝 `gh-pages`。`main` はアプリの正本のまま）
- このPCの置き場所は `Desktop\claude\2_アプリ\8_めとあたまのたいそう`（2026-11-25 に GitHub から取ってきた）
- 配り方：`node tools/配る形にまとめる.mjs`（公開するファイルだけを `_cloudflare/pineapp13/` に写す）→ claude フォルダで `npx wrangler pages deploy "2_アプリ/8_めとあたまのたいそう/_cloudflare/pineapp13" --project-name pineapp13 --branch main --commit-dirty=true`
- ⚠️`pineapp.jp` の下なので、Cloudflare Web Analytics が自動で入る（`privacy.html` に書いた）。広告は入れていない
- ⚠️Cloudflare Pages は `/index.html` を `/` へ、`/privacy.html` を `/privacy` へ移す（308）。だから `manifest.webmanifest` の `start_url` は `./`、`sw.js` は `./index.html` を保存しない（保存した転送をアプリを開くときに返すと、ブラウザがエラーにする）。`sw.js` を変えたら `CACHE` の番号を上げる
- ⚠️住所が変わったので、前の住所（github.io）で使っていた人の記録（localStorage）は引き継がれない（住所ごとに別の保存場所のため）

## ファイル

- `index.html` … アプリ本体
- `manifest.webmanifest` … PWAのアプリ情報（名前・アイコン・全画面表示）
- `sw.js` … オフライン用サービスワーカー
- `icon-192.png` / `icon-512.png` / `apple-touch-icon.png` … アプリアイコン
- `README.txt` … 利用者向けの使い方
- `CLAUDE.md` … この開発メモ
