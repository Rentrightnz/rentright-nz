# RentRight NZ 🏠

NZ's landlord trust platform — built for renters, especially newcomers.

---

## 🚀 Deploy In 10 Minutes (No coding needed)

### Step 1 — Upload to GitHub

1. Go to **github.com** and log in
2. Click the **+** button (top right) → **New repository**
3. Name it: `rentright-nz`
4. Set to **Public**
5. Click **Create repository**
6. On the next screen, click **uploading an existing file**
7. Drag ALL the files from this folder into the upload area
8. Click **Commit changes**

---

### Step 2 — Deploy on Vercel (Free)

1. Go to **vercel.com** and log in with GitHub
2. Click **Add New Project**
3. Find `rentright-nz` in your repos → click **Import**
4. Leave all settings as default
5. Click **Deploy**
6. ✅ Your site is live in ~2 minutes!

Vercel gives you a free URL like: `rentright-nz.vercel.app`

---

### Step 3 — Connect Supabase (Database)

1. Go to **supabase.com** → **New Project**
2. Name: `rentright-nz`, choose region: **Southeast Asia (Singapore)** (closest to NZ)
3. Set a password (save it!) → **Create project**
4. Go to **Settings** → **API**
5. Copy your **Project URL** and **anon/public key**
6. In Vercel: go to your project → **Settings** → **Environment Variables**
7. Add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key
8. Redeploy in Vercel

---

### Step 4 — Connect Your Domain

1. Buy `rentrightnz.co.nz` at **1stdomains.nz** (~$23/yr)
2. In Vercel: **Settings** → **Domains** → Add `rentrightnz.co.nz`
3. Vercel shows you 2 DNS records to add
4. In 1stdomains: go to **DNS settings** → add those records
5. Wait 10-30 mins → your site is live at rentrightnz.co.nz! 🎉

---

## 📁 What Each File Does (Plain English)

```
app/
  page.tsx          → Home page (landing page)
  search/page.tsx   → Search landlords page
  landlord/[slug]/  → Individual landlord profile page
  for-landlords/    → Page for landlords to claim profiles
  globals.css       → All the styling (colours, fonts, layout)
  layout.tsx        → The wrapper around every page (nav, fonts)

lib/
  supabase.ts       → Connects to your database

package.json        → List of tools the app needs
```

---

## 🔄 How To Update The Site

1. Edit any file in GitHub (click the file → pencil icon)
2. Save (commit)
3. Vercel automatically redeploys in ~1 minute

No coding software needed — everything works in the browser.

---

## 📞 Need Help?

Built with Claude by Anthropic — continue the conversation at claude.ai
