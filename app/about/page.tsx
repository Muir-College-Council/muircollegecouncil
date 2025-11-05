export default function AboutPage() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">About Muir College Council</h1>
      <p className="text-neutral-700">
        Muir College Council represents and advocates for John Muir College students, 
        builds community through programming, and supports student initiatives and leadership.
      </p>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Mission</h2>
        <p className="text-neutral-700">
          To uplift student voices, support campus involvement, and foster a strong and inclusive Muir community.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">What We Do</h2>
        <ul className="list-disc pl-5 text-neutral-700">
          <li>Host community events</li>
          <li>Support student organizations & initiatives</li>
          <li>Represent Muir students in UCSD governance</li>
          <li>Distribute funding to student orgs and programs</li>
        </ul>
      </section>
    </main>
  );
}
