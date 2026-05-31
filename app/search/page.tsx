'use client'
import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQ = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQ)
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const getScoreColor = (score: number) => score >= 7.5 ? '#3ecf6e' : score >= 5 ? '#f0c040' : '#e84040'
  const getScoreClass = (score: number) => score >= 7.5 ? 'high' : score >= 5 ? 'mid' : 'low'

  const searchLandlords = async (q: string) => {
    if (!q.trim()) { setResults([]); setSearched(false); return }
    setLoading(true); setSearched(true)
    const { data } = await supabase
      .from('landlords')
      .select(`*, reviews(rating), tribunal_records(id)`)
      .or(`name.ilike.%${q}%,location.ilike.%${q}%`)
      .limit(20)
    setResults(data || [])
    setLoading(false)
  }

  useEffect(() => { if (initialQ) searchLandlords(initialQ) }, [])

  const handleSearch = () => {
    searchLandlords(query)
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`, { scroll: false })
  }

  const getAvgRating = (reviews: any[]) => {
    if (!reviews?.length) return null
    return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
  }

  return (
    <>
      <nav>
        <Link href="/" className="logo">Rent<span>Right</span> NZ</Link>
        <ul className="nav-links">
          <li><Link href="/search">Search Landlords</Link></li>
          <li><Link href="/review" style={{ color: 'var(--orange)', fontWeight: 500 }}>✍️ Review a Landlord</Link></li>
          <li><Link href="/for-landlords">For Landlords</Link></li>
        </ul>
      </nav>

      <div style={{ paddingTop: '5.5rem', minHeight: '100vh' }}>
        {/* SEARCH HEADER */}
        <div style={{ background: 'var(--green)', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em' }}>
            Search any NZ landlord
          </h1>
          <div className="search-bar" style={{ maxWidth: 580, width: '100%' }}>
            <input className="search-input" type="text"
              placeholder="Landlord name, address, or suburb..."
              value={query} onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              style={{ borderRadius: '100px', background: 'white' }} />
            <button className="btn-primary" onClick={handleSearch}
              style={{ background: 'var(--orange)', borderRadius: '100px', padding: '0.85rem 1.5rem' }}>
              Search
            </button>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'rgba(245,240,232,0.6)' }}>
            Based on public Tenancy Tribunal records + verified tenant reviews
          </p>
        </div>

        {/* RESULTS */}
        <div style={{ maxWidth: 780, margin: '0 auto', padding: '2.5rem 1.5rem' }}>

          {/* NOT SEARCHED YET */}
          {!searched && !loading && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.8rem' }}>
                Search for any landlord in NZ
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 420, margin: '0 auto 2rem', fontWeight: 300 }}>
                Type their name or your rental address above. If they're not listed yet, you can add them.
              </p>
              <Link href="/review" className="btn-primary" style={{ fontSize: '0.95rem' }}>
                ✍️ Review Your Landlord →
              </Link>
            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
              <p style={{ color: 'var(--text-muted)' }}>Searching...</p>
            </div>
          )}

          {/* RESULTS COUNT */}
          {searched && !loading && (
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                {results.length > 0
                  ? `${results.length} result${results.length !== 1 ? 's' : ''} found for "${query}"`
                  : `No results found for "${query}"`}
              </div>
              <Link href="/review" className="btn-primary" style={{ fontSize: '0.82rem', padding: '0.5rem 1.2rem', background: 'var(--orange)' }}>
                + Add a Landlord
              </Link>
            </div>
          )}

          {/* NO RESULTS */}
          {searched && !loading && results.length === 0 && (
            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 16, padding: '3rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏠</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '0.8rem' }}>This landlord isn't listed yet</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 380, margin: '0 auto 1.5rem' }}>
                Be the first to add them and leave a review. You'll be helping every renter who searches for this landlord in the future.
              </p>
              <Link href={`/review?name=${encodeURIComponent(query)}`} className="btn-primary">
                ✍️ Add This Landlord & Review Them →
              </Link>
            </div>
          )}

          {/* RESULTS LIST */}
          {!loading && results.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {results.map((landlord: any, i: number) => {
                const avgRating = getAvgRating(landlord.reviews)
                const score = avgRating ? parseFloat(avgRating) * 2 : null
                const hasTribunal = landlord.tribunal_records?.length > 0
                return (
                  <Link key={landlord.id} href={`/landlord/${landlord.slug}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '1.5rem', cursor: 'pointer', animation: `fadeUp 0.4s ${i * 0.08}s ease both` }}>
                      {/* Avatar */}
                      <div style={{
                        width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
                        background: score ? (score >= 7.5 ? 'rgba(62,207,110,0.12)' : score >= 5 ? 'rgba(240,192,64,0.12)' : 'rgba(232,64,64,0.12)') : 'var(--cream)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.1rem',
                        color: score ? getScoreColor(score) : 'var(--text-muted)'
                      }}>
                        {landlord.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
                          <span style={{ fontWeight: 500, fontSize: '1rem' }}>{landlord.name}</span>
                          {hasTribunal
                            ? <span className="tribunal-warning">⚠ Tribunal Record</span>
                            : <span className="tribunal-clean">✓ No Tribunal Cases</span>}
                          {landlord.verified && <span style={{ background: 'rgba(45,90,61,0.1)', color: 'var(--green)', fontSize: '0.72rem', padding: '0.15rem 0.5rem', borderRadius: '100px' }}>✓ Verified</span>}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                          📍 {landlord.location} · {landlord.reviews?.length || 0} review{landlord.reviews?.length !== 1 ? 's' : ''}
                        </div>
                      </div>

                      {/* Score */}
                      <div className="score-badge" style={{ flexShrink: 0 }}>
                        {score ? (
                          <>
                            <div className={`score-num ${getScoreClass(score)}`}>{score}</div>
                            <div className="score-label">Trust Score</div>
                          </>
                        ) : (
                          <>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>New</div>
                            <div className="score-label">No reviews yet</div>
                          </>
                        )}
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '1.2rem', flexShrink: 0 }}>›</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          {/* DISCLAIMER */}
          {searched && (
            <div style={{ marginTop: '2rem', background: 'var(--cream)', borderRadius: 12, padding: '1rem 1.2rem', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              📋 <strong>Data sources:</strong> Trust scores are based on verified anonymous tenant reviews. Tribunal data from NZ Ministry of Justice public records. Not guaranteed to be complete — always verify independently.
            </div>
          )}
        </div>
      </div>

      <footer>
        <Link href="/" className="logo">Rent<span>Right</span> NZ</Link>
        <div>Free for NZ renters · Based on public data</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/legal/terms" style={{ color: 'rgba(245,240,232,0.5)', textDecoration: 'none', fontSize: '0.82rem' }}>Terms</Link>
          <Link href="/legal/privacy" style={{ color: 'rgba(245,240,232,0.5)', textDecoration: 'none', fontSize: '0.82rem' }}>Privacy</Link>
        </div>
      </footer>
    </>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ padding: '8rem 2rem', textAlign: 'center' }}>Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}
