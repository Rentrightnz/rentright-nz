'use client'
import Link from 'next/link'

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p style={{ color: 'rgba(245,240,232,0.7)', marginTop: '0.8rem', fontSize: '0.9rem' }}>
              Last updated: January 2025 · Effective immediately
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 780, margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
          <div style={{ background: 'rgba(232,98,42,0.08)', border: '1px solid rgba(232,98,42,0.2)', borderRadius: 12, padding: '1.2rem 1.5rem', marginBottom: '2.5rem', fontSize: '0.9rem', lineHeight: 1.7 }}>
            ⚠️ <strong>Important:</strong> By using RentRight NZ, leaving a review, or accessing any part of this platform, you agree to these Terms of Service. Please read them carefully before submitting any content.
          </div>

          {[
            {
              num: '1', title: 'About RentRight NZ',
              content: `RentRight NZ ("we", "us", "our") is a New Zealand-based platform that allows renters to share their experiences with landlords and property managers. Our mission is to increase transparency in the New Zealand rental market.

We are not a government agency, law firm, or official authority. We do not provide legal advice. Information on this platform should be used as one of many sources when making rental decisions.`
            },
            {
              num: '2', title: 'Who Can Use This Platform',
              content: `You must be 18 years or older to use RentRight NZ. By using this platform you confirm that:
              
• You are a current or former tenant, landlord, or property manager in New Zealand
• The information you provide is accurate and based on your personal experience
• You will not use this platform for any unlawful purpose
• You will not submit reviews on behalf of someone else`
            },
            {
              num: '3', title: 'Review Submission Rules — READ CAREFULLY',
              content: `When you submit a review on RentRight NZ, you are making a legal declaration. By ticking the confirmation checkbox and submitting a review, you confirm ALL of the following:

✅ Your review is truthful and based on your own personal experience as a tenant
✅ You have actually rented from or interacted with this landlord
✅ Every factual claim in your review is accurate to the best of your knowledge
✅ Your review does not contain false statements of fact
✅ You are not submitting a review on behalf of another person
✅ Your review does not contain personal attacks unrelated to the tenancy
✅ Your review does not accuse anyone of criminal activity without a court conviction
✅ You understand that submitting a false review may expose you to legal action under the Defamation Act 1992

Submitting a review does not guarantee it will be published. We reserve the right to review, edit, or remove any content at our discretion.`
            },
            {
              num: '4', title: 'What Reviews Must Be About',
              content: `Reviews on RentRight NZ must relate exclusively to the person's conduct as a landlord or property manager. Acceptable review topics include:

• Responsiveness to maintenance requests
• Fairness with bond refunds
• Communication and professionalism
• Property condition and Healthy Homes compliance
• Honesty about lease terms
• Behaviour during inspections
• Any Tenancy Tribunal proceedings you were personally involved in

Reviews must NOT contain:
• Comments about a person's ethnicity, religion, gender, age, or appearance
• Accusations of criminal conduct without a court conviction
• Personal information unrelated to the tenancy (home address, family details)
• Threats or harassment of any kind
• Statements you know to be false`
            },
            {
              num: '5', title: 'Our Liability as a Platform',
              content: `RentRight NZ is a platform that hosts content submitted by users. We are not the author of user reviews.

We do not verify every claim made in user reviews. Reviews represent the personal opinions and experiences of individual users, not the views of RentRight NZ.

To the maximum extent permitted by New Zealand law, RentRight NZ is not liable for:
• The accuracy of user-submitted reviews
• Decisions made based on information on this platform
• Any loss or damage arising from use of this platform

Always conduct your own independent research before making rental decisions. This platform is one source of information — not the only one.`
            },
            {
              num: '6', title: 'Tribunal Records',
              content: `Tenancy Tribunal records displayed on RentRight NZ are sourced from publicly available information published by the New Zealand Ministry of Justice.

We make reasonable efforts to ensure accuracy but cannot guarantee that all records are complete, current, or error-free. Orders older than 3 years may not be available. Some orders may have been suppressed by the Tribunal.

If you believe a Tribunal record displayed on this platform contains an error, please contact us immediately at hello@rentrightnz.co.nz and we will investigate within 48 hours.`
            },
            {
              num: '7', title: 'Landlord Rights — Disputing a Review',
              content: `If you are a landlord and believe a review about you is false, defamatory, or violates these Terms, you have the right to dispute it.

To dispute a review:
1. Email hello@rentrightnz.co.nz with the subject line "Review Dispute"
2. Include your name, the review in question, and why you believe it is false
3. We will acknowledge your dispute within 24 hours
4. We will investigate and respond within 48 hours
5. If we determine the review violates our Terms, we will remove it

If you believe a review constitutes a breach of the Harmful Digital Communications Act 2015, you may also contact NetSafe at netsafe.org.nz for free mediation.

Landlords who submit false dispute claims in bad faith to remove legitimate reviews may have their profiles suspended.`
            },
            {
              num: '8', title: 'Privacy and Anonymity',
              content: `Reviews on RentRight NZ are published anonymously. We do not display the name of the reviewer publicly.

However, please be aware that:
• We do retain your email address or account information when you submit a review
• In the event of a valid legal request (such as a court order), we may be required to provide reviewer information to authorities
• Anonymity is not a licence to submit false or defamatory content
• We will cooperate fully with legitimate law enforcement and legal processes

For full details on how we handle your data, see our Privacy Policy.`
            },
            {
              num: '9', title: 'Discrimination',
              content: `RentRight NZ supports the Human Rights Act 1993 and the Residential Tenancies Act 1986, both of which prohibit landlords from discriminating against tenants on the basis of race, colour, national or ethnic origin, sex, marital status, religious belief, ethical belief, disability, age, political opinion, employment status, family status, or sexual orientation.

If you have experienced discrimination from a landlord, you may flag it in your review. When flagging discrimination, please describe only what you personally experienced. Do not make broad generalisations about a landlord's character.

Discrimination flags are taken seriously. Landlords with confirmed discrimination flags may be referred to the Human Rights Commission.`
            },
            {
              num: '10', title: 'Changes to These Terms',
              content: `We may update these Terms from time to time. When we do, we will update the "Last updated" date at the top of this page. Your continued use of RentRight NZ after changes are made constitutes acceptance of the new Terms.

For significant changes, we will notify registered users by email.`
            },
            {
              num: '11', title: 'Governing Law',
              content: `These Terms are governed by the laws of New Zealand. Any disputes arising from use of this platform will be subject to the jurisdiction of New Zealand courts.

For any questions about these Terms, contact us at hello@rentrightnz.co.nz`
            }
          ].map(section => (
            <div key={section.num} style={{ marginBottom: '2.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid var(--border)' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ background: 'var(--green)', color: 'white', width: 28, height: 28, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontFamily: 'DM Sans, sans-serif', flexShrink: 0 }}>{section.num}</span>
                {section.title}
              </h2>
              <div style={{ fontSize: '0.92rem', lineHeight: 1.85, color: '#3a3330', fontWeight: 300, whiteSpace: 'pre-line' }}>
                {section.content}
              </div>
            </div>
          ))}

          <div style={{ background: 'var(--cream)', borderRadius: 16, padding: '1.5rem 2rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>
              Questions about these Terms? We're happy to explain anything.
            </p>
            <a href="mailto:hello@rentrightnz.co.nz" className="btn-primary" style={{ display: 'inline-flex' }}>
              Contact Us →
            </a>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/legal/privacy" style={{ color: 'var(--green)', fontSize: '0.85rem' }}>Privacy Policy →</Link>
            <Link href="/legal/review-guidelines" style={{ color: 'var(--green)', fontSize: '0.85rem' }}>Review Guidelines →</Link>
            <Link href="/legal/takedown" style={{ color: 'var(--green)', fontSize: '0.85rem' }}>Takedown Policy →</Link>
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
