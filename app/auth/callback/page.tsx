'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      const { error } = await supabase.auth.getSession()
      if (error) { router.push('/auth/login?error=callback_failed'); return }
      router.push('/dashboard')
    }
    handleCallback()
  }, [router])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ fontSize: '2rem' }}>🔐</div>
      <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem' }}>Logging you in...</p>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Please wait a moment</p>
    </div>
  )
}
