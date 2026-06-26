# SR Contractor LLC — Website

A fast, SEO-optimized, bilingual (English + Spanish) website for **SR Contractor LLC**
(Santiago Ramirez), an Arvada-based contractor serving the Denver metro area.

It's a plain static site — just HTML, CSS, and a little JavaScript. No build step, no
framework, nothing to compile. That makes it fast (good for Google ranking) and free/cheap
to host.

---

## 1. What's in here

This repository's **root is the website root** (so the GitHub Pages "deploy from branch →
`main` → `/`" setting works and the absolute paths like `/css/styles.css` resolve):

```
/ (repo root)
├─ index.html          ← English homepage (the main page)
├─ es/index.html       ← Spanish homepage (/es/)
├─ css/styles.css      ← all styling
├─ js/main.js          ← mobile menu + contact form
├─ assets/
│  ├─ favicon.svg      ← site icon / logo mark
│  ├─ hero.svg         ← hero background
│  └─ og-image.svg     ← social-share image SOURCE (see step 6)
├─ robots.txt          ← tells search engines they can crawl + where the sitemap is
├─ sitemap.xml         ← list of pages for Google
├─ llms.txt            ← machine-readable summary for AI assistants (ChatGPT/Claude/etc.)
├─ CNAME               ← custom domain for GitHub Pages (arvadacontractor.com)
├─ .nojekyll           ← tells GitHub Pages to skip Jekyll processing
└─ README.md           ← this file
```

To preview it locally, from the repo root run:

```
python -m http.server 8123
```

then open <http://localhost:8123>. (Serve the **repo root** as the web root — the links use
absolute paths like `/css/styles.css`.)

---

## 2. ⚠️ Read this first — three honesty/legal notes

These are deliberately handled conservatively. Don't undo them without reading.

1. **No "Licensed & Insured" claims.** The site does **not** say Santiago is licensed or
   insured, because that wasn't confirmed. Putting it on the site without it being true is
   false advertising and a liability risk. Colorado has **no statewide general-contractor
   license**, but **individual cities (Denver, Arvada, Lakewood, etc.) require a local
   contractor license/registration and permits** for many jobs, and most homeowners expect
   **general liability insurance**. If/when you confirm these, see step 7 to add a trust
   badge — it's a strong selling point and worth doing.

2. **No street address is published.** His filed address (`5460 Harlan St Lot 60`) is his
   home. A contractor is a "service-area business," so the site only says
   *"Olde Town Arvada · serving the Denver metro."* Keep it that way (and set the Google
   Business Profile up as a service-area business — step 8).

3. **No fake reviews.** The Reviews section is an honest empty-state that asks for the first
   review. Add **real** ones only — instructions in step 9.

---

## 3. The domain

Plan (already decided): register and use

- **arvadacontractor.com** — the primary/canonical domain. It's short, and the
  city + "contractor" keyword helps local SEO and click-through.
- **srcontractorllc.com** — secondary. Point it to the same site with a **301 redirect**
  to `arvadacontractor.com` (so the brand name also lands people in the right place and you
  don't split SEO across two domains).

Every internal reference in the code already uses `https://arvadacontractor.com`. If you
ever change the primary domain, do a find-and-replace for `arvadacontractor.com` across
`index.html`, `es/index.html`, `sitemap.xml`, and `robots.txt`.

---

## 4. Hosting — GitHub Pages + Porkbun (current setup)

This site is hosted on **GitHub Pages** from the repo
[`cajdata/SRContractor`](https://github.com/cajdata/SRContractor), with domains registered
at **Porkbun**.

**Already done (in the repo / via the API):**
- Site files live at the repo root; Pages source is **branch `main`, folder `/`**.
- `CNAME` is set to `arvadacontractor.com` (the canonical domain).

**You finish at Porkbun (see the DNS section below):**

*Domain 1 — `arvadacontractor.com` (the live site):* in Porkbun DNS, delete the default
parking records, then add GitHub Pages' four apex `A` records and a `www` `CNAME`:

| Type | Host | Value |
|------|------|-------|
| A | *(blank = @)* | `185.199.108.153` |
| A | *(blank)* | `185.199.109.153` |
| A | *(blank)* | `185.199.110.153` |
| A | *(blank)* | `185.199.111.153` |
| CNAME | `www` | `cajdata.github.io` |

Then in **repo → Settings → Pages**, once the DNS check passes, tick **Enforce HTTPS**
(GitHub issues a free certificate automatically).

*Domain 2 — `srcontractorllc.com` (redirect):* don't point it at GitHub. Use Porkbun's
**URL Forwarding** → destination `https://arvadacontractor.com`, type **301 permanent**,
include path + forward `www`. Porkbun handles its SSL.

---

## 5. Make the contact form actually email Santiago

The form is pre-wired but needs a key. **You'll need Santiago's email address first.**

**Option A — Web3Forms (already wired in, free, no account-per-site):**
1. Get Santiago's email.
2. Go to <https://web3forms.com>, enter that email, and copy the **Access Key** they send.
3. In **both** `index.html` and `es/index.html`, find:
   `<input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">`
   and replace `YOUR_WEB3FORMS_ACCESS_KEY` with the real key.

That's it — form submissions will email to Santiago. Until you do this, the form shows a
friendly "please call or text us" message instead of failing silently.

**Option B — Netlify Forms (if you host on Netlify):** add `data-netlify="true"` to the
`<form>` tag and remove the Web3Forms hidden input + the fetch handler. Netlify emails you
submissions with no third-party key.

> Tip: also consider forwarding form emails to your own inbox as a backup, since Santiago
> may not check email often. Web3Forms lets you set multiple recipients.

---

## 6. The social-share (Open Graph) image

When someone shares the site on Facebook/iMessage/etc., `assets/og-image.svg` is the source
artwork. Most social platforms **don't render SVG**, so export it to a **1200×630 JPG**
named `og-image.jpg` and drop it in `assets/`. The meta tags already point to
`assets/og-image.jpg`. (Quick export: open the SVG in any browser, screenshot at 1200×630,
or use an online SVG→JPG converter.)

---

## 7. Adding a "Licensed & Insured" badge (ONLY after you confirm it)

If Santiago confirms a city contractor license and/or liability insurance, it's worth
showing. Add a line to the hero trust list in `index.html` (and the Spanish equivalent):

```html
<li><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg> Licensed &amp; insured</li>
```

Only add it if it's true and current.

---

## 8. 🚨 The #1 local-SEO task: Google Business Profile

For "contractor near me" type searches, **the Google Business Profile (the map listing) does
more than the website itself.** Do this:

1. Create/claim the profile at <https://business.google.com> for **SR Contractor LLC**.
2. Set it up as a **Service-area business** (hide the home address; list service areas:
   Arvada, Wheat Ridge, Westminster, Lakewood, Golden, Broomfield, Thornton, Denver…).
3. Use the **exact same** business name, phone `(720) 672-2730`, and website
   `https://arvadacontractor.com` everywhere. Consistency ("NAP" = Name/Address/Phone)
   matters for ranking.
4. Pick categories: **General Contractor** + the specific ones (Painter, Deck Builder,
   Flooring Contractor, Fence Contractor, Landscaper, etc.).
5. Add lots of **real project photos** (before/after sells contractors).
6. Add services + a short description (you can reuse the site's wording).

---

## 9. Reviews & reputation (do this continuously)

Reviews are one of the biggest ranking + conversion factors for contractors.

- Get the **Google review short link** from the Business Profile ("Ask for reviews") and
  text it to happy past customers (including you!). Even 5–10 real reviews makes a big
  difference.
- To show reviews **on the site**, open `index.html` (and `es/index.html`), find the
  `id="reviews"` section, and there's a commented-out `TEMPLATE` block. Copy it, fill in a
  real quote + first name + city, and remove the `<!-- -->` comment wrappers.

---

## 10. Get found: submit to search engines + directories

1. **Google Search Console** (<https://search.google.com/search-console>): verify the site,
   then submit `https://arvadacontractor.com/sitemap.xml`. Also test a page with the
   **Rich Results Test** to confirm the FAQ/business structured data is picked up.
2. **Bing Webmaster Tools**: same idea, submit the sitemap.
3. **Free local directories** (more consistent listings = better local SEO):
   Yelp, Angi, Thumbtack, Nextdoor, Facebook Page, BBB, Houzz. Use the **same** name,
   phone, and website on every one.

> **About `llms.txt`:** the site includes `/llms.txt`, a machine-readable summary for AI
> assistants (ChatGPT, Claude, Perplexity). It is **not** a Google ranking factor — it
> won't change search position. Its value is the growing "ask an AI for a contractor"
> use case: it helps those tools describe the business accurately. If you edit the
> services, phone, or service area on the site, update `llms.txt` to match.

---

## 11. Editing the site later (cheat sheet)

- **Phone number:** it appears as `tel:+17206722730` / `sms:+17206722730` and the display
  text `(720) 672-2730`. Find-and-replace both forms if it ever changes.
- **Text content:** just open `index.html` / `es/index.html` and edit the words between the
  tags. Keep the two language versions in sync.
- **Colors:** all defined once at the top of `css/styles.css` under `:root`.
- **Add/remove a service:** copy one `<article class="service-card">…</article>` block.
  If you add a service, also add it to the `hasOfferCatalog` list in the JSON-LD `<script>`
  in `<head>` so search engines know about it.
- **Business hours:** none are listed (none were provided). If you want them shown, add an
  `"openingHoursSpecification"` to the JSON-LD and a line in the Contact section.

---

### Quick pre-launch checklist

- [x] Push site to GitHub + enable Pages (branch `main`, folder `/`) — done
- [ ] Register `arvadacontractor.com` + `srcontractorllc.com` at Porkbun
- [ ] Point `arvadacontractor.com` DNS at GitHub Pages; 301-forward `srcontractorllc.com` to it (step 4)
- [ ] After DNS resolves, tick **Enforce HTTPS** in repo → Settings → Pages
- [ ] Get Santiago's email → add the Web3Forms key in **both** HTML files (step 5)
- [ ] Export `og-image.svg` → `og-image.jpg` (step 6)
- [ ] Create & verify the Google Business Profile as a service-area business (step 8)
- [ ] Submit the sitemap in Google Search Console (step 10)
- [ ] Start collecting real Google reviews (step 9)
- [ ] (If confirmed) add the "Licensed & insured" badge (step 7)
```
