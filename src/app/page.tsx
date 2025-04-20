import { SearchForm } from "@/app/_components/SearchForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
              マーケティングリサーチ支援アプリ
            </h1>
            <p className="text-xl text-muted-foreground">商圏分析、1秒で。</p>
            <p className="text-muted-foreground">
              検索した地域の人口、飲食店数、イベント件数などの統計データを一括で取得・可視化できる、出店・集客戦略のためのマーケティング支援アプリです。
            </p>
          </div>
          <SearchForm />
        </div>
      </main>
    </div>
  );
}
