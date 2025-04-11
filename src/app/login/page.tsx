'use client'

import { SocialLogin } from '@/components/auth/social-login'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>ログイン</CardTitle>
          <CardDescription>
            ソーシャルアカウントでログインしてください
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SocialLogin />
        </CardContent>
      </Card>
    </div>
  )
} 