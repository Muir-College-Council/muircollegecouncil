export function Footer() {
  return (
    <footer className="py-10 border-t mt-12 text-sm text-neutral-500">
      <div className="mx-auto max-w-6xl px-4">
        © {new Date().getFullYear()} Muir College Council
      </div>
    </footer>
  );
}