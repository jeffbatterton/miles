"use client";

import { useEffect, useState } from "react";

type Moment = {
  id: string;
  date: string;
  location: string;
  odometer?: number;
  notes?: string;
  createdAt: number;
};

export default function Home() {
  const [moments, setMoments] = useState<Moment[]>([]);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("moments") || "[]") as Moment[];
    setMoments(existing);
  }, []);

  return (
    <main className="mx-auto max-w-md p-4">
      <header className="py-4">
        <h1 className="text-2xl font-bold tracking-tight">Miles — Moment Logger</h1>
        <p className="text-sm text-gray-600">Log moments quickly. Mobile first.</p>
      </header>

      <a href="/new" className="mb-4 inline-block rounded-xl border px-4 py-2 text-sm">
        + New Moment
      </a>

      <ul className="space-y-3">
        {moments.length === 0 && (
          <li className="text-gray-600 text-sm">No moments yet. Add your first one.</li>
        )}
        {moments.map((m) => (
          <li key={m.id} className="rounded-xl border p-3">
            <div className="flex items-center justify-between">
              <div className="font-medium">{m.location}</div>
              <div className="text-sm">{m.date}</div>
            </div>
            {m.odometer && <div className="text-sm text-gray-600">{m.odometer} mi</div>}
            {m.notes && <div className="mt-1 text-sm text-gray-600">{m.notes}</div>}
            <div className="mt-1 text-xs text-gray-500">
              {new Date(m.createdAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}