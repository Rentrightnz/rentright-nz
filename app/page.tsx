'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = () => {
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <>
      {/* NAV */}
      <nav>
        <Link href="/" className="logo">Rent<span>Right</span> NZ</Link>
        <ul className="nav-links">
          <li><Link href="/search">Search Landlords</Link></li>
          <li><Link href="/for-landlords">For Landlords</Link></li>
          <li><Link href="/search" className="btn-primary">Search Now</Link></li>
        </ul>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '8rem 2rem 4rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* BG blobs */}
        <div style={{
          position: 'absolute', top: '15%', left: '10%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(45,90,61,0.06) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '5%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,98,42,0.05) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ animation: 'fadeUp 0.6s 0.1s ease both', opacity: 0 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(45,90,61,0.08)', color: 'var(--green)',
            fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.08em',
            textTransform: 'uppercase', padding: '0.4rem 1rem',
            borderRadius: '100px', marginBottom: '1.8rem',
            border: '1px solid rgba(45,90,61,0.15)'
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
            New Zealand&apos;s Landlord Trust Platform
          </div>
        </div>

        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          marginBottom: '1.5rem',
          maxWidth: 800,
          animation: 'fadeUp 0.6s 0.3s ease both',
          opacity: 0
        }}>
          Know your landlord<br />
          <span style={{ color: 'var(--orange)' }}>before you sign.</span>
        </h1>

        <p style={{
          fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.7,
          maxWidth: 520, marginBottom: '2.5rem', fontWeight: 300,
          animation: 'fadeUp 0.6s 0.5s ease both', opacity: 0
        }}>
          Search any NZ landlord — see their verified trust score, Tenancy Tribunal history,
          and honest reviews from past tenants. Free for renters, always.
        </p>

        {/* SEARCH */}
        <div style={{
          width: '100%', maxWidth: 560,
          animation: 'fadeUp 0.6s 0.7s ease both', opacity: 0
        }}>
          <div className="search-bar" style={{ justifyContent: 'center' }}>
            <input
              className="search-input"
              type="text"
              placeholder="Search landlord name or property address..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              style={{ borderRadius: '100px' }}
            />
            <button className="btn-primary" onClick={handleSearch} style={{ borderRadius: '100px', padding: '0.85rem 1.8rem', whiteSpace: 'nowrap' }}>
              Search →
            </button>
          </div>
          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '0.8rem' }}>
            <a href="/review" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--orange)', color: 'white', padding: '0.7rem 1.5rem', borderRadius: '100px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'all 0.2s' }}>
              ✍️ Review Your Landlord
            </a>
            <a href="/legal/review-guidelines" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.82rem', textDecoration: 'none', alignSelf: 'center' }}>
              How it works →
            </a>
          </div>
          <div style={{ display: 'none' }}>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.8rem' }}>
            🔒 Free for renters · Based on public NZ Tenancy Tribunal records + verified reviews
          </p>
        </div>

        {/* STATS */}
        <div style={{
          display: 'flex', gap: '3rem', marginTop: '4rem', flexWrap: 'wrap', justifyContent: 'center',
          animation: 'fadeUp 0.6s 0.9s ease both', opacity: 0
        }}>
          {[
            { num: '29,000+', label: 'Tribunal cases in NZ (2024)' },
            { num: '600K+', label: 'Renters in New Zealand' },
            { num: 'Free', label: 'Always free for renters' }
          ].map(s => (
            <div key={s.num} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 700, color: 'var(--green)' }}>{s.num}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: 'var(--cream)', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', fontWeight: 500, marginBottom: '0.8rem' }}>How It Works</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Three steps to renting with confidence
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '🔍', step: '01', title: 'Search any landlord', desc: 'Enter a name, address, or suburb. We search Tenancy Tribunal records and our verified review database instantly.' },
              { icon: '⭐', step: '02', title: 'See their Trust Score', desc: 'Get a score from 1–10 built from tribunal history, tenant reviews, responsiveness, and property upkeep ratings.' },
              { icon: '✅', step: '03', title: 'Rent with confidence', desc: 'Upload your lease for a plain-English red flag check and connect with others who\'ve lived at the property.' }
            ].map(item => (
              <div key={item.step} className="card" style={{ padding: '2rem' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', fontWeight: 900, color: 'var(--cream)', lineHeight: 1, marginBottom: '0.5rem' }}>{item.step}</div>
                <div style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.6rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.7, fontWeight: 300 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILT FOR IMMIGRANTS */}
      <section style={{ padding: '6rem 2rem', background: 'var(--green)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>🌏</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '1.2rem' }}>
            Built for newcomers to New Zealand
          </h2>
          <p style={{ color: 'rgba(245,240,232,0.75)', fontSize: '1.05rem', lineHeight: 1.8, fontWeight: 300, marginBottom: '2rem' }}>
            When you arrive in a new country, you don&apos;t know the system. You don&apos;t know your rights.
            And some landlords take advantage of that. RentRight NZ gives every newcomer the same information
            that a local with 10 years of experience would have.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Discrimination flags', 'Plain-English lease checker', 'NZ renter rights guide', 'Anonymous reviews'].map(f => (
              <div key={f} style={{
                background: 'rgba(255,255,255,0.12)', color: 'var(--white)',
                padding: '0.5rem 1.1rem', borderRadius: '100px',
                fontSize: '0.85rem', fontWeight: 400
              }}>✓ {f}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '7rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Ready to search a landlord?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem', fontWeight: 300 }}>
            Free forever for renters. No account needed to search.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/review" className="btn-primary" style={{ fontSize: '1rem', padding: '0.9rem 2rem', background: 'var(--orange)' }}>
              ✍️ Review Your Landlord
            </Link>
            <Link href="/search" className="btn-outline" style={{ fontSize: '1rem', padding: '0.9rem 2rem' }}>
              🔍 Search Landlords
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <Link href="/" className="logo">Rent<span>Right</span> NZ</Link>
        <div>Built for NZ renters · Free always</div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href="/for-landlords" style={{ color: 'rgba(245,240,232,0.5)', textDecoration: 'none' }}>For Landlords</Link>
          <Link href="/search" style={{ color: 'rgba(245,240,232,0.5)', textDecoration: 'none' }}>Search</Link>
        </div>
      </footer>
    </>
  )
}
