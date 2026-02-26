import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

type Props = { params: { slug: string } };

const EVENT_QUERY = groq`*[_type == "event" && slug.current == $slug][0]{
  title,
  start,
  end,
  location,
  description,
  heroImage,
  "flyerUrl": flyerFile.asset->url
}`;

export default async function EventDetailPage({ params }: Props) {
  const event = await client.fetch(EVENT_QUERY, { slug: params.slug });

  if (!event) {
    return (
      <main className="space-y-6">
        <h1 className="text-2xl font-semibold">Event not found</h1>
        <Link className="text-blue-600 underline" href="/events">← Back to Events</Link>
      </main>
    );
  }

  return (
    <main className="space-y-6">
      <nav className="text-sm">
        <Link className="text-blue-600 underline" href="/events">← Back to Events</Link>
      </nav>

      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <p className="text-neutral-600">
          {new Date(event.start).toLocaleString()}
          {event.location ? ` • ${event.location}` : ""}
        </p>
        {event.heroImage?.asset && (
          <div className="relative h-56 w-full overflow-hidden rounded-lg border sm:h-72">
            <Image
              src={urlFor(event.heroImage).width(1600).height(900).fit("crop").url()}
              alt={event.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        )}
      </header>

      {event.description?.length ? (
        <section className="prose max-w-none">
          <PortableText value={event.description} />
        </section>
      ) : (
        <p className="text-neutral-600">Details coming soon.</p>
      )}

      {event.flyerUrl && (
        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Flyer</h2>
          <a className="text-blue-600 underline" href={event.flyerUrl} target="_blank" rel="noreferrer">
            Open flyer
          </a>
        </section>
      )}
    </main>
  );
}
