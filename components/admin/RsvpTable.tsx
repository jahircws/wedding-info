"use client";

import { useEffect, useMemo, useState } from "react";

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
  createdAt: string;
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

const MENU_OPTIONS = Object.keys(MENU_LABELS);

const PAGE_SIZE = 10;

// Fixed UTC formatting so the server-rendered markup and the client's
// hydration pass always agree, regardless of the admin's local timezone.
const submittedFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
});

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

// Builds a compact page list like [1, "ellipsis", 4, 5, 6, "ellipsis", 20]
// instead of rendering every page number when there are a lot of them.
function getPageItems(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const items: (number | "ellipsis")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) items.push("ellipsis");
  for (let i = start; i <= end; i++) items.push(i);
  if (end < total - 1) items.push("ellipsis");

  items.push(total);
  return items;
}

export default function RsvpTable({ initialParties }: { initialParties: PartyRow[] }) {
  const [parties, setParties] = useState(initialParties);
  const [dayFilter, setDayFilter] = useState<"all" | "sunday" | "monday" | "neither">("all");
  const [hotelFilter, setHotelFilter] = useState("");
  const [allergyOnly, setAllergyOnly] = useState(false);
  const [nameSearch, setNameSearch] = useState("");
  const [menuFilter, setMenuFilter] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  function toggleMenuFilter(choice: string) {
    setMenuFilter((prev) =>
      prev.includes(choice) ? prev.filter((c) => c !== choice) : [...prev, choice]
    );
  }

  const filtered = useMemo(() => {
    const query = nameSearch.trim().toLowerCase();

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
      if (query) {
        const matchesParty = p.mainName.toLowerCase().includes(query);
        const matchesGuest = p.guests.some((g) => g.fullName.toLowerCase().includes(query));
        if (!matchesParty && !matchesGuest) return false;
      }
      if (menuFilter.length > 0) {
        const matchesParty = p.menuChoice && menuFilter.includes(p.menuChoice);
        const matchesGuest = p.guests.some((g) => g.menuChoice && menuFilter.includes(g.menuChoice));
        if (!matchesParty && !matchesGuest) return false;
      }
      return true;
    });
  }, [parties, dayFilter, hotelFilter, allergyOnly, nameSearch, menuFilter]);

  // Any filter change can shrink the result set below the current page —
  // jump back to page 1 whenever the filters themselves change.
  useEffect(() => {
    setPage(1);
  }, [dayFilter, hotelFilter, allergyOnly, nameSearch, menuFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const pageItems = getPageItems(currentPage, totalPages);

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
      <h2 className="mb-4 font-body text-sm uppercase tracking-widest text-ink/70">
        RSVP Submissions ({filtered.length})
      </h2>

      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by name"
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
          className="rounded-lg border border-blush-200 bg-white px-3 py-2 text-sm"
        />

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

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-sm text-ink/60">Menu:</span>
        {MENU_OPTIONS.map((choice) => {
          const active = menuFilter.includes(choice);
          return (
            <button
              key={choice}
              type="button"
              onClick={() => toggleMenuFilter(choice)}
              aria-pressed={active}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                active
                  ? "border-gold bg-gold text-white"
                  : "border-blush-200 bg-white text-ink/70 hover:border-gold"
              }`}
            >
              {MENU_LABELS[choice]}
            </button>
          );
        })}
        {menuFilter.length > 0 && (
          <button
            type="button"
            onClick={() => setMenuFilter([])}
            className="text-xs text-ink/50 underline hover:text-ink/70"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-6">
        {paginated.map((party) => {
          const { days, shuttleParts } = summarizeAttendance(party);

          return (
            <div key={party.id} className="rounded-2xl border border-blush-200 bg-white/70 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-body text-sm text-ink">
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
                  <p className="mt-1 text-[11px] text-ink/40">
                    Submitted {submittedFormatter.format(new Date(party.createdAt))}
                  </p>
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

      {totalPages > 1 && (
        <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-1">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-blush-200 bg-white px-3 py-1.5 text-sm text-ink/70 hover:bg-blush-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Prev
          </button>

          {pageItems.map((item, i) =>
            item === "ellipsis" ? (
              <span key={`ellipsis-${i}`} className="px-2 text-sm text-ink/40">
                &hellip;
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => setPage(item)}
                aria-current={item === currentPage ? "page" : undefined}
                className={`min-w-[36px] rounded-lg border px-3 py-1.5 text-sm ${
                  item === currentPage
                    ? "border-gold bg-gold text-white"
                    : "border-blush-200 bg-white text-ink/70 hover:bg-blush-50"
                }`}
              >
                {item}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-blush-200 bg-white px-3 py-1.5 text-sm text-ink/70 hover:bg-blush-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </nav>
      )}
    </section>
  );
}