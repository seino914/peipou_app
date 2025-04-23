# マーケティングリサーチ支援アプリ

## 目次

- [概要](#概要)
- [ディレクトリ構成](#ディレクトリ構成)
- [技術スタック](#技術スタック)
- [環境構築](#環境構築)
- [セットアップ](#セットアップ)
  - [必要条件](#必要条件)
  - [インストール](#インストール)
  - [環境変数の設定](#環境変数の設定)
- [開発](#開発)
  - [開発サーバーの起動](#開発サーバーの起動)
  - [データベースの操作](#データベースの操作)
  - [テスト](#テスト)
  - [リント・フォーマット](#リントフォーマット)
- [デプロイ](#デプロイ)
- [その他](#その他)
  - [コミット規約](#コミット規約)
  - [ブランチ戦略](#ブランチ戦略)

## ディレクトリ構成

```
/
├── .vscode/             # VSCode設定（基本いじらない）
├── prisma/              # データベース関連
│   ├── migrations/      # マイグレーションファイル
│   ├── schema.prisma    # データベーススキーマ定義
│   └── seed.ts          # 初期データ投入スクリプト
├── public/              # 静的ファイル（画像など）
├── src/                 # ソースコード
│   ├── app/             # Next.js App Router
│   │   ├── layout.tsx   # レイアウトコンポーネント
│   │   └── page.tsx     # メインページ
│   ├── styles/          # スタイル関連
│   └── env.ts           # 環境変数の型定義
├── supabase/            # Supabase関連の設定
├── node_modules/        # 依存パッケージ（基本いじらない）
├── .env                 # 環境変数
├── .env.example         # 環境変数のテンプレート
├── .gitignore           # Git除外設定
├── .prettierrc.mjs      # Prettier設定
├── eslint.config.mjs    # ESLint設定
├── next.config.js       # Next.js設定
├── package.json         # プロジェクト設定と依存関係
├── pnpm-lock.yaml       # 依存関係のロックファイル
├── postcss.config.mjs   # PostCSS設定
├── tailwind.config.ts   # Tailwind CSS設定
├── tsconfig.json        # TypeScript設定
└── README.md            # プロジェクトの説明書
```

## 技術スタック

- Next.js(React)
- TypeScript
- Tailwind CSS
- Prisma
- supabase
- shadcn ui
- Framer Motion
- Formspree（フォーム管理）

## 環境構築

```bash
pnpm install
```

<details>
<summary>データベース設定</summary>

```
npx supabase@latest init
```

#### ローカルデータベースを開始

```
npx supabase start
```

#### ローカルデータベースを停止

```
npx supabase stop
```

#### ローカルデータベースをリセット

```
npx supabase db reset
```

#### generate

```
pnpm prisma generate
```

#### migration

```
pnpm run db:migrate --name マイグレーション名
```

#### seed

```
pnpm run db:seed
```

#### Prisma Studio 起動

```
pnpm run db:studio
```

</details>

<details>
<summary>その他</summary>

#### 型チェック

```bash
pnpm run typecheck
```

#### クリーンアップ

<details>
<summary>クリーンアップ対象ファイル、ディレクトリ</summary>

- `.next/`
- `node_modules/`
- `dist/`
- `out/`
- gitで管理されていないファイル
- 未追跡のファイル

</details>

```bash
pnpm run clean
```

#### ESLint

```bash
# 検知のみ
pnpm run lint

# 自動修正
pnpm run lint --fix
```

#### Prettier

```bash
pnpm run format
```

</details>
