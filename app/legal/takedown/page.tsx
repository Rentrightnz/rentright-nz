'use client'
import Link from 'next/link'

export default function TakedownPage() {
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
        <div style={{ background: 'var(--black)', padding: '3rem 2rem', textAlign: 'center' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.5)', marginBottom: '0.8rem' }}>Legal</div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em' }}>
              Takedown & Dispute Policy
            </h1>
            <p style={{ color: 'rgba(245,240,232,0.6)', marginTop: '0.8rem', fontSize: '0.9rem' }}>
              How to dispute a review · Response within 48 hours guaranteed
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 780, margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>

          <div style={{ background: 'rgba(45,90,61,0.08)', border: '1px solid var(--green-pale)', borderRadius: 12, padding: '1.5rem', marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--green)' }}>⏱ Our Commitment</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--green)', fontWeight: 300 }}>
              We acknowledge all dispute requests within <strong>24 hours</strong> and provide a full response within <strong>48 hours</strong>. We take every dispute seriously and investigate fairly.
            </p>
          </div>

          {/* PROCESS */}
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>
            The Dispute Process — Step by Step
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
            {[
              { step: '01', title: 'Submit your dispute', content: 'Email hello@rentrightnz.co.nz with subject line "Review Dispute". Include your full name, the property address the review refers to, the specific review content you are disputing, and your reason for believing the review is false or violates our guidelines.' },
              { step: '02', title: 'We acknowledge within 24 hours', content: 'You will receive an acknowledgement email within 24 hours confirming we have received your dispute and assigned it a reference number.' },
              { step: '03', title: 'We investigate within 48 hours', content: 'We review the content against our Review Guidelines and Terms of Service. We may contact the original reviewer for more information. We assess whether the review contains false statements of fact, personal attacks, or content that violates our policies.' },
              { step: '04', title: 'We communicate our decision', content: 'We will email you our decision with a clear explanation. Possible outcomes: review removed, review edited to remove specific content, review remains published, or dispute escalated for further review.' },
              { step: '05', title: 'Right of appeal', content: 'If you disagree with our decision, you may request a second review by a senior team member. Appeals must be submitted within 7 days of receiving our decision.' },
            ].map(item => (
              <div key={item.step} style={{ display: 'flex', gap: '1.2rem', background: 'white', border: '1px solid var(--border)', borderRadius: 14, padding: '1.5rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--green)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
                  {item.step}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--text-muted)', fontWeight: 300 }}>{item.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* GROUNDS */}
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.2rem' }}>
            Valid Grounds for Removal
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem', marginBottom: '3rem' }}>
            {[
              { icon: '❌', title: 'False statements of fact', desc: 'Claims presented as fact that are provably untrue' },
              { icon: '🚫', title: 'Not about the tenancy', desc: 'Personal attacks unrelated to landlord conduct' },
              { icon: '⚠️', title: 'Criminal accusations', desc: 'Alleging criminal conduct without a court conviction' },
              { icon: '🔒', title: 'Private information', desc: 'Contains personal details like home address or family information' },
              { icon: '💢', title: 'Harassment', desc: 'Content designed to harass or intimidate rather than inform' },
              { icon: '🤝', title: 'Not genuine experience', desc: 'Review written by someone who never rented from this landlord' },
            ].map(g => (
              <div key={g.title} style={{ background: 'var(--cream)', borderRadius: 12, padding: '1.2rem' }}>
                <div style={{ fontSize: '1.3rem', marginBottom: '0.4rem' }}>{g.icon}</div>
                <div style={{ fontWeight: 500, fontSize: '0.88rem', marginBottom: '0.3rem' }}>{g.title}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{g.desc}</div>
              </div>
            ))}
          </div>

          {/* NOT VALID */}
          <div style={{ background: 'rgba(232,98,42,0.06)', border: '1px solid rgba(232,98,42,0.2)', borderRadius: 16, padding: '1.5rem', marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, marginBottom: '0.8rem', color: 'var(--orange)' }}>
              ⚠️ Not Valid Grounds for Removal
            </h3>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#7a5030', fontWeight: 300, marginBottom: '0.8rem' }}>
              The following are NOT valid reasons to request removal of a review:
            </p>
            {[
              'The review is negative about you',
              'You disagree with the reviewer\'s opinion',
              'The review makes you look bad but is truthful',
              'You want to protect your reputation from accurate feedback',
              'The review mentions a Tribunal case that did occur'
            ].map((item, i) => (
              <div key={i} style={{ fontSize: '0.85rem', color: '#7a5030', marginBottom: '0.4rem' }}>❌ {item}</div>
            ))}
          </div>

          {/* HDCA */}
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 16, padding: '1.8rem', marginBottom: '2rem' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.8rem' }}>
              🏛️ External Options — NetSafe & Courts
            </h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--text-muted)', fontWeight: 300 }}>
              If you believe a review breaches the Harmful Digital Communications Act 2015 and our internal process has not resolved the issue, you may contact <strong>NetSafe</strong> at netsafe.org.nz for free mediation. NetSafe is the approved agency under the HDCA for online content complaints.
            </p>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--text-muted)', fontWeight: 300, marginTop: '0.8rem' }}>
              For matters you believe constitute defamation under the Defamation Act 1992, you may seek independent legal advice. We recommend contacting a NZ solicitor before pursuing court action, as legal proceedings are costly and time-consuming for all parties.
            </p>
          </div>

          {/* CTA */}
          <div style={{ background: 'var(--green)', borderRadius: 16, padding: '2rem', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--white)', marginBottom: '0.6rem' }}>
              Submit a Dispute
            </h3>
            <p style={{ color: 'rgba(245,240,232,0.8)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Response guaranteed within 48 hours
            </p>
            <a href="mailto:hello@rentrightnz.co.nz?subject=Review Dispute"
              className="btn-primary"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', display: 'inline-flex' }}>
              Email hello@rentrightnz.co.nz →
            </a>
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
