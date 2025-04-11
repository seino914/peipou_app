# マーケティングリサーチ支援アプリ

## 環境構築

```bash
pnpm install
```

### データベース設定
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
