export function Navbar() {
  return (
    <nav className="py-4 border-b">
      <div className="mx-auto max-w-6xl px-4 flex items-center gap-6">
        <a href="/" className="font-semibold">Muir College Council</a>
        <a href="/about">About</a>
        <a href="/members">Members</a>
        <a href="/events">Events</a>
        <a href="/gallery">Gallery</a>
        <a href="/flyers">Flyers</a>
        <a href="/resources" className="ml-auto">Resources</a>
        <a href="/contact">Contact</a>
      </div>
    </nav>
  );
}