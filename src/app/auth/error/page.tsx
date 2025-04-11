'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function AuthError() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            認証エラー
          </h1>
          <p className="text-gray-600 mb-8">
            認証処理中にエラーが発生しました。
            <br />
            お手数ですが、もう一度ログインをお試しください。
          </p>
          <div className="space-y-4">
            <Button
              onClick={() => router.push('/login')}
              className="w-full"
            >
              ログインページに戻る
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              className="w-full"
            >
              トップページに戻る
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 