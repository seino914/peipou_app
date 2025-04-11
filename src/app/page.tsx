'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // セッションをチェックして適切な場所にリダイレクト
    async function checkSession() {
      const supabase = createClientComponentClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        // 認証済みならダッシュボードへ
        router.push('/dashboard')
      } else {
        // 未認証ならログインへ
        router.push('/login')
      }
    }

    checkSession()
  }, [router])

  // ローディング表示
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">ようこそ</h1>
        <p className="text-gray-600">ログイン状態を確認しています...</p>
      </div>
    </div>
  )
}
