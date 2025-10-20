"use client";

import { useState, useEffect } from "react";

type Moment = {
  id: string;
  date: string;
  location: string;
  odometer?: number;
  notes?: string;
  createdAt: number;
};

export default function NewMoment() {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [odometer, setOdometer] = useState<number | "">("");
  const [notes, setNotes] = useState("");

  // Minimal local persistence to prove the flow (you can swap for a DB later)
  const save = () => {
    const id = crypto.randomUUID();
    const moment: Moment = {
      id,
      date,
      location,
      odometer: odometer === "" ? undefined : Number(odometer),
      notes: notes || undefined,
      createdAt: Date.now(),
    };
    const existing = JSON.parse(localStorage.getItem("moments") || "[]") as Moment[];
    localStorage.setItem("moments", JSON.stringify([moment, ...existing]));
    // naive redirect
    window.location.href = "/";
  };

  const disabled =
    !date.trim() || !location.trim();

  return (
    <main className="mx-auto max-w-md p-4">
      <h1 className="text-xl font-semibold mb-4">New Moment</h1>

      <label className="block text-sm font-medium">Date</label>
      <input
        className="mb-3 w-full rounded-lg border p-3"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <label className="block text-sm font-medium">Location</label>
      <input
        className="mb-3 w-full rounded-lg border p-3"
        placeholder="123 Main St, St. Louis"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <label className="block text-sm font-medium">Odometer (optional)</label>
      <input
        className="mb-3 w-full rounded-lg border p-3"
        type="number"
        inputMode="decimal"
        placeholder="12345.6"
        value={odometer}
        onChange={(e) => setOdometer(e.target.value === "" ? "" : Number(e.target.value))}
      />

      <label className="block text-sm font-medium">Notes (optional)</label>
      <textarea
        className="mb-4 w-full rounded-lg border p-3"
        placeholder="Weather, purpose, vehicle…"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button
        onClick={save}
        disabled={disabled}
        className="w-full rounded-xl bg-black px-4 py-3 text-white disabled:opacity-40"
      >
        Save moment
      </button>
    </main>
  );
}