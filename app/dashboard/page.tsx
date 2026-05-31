'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [landlord, setLandlord] = useState<any>(null)
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [replyText, setReplyText] = useState<Record<string, string>>({})
  const [replySent, setReplySent] = useState<Record<string, boolean>>({})
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/auth/login'); return }
      setUser(session.user)

      // Try to find landlord profile by email
      const { data: landlordData } = await supabase
        .from('landlords')
        .select('*')
        .eq('email', session.user.email)
        .single()

      if (landlordData) {
        setLandlord(landlordData)
        // Get reviews for this landlord
        const { data: reviewData } = await supabase
          .from('reviews')
          .select('*')
          .eq('landlord_id', landlordData.id)
          .order('created_at', { ascending: false })
        setReviews(reviewData || [])
      }
      setLoading(false)
    }
    getUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleReply = async (reviewId: string) => {
    const text = replyText[reviewId]
    if (!text || text.length < 10) return
    await supabase.from('review_responses').insert({
      review_id: reviewId,
      landlord_id: landlord?.id,
      response_text: text
    })
    setReplySent(prev => ({ ...prev, [reviewId]: true }))
  }

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 'N/A'

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
        <p style={{ color: 'var(--text-muted)' }}>Loading your dashboard...</p>
      </div>
    </div>
  )

  return (
    <>
      <nav>
        <Link href="/" className="logo">Rent<span>Right</span> NZ</Link>
        <ul className="nav-links">
          <li><span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>👋 {user?.user_metadata?.name || user?.email}</span></li>
          <li><button onClick={handleLogout} className="btn-outline" style={{ fontSize: '0.82rem', padding: '0.4rem 1rem' }}>Log out</button></li>
        </ul>
      </nav>

      <div style={{ paddingTop: '5rem', minHeight: '100vh', background: 'var(--cream)' }}>

        {/* HEADER */}
        <div style={{ background: 'var(--green)', padding: '2.5rem 2rem' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '0.4rem' }}>
                  Landlord Dashboard
                </div>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 700, color: 'var(--white)', marginBottom: '0.3rem' }}>
                  {landlord ? `Welcome back, ${landlord.name}` : `Welcome, ${user?.user_metadata?.name || 'Landlord'}`}
                </h1>
                <p style={{ color: 'rgba(245,240,232,0.7)', fontSize: '0.88rem' }}>
                  {landlord ? `Your profile · ${landlord.location || 'Location not set'}` : 'Set up your profile to get started'}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {landlord && (
                  <Link href={`/landlord/${landlord.slug}`} className="btn-outline"
                    style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '0.85rem' }}>
                    View Public Profile →
                  </Link>
                )}
                {(!landlord || landlord.subscription === 'free') && (
                  <Link href="/for-landlords#claim" className="btn-primary"
                    style={{ background: 'var(--orange)', fontSize: '0.85rem' }}>
                    ⭐ Upgrade to Verified
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* NO PROFILE YET */}
        {!landlord && (
          <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1.5rem' }}>
            <div style={{ background: 'white', borderRadius: 20, padding: '3rem', textAlign: 'center', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏠</div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.8rem' }}>
                Set up your landlord profile
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 2rem' }}>
                Your profile lets renters find and review you. A verified profile with good reviews means better tenants and fewer vacancies.
              </p>
              <SetupProfileForm user={user} onComplete={setLandlord} />
            </div>
          </div>
        )}

        {/* DASHBOARD TABS */}
        {landlord && (
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem' }}>

            {/* STATS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: 'Total Reviews', value: reviews.length, icon: '⭐' },
                { label: 'Average Rating', value: avgRating, icon: '📊' },
                { label: 'Profile Status', value: landlord.verified ? 'Verified ✓' : 'Basic', icon: '🛡️' },
                { label: 'Subscription', value: landlord.subscription === 'free' ? 'Free' : 'Verified', icon: '💳' },
              ].map(stat => (
                <div key={stat.label} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', fontWeight: 700, color: 'var(--green)', marginBottom: '0.3rem' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* TABS */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0' }}>
              {[
                { id: 'overview', label: '📋 Overview' },
                { id: 'reviews', label: `⭐ Reviews (${reviews.length})` },
                { id: 'profile', label: '✏️ Edit Profile' },
                { id: 'upgrade', label: '⚡ Upgrade' },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                  padding: '0.7rem 1.2rem', borderRadius: '8px 8px 0 0', border: 'none', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', fontWeight: activeTab === tab.id ? 500 : 400,
                  background: activeTab === tab.id ? 'white' : 'transparent',
                  color: activeTab === tab.id ? 'var(--green)' : 'var(--text-muted)',
                  borderBottom: activeTab === tab.id ? '2px solid var(--green)' : '2px solid transparent',
                  transition: 'all 0.2s'
                }}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div style={{ background: 'white', borderRadius: 16, padding: '2rem', border: '1px solid var(--border)' }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                  Your Profile Summary
                </h2>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {[
                    { label: 'Name', value: landlord.name },
                    { label: 'Email', value: landlord.email || user?.email },
                    { label: 'Location', value: landlord.location || 'Not set' },
                    { label: 'Profile URL', value: `rentrightnz.co.nz/landlord/${landlord.slug}` },
                    { label: 'Claimed', value: landlord.claimed ? '✅ Yes' : '❌ Not yet' },
                    { label: 'Verified Badge', value: landlord.verified ? '✅ Verified' : '❌ Not verified — upgrade to get verified' },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.9rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{item.label}</span>
                      <span style={{ color: 'var(--black)' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <div>
                {reviews.length === 0 ? (
                  <div style={{ background: 'white', borderRadius: 16, padding: '3rem', textAlign: 'center', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💬</div>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '0.5rem' }}>No reviews yet</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      Share your profile link with past tenants and ask them to leave a review.
                    </p>
                    <div style={{ background: 'var(--cream)', borderRadius: 10, padding: '0.8rem 1.2rem', marginTop: '1.2rem', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                      rentrightnz.co.nz/landlord/{landlord.slug}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {reviews.map((review: any) => (
                      <div key={review.id} style={{ background: 'white', borderRadius: 16, padding: '1.5rem', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <div style={{ display: 'flex', gap: '2px' }}>
                            {[1,2,3,4,5].map(s => (
                              <span key={s} style={{ opacity: s <= review.rating ? 1 : 0.2 }}>⭐</span>
                            ))}
                          </div>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            {new Date(review.created_at).toLocaleDateString('en-NZ', { month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--black)', marginBottom: '1rem', fontWeight: 300 }}>{review.text}</p>

                        {replySent[review.id] ? (
                          <div style={{ background: 'rgba(62,207,110,0.08)', borderRadius: 10, padding: '0.8rem', fontSize: '0.82rem', color: '#2a9e52' }}>
                            ✅ Your response has been saved and will appear publicly on your profile.
                          </div>
                        ) : (
                          <div>
                            <div style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                              💬 Respond to this review (visible to all renters):
                            </div>
                            <textarea
                              value={replyText[review.id] || ''}
                              onChange={e => setReplyText(prev => ({ ...prev, [review.id]: e.target.value }))}
                              placeholder="Write a professional, calm response..."
                              style={{ width: '100%', minHeight: 80, padding: '0.8rem', border: '1.5px solid var(--border)', borderRadius: 10, fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', resize: 'vertical', outline: 'none', marginBottom: '0.6rem' }}
                            />
                            <button className="btn-primary" onClick={() => handleReply(review.id)}
                              style={{ fontSize: '0.82rem', padding: '0.5rem 1.2rem' }}>
                              Post Response
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* EDIT PROFILE TAB */}
            {activeTab === 'profile' && (
              <EditProfileForm landlord={landlord} onUpdate={setLandlord} />
            )}

            {/* UPGRADE TAB */}
            {activeTab === 'upgrade' && (
              <div style={{ background: 'white', borderRadius: 16, padding: '2rem', border: '1px solid var(--border)', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⭐</div>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.8rem' }}>
                  Upgrade to Verified Landlord
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 2rem' }}>
                  Get a verified badge, appear first in search results, and attract better tenants faster.
                </p>
                <div style={{ background: 'var(--green)', color: 'white', borderRadius: 16, padding: '2rem', maxWidth: 320, margin: '0 auto' }}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.3rem' }}>$49</div>
                  <div style={{ fontSize: '0.82rem', opacity: 0.7, marginBottom: '1.5rem' }}>per month</div>
                  {['Verified badge', 'Priority in search', 'Tenant matching', 'Compliance dashboard', 'Analytics'].map(f => (
                    <div key={f} style={{ fontSize: '0.88rem', marginBottom: '0.5rem', opacity: 0.9 }}>✓ {f}</div>
                  ))}
                  <button className="btn-primary" style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    Coming Soon
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <footer>
        <Link href="/" className="logo">Rent<span>Right</span> NZ</Link>
        <div>Landlord Dashboard</div>
        <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'rgba(245,240,232,0.5)', cursor: 'pointer', fontSize: '0.82rem' }}>
          Log out
        </button>
      </footer>
    </>
  )
}

// SETUP PROFILE FORM
function SetupProfileForm({ user, onComplete }: { user: any, onComplete: (l: any) => void }) {
  const [name, setName] = useState(user?.user_metadata?.name || '')
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSetup = async () => {
    if (!name || !location) { setError('Please fill in all fields'); return }
    setLoading(true)
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now()
    const { data, error: err } = await supabase.from('landlords').insert({
      name, email: user.email, location, slug, claimed: true
    }).select().single()
    if (err) { setError(err.message); setLoading(false); return }
    onComplete(data)
  }

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      {error && <div style={{ color: '#e84040', fontSize: '0.85rem', marginBottom: '1rem' }}>⚠ {error}</div>}
      <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Your Full Name</label>
        <input type="text" className="search-input" placeholder="John Smith"
          value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', borderRadius: 10 }} />
      </div>
      <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Your City / Area</label>
        <input type="text" className="search-input" placeholder="Auckland, Wellington..."
          value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', borderRadius: 10 }} />
      </div>
      <button className="btn-primary" onClick={handleSetup} disabled={loading}
        style={{ width: '100%', justifyContent: 'center', borderRadius: 10, padding: '0.9rem' }}>
        {loading ? 'Setting up...' : 'Create My Profile →'}
      </button>
    </div>
  )
}

// EDIT PROFILE FORM
function EditProfileForm({ landlord, onUpdate }: { landlord: any, onUpdate: (l: any) => void }) {
  const [name, setName] = useState(landlord.name || '')
  const [location, setLocation] = useState(landlord.location || '')
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    const { data } = await supabase.from('landlords').update({ name, location }).eq('id', landlord.id).select().single()
    if (data) { onUpdate(data); setSaved(true); setTimeout(() => setSaved(false), 3000) }
    setLoading(false)
  }

  return (
    <div style={{ background: 'white', borderRadius: 16, padding: '2rem', border: '1px solid var(--border)' }}>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Edit Your Profile</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Full Name</label>
        <input type="text" className="search-input" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', borderRadius: 10 }} />
      </div>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Location</label>
        <input type="text" className="search-input" value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', borderRadius: 10 }} />
      </div>
      {saved && <div style={{ color: '#2a9e52', fontSize: '0.85rem', marginBottom: '1rem' }}>✅ Profile saved!</div>}
      <button className="btn-primary" onClick={handleSave} disabled={loading}>
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}
