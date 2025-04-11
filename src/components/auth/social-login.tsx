'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase'
import { FcGoogle } from 'react-icons/fc'

export function SocialLogin() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleGoogleLogin() {
    try {
      setIsLoading(true)
      const supabase = createClient()
      
      // ソーシャルログイン（Google）を実行
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })
      
      // エラーハンドリング
      if (error) {
        console.error('ログインエラー:', error.message)
        throw error
      }
    } catch (error) {
      console.error('ログイン処理中にエラーが発生しました:', error)
      alert('ログインに失敗しました。もう一度お試しください。')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="animate-spin mr-2">⏳</span>
        ) : (
          <FcGoogle className="h-5 w-5" />
        )}
        {isLoading ? 'ログイン中...' : 'Googleでログイン'}
      </Button>
    </div>
  )
} 