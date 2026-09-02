"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ApprovedEntry = { id: string; name: string };

export default function GuestListModal() {
  const [open, setOpen] = useState(false);
  const [guests, setGuests] = useState<ApprovedEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch("/api/guests/approved")
      .then((r) => r.json())
      .then((data) => setGuests(data.guests || []))
      .catch(() => setGuests([]))
      .finally(() => setLoading(false));
  }, [open]);

  // Reset the search whenever the modal is closed, so it doesn't linger
  // the next time it's opened.
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  // Close on Escape for keyboard accessibility.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const filteredGuests = guests.filter((g) =>
    g.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <section className="bg-blush-50 px-6 py-16 text-center" aria-label="Approved guest list">
      <p className="mb-4 font-body text-ink/70">
        <span className="font-heading font-bold">Curious</span> who else will be there?
      </p>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-none border border-gold px-8 py-3 font-body text-xs uppercase tracking-[0.2em] text-gold transition-colors duration-300 ease-out hover:bg-gold hover:text-ivory"
      >
        View Guest List
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label="Approved guest list"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[80vh] w-full max-w-md flex-col rounded-none bg-ivory p-8 text-left shadow-2xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-heading text-3xl text-blush-500 md:break-normal">Who&apos;s Coming</h3>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close guest list"
                  className="text-ink/50 hover:text-ink"
                >
                  &times;
                </button>
              </div>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a name..."
                aria-label="Search guest list"
                className="mb-4 w-full shrink-0 border border-blush-200 bg-white px-4 py-2 font-body text-sm text-ink outline-none transition-colors duration-200 ease-in-out focus:border-gold"
              />

              <div className="overflow-y-auto">
                {loading && <p className="font-body text-ink/60">Loading...</p>}
                {!loading && guests.length === 0 && (
                  <p className="font-body text-ink/60">
                    No approved guests yet &mdash; check back soon!
                  </p>
                )}
                {!loading && guests.length > 0 && filteredGuests.length === 0 && (
                  <p className="font-body text-ink/60">No names match &quot;{query}&quot;.</p>
                )}
                {!loading && filteredGuests.length > 0 && (
                  <ul className="space-y-2">
                    {filteredGuests.map((g) => (
                      <li
                        key={g.id}
                        className="border-b border-blush-200 pb-2 font-body text-ink/85"
                      >
                        {g.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}