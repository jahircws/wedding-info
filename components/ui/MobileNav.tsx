"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  MapPin,
  Gift,
  Mail,
  Menu,
} from "lucide-react";

const MENU_ITEMS = [
  { label: "Home", href: "#hero"},
  { label: "Venue", href: "#venue"},
  { label: "Registry", href: "#gifts"},
  { label: "Schedule", href: "#schedule"},
  { label: "Reply", href: "#rsvp"},
  { label: "FAQ", href: "#faq"},
];

const MOBILE_ITEMS = [ 
  { label: "Home", href: "#hero", icon: Home, }, 
  { label: "Venue", href: "#venue", icon: MapPin, }, 
  { label: "Registry", href: "#gifts", icon: Gift, }, 
  { label: "Reply", href: "#rsvp", icon: Mail, }, 
];

export default function MobileNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  useEffect(() => {
  function onScroll() {
    setScrolled(window.scrollY > 80);

    const scrollPosition = window.scrollY + 150;

    let currentSection = "#hero";

    MENU_ITEMS.forEach((item) => {
      const section = document.querySelector<HTMLElement>(item.href);

      if (section) {
        const sectionTop =
          section.getBoundingClientRect().top + window.scrollY;

        if (sectionTop <= scrollPosition) {
          currentSection = item.href;
        }
      }
    });

    setActiveSection(currentSection);
  }

  onScroll();

  window.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", onScroll);
  };
}, []);

  // Lock background scroll while mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleSelect(href: string) {
    setOpen(false);
    setActiveSection(href);

    setTimeout(() => {
      document
        .querySelector(href)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 150);
  }

  return (
    <>
      {/* =========================
          DESKTOP TOP NAVIGATION
          ========================= */}
      <nav
        className={`fixed left-0 right-0 top-0 z-40 hidden transition-all duration-300 md:block ${
          scrolled
            ? "bg-cream-50/95 shadow-sm backdrop-blur-md"
            : "bg-cream-50/80 backdrop-blur-sm"
        }`}
        aria-label="Main navigation"
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-center px-6">
          <div className="flex items-center gap-1">
            {MENU_ITEMS.map((item) => {
              const isActive = activeSection === item.href;

              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => handleSelect(item.href)}
                  className={`relative px-6 py-4 font-heading text-xl tracking-wide transition-colors duration-200 ${
                    isActive
                      ? "text-clay-900"
                      : "text-clay-600 hover:text-clay-900"
                  }`}
                >
                  {item.label}

                  <span
                    className={`absolute bottom-1 left-5 right-5 h-px bg-clay-600 transition-all duration-300 ${
                      isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* =========================
          MOBILE MENU BUTTON
          ========================= */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-clay-600/15 bg-cream-50/95 backdrop-blur-md md:hidden"
        aria-label="Mobile navigation"
      >
        <div className="flex h-[72px] items-center justify-around px-2">
          {MOBILE_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.href;

            return (
              <button
                key={item.href}
                type="button"
                onClick={() => handleSelect(item.href)}
                className={`flex min-w-[64px] flex-col items-center justify-center gap-1 transition-colors ${
                  active
                    ? "text-clay-900"
                    : "text-clay-600"
                }`}
              >
                <Icon
                  size={21}
                  strokeWidth={1.5}
                />

                <span className="font-heading text-xs">
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* More */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex min-w-[64px] flex-col items-center justify-center gap-1 text-clay-600"
          >
            <Menu size={21} strokeWidth={1.5} />

            <span className="font-heading text-xs">
              More
            </span>
          </button>
        </div>
      </nav>

      {/* =========================
          MOBILE FULLSCREEN MENU
          ========================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex h-[100dvh] flex-col items-center justify-center bg-cream-50 md:hidden"
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