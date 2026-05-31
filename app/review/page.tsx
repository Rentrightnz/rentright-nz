'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function ReviewPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [profileUrl, setProfileUrl] = useState('')

  // Step 1 — Landlord details
  const [landlordName, setLandlordName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')

  // Step 2 — Review
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [discriminationFlag, setDiscriminationFlag] = useState(false)

  // Step 3 — Legal checkboxes
  const [checks, setChecks] = useState<Record<string, boolean>>({})
  const allChecked = ['personal', 'truthful', 'notCriminal', 'tenancyOnly', 'terms'].every(k => checks[k])
  const canSubmit = rating > 0 && reviewText.length >= 30 && allChecked

  const handleSubmit = async () => {
    if (!canSubmit) return
    setLoading(true)

    try {
      // Create slug from landlord name + city
      const slug = `${landlordName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`

      // Check if landlord already exists by name + city
      const { data: existing } = await supabase
        .from('landlords')
        .select('id, slug')
        .ilike('name', landlordName.trim())
        .ilike('location', `%${city.trim()}%`)
        .single()

      let landlordId = existing?.id
      let landlordSlug = existing?.slug

      // If landlord doesn't exist, create them
      if (!landlordId) {
        const { data: newLandlord, error: landlordError } = await supabase
          .from('landlords')
          .insert({
            name: landlordName.trim(),
            location: `${city.trim()}`,
            slug: slug,
            claimed: false,
            verified: false,
            subscription: 'free'
          })
          .select()
          .single()

        if (landlordError) throw landlordError
        landlordId = newLandlord.id
        landlordSlug = newLandlord.slug

        // Add property
        await supabase.from('properties').insert({
          landlord_id: landlordId,
          address: address.trim(),
          city: city.trim()
        })
      }

      // Submit review
      const { error: reviewError } = await supabase
        .from('reviews')
        .insert({
          landlord_id: landlordId,
          rating,
          text: reviewText.trim(),
          verified: false,
          discrimination_flag: discriminationFlag
        })

      if (reviewError) throw reviewError

      setProfileUrl(`/landlord/${landlordSlug}`)
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const ratingLabels = ['', 'Very Poor', 'Poor', 'Average', 'Good', 'Excellent']

  if (submitted) return (
    <>
      <nav>
        <Link href="/" className="logo">Rent<span>Right</span> NZ</Link>
        <ul className="nav-links">
          <li><Link href="/search">Search Landlords</Link></li>
        </ul>
      </nav>
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: 520, width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎉</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Thank you for helping our community!
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '2rem', fontWeight: 300 }}>
            Your anonymous review is now live. You just made renting in NZ safer for the next newcomer who finds this landlord. Every review counts. 🌏
          </p>

          <div style={{ background: 'rgba(62,207,110,0.08)', border: '1px solid rgba(62,207,110,0.25)', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--green)', marginBottom: '0.8rem' }}>
              📋 Share this landlord profile with your community
            </div>
            <div style={{ background: 'white', borderRadius: 8, padding: '0.7rem 1rem', fontSize: '0.82rem', fontFamily: 'monospace', color: 'var(--text-muted)', marginBottom: '0.8rem', wordBreak: 'break-all' }}>
              {typeof window !== 'undefined' ? `${window.location.origin}${profileUrl}` : profileUrl}
            </div>
            <button
              className="btn-primary"
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}${profileUrl}`)
                alert('Link copied! Share it in your WhatsApp and Facebook groups 🔗')
              }}
              style={{ width: '100%', justifyContent: 'center', borderRadius: 10 }}>
              📋 Copy Profile Link
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={profileUrl} className="btn-primary" style={{ fontSize: '0.88rem' }}>
              View Landlord Profile →
            </Link>
            <Link href="/review" className="btn-outline" style={{ fontSize: '0.88rem' }}
              onClick={() => { setSubmitted(false); setStep(1); setLandlordName(''); setAddress(''); setCity(''); setRating(0); setReviewText(''); setChecks({}) }}>
              Review Another Landlord
            </Link>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      <nav>
        <Link href="/" className="logo">Rent<span>Right</span> NZ</Link>
        <ul className="nav-links">
          <li><Link href="/search">Search Landlords</Link></li>
          <li><Link href="/for-landlords">For Landlords</Link></li>
        </ul>
      </nav>

      <div style={{ paddingTop: '5rem', minHeight: '100vh', background: 'var(--cream)' }}>

        {/* HEADER */}
        <div style={{ background: 'var(--green)', padding: '2.5rem 2rem', textAlign: 'center' }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '0.6rem' }}>
              Help Your Community
            </div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '0.6rem' }}>
              Review Your Landlord
            </h1>
            <p style={{ color: 'rgba(245,240,232,0.75)', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Anonymous · Free · Protects the next renter
            </p>
          </div>
        </div>

        {/* PROGRESS STEPS */}
        <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '1rem 2rem' }}>
          <div style={{ maxWidth: 560, margin: '0 auto', display: 'flex', alignItems: 'center', gap: '0' }}>
            {[
              { num: 1, label: 'Landlord Details' },
              { num: 2, label: 'Your Experience' },
              { num: 3, label: 'Confirm & Submit' }
            ].map((s, i) => (
              <div key={s.num} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0,
                    background: step >= s.num ? 'var(--green)' : 'var(--cream)',
                    color: step >= s.num ? 'white' : 'var(--text-muted)',
                    transition: 'all 0.3s'
                  }}>{step > s.num ? '✓' : s.num}</div>
                  <span style={{ fontSize: '0.78rem', color: step >= s.num ? 'var(--green)' : 'var(--text-muted)', fontWeight: step === s.num ? 500 : 400, whiteSpace: 'nowrap' }}>
                    {s.label}
                  </span>
                </div>
                {i < 2 && <div style={{ flex: 1, height: 2, background: step > s.num ? 'var(--green)' : 'var(--border)', margin: '0 0.5rem', transition: 'all 0.3s' }} />}
              </div>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>

          {/* ── STEP 1 — LANDLORD DETAILS ── */}
          {step === 1 && (
            <div style={{ animation: 'fadeUp 0.4s ease both' }}>
              <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 20, padding: '2rem', marginBottom: '1rem' }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Who is your landlord?
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  We use this to create or find their profile. Their name and property address will be visible — your name never will be.
                </p>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                    Landlord Full Name *
                  </label>
                  <input type="text" className="search-input" placeholder="e.g. John Smith"
                    value={landlordName} onChange={e => setLandlordName(e.target.value)}
                    style={{ width: '100%', borderRadius: 10 }} />
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                    Use the name as it appears on your tenancy agreement
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                    Property Address *
                  </label>
                  <input type="text" className="search-input" placeholder="e.g. 14 Kauri Street"
                    value={address} onChange={e => setAddress(e.target.value)}
                    style={{ width: '100%', borderRadius: 10 }} />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                    City / Suburb *
                  </label>
                  <select
                    value={city} onChange={e => setCity(e.target.value)}
                    style={{ width: '100%', padding: '0.85rem 1.2rem', border: '1.5px solid var(--border)', borderRadius: 10, fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', background: 'white', outline: 'none', color: city ? 'var(--black)' : 'var(--text-muted)' }}>
                    <option value="">Select city...</option>
                    {['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga', 'Dunedin', 'Palmerston North', 'Nelson', 'Rotorua', 'New Plymouth', 'Napier', 'Hastings', 'Other'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <button className="btn-primary"
                  onClick={() => setStep(2)}
                  disabled={!landlordName.trim() || !address.trim() || !city}
                  style={{ width: '100%', justifyContent: 'center', borderRadius: 10, padding: '0.9rem', opacity: (!landlordName.trim() || !address.trim() || !city) ? 0.5 : 1 }}>
                  Next — Write Your Review →
                </button>
              </div>

              {/* ANONYMITY MINI NOTE */}
              <div style={{ background: 'var(--black)', borderRadius: 12, padding: '1rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>🔒</span>
                <span style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.7)', lineHeight: 1.5 }}>
                  Your name is never asked, stored, or shown. Your landlord cannot find out who left this review.
                </span>
              </div>
            </div>
          )}

          {/* ── STEP 2 — YOUR EXPERIENCE ── */}
          {step === 2 && (
            <div style={{ animation: 'fadeUp 0.4s ease both' }}>
              <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 20, padding: '2rem', marginBottom: '1rem' }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                  Your experience with {landlordName}
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Be honest and specific. Describe what actually happened — good or bad. This is what helps future renters most.
                </p>

                {/* STAR RATING */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '0.6rem' }}>Overall Rating *</label>
                  <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                    {[1,2,3,4,5].map(star => (
                      <button key={star} onClick={() => setRating(star)} style={{
                        fontSize: '2.2rem', background: 'none', border: 'none', cursor: 'pointer',
                        opacity: star <= rating ? 1 : 0.2, transition: 'all 0.15s', padding: '0 2px',
                        transform: star <= rating ? 'scale(1.1)' : 'scale(1)'
                      }}>⭐</button>
                    ))}
                    {rating > 0 && (
                      <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--green)', marginLeft: '0.5rem' }}>
                        {ratingLabels[rating]}
                      </span>
                    )}
                  </div>
                </div>

                {/* REVIEW TEXT */}
                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                    Describe your experience *
                  </label>
                  <textarea
                    value={reviewText} onChange={e => setReviewText(e.target.value)}
                    placeholder="e.g. The landlord took 8 weeks to fix a leak despite multiple calls. Bond was only returned after I threatened Tribunal. Property had mould issues that were not disclosed..."
                    style={{ width: '100%', minHeight: 140, padding: '0.9rem', border: '1.5px solid var(--border)', borderRadius: 10, fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', resize: 'vertical', outline: 'none', lineHeight: 1.6 }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: reviewText.length >= 30 ? 'var(--text-muted)' : 'var(--orange)', marginTop: '0.3rem' }}>
                    <span>{reviewText.length < 30 ? `${30 - reviewText.length} more characters needed` : '✓ Good length'}</span>
                    <span>{reviewText.length}/1000</span>
                  </div>
                </div>

                {/* HELPFUL PROMPTS */}
                <div style={{ background: 'var(--cream)', borderRadius: 10, padding: '0.9rem 1rem', marginBottom: '1.2rem', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  💡 <strong>Helpful things to mention:</strong> How fast they responded to maintenance · How bond was handled · Were they honest about the property · How they communicated · Would you rent from them again?
                </div>

                {/* DISCRIMINATION FLAG */}
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', cursor: 'pointer', padding: '0.9rem', background: 'rgba(232,98,42,0.05)', borderRadius: 10, border: '1px solid rgba(232,98,42,0.15)', marginBottom: '1.5rem' }}>
                  <input type="checkbox" checked={discriminationFlag} onChange={e => setDiscriminationFlag(e.target.checked)}
                    style={{ marginTop: '2px', width: 16, height: 16, cursor: 'pointer', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.82rem', color: '#8a4020', lineHeight: 1.6 }}>
                    🚩 I experienced what I believe was discrimination (based on ethnicity, nationality, religion, family status, or other protected characteristic). I will describe this in my review above.
                  </span>
                </label>

                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <button className="btn-outline" onClick={() => setStep(1)} style={{ flex: '0 0 auto' }}>← Back</button>
                  <button className="btn-primary"
                    onClick={() => setStep(3)}
                    disabled={rating === 0 || reviewText.length < 30}
                    style={{ flex: 1, justifyContent: 'center', borderRadius: 10, padding: '0.9rem', opacity: (rating === 0 || reviewText.length < 30) ? 0.5 : 1 }}>
                    Next — Confirm & Submit →
                  </button>
                </div>
              </div>

              {/* COMMUNITY FRAMING */}
              <div style={{ background: 'var(--green)', borderRadius: 12, padding: '1rem 1.2rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>🌏</span>
                <span style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.85)', lineHeight: 1.6 }}>
                  Think of this as warning a friend before they make the same mistake you did. Every review protects someone who just arrived in NZ and doesn&apos;t know the system yet.
                </span>
              </div>
            </div>
          )}

          {/* ── STEP 3 — LEGAL CONFIRMATION ── */}
          {step === 3 && (
            <div style={{ animation: 'fadeUp 0.4s ease both' }}>

              {/* REVIEW SUMMARY */}
              <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>Review Summary</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.8rem' }}>
                  <div>
                    <div style={{ fontWeight: 500 }}>{landlordName}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>📍 {address}, {city}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '1px' }}>
                    {[1,2,3,4,5].map(s => <span key={s} style={{ opacity: s <= rating ? 1 : 0.2 }}>⭐</span>)}
                  </div>
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7, background: 'var(--cream)', padding: '0.8rem', borderRadius: 8, fontStyle: 'italic' }}>
                  &ldquo;{reviewText.length > 150 ? reviewText.slice(0, 150) + '...' : reviewText}&rdquo;
                </div>
                {discriminationFlag && (
                  <div style={{ marginTop: '0.6rem', fontSize: '0.78rem', color: 'var(--orange)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    🚩 Discrimination flag included
                  </div>
                )}
              </div>

              {/* ANONYMITY REMINDER */}
              <div style={{ background: 'var(--black)', borderRadius: 12, padding: '1rem 1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ fontSize: '1.2rem' }}>🔒</span>
                <span style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.75)', lineHeight: 1.5 }}>
                  Your review will be published <strong style={{ color: 'var(--white)' }}>anonymously</strong>. Your name and email will never be visible to anyone.
                </span>
              </div>

              {/* LEGAL CHECKBOXES */}
              <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  ⚖️ Legal Declaration
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.2rem', lineHeight: 1.6 }}>
                  Please read and tick each statement. By ticking these boxes you are making a legal declaration under NZ law.
                </p>

                {[
                  { key: 'personal', text: 'This review is based entirely on my own personal experience as a tenant or prospective tenant of this landlord.' },
                  { key: 'truthful', text: 'Every factual claim in this review is truthful and accurate to the best of my knowledge.' },
                  { key: 'notCriminal', text: 'My review does not accuse this person of criminal conduct without a court conviction to support that claim.' },
                  { key: 'tenancyOnly', text: 'My review relates only to this person\'s conduct as a landlord — not their personal life, appearance, or unrelated matters.' },
                  { key: 'terms', text: null },
                ].map(item => (
                  <label key={item.key} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem', marginBottom: '1rem', cursor: 'pointer', padding: '0.7rem', borderRadius: 8, background: checks[item.key] ? 'rgba(45,90,61,0.05)' : 'transparent', border: `1px solid ${checks[item.key] ? 'var(--green-pale)' : 'var(--border)'}`, transition: 'all 0.2s' }}>
                    <input type="checkbox" checked={!!checks[item.key]}
                      onChange={e => setChecks(prev => ({ ...prev, [item.key]: e.target.checked }))}
                      style={{ marginTop: '2px', width: 18, height: 18, cursor: 'pointer', flexShrink: 0, accentColor: 'var(--green)' }} />
                    <span style={{ fontSize: '0.82rem', color: 'var(--black)', lineHeight: 1.6 }}>
                      {item.key === 'terms' ? (
                        <span>I have read and agree to the{' '}
                          <a href="/legal/terms" target="_blank" style={{ color: 'var(--green)', fontWeight: 500 }}>Terms of Service</a>,{' '}
                          <a href="/legal/review-guidelines" target="_blank" style={{ color: 'var(--green)', fontWeight: 500 }}>Review Guidelines</a>, and{' '}
                          <a href="/legal/privacy" target="_blank" style={{ color: 'var(--green)', fontWeight: 500 }}>Privacy Policy</a>.
                          I understand that submitting a false review may expose me to legal liability.
                        </span>
                      ) : item.text}
                    </span>
                  </label>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <button className="btn-outline" onClick={() => setStep(2)} style={{ flex: '0 0 auto' }}>← Back</button>
                <button className="btn-primary"
                  onClick={handleSubmit}
                  disabled={!canSubmit || loading}
                  style={{ flex: 1, justifyContent: 'center', borderRadius: 10, padding: '0.9rem', opacity: canSubmit ? 1 : 0.5, cursor: canSubmit ? 'pointer' : 'not-allowed' }}>
                  {loading ? '⏳ Submitting...' : '✅ Submit Anonymous Review'}
                </button>
              </div>

              {!canSubmit && (
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.6rem' }}>
                  ☝️ Please tick all 5 checkboxes above to submit
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <footer>
        <Link href="/" className="logo">Rent<span>Right</span> NZ</Link>
        <div>Anonymous · Free · Safe</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/legal/terms" style={{ color: 'rgba(245,240,232,0.5)', textDecoration: 'none', fontSize: '0.82rem' }}>Terms</Link>
          <Link href="/legal/privacy" style={{ color: 'rgba(245,240,232,0.5)', textDecoration: 'none', fontSize: '0.82rem' }}>Privacy</Link>
        </div>
      </footer>
    </>
  )
}
