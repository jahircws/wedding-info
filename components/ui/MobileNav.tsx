"use client";

import { useEffect, useState } from "react";
import {
  Home,
  Mail,
  Calendar,
  Gift,
  HelpCircle,
} from "lucide-react";
import { usePathname } from "next/navigation";

// Order matches the order sections actually appear on the page.
const MENU_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "Please RSVP", href: "#rsvp" },
  { label: "Schedule", href: "#schedule" },
  { label: "Registry", href: "#gifts" },
  { label: "FAQ", href: "#faq" },
];

const MOBILE_ITEMS = [
  { label: "Home", href: "#hero", icon: Home },
  { label: "RSVP", href: "#rsvp", icon: Mail },
  { label: "Schedule", href: "#schedule", icon: Calendar },
  { label: "Registry", href: "#gifts", icon: Gift },
  { label: "FAQ", href: "#faq", icon: HelpCircle },
];

// Height of the fixed desktop nav (h-20 = 80px) plus a little breathing
// room, used both to decide which section is "active" while scrolling and
// to keep clicked sections from landing underneath the fixed bar.
const NAV_OFFSET = 96;

export default function MobileNav() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  useEffect(() => {
  function onScroll() {
    setScrolled(window.scrollY > 80);

    // Offset by the fixed nav height so a section counts as "active" once
    // it's actually visible below the navbar, not just technically passed.
    const scrollPosition = window.scrollY + NAV_OFFSET;

    let currentSection = "#hero";
    let currentTop = -Infinity;

    MENU_ITEMS.forEach((item) => {
      const section = document.querySelector<HTMLElement>(item.href);

      if (section) {
        const sectionTop =
          section.getBoundingClientRect().top + window.scrollY;

        // Pick the section with the greatest top that's still above the
        // scroll position — i.e. the closest section by DOM order, not by
        // MENU_ITEMS array order (sections aren't listed in page order,
        // which previously caused an earlier-in-page section like #rsvp to
        // overwrite a later, correctly-active one like #venue).
        if (sectionTop <= scrollPosition && sectionTop > currentTop) {
          currentTop = sectionTop;
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

  function handleSelect(href: string) {
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
        className={`fixed left-0 right-0 top-0 z-40 hidden bg-cream-50 transition-shadow duration-300 md:block ${
          scrolled ? "shadow-sm" : ""
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
                  className={`relative px-6 py-4 font-body text-xl tracking-wide transition-colors duration-200 ${
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
                className={`flex min-w-[56px] flex-col items-center justify-center gap-1 transition-colors ${
                  active
                    ? "text-clay-900"
                    : "text-clay-600"
                }`}
              >
                <Icon
                  size={21}
                  strokeWidth={1.5}
                />

                <span className="copy-caps font-bold tracking-normal">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}