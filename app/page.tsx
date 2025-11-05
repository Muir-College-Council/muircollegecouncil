export default function HomePage() {
  return (
    <main className="space-y-10">
      <section className="space-y-3">
        <h1 className="text-4xl font-bold">Muir College Council</h1>
        <p className="text-neutral-600">
          Representing and serving the Muir community with events, resources, and student leadership.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Announcements</h2>
        <ul className="grid gap-3 md:grid-cols-2">
          <li className="rounded-lg border p-4">
            <p className="font-medium">Welcome to the new MCC website!</p>
            <p className="text-sm text-neutral-600">Site is in active development — feedback is welcome.</p>
          </li>
          <li className="rounded-lg border p-4">
            <p className="font-medium">Weekly Meeting</p>
            <p className="text-sm text-neutral-600">Thursdays @ 6pm — location TBA.</p>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Quick Links</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <a className="rounded-lg border p-4 hover:bg-neutral-50" href="/events">Events</a>
          <a className="rounded-lg border p-4 hover:bg-neutral-50" href="/members">Officers & Committees</a>
          <a className="rounded-lg border p-4 hover:bg-neutral-50" href="/gallery">Gallery</a>
          <a className="rounded-lg border p-4 hover:bg-neutral-50" href="/flyers">Flyers</a>
          <a className="rounded-lg border p-4 hover:bg-neutral-50" href="/resources">Resources</a>
          <a className="rounded-lg border p-4 hover:bg-neutral-50" href="/contact">Contact</a>
        </div>
      </section>
    </main>
  );
}
