'use client'
import { useState } from 'react'
import Link from 'next/link'

// Mock data per slug - replace with Supabase queries later
const LANDLORD_DATA: Record<string, any> = {
  'james-smith-auckland': {
    name: 'James Smith', location: 'Auckland, Remuera',
    score: 9.1, scoreClass: 'high',
    properties: ['14 Kauri St, Remuera', '8 Pohutukawa Ave, Remuera'],
    tribunal: false, tribunalCount: 0,
    breakdown: { responsiveness: 9.5, flexibility: 8.8, upkeep: 9.0, communication: 9.2 },
    tags: ['Responsive', 'Flexible', 'Well maintained', 'Fair with bond'],
    reviews: [
      { id: 1, rating: 5, text: 'James was an excellent landlord. Always responded within the day, fixed issues quickly. Felt completely comfortable bringing up any concerns.', date: 'March 2025', verified: true, helpful: 12 },
      { id: 2, rating: 5, text: 'Best landlord I\'ve had in NZ. Very understanding with late payment once when I lost my job. Gave us proper notice for inspections. Would highly recommend.', date: 'January 2025', verified: true, helpful: 8 },
      { id: 3, rating: 4, text: 'Generally very good. Only reason not 5 stars is there was a delay with fixing the hot water once. But he did sort it within a week and apologised.', date: 'November 2024', verified: true, helpful: 5 },
    ]
  },
  'mary-patel-wellington': {
    name: 'Mary Patel', location: 'Wellington, Newtown',
    score: 6.4, scoreClass: 'mid',
    properties: ['34 Adelaide Rd, Newtown', '12 Constable St, Newtown'],
    tribunal: false, tribunalCount: 0,
    breakdown: { responsiveness: 5.8, flexibility: 6.0, upkeep: 7.2, communication: 6.5 },
    tags: ['Slow to respond', 'Strict bond rules', 'Property well kept'],
    reviews: [
      { id: 1, rating: 3, text: 'Property was well maintained but Mary took 2-3 weeks to reply to maintenance requests. Had to follow up multiple times. Not bad, just slow.', date: 'February 2025', verified: true, helpful: 7 },
      { id: 2, rating: 4, text: 'Fine landlord overall. A bit strict about the bond at the end but fair once we discussed everything. Just be thorough with your move-out inspection.', date: 'December 2024', verified: true, helpful: 4 },
    ]
  },
  'robert-kim-christchurch': {
    name: 'Robert Kim', location: 'Christchurch, Riccarton',
    score: 2.8, scoreClass: 'low',
    properties: ['88 Riccarton Rd, Riccarton'],
    tribunal: true, tribunalCount: 2,
    tribunalDetails: [
      { date: 'August 2024', type: 'Bond dispute', outcome: 'Ordered to return $1,800 bond to tenant', caseNum: 'TT-2024-CHC-0892' },
      { date: 'March 2023', type: 'Failure to maintain property', outcome: 'Ordered to complete repairs and pay $500 compensation', caseNum: 'TT-2023-CHC-0341' }
    ],
    breakdown: { responsiveness: 2.5, flexibility: 2.0, upkeep: 3.5, communication: 3.0 },
    tags: ['Tribunal record', 'Bond disputes', 'Poor communication', 'Maintenance delays'],
    reviews: [
      { id: 1, rating: 1, text: 'DO NOT RENT FROM THIS PERSON. Refused to return our bond despite the property being in perfect condition. Had to go to Tribunal to get our money back. The process took 4 months.', date: 'September 2024', verified: true, helpful: 23 },
      { id: 2, rating: 2, text: 'Dishonest about property conditions when we moved in. Mould issues that were painted over. Took months to get any maintenance done.', date: 'April 2023', verified: true, helpful: 15 },
    ]
  },
  'linda-chen-auckland': {
    name: 'Linda Chen', location: 'Auckland, Mt Eden',
    score: 8.5, scoreClass: 'high',
    properties: ['5 Landscape Rd, Mt Eden', '22 Valley Rd, Mt Eden', '9 Ngahura St, Epsom'],
    tribunal: false, tribunalCount: 0,
    breakdown: { responsiveness: 9.0, flexibility: 8.5, upkeep: 8.8, communication: 7.8 },
    tags: ['Excellent communication', 'Fair', 'Pet friendly', 'Fast maintenance'],
    reviews: [
      { id: 1, rating: 5, text: 'Linda is amazing. As a new immigrant I was very nervous about renting. She was patient, explained everything clearly, and was always fair. Felt like a real home.', date: 'April 2025', verified: true, helpful: 31 },
      { id: 2, rating: 4, text: 'Great landlord. Pet friendly which is rare! Always gave proper notice. Bond returned within a week of moving out with a full explanation.', date: 'February 2025', verified: true, helpful: 18 },
      { id: 3, rating: 5, text: 'Best rental experience I\'ve had in 6 years in NZ. Would rent from Linda again without hesitation.', date: 'January 2025', verified: true, helpful: 14 },
    ]
  },
}

const getScoreColor = (score: number) => score >= 7.5 ? 'var(--score-high)' : score >= 5 ? 'var(--score-mid)' : 'var(--score-low)'
const getScoreLabel = (score: number) => score >= 7.5 ? 'Trusted' : score >= 5 ? 'Mixed' : 'Concerning'

export default function LandlordPage({ params }: { params: { slug: string } }) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewText, setReviewText] = useState('')
  const [reviewRating, setReviewRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [discriminationFlag, setDiscriminationFlag] = useState(false)
  const [legalChecks, setLegalChecks] = useState<Record<string, boolean>>({})
  const allChecksComplete = reviewRating > 0 && reviewText.length >= 30 &&
    ['personal', 'truthful', 'notCriminal', 'tenancyOnly', 'terms'].every(k => legalChecks[k])

  const landlord = LANDLORD_DATA[params.slug]

  if (!landlord) return (
    <>
      <nav>
        <Link href="/" className="logo">Rent<span>Right</span> NZ</Link>
        <ul className="nav-links">
          <li><Link href="/search">Search Landlords</Link></li>
        </ul>
      </nav>
      <div style={{ paddingTop: '8rem', textAlign: 'center', padding: '8rem 2rem' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1rem' }}>Landlord not found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>This landlord may not have a profile yet.</p>
        <Link href="/search" className="btn-primary">← Back to Search</Link>
      </div>
    </>
  )

  const handleSubmitReview = () => {
    if (allChecksComplete) setSubmitted(true)
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

      <div style={{ paddingTop: '5rem', minHeight: '100vh' }}>

        {/* PROFILE HEADER */}
        <div style={{ background: landlord.tribunal ? 'rgba(232,64,64,0.04)' : 'var(--green-dim)', borderBottom: '1px solid var(--border)', padding: '2.5rem 2rem' }}>
          <div style={{ maxWidth: 780, margin: '0 auto' }}>

            <Link href="/search" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginBottom: '1.5rem' }}>
              ← Back to Search
            </Link>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap' }}>
              {/* Avatar */}
              <div style={{
                width: 72, height: 72, borderRadius: '50%', flexShrink: 0,
                background: landlord.score >= 7.5 ? 'rgba(62,207,110,0.15)' : landlord.score >= 5 ? 'rgba(240,192,64,0.15)' : 'rgba(232,64,64,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.5rem',
                color: getScoreColor(landlord.score)
              }}>
                {landlord.name.split(' ').map((n: string) => n[0]).join('')}
              </div>

              <div style={{ flex: 1 }}>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                  {landlord.name}
                </h1>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.8rem' }}>
                  📍 {landlord.location} · {landlord.reviews?.length || 0} verified reviews
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {landlord.tribunal
                    ? <span className="tribunal-warning">⚠ {landlord.tribunalCount} Tribunal Case{landlord.tribunalCount > 1 ? 's' : ''} Found</span>
                    : <span className="tribunal-clean">✓ No Tribunal Cases</span>
                  }
                  {landlord.tags.slice(0, 3).map((tag: string) => (
                    <span key={tag} style={{ background: 'var(--cream)', color: 'var(--text-muted)', fontSize: '0.75rem', padding: '0.25rem 0.7rem', borderRadius: '100px' }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* BIG SCORE */}
              <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <div style={{
                  fontFamily: 'Playfair Display, serif', fontSize: '3.5rem', fontWeight: 900,
                  color: getScoreColor(landlord.score), lineHeight: 1
                }}>{landlord.score}</div>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Trust Score</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 500, color: getScoreColor(landlord.score), marginTop: '0.2rem' }}>{getScoreLabel(landlord.score)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div style={{ maxWidth: 780, margin: '0 auto', padding: '2rem 1.5rem' }}>

          {/* SCORE BREAKDOWN */}
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.2rem' }}>Score Breakdown</h2>
            {Object.entries(landlord.breakdown).map(([key, val]: [string, any]) => (
              <div key={key} style={{ marginBottom: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                  <span style={{ textTransform: 'capitalize' }}>{key}</span>
                  <span style={{ fontWeight: 500, color: getScoreColor(val) }}>{val}/10</span>
                </div>
                <div style={{ height: 5, background: 'var(--cream)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${(val / 10) * 100}%`, height: '100%', background: getScoreColor(val), borderRadius: 3, transition: 'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>

          {/* TRIBUNAL RECORDS */}
          {landlord.tribunal && (
            <div style={{ background: 'rgba(232,64,64,0.05)', border: '1px solid rgba(232,64,64,0.2)', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--red)', marginBottom: '1rem' }}>
                ⚠ Tenancy Tribunal Records
              </h2>
              {landlord.tribunalDetails?.map((t: any, i: number) => (
                <div key={i} style={{ background: 'white', borderRadius: 10, padding: '1rem', marginBottom: '0.8rem', border: '1px solid rgba(232,64,64,0.15)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <span style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--red)' }}>{t.type}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t.date}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--black)', marginBottom: '0.3rem' }}>{t.outcome}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Case: {t.caseNum}</div>
                </div>
              ))}
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Source: NZ Ministry of Justice public records. <a href="https://www.justice.govt.nz/tribunals/tenancy/" target="_blank" rel="noreferrer" style={{ color: 'var(--green)' }}>View original records →</a>
              </p>
            </div>
          )}

          {/* PROPERTIES */}
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
              🏠 Known Properties ({landlord.properties.length})
            </h2>
            {landlord.properties.map((p: string) => (
              <div key={p} style={{ padding: '0.6rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                📍 {p}
              </div>
            ))}
          </div>

          {/* REVIEWS */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.8rem' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700 }}>
                Tenant Reviews ({landlord.reviews?.length || 0})
              </h2>
              <button className="btn-primary" onClick={() => setShowReviewForm(!showReviewForm)} style={{ fontSize: '0.85rem' }}>
                + Leave a Review
              </button>
            </div>

            {/* REVIEW FORM — WITH LEGAL CHECKBOXES */}
            {showReviewForm && !submitted && (
              <div style={{ marginBottom: '1rem' }}>

                {/* ANONYMITY EXPLAINER */}
                <div style={{ background: 'var(--black)', borderRadius: 16, padding: '1.5rem', marginBottom: '1rem', color: 'var(--white)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.3rem' }}>🔒</span>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 700, color: 'var(--white)' }}>
                      Your identity is completely protected
                    </h3>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem', marginBottom: '1rem' }}>
                    {[
                      { icon: '👤', text: 'Your name is never asked or stored' },
                      { icon: '📧', text: 'Your email is never shown publicly' },
                      { icon: '🏠', text: 'Your landlord cannot trace this back to you' },
                      { icon: '🚫', text: 'We never share reviewer details with landlords' },
                      { icon: '🔐', text: 'Even we cannot identify you without an account' },
                      { icon: '⚖️', text: 'Legal requests only reveal email — not your name' },
                    ].map(item => (
                      <div key={item.icon} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', background: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: '0.7rem 0.8rem' }}>
                        <span style={{ fontSize: '1rem', flexShrink: 0 }}>{item.icon}</span>
                        <span style={{ fontSize: '0.78rem', color: 'rgba(245,240,232,0.75)', lineHeight: 1.5 }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: 'rgba(62,207,110,0.12)', border: '1px solid rgba(62,207,110,0.25)', borderRadius: 10, padding: '0.8rem 1rem', fontSize: '0.82rem', color: 'rgba(245,240,232,0.85)', lineHeight: 1.6 }}>
                    💡 <strong>Already moved out?</strong> This is the perfect time to review. Your landlord has no power over you anymore. Your honest experience protects the next family who moves in.
                  </div>
                </div>

                {/* COMMUNITY FRAMING */}
                <div style={{ background: 'rgba(45,90,61,0.07)', border: '1px solid var(--green-pale)', borderRadius: 12, padding: '1rem 1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                  <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>🌏</span>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '0.88rem', color: 'var(--green)', marginBottom: '0.2rem' }}>
                      You are helping the next newcomer
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      Think of this as warning a friend before they make the same mistake you did. Every review protects someone who just arrived in NZ and does not know the system yet.
                    </div>
                  </div>
                </div>

                <div className="card" style={{ background: 'var(--green-dim)', border: '1px solid var(--green-pale)' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '0.3rem', fontSize: '1.1rem' }}>Leave an Anonymous Review</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
                  Your identity will never be shown publicly. Read our <a href="/legal/review-guidelines" target="_blank" style={{ color: 'var(--green)' }}>Review Guidelines</a> before submitting.
                </p>

                {/* STAR RATING */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Overall Rating *</div>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {[1,2,3,4,5].map(star => (
                      <button key={star} onClick={() => setReviewRating(star)} style={{
                        fontSize: '1.8rem', background: 'none', border: 'none', cursor: 'pointer',
                        opacity: star <= reviewRating ? 1 : 0.25, transition: 'opacity 0.15s', padding: '0 2px'
                      }}>⭐</button>
                    ))}
                    {reviewRating > 0 && <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', alignSelf: 'center', marginLeft: '0.3rem' }}>
                      {['', 'Very Poor', 'Poor', 'Average', 'Good', 'Excellent'][reviewRating]}
                    </span>}
                  </div>
                </div>

                {/* REVIEW TEXT */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Your Experience *</div>
                  <textarea
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                    placeholder="Describe your experience as a tenant. Be specific — e.g. how long repairs took, how bond was handled, how the landlord communicated. Write only what you personally experienced."
                    style={{ width: '100%', minHeight: 120, padding: '0.9rem', border: '1.5px solid var(--border)', borderRadius: 10, fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', resize: 'vertical', outline: 'none' }}
                  />
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                    {reviewText.length}/500 characters · Minimum 30 characters required
                  </div>
                </div>

                {/* DISCRIMINATION FLAG */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Discrimination (optional)</div>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem', cursor: 'pointer', padding: '0.8rem', background: 'rgba(232,98,42,0.05)', borderRadius: 8, border: '1px solid rgba(232,98,42,0.15)' }}>
                    <input type="checkbox" checked={discriminationFlag} onChange={e => setDiscriminationFlag(e.target.checked)}
                      style={{ marginTop: '2px', width: 16, height: 16, cursor: 'pointer', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.82rem', color: '#8a4020', lineHeight: 1.6 }}>
                      I experienced what I believe was discrimination based on my ethnicity, nationality, religion, family status, or another protected characteristic. (I will describe this specifically in my review above.)
                    </span>
                  </label>
                </div>

                {/* LEGAL CHECKBOXES */}
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 12, padding: '1.2rem', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--black)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    ⚖️ Legal Declaration — Please read and confirm each statement
                  </div>

                  {[
                    { key: 'personal', text: 'This review is based on my own personal experience as a tenant or prospective tenant of this landlord.' },
                    { key: 'truthful', text: 'Every factual claim in this review is truthful and accurate to the best of my knowledge.' },
                    { key: 'notCriminal', text: 'My review does not accuse this person of criminal conduct without a court conviction.' },
                    { key: 'tenancyOnly', text: 'My review relates only to this person\'s conduct as a landlord — not their personal life or unrelated matters.' },
                    { key: 'terms', text: (<span>I have read and agree to the <a href="/legal/terms" target="_blank" style={{ color: 'var(--green)', fontWeight: 500 }}>Terms of Service</a>, <a href="/legal/review-guidelines" target="_blank" style={{ color: 'var(--green)', fontWeight: 500 }}>Review Guidelines</a>, and <a href="/legal/privacy" target="_blank" style={{ color: 'var(--green)', fontWeight: 500 }}>Privacy Policy</a>.</span>) },
                  ].map(item => (
                    <label key={item.key} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', marginBottom: '0.8rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={!!legalChecks[item.key]}
                        onChange={e => setLegalChecks((prev: any) => ({ ...prev, [item.key]: e.target.checked }))}
                        style={{ marginTop: '2px', width: 16, height: 16, cursor: 'pointer', flexShrink: 0, accentColor: 'var(--green)' }}
                      />
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.text}</span>
                    </label>
                  ))}
                </div>

                {/* SUBMIT VALIDATION MESSAGE */}
                {reviewRating === 0 && reviewText.length > 0 && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--orange)', marginBottom: '0.8rem' }}>⚠ Please select a star rating</div>
                )}
                {reviewText.length > 0 && reviewText.length < 30 && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--orange)', marginBottom: '0.8rem' }}>⚠ Please write at least 30 characters</div>
                )}

                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                  <button className="btn-primary" onClick={handleSubmitReview}
                    disabled={!allChecksComplete}
                    style={{ fontSize: '0.88rem', opacity: allChecksComplete ? 1 : 0.5, cursor: allChecksComplete ? 'pointer' : 'not-allowed' }}>
                    Submit Anonymous Review
                  </button>
                  <button className="btn-outline" onClick={() => setShowReviewForm(false)} style={{ fontSize: '0.88rem' }}>Cancel</button>
                </div>

                {!allChecksComplete && (reviewRating > 0 || reviewText.length > 0) && (
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.6rem' }}>
                    ☝️ Please tick all checkboxes above to enable submission
                  </div>
                )}
              </div>
              </div>
            )}

            {submitted && (
              <div style={{ background: 'rgba(62,207,110,0.1)', border: '1px solid rgba(62,207,110,0.3)', borderRadius: 16, padding: '2rem', marginBottom: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>🎉</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Thank you for helping our community!</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 420, margin: '0 auto 1.2rem' }}>
                  Your anonymous review is now live. You just made renting in NZ safer for the next newcomer who finds this profile. 🌏
                </div>
                <div style={{ background: 'white', borderRadius: 10, padding: '0.8rem 1rem', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
                  Know someone looking for a rental? Share this profile with them so they can check this landlord too.
                </div>
                <button
                  onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied! Share it with friends 🔗'); }}
                  className="btn-primary"
                  style={{ fontSize: '0.85rem' }}>
                  📋 Copy Profile Link to Share
                </button>
              </div>
            )}

            {landlord.reviews?.map((review: any, i: number) => (
              <div key={review.id} className="card" style={{ marginBottom: '0.8rem', animation: `fadeUp 0.4s ${i * 0.1}s ease both` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1,2,3,4,5].map(s => (
                      <span key={s} style={{ fontSize: '0.9rem', opacity: s <= review.rating ? 1 : 0.2 }}>⭐</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                    {review.verified && <span style={{ fontSize: '0.72rem', background: 'rgba(62,207,110,0.1)', color: '#2a9e52', padding: '0.15rem 0.5rem', borderRadius: '100px' }}>✓ Verified tenant</span>}
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{review.date}</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--black)', fontWeight: 300, marginBottom: '0.8rem' }}>{review.text}</p>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  👍 {review.helpful} people found this helpful
                </div>
              </div>
            ))}
          </div>

          {/* DISCLAIMER */}
          <div style={{ background: 'var(--cream)', borderRadius: 12, padding: '1rem 1.2rem', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            📋 Trust scores are calculated from publicly available Tenancy Tribunal records and anonymous verified reviews. RentRight NZ does not guarantee accuracy. Always do your own research before signing a tenancy agreement. <Link href="/for-landlords" style={{ color: 'var(--green)' }}>Landlord? Claim your profile →</Link>
          </div>
        </div>
      </div>

      <footer>
        <Link href="/" className="logo">Rent<span>Right</span> NZ</Link>
        <div>Free for NZ renters · Based on public data</div>
        <div style={{ display: "flex", gap: "1rem" }}><Link href="/legal/terms" style={{ color: "rgba(245,240,232,0.5)", textDecoration: "none", fontSize: "0.82rem" }}>Terms</Link><Link href="/legal/privacy" style={{ color: "rgba(245,240,232,0.5)", textDecoration: "none", fontSize: "0.82rem" }}>Privacy</Link><Link href="/legal/takedown" style={{ color: "rgba(245,240,232,0.5)", textDecoration: "none", fontSize: "0.82rem" }}>Disputes</Link></div>
      </footer>
    </>
  )
}
