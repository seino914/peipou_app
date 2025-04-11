'use client'

import { Button } from '@/components/ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export function LoginButton() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleLogin = async () => {
    try {
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

      if (error) {
        console.error('Error:', error.message)
      }
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <Button
      onClick={handleLogin}
      className="w-full"
      size="lg"
    >
      Googleでログイン
    </Button>
  )
} 