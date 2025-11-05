const MOCK_IMAGES = Array.from({ length: 9 }, (_, i) => `/window.svg?i=${i}`);

export default function GalleryPage() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">Gallery</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {MOCK_IMAGES.map((src, i) => (
          <figure key={i} className="overflow-hidden rounded-lg border">
            {/* replace with next/image later */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`Gallery image ${i + 1}`} className="h-48 w-full object-cover" />
          </figure>
        ))}
      </div>
    </main>
  );
}
