"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // later: call a server action that uses Resend/SES
    setSent(true);
  }

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">Contact MCC</h1>
      <form onSubmit={onSubmit} className="max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium" htmlFor="name">Name</label>
          <input id="name" name="name" required className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={5} required className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>
        <button className="rounded-md bg-black px-4 py-2 text-white hover:opacity-90">Send</button>
      </form>

      {sent && <p className="text-green-700">Thanks! Your message has been recorded for now.</p>}
    </main>
  );
}
