import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  // codeパラメータがない場合はエラー
  if (!code) {
    console.error('No code provided in callback')
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Cookieストアの準備
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  
  try {
    // 認証コードをセッションに交換
    await supabase.auth.exchangeCodeForSession(code)
    
    // ダッシュボードにリダイレクト
    return NextResponse.redirect(new URL('/dashboard', request.url))
  } catch (error) {
    console.error('Error exchanging code for session:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

// HTMLレスポンスを生成する関数
function createHtmlResponse(message: string, redirectUrl: string) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0;url=${redirectUrl}">
  <script>window.location.href = "${redirectUrl}";</script>
  <title>リダイレクト中...</title>
  <style>
    body { font-family: sans-serif; text-align: center; padding-top: 50px; }
  </style>
</head>
<body>
  <h1>${message}</h1>
  <p>自動的にリダイレクトされない場合は<a href="${redirectUrl}">こちら</a>をクリックしてください。</p>
</body>
</html>
  `;
  
  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Location': redirectUrl
    }
  });
}

// リダイレクト先の安全性を検証する関数
function validateRedirectTo(path: string): string {
  // 許可された遷移先パスのリスト
  const allowedPaths = ['/dashboard', '/profile', '/settings']
  
  // パスの正規化
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  
  // パスが許可リストに含まれているか確認
  if (allowedPaths.includes(normalizedPath)) {
    return normalizedPath
  }
  
  // デフォルトのリダイレクト先
  return '/dashboard'
} 