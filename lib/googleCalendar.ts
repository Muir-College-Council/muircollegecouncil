export type GCalCategoryKey = 'COUNCIL_MEETING' | 'SOCIAL' | 'WORKSHOP' | 'OTHER';

export type ParsedGCalDescription = {
  description: string | null;
  category: GCalCategoryKey;
  flyerUrls: string[];
};

function normalizeValue(value: string | undefined | null) {
  const v = (value ?? '').trim();
  if (!v || v.toUpperCase() === 'N/A') return null;
  return v;
}

function normalizeUrl(value: string | null) {
  if (!value) return null;
  if (!/^https:\/\//i.test(value)) return null;
  return value;
}

function decodeBasicHtmlEntities(input: string) {
  return input
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'");
}

function descriptionToPlainText(input: string) {
  let text = input;

  // If Google Calendar returns HTML-formatted descriptions, normalize them.
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<\/(div|p|li|tr|h\d)>/gi, '\n');
  text = text.replace(/<(li)\b[^>]*>/gi, '- ');

  // Replace links with their href (preferred) or visible text.
  text = text.replace(/<a\b[^>]*href="([^"]+)"[^>]*>.*?<\/a>/gi, '$1');

  // Drop any remaining tags.
  text = text.replace(/<[^>]+>/g, '');

  text = decodeBasicHtmlEntities(text);

  // Normalize whitespace.
  text = text.replace(/\r\n/g, '\n');
  text = text.replace(/\n{3,}/g, '\n\n');
  return text.trim();
}

export function parseGCalDescriptionStrict(description: string | null | undefined): ParsedGCalDescription {
  const plain = descriptionToPlainText(description ?? '');
  const lines = plain.split('\n');

  const headerLine = (line: string) => {
    const trimmed = line.trim();
    const m = /^([A-Z0-9_]+):\s*(.*)$/.exec(trimmed);
    if (!m) return null;
    const key = m[1].toUpperCase();
    const rest = m[2] ?? '';
    return { key, rest };
  };

  const isFlyerKey = (key: string) => /^FLYER_(\d+)_URL$/.test(key);

  const readMultilineUntilHeader = (startIndex: number) => {
    const buffer: string[] = [];
    let i = startIndex;
    for (; i < lines.length; i++) {
      const maybeHeader = headerLine(lines[i] ?? '');
      if (maybeHeader) break;
      buffer.push(lines[i] ?? '');
    }
    return { text: buffer.join('\n').trim(), nextIndex: i };
  };

  const readSingleValue = (inlineRest: string, startIndex: number) => {
    const inline = inlineRest.trim();
    if (inline) return { value: inline, nextIndex: startIndex };
    let i = startIndex;
    for (; i < lines.length; i++) {
      const maybeHeader = headerLine(lines[i] ?? '');
      if (maybeHeader) break;
      const v = (lines[i] ?? '').trim();
      if (v) return { value: v, nextIndex: i + 1 };
    }
    return { value: '', nextIndex: i };
  };

  let summary: string | null = null;
  let body: string | null = null; // DESCRIPTION or legacy DETAILS
  let categoryRaw: string | null = null;
  const flyerMap = new Map<number, string>();

  let i = 0;
  while (i < lines.length) {
    const info = headerLine(lines[i] ?? '');
    if (!info) {
      i++;
      continue;
    }

    const { key, rest } = info;
    i++;

    if (key === 'SUMMARY') {
      if (rest.trim()) {
        summary = rest.trim();
      } else {
        const r = readMultilineUntilHeader(i);
        summary = r.text || null;
        i = r.nextIndex;
      }
      continue;
    }

    if (key === 'DESCRIPTION' || key === 'DETAILS') {
      if (rest.trim()) {
        body = rest.trim();
      } else {
        const r = readMultilineUntilHeader(i);
        body = r.text || null;
        i = r.nextIndex;
      }
      continue;
    }

    if (key === 'CATEGORY') {
      const r = readSingleValue(rest, i);
      categoryRaw = r.value || null;
      i = r.nextIndex;
      continue;
    }

    if (isFlyerKey(key)) {
      const n = Number(/^FLYER_(\d+)_URL$/.exec(key)?.[1] ?? '');
      if (!Number.isFinite(n) || n <= 0) continue;
      const r = readSingleValue(rest, i);
      const url = normalizeUrl(normalizeValue(r.value));
      if (url) flyerMap.set(n, url);
      i = r.nextIndex;
      continue;
    }
  }

  const categoryUpper = (normalizeValue(categoryRaw) ?? 'OTHER').toUpperCase();
  const category: GCalCategoryKey =
    categoryUpper === 'COUNCIL_MEETING'
      ? 'COUNCIL_MEETING'
      : categoryUpper === 'SOCIAL'
        ? 'SOCIAL'
        : categoryUpper === 'WORKSHOP'
          ? 'WORKSHOP'
          : 'OTHER';

  const s = normalizeValue(summary);
  const b = normalizeValue(body);
  const combined = s && b ? `${s}\n\n${b}` : s || b || null;

  const flyerUrls = Array.from(flyerMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([, url]) => url);

  return { description: combined?.trimEnd() ?? null, category, flyerUrls };
}

export type GCalEventApiItem = {
  id: string;
  summary?: string;
  description?: string;
  location?: string;
  htmlLink?: string;
  start?: { dateTime?: string; date?: string; timeZone?: string };
  end?: { dateTime?: string; date?: string; timeZone?: string };
};

export type NormalizedGCalEvent = {
  id: string;
  title: string;
  startIso: string;
  endIso: string;
  allDay: boolean;
  startDateOnly: string | null;
  endDateOnly: string | null;
  location: string | null;
  calendarUrl: string | null;
  description: string | null;
  category: GCalCategoryKey;
  flyerUrls: string[];
};

function toIsoOrFallback(value: string | undefined | null) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

export function normalizeGCalEvent(item: GCalEventApiItem): NormalizedGCalEvent | null {
  const title = (item.summary ?? '').trim() || 'Untitled Event';
  const startRaw = item.start?.dateTime ?? item.start?.date ?? null;
  const endRaw = item.end?.dateTime ?? item.end?.date ?? null;
  if (!item.id || !startRaw || !endRaw) return null;

  const startIso = toIsoOrFallback(startRaw);
  const endIso = toIsoOrFallback(endRaw);
  if (!startIso || !endIso) return null;

  const allDay = !!item.start?.date && !item.start?.dateTime;
  const startDateOnly = allDay ? item.start?.date ?? null : null;
  const endDateOnly = allDay ? item.end?.date ?? null : null;
  const location = (item.location ?? '').trim() || null;
  const calendarUrl = (item.htmlLink ?? '').trim() || null;

  const parsed = parseGCalDescriptionStrict(item.description);

  return {
    id: item.id,
    title,
    startIso,
    endIso,
    allDay,
    startDateOnly,
    endDateOnly,
    location,
    calendarUrl,
    description: parsed.description,
    category: parsed.category,
    flyerUrls: parsed.flyerUrls,
  };
}

export async function fetchUpcomingGCalEvents({
  calendarId,
  apiKey,
  timeMinIso,
  timeMaxIso,
  maxResults = 50,
}: {
  calendarId: string;
  apiKey: string;
  timeMinIso: string;
  timeMaxIso: string;
  maxResults?: number;
}) {
  const base = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`;
  const params = new URLSearchParams();
  params.set('key', apiKey);
  params.set('singleEvents', 'true');
  params.set('orderBy', 'startTime');
  params.set('timeMin', timeMinIso);
  params.set('timeMax', timeMaxIso);
  params.set('maxResults', String(maxResults));

  const url = `${base}?${params.toString()}`;
  const res = await fetch(url, {
    next: { revalidate: 120 },
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Google Calendar API error (${res.status}): ${text || res.statusText}`);
  }

  const data = (await res.json()) as { items?: GCalEventApiItem[] };
  const items = Array.isArray(data.items) ? data.items : [];
  const normalized = items.map(normalizeGCalEvent).filter((e): e is NormalizedGCalEvent => !!e);
  return normalized;
}

function unfoldIcsLines(text: string) {
  const rawLines = text.replace(/\r\n/g, '\n').split('\n');
  const lines: string[] = [];
  for (const line of rawLines) {
    if (!line) continue;
    if ((line.startsWith(' ') || line.startsWith('\t')) && lines.length > 0) {
      lines[lines.length - 1] += line.slice(1);
    } else {
      lines.push(line);
    }
  }
  return lines;
}

function unescapeIcsValue(value: string) {
  return value
    .replace(/\\n/gi, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\');
}

function parseIcsDateTime(raw: string, tzid?: string | null) {
  const v = raw.trim();
  const isUtc = v.endsWith('Z');
  const core = isUtc ? v.slice(0, -1) : v;
  const m = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?$/.exec(core);
  if (!m) return null;
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  const hour = Number(m[4]);
  const minute = Number(m[5]);
  const second = Number(m[6] ?? '0');

  if (isUtc || !tzid) {
    return new Date(Date.UTC(year, month - 1, day, hour, minute, second)).toISOString();
  }

  const desiredUtc = Date.UTC(year, month - 1, day, hour, minute, second);
  let guessUtc = desiredUtc;

  for (let i = 0; i < 4; i++) {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: tzid,
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).formatToParts(new Date(guessUtc));

    const gotYear = Number(parts.find((p) => p.type === 'year')?.value ?? '0');
    const gotMonth = Number(parts.find((p) => p.type === 'month')?.value ?? '0');
    const gotDay = Number(parts.find((p) => p.type === 'day')?.value ?? '0');
    const gotHour = Number(parts.find((p) => p.type === 'hour')?.value ?? '0');
    const gotMinute = Number(parts.find((p) => p.type === 'minute')?.value ?? '0');
    const gotSecond = Number(parts.find((p) => p.type === 'second')?.value ?? '0');

    const gotAsUtc = Date.UTC(gotYear, gotMonth - 1, gotDay, gotHour, gotMinute, gotSecond);
    const diff = desiredUtc - gotAsUtc;
    if (diff === 0) break;
    guessUtc += diff;
  }

  return new Date(guessUtc).toISOString();
}

function parseIcsDateOnly(raw: string) {
  const v = raw.trim();
  const m = /^(\d{4})(\d{2})(\d{2})$/.exec(v);
  if (!m) return null;
  return `${m[1]}-${m[2]}-${m[3]}`;
}

function parseIcsEventsToApiItems(icsText: string): GCalEventApiItem[] {
  const lines = unfoldIcsLines(icsText);
  const items: GCalEventApiItem[] = [];

  let inEvent = false;
  let current: Partial<GCalEventApiItem> & { _tzStart?: string | null; _tzEnd?: string | null; _allDay?: boolean; _status?: string } = {};

  const flush = () => {
    if (!current.id) return;
    if ((current._status ?? '').toUpperCase() === 'CANCELLED') return;
    items.push({
      id: current.id,
      summary: current.summary,
      description: current.description,
      location: current.location,
      htmlLink: current.htmlLink,
      start: current.start,
      end: current.end,
    });
  };

  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') {
      inEvent = true;
      current = {};
      continue;
    }
    if (line === 'END:VEVENT') {
      if (inEvent) flush();
      inEvent = false;
      current = {};
      continue;
    }
    if (!inEvent) continue;

    const idx = line.indexOf(':');
    if (idx <= 0) continue;
    const left = line.slice(0, idx);
    const valueRaw = line.slice(idx + 1);
    const [nameRaw, ...paramParts] = left.split(';');
    const name = nameRaw.toUpperCase();
    const value = unescapeIcsValue(valueRaw);

    const params = new Map<string, string>();
    for (const p of paramParts) {
      const eq = p.indexOf('=');
      if (eq > 0) params.set(p.slice(0, eq).toUpperCase(), p.slice(eq + 1));
    }

    if (name === 'UID') current.id = value.trim();
    if (name === 'SUMMARY') current.summary = value;
    if (name === 'DESCRIPTION') current.description = value;
    if (name === 'LOCATION') current.location = value;
    if (name === 'URL') current.htmlLink = value.trim();
    if (name === 'STATUS') current._status = value.trim();

    if (name === 'DTSTART') {
      const valueType = (params.get('VALUE') ?? '').toUpperCase();
      const tzid = params.get('TZID') ?? null;
      if (valueType === 'DATE') {
        const d = parseIcsDateOnly(value);
        if (d) current.start = { date: d };
      } else {
        const iso = parseIcsDateTime(value, tzid);
        if (iso) current.start = { dateTime: iso, timeZone: tzid ?? undefined };
      }
    }

    if (name === 'DTEND') {
      const valueType = (params.get('VALUE') ?? '').toUpperCase();
      const tzid = params.get('TZID') ?? null;
      if (valueType === 'DATE') {
        const d = parseIcsDateOnly(value);
        if (d) current.end = { date: d };
      } else {
        const iso = parseIcsDateTime(value, tzid);
        if (iso) current.end = { dateTime: iso, timeZone: tzid ?? undefined };
      }
    }
  }

  return items;
}

export async function fetchUpcomingGCalEventsFromIcs({
  icsUrl,
  timeMinIso,
  timeMaxIso,
  maxResults = 50,
}: {
  icsUrl: string;
  timeMinIso: string;
  timeMaxIso: string;
  maxResults?: number;
}) {
  const res = await fetch(icsUrl, {
    next: { revalidate: 120 },
    headers: { Accept: 'text/calendar' },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`ICS fetch error (${res.status}): ${text || res.statusText}`);
  }

  const icsText = await res.text();
  const apiItems = parseIcsEventsToApiItems(icsText);
  const normalized = apiItems.map(normalizeGCalEvent).filter((e): e is NormalizedGCalEvent => !!e);

  const min = new Date(timeMinIso).getTime();
  const max = new Date(timeMaxIso).getTime();
  const filtered = normalized.filter((e) => {
    const start = new Date(e.startIso).getTime();
    const end = new Date(e.endIso).getTime();
    return end >= min && start <= max;
  });

  filtered.sort((a, b) => (a.startIso < b.startIso ? -1 : a.startIso > b.startIso ? 1 : 0));
  return filtered.slice(0, maxResults);
}
