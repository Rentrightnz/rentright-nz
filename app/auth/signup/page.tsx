'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('landlord')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSignup = async () => {
    if (!name || !email || !password) { setError('Please fill in all fields'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true); setError('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) { setError(error.message); setLoading(false); return }
    setSuccess(true); setLoading(false)
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
        <div style={{ width: '100%', maxWidth: 460 }}>

          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏠</div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Create Your Account
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Claim your landlord profile on RentRight NZ
            </p>
          </div>

          {success ? (
            <div style={{ background: 'rgba(62,207,110,0.1)', border: '1px solid rgba(62,207,110,0.3)', borderRadius: 16, padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎉</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', marginBottom: '0.8rem' }}>Account created!</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                We sent a confirmation email to <strong>{email}</strong>.
                Click the link in the email to verify your account, then log in to access your dashboard.
              </p>
              <Link href="/auth/login" className="btn-primary" style={{ display: 'inline-flex', justifyContent: 'center' }}>
                Go to Login →
              </Link>
            </div>
          ) : (
            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 20, padding: '2rem' }}>

              {/* ROLE SELECTOR */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1.5rem' }}>
                {[
                  { id: 'landlord', label: '🏠 I am a Landlord', desc: 'I own rental properties' },
                  { id: 'property_manager', label: '🏢 Property Manager', desc: 'I manage properties for others' }
                ].map(r => (
                  <button key={r.id} onClick={() => setRole(r.id)} style={{
                    padding: '0.9rem', borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                    border: `1.5px solid ${role === r.id ? 'var(--green)' : 'var(--border)'}`,
                    background: role === r.id ? 'rgba(45,90,61,0.06)' : 'white',
                    transition: 'all 0.2s'
                  }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 500, marginBottom: '0.2rem' }}>{r.label}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{r.desc}</div>
                  </button>
                ))}
              </div>

              {error && (
                <div style={{ background: 'rgba(232,64,64,0.08)', border: '1px solid rgba(232,64,64,0.2)', borderRadius: 10, padding: '0.8rem 1rem', marginBottom: '1.2rem', fontSize: '0.85rem', color: '#e84040' }}>
                  ⚠ {error}
                </div>
              )}

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Full Name</label>
                <input type="text" className="search-input" placeholder="John Smith"
                  value={name} onChange={e => setName(e.target.value)}
                  style={{ width: '100%', borderRadius: 10 }} />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Email</label>
                <input type="email" className="search-input" placeholder="your@email.com"
                  value={email} onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', borderRadius: 10 }} />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Password</label>
                <input type="password" className="search-input" placeholder="Min. 6 characters"
                  value={password} onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSignup()}
                  style={{ width: '100%', borderRadius: 10 }} />
              </div>

              <button className="btn-primary" onClick={handleSignup} disabled={loading}
                style={{ width: '100%', justifyContent: 'center', borderRadius: 10, padding: '0.9rem', fontSize: '0.95rem' }}>
                {loading ? 'Creating account...' : 'Create Free Account →'}
              </button>

              <div style={{ background: 'var(--cream)', borderRadius: 10, padding: '0.8rem 1rem', marginTop: '1rem', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                🔒 By signing up you agree to our Terms of Service. Your profile is free forever. Premium features from $49/month.
              </div>

              <p style={{ textAlign: 'center', marginTop: '1.2rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Already have an account?{' '}
                <Link href="/auth/login" style={{ color: 'var(--green)', fontWeight: 500 }}>Log in →</Link>
              </p>
            </div>
          )}
        </div>
      </div>

      <footer>
        <Link href="/" className="logo">Rent<span>Right</span> NZ</Link>
        <div>Landlord Portal · Free to join</div>
        <div>hello@rentrightnz.co.nz</div>
      </footer>
    </>
  )
}
