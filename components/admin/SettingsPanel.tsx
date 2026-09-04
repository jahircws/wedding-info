"use client";

import { useState } from "react";

type SettingsForm = {
  weddingDayOne: string;
  weddingDayTwo: string;
  venueName: string;
  venueAddress: string;
  ceremonyTime: string;
  receptionTime: string;
  mapUrl: string;
};

const EMPTY: SettingsForm = {
  weddingDayOne: "2026-09-27T17:00",
  weddingDayTwo: "2026-09-28T13:00",
  venueName: "",
  venueAddress: "",
  ceremonyTime: "",
  receptionTime: "",
  mapUrl: "",
};

export default function SettingsPanel({
  initialSettings,
}: {
  initialSettings: SettingsForm | null;
}) {
  const [form, setForm] = useState<SettingsForm>(initialSettings ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof SettingsForm>(key: K, value: SettingsForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          weddingDayOne: new Date(form.weddingDayOne).toISOString(),
          weddingDayTwo: new Date(form.weddingDayTwo).toISOString(),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Failed to save settings");
      }
      setMessage("Settings saved. The public site reflects these changes immediately.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section
      aria-label="Wedding settings"
      className="rounded-2xl border border-clay-600/25 bg-white/70 p-6"
    >
      <h2 className="mb-4 font-body text-sm uppercase tracking-widest text-clay-700/70">
        Wedding Details
      </h2>

      <form onSubmit={handleSave} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-clay-700/60">Day One date &amp; time</label>
          <input
            type="datetime-local"
            value={form.weddingDayOne}
            onChange={(e) => update("weddingDayOne", e.target.value)}
            className="w-full rounded-lg border border-clay-600/25 px-3 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-clay-700/60">Day Two date &amp; time</label>
          <input
            type="datetime-local"
            value={form.weddingDayTwo}
            onChange={(e) => update("weddingDayTwo", e.target.value)}
            className="w-full rounded-lg border border-clay-600/25 px-3 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-clay-700/60">Venue name</label>
          <input
            type="text"
            value={form.venueName}
            onChange={(e) => update("venueName", e.target.value)}
            className="w-full rounded-lg border border-clay-600/25 px-3 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-clay-700/60">Venue address</label>
          <input
            type="text"
            value={form.venueAddress}
            onChange={(e) => update("venueAddress", e.target.value)}
            className="w-full rounded-lg border border-clay-600/25 px-3 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-clay-700/60">Ceremony time</label>
          <input
            type="text"
            placeholder="5:00 PM"
            value={form.ceremonyTime}
            onChange={(e) => update("ceremonyTime", e.target.value)}
            className="w-full rounded-lg border border-clay-600/25 px-3 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-clay-700/60">Reception time</label>
          <input
            type="text"
            placeholder="8:00 PM"
            value={form.receptionTime}
            onChange={(e) => update("receptionTime", e.target.value)}
            className="w-full rounded-lg border border-clay-600/25 px-3 py-2 text-sm"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-xs font-medium text-clay-700/60">Map link (Get Directions)</label>
          <input
            type="url"
            placeholder="https://maps.google.com/?q=..."
            value={form.mapUrl}
            onChange={(e) => update("mapUrl", e.target.value)}
            className="w-full rounded-lg border border-clay-600/25 px-3 py-2 text-sm"
            required
          />
        </div>

        <div className="md:col-span-2 flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-clay-700 px-6 py-2 text-xs font-medium uppercase tracking-widest text-cream-50 transition-colors duration-200 ease-in-out hover:bg-clay-800 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
          {message && <p className="text-sm text-sage-700">{message}</p>}
          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}