# マーケティングリサーチ支援アプリ

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
