"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MENU_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "Venue", href: "#venue" },
  { label: "Our Honeymoon", href: "#gifts" },
  { label: "Schedule", href: "#schedule" },
  { label: "Reply", href: "#rsvp" },
  { label: "FAQ", href: "#faq" },
];

export default function MobileNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleSelect(href: string) {
    setOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className={`fixed right-5 top-5 z-40 flex h-11 w-11 flex-col items-center justify-center gap-[5px] bg-cream-50/90 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          scrolled ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <span className="h-[1.5px] w-5 bg-clay-600" />
        <span className="h-[1.5px] w-5 bg-clay-600" />
        <span className="h-[1.5px] w-5 bg-clay-600" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex h-[100dvh] flex-col items-center justify-center bg-cream-50"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-5 top-5 text-2xl text-clay-600"
            >
              &times;
            </button>

            <nav className="w-full max-w-xs divide-y divide-clay-600/25 text-center">
              {MENU_ITEMS.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => handleSelect(item.href)}
                  className="block w-full py-5 font-heading text-2xl text-clay-900 transition-colors duration-200 ease-in-out hover:text-honey"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}