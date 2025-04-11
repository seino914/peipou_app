import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 認証が不要なパスを定義
const publicPaths = ['/login', '/signup', '/auth/callback']

export async function middleware(request: NextRequest) {
  // レスポンスの作成
  const res = NextResponse.next()
  
  // Supabaseクライアントの作成
  const supabase = createMiddlewareClient({ req: request, res })
  
  // 現在のパスを取得
  const { pathname } = request.nextUrl
  
  // 認証コールバックのパスはそのまま処理を続行
  if (pathname === '/auth/callback') {
    return res
  }
  
  // セッションの取得
  const { data: { session } } = await supabase.auth.getSession()
  
  // 認証済みの場合
  if (session) {
    // ログインページや公開ページにアクセスしようとしている場合はダッシュボードにリダイレクト
    if (pathname === '/' || pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return res
  }
  
  // 未認証の場合
  // 保護されたルートへのアクセスを試みた場合はログインページにリダイレクト
  if (!publicPaths.includes(pathname) && !pathname.startsWith('/_next')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return res
}

// ミドルウェアを適用するパスの設定
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 