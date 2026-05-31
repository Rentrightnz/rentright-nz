'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [magicSent, setMagicSent] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    if (!email || !password) { setError('Please enter your email and password'); return }
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    router.push('/dashboard')
  }

  const handleMagicLink = async () => {
    if (!email) { setError('Please enter your email first'); return }
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
    })
    if (error) { setError(error.message); setLoading(false); return }
    setMagicSent(true); setLoading(false)
  }

  return (
    <>
      <nav>
        <Link href="/" className="logo">Rent<span>Right</span> NZ</Link>
        <ul className="nav-links">
          <li><Link href="/search">Search Landlords</Link></li>
          <li><Link href="/for-landlords">For Landlords</Link></li>
        </ul>
      </nav>

      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem 2rem' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏠</div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Landlord Login
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Access your RentRight NZ dashboard
            </p>
          </div>

          {magicSent ? (
            <div style={{ background: 'rgba(62,207,110,0.1)', border: '1px solid rgba(62,207,110,0.3)', borderRadius: 16, padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📧</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '0.5rem' }}>Check your email!</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                We sent a magic link to <strong>{email}</strong>. Click it to log in — no password needed.
              </p>
            </div>
          ) : (
            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 20, padding: '2rem' }}>
              {error && (
                <div style={{ background: 'rgba(232,64,64,0.08)', border: '1px solid rgba(232,64,64,0.2)', borderRadius: 10, padding: '0.8rem 1rem', marginBottom: '1.2rem', fontSize: '0.85rem', color: '#e84040' }}>
                  ⚠ {error}
                </div>
              )}

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Email</label>
                <input type="email" className="search-input" placeholder="your@email.com"
                  value={email} onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', borderRadius: 10 }} />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Password</label>
                <input type="password" className="search-input" placeholder="••••••••"
                  value={password} onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  style={{ width: '100%', borderRadius: 10 }} />
              </div>

              <button className="btn-primary" onClick={handleLogin} disabled={loading}
                style={{ width: '100%', justifyContent: 'center', borderRadius: 10, padding: '0.9rem', fontSize: '0.95rem' }}>
                {loading ? 'Logging in...' : 'Log In →'}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.2rem 0' }}>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>or</span>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              </div>

              <button className="btn-outline" onClick={handleMagicLink} disabled={loading}
                style={{ width: '100%', justifyContent: 'center', borderRadius: 10, padding: '0.85rem' }}>
                ✉ Send Magic Link (no password)
              </button>

              <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                No account yet?{' '}
                <Link href="/auth/signup" style={{ color: 'var(--green)', fontWeight: 500 }}>Sign up free →</Link>
              </p>
            </div>
          )}
        </div>
      </div>

      <footer>
        <Link href="/" className="logo">Rent<span>Right</span> NZ</Link>
        <div>Landlord Portal</div>
        <div>hello@rentrightnz.co.nz</div>
      </footer>
    </>
  )
}
