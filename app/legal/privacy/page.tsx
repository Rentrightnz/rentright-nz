'use client'
import Link from 'next/link'

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p style={{ color: 'rgba(245,240,232,0.6)', marginTop: '0.8rem', fontSize: '0.9rem' }}>
              Last updated: January 2025 · Compliant with NZ Privacy Act 2020
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 780, margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
          <div style={{ background: 'rgba(45,90,61,0.08)', border: '1px solid var(--green-pale)', borderRadius: 12, padding: '1.2rem 1.5rem', marginBottom: '2.5rem', fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--green)' }}>
            🔒 RentRight NZ takes your privacy seriously. We collect only what we need, never sell your data, and give you full control over your information.
          </div>

          {[
            {
              num: '1', title: 'Who We Are',
              content: `RentRight NZ is a New Zealand-based platform helping renters make informed decisions about landlords. This Privacy Policy explains how we collect, use, store, and protect your personal information in accordance with the New Zealand Privacy Act 2020.

If you have any questions about this policy, contact us at hello@rentrightnz.co.nz`
            },
            {
              num: '2', title: 'What Information We Collect',
              content: `We collect information in the following ways:

INFORMATION YOU GIVE US:
• Email address (when you sign up or join the waitlist)
• Name (when you create a landlord or property manager account)
• Review content (when you submit a review)
• Location/property details (when you create a landlord profile)
• Payment information (when you upgrade to a paid plan — processed securely by Stripe, we never store card details)

INFORMATION COLLECTED AUTOMATICALLY:
• Browser type and device information
• Pages you visit on our platform
• IP address (for fraud prevention only)
• Cookies (see Section 7)

INFORMATION FROM PUBLIC SOURCES:
• Tenancy Tribunal records (publicly available from Ministry of Justice)
• Property ownership records (from LINZ public register)`
            },
            {
              num: '3', title: 'How We Use Your Information',
              content: `We use your information only for the following purposes:

• To operate and improve the RentRight NZ platform
• To send you account-related emails (verification, password reset)
• To notify you of updates to the platform (if you opt in)
• To investigate disputes about reviews
• To prevent fraud and misuse of the platform
• To comply with legal obligations

We will NEVER:
• Sell your personal information to third parties
• Use your information for advertising by other companies
• Share your information without your consent (except where legally required)
• Display your name publicly alongside reviews you submit`
            },
            {
              num: '4', title: 'Anonymity of Reviews',
              content: `Reviews submitted on RentRight NZ are published anonymously. Your name is never displayed next to your review.

However, we do retain a record of who submitted each review internally. This is necessary to:
• Investigate disputes from landlords
• Prevent the same person leaving multiple reviews
• Comply with court orders or legal requests

In the event of a valid court order or legal process, we may be required to disclose reviewer identity to authorities. We will always notify you if this occurs, unless prohibited from doing so by law.`
            },
            {
              num: '5', title: 'Your Rights Under the Privacy Act 2020',
              content: `Under the New Zealand Privacy Act 2020, you have the right to:

• ACCESS your personal information — request a copy of all data we hold about you
• CORRECT your information — request we fix any inaccurate data
• DELETE your information — request we remove your account and associated data
• OBJECT to processing — ask us to stop using your data in certain ways
• COMPLAIN to the Privacy Commissioner if you believe we have mishandled your data

To exercise any of these rights, email hello@rentrightnz.co.nz with the subject "Privacy Request". We will respond within 20 working days as required by law.

If you are not satisfied with our response, you can contact the Office of the Privacy Commissioner at privacy.org.nz`
            },
            {
              num: '6', title: 'Data Storage and Security',
              content: `Your data is stored securely using Supabase, a trusted database platform with enterprise-grade security. Data is encrypted at rest and in transit.

We take reasonable steps to protect your information from unauthorised access, disclosure, or loss. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.

We retain your data for as long as your account is active. If you delete your account, we will remove your personal data within 30 days, except where retention is required by law.`
            },
            {
              num: '7', title: 'Cookies',
              content: `We use essential cookies only — these are required for the platform to function (for example, keeping you logged in).

We do not use advertising cookies or tracking cookies from third-party advertisers.

You can disable cookies in your browser settings, but this may affect your ability to use the platform.`
            },
            {
              num: '8', title: 'Third Party Services',
              content: `We use the following trusted third-party services to operate our platform:

• Supabase — database and authentication (supabase.com)
• Vercel — website hosting (vercel.com)
• Resend — transactional emails (resend.com)

Each of these services has their own privacy policy and security standards. We only share the minimum data necessary with these services.

We do not use Google Analytics, Facebook Pixel, or any advertising tracking tools.`
            },
            {
              num: '9', title: 'Children',
              content: `RentRight NZ is not intended for use by anyone under 18 years of age. We do not knowingly collect personal information from children. If you believe a child has submitted information to our platform, please contact us and we will remove it immediately.`
            },
            {
              num: '10', title: 'Changes to This Policy',
              content: `We may update this Privacy Policy from time to time. We will notify registered users by email of any significant changes. The "Last updated" date at the top of this page will always reflect the most recent version.

Your continued use of RentRight NZ after changes are made constitutes acceptance of the updated policy.`
            }
          ].map(section => (
            <div key={section.num} style={{ marginBottom: '2.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid var(--border)' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ background: 'var(--black)', color: 'white', width: 28, height: 28, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontFamily: 'DM Sans, sans-serif', flexShrink: 0 }}>{section.num}</span>
                {section.title}
              </h2>
              <div style={{ fontSize: '0.92rem', lineHeight: 1.85, color: '#3a3330', fontWeight: 300, whiteSpace: 'pre-line' }}>
                {section.content}
              </div>
            </div>
          ))}

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/legal/terms" style={{ color: 'var(--green)', fontSize: '0.85rem' }}>Terms of Service →</Link>
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
