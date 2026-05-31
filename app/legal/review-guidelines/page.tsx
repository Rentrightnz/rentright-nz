'use client'
import Link from 'next/link'

export default function ReviewGuidelinesPage() {
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
        <div style={{ background: 'var(--green)', padding: '3rem 2rem', textAlign: 'center' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.6)', marginBottom: '0.8rem' }}>Legal</div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em' }}>
              Review Guidelines
            </h1>
            <p style={{ color: 'rgba(245,240,232,0.7)', marginTop: '0.8rem', fontSize: '0.9rem' }}>
              How to write a review that helps others and protects you legally
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 780, margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>

          {/* DO vs DONT */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
            <div style={{ background: 'rgba(62,207,110,0.08)', border: '1px solid rgba(62,207,110,0.25)', borderRadius: 16, padding: '1.5rem' }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, color: '#2a9e52', marginBottom: '1rem' }}>✅ Good Review Examples</h3>
              {[
                '"The landlord took 6 weeks to fix a leaking roof despite multiple calls."',
                '"Bond was returned within 3 days of moving out with a full itemised list."',
                '"I felt uncomfortable when the landlord made comments about my accent during the viewing."',
                '"Property had mould issues that were not disclosed before we signed the lease."',
                '"Always responded within 24 hours and was very professional throughout our tenancy."'
              ].map((ex, i) => (
                <div key={i} style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#2a7a40', marginBottom: '0.7rem', padding: '0.6rem 0.8rem', background: 'rgba(62,207,110,0.08)', borderRadius: 8, fontStyle: 'italic' }}>
                  {ex}
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(232,64,64,0.06)', border: '1px solid rgba(232,64,64,0.2)', borderRadius: 16, padding: '1.5rem' }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, color: '#c0392b', marginBottom: '1rem' }}>❌ Not Allowed</h3>
              {[
                '"This landlord is a criminal." (No court conviction)',
                '"John Smith is a terrible human being." (Personal attack)',
                '"All [nationality] landlords are like this." (Generalisation)',
                '"He lives at 45 Example St." (Private information)',
                '"I heard from my neighbour that..." (Not your experience)',
                '"DO NOT RENT — [false claim]" (Unverified accusation)'
              ].map((ex, i) => (
                <div key={i} style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#c0392b', marginBottom: '0.7rem', padding: '0.6rem 0.8rem', background: 'rgba(232,64,64,0.06)', borderRadius: 8, fontStyle: 'italic' }}>
                  {ex}
                </div>
              ))}
            </div>
          </div>

          {/* RULES */}
          {[
            {
              icon: '✍️', title: 'Write From Your Own Experience Only',
              content: 'Your review must be based on your personal experience as a tenant or prospective tenant. Do not write reviews based on what others have told you, or on behalf of someone else. First-person accounts are the most helpful and the most legally protected.'
            },
            {
              icon: '📋', title: 'Stick to Tenancy-Related Matters',
              content: 'Reviews must relate to the person\'s conduct as a landlord or property manager only. This includes: responsiveness, property maintenance, bond handling, lease honesty, communication during tenancy, and behaviour during inspections. Do not comment on a landlord\'s personal life, appearance, or anything unrelated to their role as a landlord.'
            },
            {
              icon: '⚖️', title: 'Facts vs Opinions — Know the Difference',
              content: `Facts: Things that can be proven. "The landlord did not return my bond for 90 days." ✅
              
Opinion: Your personal view. "I felt the landlord was unreasonable." ✅

False statement of fact: Claiming something as fact when it is not true. "The landlord stole from me." ❌ (unless proven)

Stick to what actually happened. Describe events, not conclusions. "The repair took 8 weeks" is better than "The landlord is negligent."`
            },
            {
              icon: '🚩', title: 'Reporting Discrimination',
              content: 'If you experienced discrimination based on your ethnicity, nationality, religion, family status, or any other protected characteristic under the Human Rights Act 1993, you may include this in your review. Describe specifically what was said or done. Do not make broad accusations without describing the specific incident that occurred.'
            },
            {
              icon: '🔒', title: 'Your Anonymity and Legal Responsibility',
              content: 'Your review is published anonymously — your name will never appear publicly. However, anonymity does not protect you from legal responsibility for false statements. If a review is proven to be deliberately false and defamatory, the reviewer — not RentRight NZ — may be held legally liable. We cooperate with valid legal processes.'
            },
            {
              icon: '🛡️', title: 'Protecting Yourself Legally',
              content: `The strongest legal protection for any review is that it is TRUE. True statements cannot constitute defamation in New Zealand.

To protect yourself:
• Only state what you personally witnessed or experienced
• Use phrases like "in my experience" or "during my tenancy"
• Avoid absolute statements unless you are 100% certain
• Do not accuse anyone of illegal conduct without a court conviction
• Keep records (emails, photos, messages) that support what you write`
            }
          ].map(rule => (
            <div key={rule.title} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 16, padding: '1.8rem', marginBottom: '1.2rem' }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <span style={{ fontSize: '1.3rem' }}>{rule.icon}</span>
                {rule.title}
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: '#3a3330', fontWeight: 300, whiteSpace: 'pre-line' }}>{rule.content}</p>
            </div>
          ))}

          <div style={{ background: 'var(--cream)', borderRadius: 16, padding: '1.5rem 2rem', textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '1rem' }}>
              By submitting a review you confirm you have read and agree to these guidelines and our Terms of Service.
            </p>
            <Link href="/legal/terms" style={{ color: 'var(--green)', fontSize: '0.88rem', fontWeight: 500 }}>
              Read Full Terms of Service →
            </Link>
          </div>
        </div>
      </div>

      <footer>
        <Link href="/" className="logo">Rent<span>Right</span> NZ</Link>
        <div>© 2025 RentRight NZ · All rights reserved</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/legal/privacy" style={{ color: 'rgba(245,240,232,0.5)', textDecoration: 'none', fontSize: '0.82rem' }}>Privacy</Link>
          <Link href="/legal/terms" style={{ color: 'rgba(245,240,232,0.5)', textDecoration: 'none', fontSize: '0.82rem' }}>Terms</Link>
        </div>
      </footer>
    </>
  )
}
