import { NextResponse } from 'next/server';
import { fetchUpcomingGCalEvents, fetchUpcomingGCalEventsFromIcs } from '@/lib/googleCalendar';

export const runtime = 'nodejs';

export async function GET() {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
  const icsUrl = process.env.GOOGLE_CALENDAR_ICS_URL;

  const hasApi = !!calendarId && !!apiKey;
  const hasIcs = !!icsUrl;

  if (!hasApi && !hasIcs) {
    return NextResponse.json(
      {
        error: 'Missing env vars.',
        requiredOneOf: [
          ['GOOGLE_CALENDAR_ICS_URL'],
          ['GOOGLE_CALENDAR_ID', 'GOOGLE_CALENDAR_API_KEY'],
        ],
      },
      { status: 500 },
    );
  }

  const now = new Date();
  const timeMinIso = now.toISOString();
  const timeMaxIso = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 180).toISOString(); // ~6 months

  try {
    const events = hasIcs
      ? await fetchUpcomingGCalEventsFromIcs({ icsUrl: icsUrl as string, timeMinIso, timeMaxIso, maxResults: 75 })
      : await fetchUpcomingGCalEvents({ calendarId: calendarId as string, apiKey: apiKey as string, timeMinIso, timeMaxIso, maxResults: 75 });
    return NextResponse.json({ events });
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 502 },
    );
  }
}
