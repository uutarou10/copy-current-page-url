# Copy Current Page URL

トラッキングパラメータを除外したURLをクリップボードにコピーするChrome拡張機能です。

## 機能

- **Command + Shift + C**（Mac）/ **Ctrl + Shift + C**（Windows/Linux）でURLをコピー
- Google Analytics、Facebook、Twitter等のトラッキングパラメータを自動除外
- コピー完了時に右上にトースト通知を表示

## 除外されるトラッキングパラメータ

| サービス | パラメータ |
|---------|-----------|
| Google Analytics | `utm_*`, `_ga*`, `_gl*` |
| Google Ads | `gclid`, `gclsrc` |
| Facebook | `fbclid`, `fb_*` |
| Microsoft Ads | `msclkid` |
| Twitter | `twclid` |
| Instagram | `igshid` |
| Mailchimp | `mc_*` |
| その他 | `ref`, `source`, `campaign` |

## インストール方法

### 開発版（ソースからビルド）

1. リポジトリをクローン
   ```bash
   git clone https://github.com/uutarou10/copy-current-page-url.git
   cd copy-current-page-url
   ```

2. 依存関係をインストール
   ```bash
   pnpm install
   ```

3. ビルド
   ```bash
   pnpm build
   ```

4. Chromeに拡張機能を読み込む
   - `chrome://extensions` を開く
   - 右上の「デベロッパーモード」を有効にする
   - 「パッケージ化されていない拡張機能を読み込む」をクリック
   - `dist` フォルダを選択

## 開発

### 開発モード（ウォッチモード）

```bash
pnpm dev
```

ファイル変更時に自動でリビルドされます。Chromeで拡張機能をリロードするには、`chrome://extensions` で拡張機能の更新ボタンをクリックしてください。

### 型チェック

```bash
pnpm typecheck
```

### 本番ビルド

```bash
pnpm build
```

## ショートカットのカスタマイズ

`chrome://extensions/shortcuts` でショートカットキーをカスタマイズできます。

## 技術スタック

- TypeScript
- Vite + vite-plugin-web-extension
- webextension-polyfill
- Chrome Extension Manifest V3

## ライセンス

MIT
