import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

const EVENTS_QUERY = groq`*[_type == "event"] | order(start asc) {
  _id,
  title,
  "slug": slug.current,
  start,
  location
}`;

export default async function EventsPage() {
  const events = await client.fetch(EVENTS_QUERY);

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">Events</h1>

      {events.length === 0 ? (
        <p className="text-neutral-600">No events yet.</p>
      ) : (
        <ul className="space-y-3">
          {events.map((e: any) => (
            <li key={e._id} className="rounded-lg border p-4 hover:bg-neutral-50">
              <a className="block" href={`/events/${e.slug}`}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{e.title}</span>
                  <time className="text-sm text-neutral-600">
                    {new Date(e.start).toLocaleString()}
                  </time>
                </div>
                {e.location && (
                  <p className="text-sm text-neutral-600">{e.location}</p>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
