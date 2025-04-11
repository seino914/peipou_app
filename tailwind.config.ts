import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // カスタムカラーを追加する場合はここに
      },
      // その他のテーマの拡張設定
    },
  },
  plugins: [],
  // 最新のJITコンパイラを有効化（デフォルトで有効）
  darkMode: "class", // ダークモードの設定
};

export default config;
