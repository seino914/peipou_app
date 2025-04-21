export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-10">
        <div className="space-y-6 max-w-3xl mx-auto text-center">
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
              アプリ概要
            </h1>
            <div className="prose max-w-none mx-auto">
              <p>アプリの概要ページです。</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
