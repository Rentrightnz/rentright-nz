'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ForLandlordsPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <nav>
        <Link href="/" className="logo">Rent<span>Right</span> NZ</Link>
        <ul className="nav-links">
          <li><Link href="/search">Search Landlords</Link></li>
          <li><Link href="/for-landlords">For Landlords</Link></li>
        </ul>
      </nav>

      <div style={{ paddingTop: '5rem' }}>

        {/* HERO */}
        <section style={{ background: 'var(--black)', color: 'var(--white)', padding: '6rem 2rem', textAlign: 'center' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.5)', marginBottom: '1rem' }}>For Landlords & Property Managers</div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '1.2rem' }}>
              Your reputation is already<br /><span style={{ color: 'var(--orange)' }}>being talked about.</span>
            </h1>
            <p style={{ color: 'rgba(245,240,232,0.7)', fontSize: '1.05rem', lineHeight: 1.8, fontWeight: 300, marginBottom: '2.5rem' }}>
              Renters are already searching for you. Claim your free profile, respond to reviews, and show future tenants that you&apos;re one of the good ones. Good landlords have nothing to hide — and everything to gain.
            </p>
            <button
              className="btn-primary"
              onClick={() => document.getElementById('claim')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ fontSize: '1rem', padding: '0.9rem 2.2rem' }}
            >
              Claim Your Free Profile →
            </button>
          </div>
        </section>

        {/* BENEFITS */}
        <section style={{ padding: '5rem 2rem' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 500, marginBottom: '0.8rem' }}>Why Claim Your Profile</div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>Good landlords deserve good tenants</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.2rem' }}>
              {[
                { icon: '🛡️', title: 'Control your story', desc: 'Respond to reviews professionally. One fair response to a negative review shows future tenants you\'re reasonable and accountable.' },
                { icon: '🎯', title: 'Attract better tenants', desc: 'A verified profile with strong reviews means qualified, respectful tenants apply first — reducing vacancies and headaches.' },
                { icon: '⚡', title: 'Faster tenant matching', desc: 'We connect landlords who list on our platform with pre-screened renters who have verified rental histories and references.' },
                { icon: '📊', title: 'Compliance dashboard', desc: 'Track your Healthy Homes compliance, upcoming inspection dates, and bond status — all in one free dashboard.' },
              ].map(b => (
                <div key={b.title} className="card" style={{ padding: '1.8rem' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>{b.icon}</div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{b.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.7, fontWeight: 300 }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section style={{ background: 'var(--cream)', padding: '5rem 2rem' }}>
          <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 500, marginBottom: '0.8rem' }}>Simple Pricing</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 700, marginBottom: '3rem', letterSpacing: '-0.02em' }}>
              Start free. Upgrade when ready.
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.2rem' }}>
              {[
                {
                  name: 'Free', price: '$0', period: 'forever',
                  features: ['Basic profile page', 'View your reviews', 'Respond to reviews', 'Tribunal record display'],
                  cta: 'Get Started Free', highlight: false
                },
                {
                  name: 'Verified', price: '$49', period: 'per month',
                  features: ['Verified badge on profile', 'Priority in search results', 'Tenant matching service', 'Compliance dashboard', 'Analytics & insights', 'Remove ads from profile'],
                  cta: 'Start Free Trial', highlight: true
                }
              ].map(plan => (
                <div key={plan.name} style={{
                  background: plan.highlight ? 'var(--green)' : 'white',
                  color: plan.highlight ? 'var(--white)' : 'var(--black)',
                  border: `1px solid ${plan.highlight ? 'transparent' : 'var(--border)'}`,
                  borderRadius: 20, padding: '2rem',
                  boxShadow: plan.highlight ? '0 8px 32px rgba(45,90,61,0.25)' : 'none'
                }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: plan.highlight ? 0.7 : 1, color: plan.highlight ? 'var(--white)' : 'var(--text-muted)', marginBottom: '0.5rem' }}>{plan.name}</div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 700, lineHeight: 1, marginBottom: '0.3rem' }}>{plan.price}</div>
                  <div style={{ fontSize: '0.82rem', opacity: 0.6, marginBottom: '1.5rem' }}>{plan.period}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.8rem' }}>
                    {plan.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', opacity: plan.highlight ? 0.9 : 1 }}>
                        <span style={{ color: plan.highlight ? 'rgba(245,240,232,0.8)' : 'var(--score-high)' }}>✓</span> {f}
                      </div>
                    ))}
                  </div>
                  <button style={{
                    width: '100%', padding: '0.8rem', borderRadius: '100px', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: '0.9rem', cursor: 'pointer',
                    background: plan.highlight ? 'rgba(255,255,255,0.15)' : 'var(--green)',
                    color: 'white', border: plan.highlight ? '1px solid rgba(255,255,255,0.2)' : 'none',
                    transition: 'all 0.2s'
                  }}
                    onClick={() => document.getElementById('claim')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLAIM FORM */}
        <section id="claim" style={{ padding: '5rem 2rem', textAlign: 'center' }}>
          <div style={{ maxWidth: 500, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              Claim your free profile
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem', fontWeight: 300 }}>
              Enter your email and we&apos;ll send you a link to verify and claim your landlord profile on RentRight NZ.
            </p>

            {!submitted ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <input
                  type="email"
                  className="search-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ borderRadius: '100px', textAlign: 'center' }}
                />
                <button
                  className="btn-primary"
                  onClick={() => email.includes('@') && setSubmitted(true)}
                  style={{ borderRadius: '100px', padding: '0.9rem', fontSize: '0.95rem' }}
                >
                  Send Me the Link →
                </button>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Free forever. No credit card required.
                </p>
              </div>
            ) : (
              <div style={{ background: 'rgba(62,207,110,0.1)', border: '1px solid rgba(62,207,110,0.3)', borderRadius: 16, padding: '2rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>✅</div>
                <div style={{ fontWeight: 500, marginBottom: '0.4rem' }}>Check your email!</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>We&apos;ve sent a verification link to {email}. Click it to claim your profile.</div>
              </div>
            )}
          </div>
        </section>

      </div>

      <footer>
        <Link href="/" className="logo">Rent<span>Right</span> NZ</Link>
        <div>For landlords · Free to claim</div>
        <div>hello@rentrightnz.co.nz</div>
      </footer>
    </>
  )
}
