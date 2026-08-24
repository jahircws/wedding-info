# Amara & Julian — Wedding Website

A one-page, mobile-friendly wedding site: event details, hotel suggestions,
registry links, and an RSVP form (attendance, meal choice, allergies/dietary
restrictions, and where guests are staying).

---

## 1. Edit your content (no code experience needed)

Everything guest-facing — names, date, venue, hotels, registry links, meal
options, RSVP deadline — lives in one file:

```
lib/weddingConfig.ts
```

Open it, change the text between the quotes, save. That's it — no other
files need to change for routine updates (new hotel, new meal option, date
change, etc).

To change the RSVP **questions themselves** (add/remove a field), edit
`components/RsvpForm.tsx` — each question is one labeled block. The
easiest additions (another dropdown or text field) can be copy-pasted from
an existing block.

---

## 2. Where RSVP responses go

The form posts to `/api/rsvp`, which can forward each response to a
**Google Sheet** and/or send you an **email**. Turn either (or both) on by
setting environment variables — copy `.env.example` to `.env.local` and
fill in what you use.

### Option A — Google Sheet (recommended, free, no API keys)

1. Create a new Google Sheet. Add a header row matching the fields you
   care about, e.g.: `submittedAt, fullName, email, attending, guestCount,
   mealChoice, dietary, hotelName, checkIn, checkOut, notes`
2. In the Sheet, go to **Extensions → Apps Script**.
3. Replace the default code with:

   ```javascript
   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     const data = JSON.parse(e.postData.contents);
     sheet.appendRow([
       data.submittedAt, data.fullName, data.email, data.attending,
       data.guestCount, data.mealChoice, data.dietary, data.hotelName,
       data.checkIn, data.checkOut, data.notes
     ]);
     return ContentService.createTextOutput(JSON.stringify({ ok: true }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

4. Click **Deploy → New deployment → Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the deployment URL and set it as `GOOGLE_SCRIPT_URL` in `.env.local`.

Every RSVP will now append a new row to your sheet in real time.

### Option B — Email notification

1. Create a free account at [resend.com](https://resend.com) and verify a
   sending domain (or use their test domain while testing).
2. Set in `.env.local`:
   ```
   RESEND_API_KEY=your_key
   RESEND_FROM_EMAIL=rsvp@yourdomain.com
   NOTIFY_EMAIL=you@example.com
   ```

You can use both A and B together — each RSVP will hit the sheet and send
an email.

If neither is configured, submissions still succeed for the guest and are
printed to the server log, so nothing is silently lost while you finish
setup.

---

## 3. Run it locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## 4. Deploy

The simplest path is [Vercel](https://vercel.com) (made by the creators of
Next.js, free for a site like this):

1. Push this folder to a GitHub repo.
2. Import the repo at vercel.com → New Project.
3. Add your `GOOGLE_SCRIPT_URL` / `RESEND_*` / `NOTIFY_EMAIL` values under
   Project Settings → Environment Variables.
4. Deploy. You'll get a URL like `amara-and-julian.vercel.app` — you can
   attach a custom domain from the same settings page later.

---

## 5. Sending the link via Paperless Post

This site doesn't need guests to log in — anyone with the link can fill
out the form, which matches sending it through Paperless Post's follow-up
email. Two ways to do that:

- **Paperless Post "Details" card / follow-up email**: paste your deployed
  site URL into the event's details section or a follow-up email blast to
  confirmed guests.
- **Direct link in the invite**: add the URL as a button/link on the
  invitation itself, so guests land here right after RSVP-ing on Paperless
  Post.

Since the form has no guest list lookup, anyone with the link can submit —
which is intentional here (keeps setup simple) but worth knowing: don't
post the link anywhere public.

---

## Design

Colors, fonts, and the double-line border frame follow `design.md`
(terra-cotta on warm cream, Poppins for headings, DM Serif Text for body,
Fleur De Leah as the script accent for your names).
