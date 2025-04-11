'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    
    // ユーザーの認証状態をチェック
    async function fetchUser() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          router.push('/login')
          return
        }
        
        setUser(session.user)
      } catch (error) {
        console.error('ユーザーセッションの取得に失敗しました:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }
    
    fetchUser()
    
    // 認証状態の変更を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/login')
        return
      }
      
      if (session) {
        setUser(session.user)
      } else {
        setUser(null)
        router.push('/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  // ログアウト処理
  async function handleSignOut() {
    setLoading(true)
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push('/login')
    } catch (error) {
      console.error('ログアウト中にエラーが発生しました:', error)
      alert('ログアウトに失敗しました。もう一度お試しください。')
      setLoading(false)
    }
  }

  // ローディング中の表示
  if (loading) {
    return (
      <div className="container flex h-screen w-screen items-center justify-center">
        <p className="text-gray-600">ロード中...</p>
      </div>
    )
  }

  // ユーザーが存在しない場合はnullを返す（ルーターのリダイレクトが処理中）
  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>ダッシュボード</CardTitle>
          <CardDescription>ようこそ {user.email || 'ゲスト'} さん</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="font-medium mb-2">ユーザー情報</h3>
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>メール:</strong> {user.email}</p>
              <p><strong>プロバイダー:</strong> {user.app_metadata?.provider || '不明'}</p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleSignOut}
              disabled={loading}
              className="mt-4"
            >
              {loading ? 'ログアウト中...' : 'ログアウト'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 