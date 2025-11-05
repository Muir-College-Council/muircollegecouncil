type Flyer = { title: string; href: string };
const MOCK_FLYERS: Flyer[] = [
  { title: "Welcome Week Flyer (PDF)", href: "/file.svg" },
  { title: "Study Jam Flyer (PDF)", href: "/file.svg" },
];

export default function FlyersPage() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">Flyers</h1>
      <ul className="space-y-3">
        {MOCK_FLYERS.map((f) => (
          <li key={f.title} className="rounded-lg border p-4">
            <a className="text-blue-600 underline" href={f.href} download>
              {f.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
