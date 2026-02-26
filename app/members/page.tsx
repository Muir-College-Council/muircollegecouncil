import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const OFFICERS_QUERY = groq`*[_type == "officer"] | order(role asc, name asc) {
  _id,
  name,
  role,
  email,
  headshot
}`;

type Officer = {
  _id: string;
  name: string;
  role: string;
  email?: string;
  headshot?: unknown;
};

function hasSanityAsset(value: unknown): value is { asset: unknown } {
  return typeof value === "object" && value !== null && "asset" in value;
}

export default async function MembersPage() {
  const officers = await client.fetch<Officer[]>(OFFICERS_QUERY);

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">Officers & Committees</h1>

      {officers.length === 0 ? (
        <p className="text-neutral-600">No officers added yet.</p>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {officers.map((o) => (
            <article key={o._id} className="rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-full border">
                  {hasSanityAsset(o.headshot) ? (
                    <Image
                      src={urlFor(o.headshot as SanityImageSource).width(256).height(256).fit("crop").url()}
                      alt={o.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <div className="h-full w-full bg-neutral-200" aria-hidden />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{o.name}</h2>
                  <p className="text-neutral-600">{o.role}</p>
                  {o.email && (
                    <a className="text-sm text-blue-600 underline" href={`mailto:${o.email}`}>
                      {o.email}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
