This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Google Calendar Events (Auto-updating)

This site can auto-load events from a public Google Calendar (read-only) either via a public ICS feed (no Google Cloud) or the Google Calendar API.

**1) Set env vars**
- Copy `.env.example` → `.env.local`
- Choose **one** of these setups:
  - **No Google Cloud (no billing):** set `GOOGLE_CALENDAR_ICS_URL`
  - **Google Calendar API:** set `GOOGLE_CALENDAR_ID` + `GOOGLE_CALENDAR_API_KEY`

**2A) No Google Cloud (recommended if avoiding billing)**
- In Google Calendar: Settings → Integrate calendar → copy **Public address in iCal format**
- Set `GOOGLE_CALENDAR_ICS_URL` to that `.ics` URL

**2B) Create an API key (Calendar API)**
- Google Cloud Console → create/select a project
- Enable **Google Calendar API**
- Credentials → **Create API key**
- Recommended: restrict the key to the Calendar API

**3) Event description template (strict)**

In Google Calendar, put this in the event **Description** (headers must match exactly; use `N/A` when empty):

```
SUMMARY:
<1–3 sentences>

DESCRIPTION:
<optional extra details or N/A>

CATEGORY:
COUNCIL_MEETING | SOCIAL | WORKSHOP

FLYER_1_URL:
<https://... or N/A>

FLYER_2_URL:
<https://... or N/A>

FLYER_3_URL:
<https://... or N/A>
```

The built-in Google Calendar **Location** field is used for the location shown on the website.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
