type Resource = { title: string; href: string; kind: "pdf" | "link" };
const MOCK_RESOURCES: Resource[] = [
  { title: "Funding Request Form", href: "#", kind: "pdf" },
  { title: "UCSD Student Resources", href: "https://students.ucsd.edu/", kind: "link" },
];

export default function ResourcesPage() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">Resources & Documents</h1>
      <ul className="space-y-3">
        {MOCK_RESOURCES.map((r) => (
          <li key={r.title} className="rounded-lg border p-4">
            <a
              className="text-blue-600 underline"
              href={r.href}
              {...(r.kind === "link" ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {r.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
