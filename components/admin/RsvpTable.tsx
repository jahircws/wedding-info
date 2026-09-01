"use client";

import { useMemo, useState } from "react";

type Status = "PENDING" | "APPROVED" | "DECLINED";

type GuestRow = {
  id: string;
  fullName: string;
  attendingSunday: boolean;
  attendingMonday: boolean;
  shuttleToHacienda: boolean;
  shuttleBack: boolean;
  shuttleBackTime: string | null;
  menuChoice: string | null;
  foodNotes: string | null;
  status: Status;
};

type PartyRow = {
  id: string;
  mainName: string;
  email: string;
  phone: string | null;
  attendingSunday: boolean;
  attendingMonday: boolean;
  hotel: string | null;
  shuttleToHacienda: boolean;
  shuttleBack: boolean;
  shuttleBackTime: string | null;
  menuChoice: string | null;
  foodNotes: string | null;
  songRequest: string | null;
  notes: string | null;
  status: Status;
  guests: GuestRow[];
};

const statusStyles: Record<Status, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  APPROVED: "bg-sage-100 text-sage-700",
  DECLINED: "bg-red-100 text-red-600",
};

const MENU_LABELS: Record<string, string> = {
  MEAT: "Meat",
  FISH: "Fish",
  VEGETARIAN: "Vegetarian",
};

function menuLabel(choice: string | null) {
  if (!choice) return null;
  return MENU_LABELS[choice] ?? choice;
}

function summarizeAttendance(entity: {
  attendingSunday: boolean;
  attendingMonday: boolean;
  shuttleToHacienda: boolean;
  shuttleBack: boolean;
  shuttleBackTime: string | null;
}) {
  const days = [entity.attendingSunday ? "Sunday" : null, entity.attendingMonday ? "Monday" : null].filter(
    Boolean
  );
  const shuttleParts = [
    entity.shuttleToHacienda ? "to Hacienda" : null,
    entity.shuttleBack ? `back${entity.shuttleBackTime ? ` (~${entity.shuttleBackTime})` : ""}` : null,
  ].filter(Boolean);
  return { days, shuttleParts };
}

export default function RsvpTable({ initialParties }: { initialParties: PartyRow[] }) {
  const [parties, setParties] = useState(initialParties);
  const [dayFilter, setDayFilter] = useState<"all" | "sunday" | "monday" | "neither">("all");
  const [hotelFilter, setHotelFilter] = useState("");
  const [allergyOnly, setAllergyOnly] = useState(false);

  const filtered = useMemo(() => {
    return parties.filter((p) => {
      if (dayFilter === "sunday" && !p.attendingSunday) return false;
      if (dayFilter === "monday" && !p.attendingMonday) return false;
      if (dayFilter === "neither" && (p.attendingSunday || p.attendingMonday)) return false;
      if (hotelFilter && !(p.hotel || "").toLowerCase().includes(hotelFilter.toLowerCase())) {
        return false;
      }
      if (allergyOnly) {
        const hasAllergy = !!p.foodNotes || p.guests.some((g) => !!g.foodNotes);
        if (!hasAllergy) return false;
      }
      return true;
    });
  }, [parties, dayFilter, hotelFilter, allergyOnly]);

  async function updateStatus(id: string, targetType: "party" | "guest", status: Status) {
    // optimistic update
    setParties((prev) =>
      prev.map((p) => {
        if (targetType === "party" && p.id === id) return { ...p, status };
        if (targetType === "guest") {
          return { ...p, guests: p.guests.map((g) => (g.id === id ? { ...g, status } : g)) };
        }
        return p;
      })
    );

    await fetch(`/api/admin/rsvps/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetType, status }),
    }).catch(() => {
      /* best-effort; a page refresh will resync state if this fails */
    });
  }

  return (
    <section aria-label="RSVP submissions">
      <h2 className="mb-4 font-heading text-sm uppercase tracking-widest text-ink/70">
        RSVP Submissions ({filtered.length})
      </h2>

      <div className="mb-6 flex flex-wrap gap-4">
        <select
          value={dayFilter}
          onChange={(e) => setDayFilter(e.target.value as typeof dayFilter)}
          className="rounded-lg border border-blush-200 bg-white px-3 py-2 text-sm"
        >
          <option value="all">All parties</option>
          <option value="sunday">Attending Sunday</option>
          <option value="monday">Attending Monday</option>
          <option value="neither">Not attending either day</option>
        </select>

        <input
          type="text"
          placeholder="Filter by hotel"
          value={hotelFilter}
          onChange={(e) => setHotelFilter(e.target.value)}
          className="rounded-lg border border-blush-200 bg-white px-3 py-2 text-sm"
        />

        <label className="flex items-center gap-2 text-sm text-ink/70">
          <input
            type="checkbox"
            checked={allergyOnly}
            onChange={(e) => setAllergyOnly(e.target.checked)}
            className="accent-gold"
          />
          Has allergies/preferences
        </label>
      </div>

      <div className="space-y-6">
        {filtered.map((party) => {
          const { days, shuttleParts } = summarizeAttendance(party);

          return (
            <div key={party.id} className="rounded-2xl border border-blush-200 bg-white/70 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-heading text-sm text-ink">
                    {party.mainName} <span className="text-ink/50">&middot; {party.email}</span>
                    {party.phone ? <span className="text-ink/50"> &middot; {party.phone}</span> : null}
                  </p>
                  <p className="mt-1 text-xs text-ink/60">
                    {days.length > 0 ? days.join(" + ") : "Not attending"}
                    {party.hotel ? ` \u00b7 ${party.hotel}` : ""}
                    {party.menuChoice ? ` \u00b7 ${menuLabel(party.menuChoice)}` : ""}
                  </p>
                  {shuttleParts.length > 0 && (
                    <p className="mt-1 text-xs text-ink/60">Shuttle: {shuttleParts.join(", ")}</p>
                  )}
                  {party.foodNotes && (
                    <p className="mt-1 text-xs text-ink/60">Allergies/notes: {party.foodNotes}</p>
                  )}
                  {party.songRequest && (
                    <p className="mt-1 text-xs text-ink/60">Song request: {party.songRequest}</p>
                  )}
                  {party.notes && <p className="mt-1 text-xs text-ink/60">Message: {party.notes}</p>}
                </div>

                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[party.status]}`}>
                    {party.status}
                  </span>
                  <button
                    onClick={() => updateStatus(party.id, "party", "APPROVED")}
                    className="rounded-full border border-sage-500 px-3 py-1 text-xs text-sage-700 hover:bg-sage-100"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(party.id, "party", "DECLINED")}
                    className="rounded-full border border-red-400 px-3 py-1 text-xs text-red-500 hover:bg-red-50"
                  >
                    Decline
                  </button>
                </div>
              </div>

              {party.guests.length > 0 && (
                <ul className="mt-4 space-y-2 border-t border-blush-100 pt-4">
                  {party.guests.map((guest) => {
                    const guestSummary = summarizeAttendance(guest);
                    return (
                      <li key={guest.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                        <span className="text-ink/80">
                          {guest.fullName}
                          {guestSummary.days.length > 0 ? ` \u00b7 ${guestSummary.days.join(" + ")}` : " \u00b7 Not attending"}
                          {guest.menuChoice ? ` \u00b7 ${menuLabel(guest.menuChoice)}` : ""}
                          {guest.foodNotes ? ` \u00b7 ${guest.foodNotes}` : ""}
                          {guestSummary.shuttleParts.length > 0 ? ` \u00b7 Shuttle: ${guestSummary.shuttleParts.join(", ")}` : ""}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${statusStyles[guest.status]}`}>
                            {guest.status}
                          </span>
                          <button
                            onClick={() => updateStatus(guest.id, "guest", "APPROVED")}
                            className="rounded-full border border-sage-500 px-2 py-0.5 text-[11px] text-sage-700 hover:bg-sage-100"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateStatus(guest.id, "guest", "DECLINED")}
                            className="rounded-full border border-red-400 px-2 py-0.5 text-[11px] text-red-500 hover:bg-red-50"
                          >
                            Decline
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p className="text-sm text-ink/50">No submissions match these filters.</p>
        )}
      </div>
    </section>
  );
}