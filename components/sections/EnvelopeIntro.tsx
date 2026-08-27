"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

// How long the open animation takes before we unlock page scroll. Keep in
// sync with ROSE_TRANSITION.duration below (all roses move together, as
// one synchronized motion) plus a small buffer.
const ROSE_DURATION_S = 2.1;
const OPEN_ANIMATION_MS = Math.round(ROSE_DURATION_S * 1000) + 300;

// Gentle, purely ease-out tween (a soft "expo-out" curve) — no spring,
// no bounce, no sharp deceleration. Kept slow so nothing ever reads as a
// sudden snap.
const ROSE_EASE = [0.19, 1, 0.22, 1] as const;
const ROSE_TRANSITION = { duration: ROSE_DURATION_S, ease: ROSE_EASE, type: "tween" as const };
const WHITE_ROSE_TRANSITION = { duration: 1.1, ease: ROSE_EASE, type: "tween" as const };

// Every rose is centered via left/top 50%, so each offset below folds the
// "-50%" centering into the same x/y value framer-motion animates. That
// way the element that's actually hit-tested for clicks moves along with
// the rose — no separate untransformed wrapper left sitting (and
// intercepting clicks) at dead center after the rose has visually moved
// away.
type CornerRose = {
  src: string;
  alt: string;
  // Covering the center, hiding the video, before the click.
  closed: { x: string; y: string; rotate: number; scale: number };
  // Framing a corner, after the click. Rotation kept small and gentle —
  // large spins read as sudden rather than elegant.
  open: { x: string; y: string; rotate: number; scale: number };
};

const CORNER_ROSES: CornerRose[] = [
  {
    src: "/red_rose_1.png",
    alt: "",
    closed: { x: "calc(-50% + 20vw)", y: "calc(-50% + 50vh)", rotate: 0, scale: 2.5 },
    open: { x: "calc(-50% - 45vw)", y: "calc(-50% - 40vh)", rotate: -3, scale: 1.5 },
  },
  {
    src: "/red_rose_2.png",
    alt: "",
    closed: { x: "calc(-50% - 20vw)", y: "calc(-50% + 50vh)", rotate: 0, scale: 2.5 },
    open: { x: "calc(-50% + 45vw)", y: "calc(-50% - 40vh)", rotate: -8, scale: 1.5 },
  },
  {
    src: "/red_rose_3.png",
    alt: "",
    closed: { x: "calc(-50% + 20vw)", y: "calc(-50% - 55vh)", rotate: 0, scale: 2.5 },
    open: { x: "calc(-50% - 45vw)", y: "calc(-50% + 40vh)", rotate: 6, scale: 1.5 },
  },
  {
    src: "/red_rose_4.png",
    alt: "",
    closed: { x: "calc(-50% - 20vw)", y: "calc(-50% - 55vh)", rotate: 0, scale: 2.5 },
    open: { x: "calc(-50% + 45vw)", y: "calc(-50% + 35vh)", rotate: -6, scale: 1.5 },
  },
];

export default function EnvelopeIntro() {
  const [opened, setOpened] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  // True once we've determined, on mount, that the page loaded already
  // scrolled past the hero (e.g. a reload while reading the RSVP section).
  // In that case we must never lock scroll or wait for a tap on a rose the
  // visitor can't even see — that's what was leaving the page "stuck".
  const [skipIntro, setSkipIntro] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Always shows the flower intro fresh on every load/reload, but only
  // when the visitor is actually at the top, in the hero section. Runs
  // synchronously before paint (useLayoutEffect) so there's no visible
  // flash of the sealed envelope before it's skipped.
  useLayoutEffect(() => {
    if (window.scrollY > window.innerHeight * 0.5) {
      setSkipIntro(true);
      setOpened(true);
      setIntroComplete(true);
      videoRef.current?.play().catch(() => {
        /* autoplay may be blocked without a user gesture; the poster image
           covers us visually either way */
      });
    }
  }, []);

  // Lock page scroll until the reveal animation has fully played out —
  // unless we've already decided to skip the intro entirely.
  useEffect(() => {
    if (skipIntro) return;
    const shouldLock = !introComplete;
    document.documentElement.style.overflow = shouldLock ? "hidden" : "";
    document.body.style.overflow = shouldLock ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [introComplete, skipIntro]);

  function handleOpen() {
    if (opened) return;
    setOpened(true);
    videoRef.current?.play().catch(() => {
      /* autoplay may be blocked before a user gesture on some browsers; the
         click here counts as a gesture, but we swallow any residual error */
    });

    const delay = shouldReduceMotion ? 0 : OPEN_ANIMATION_MS;
    window.setTimeout(() => setIntroComplete(true), delay);
  }

  function scrollToRsvp() {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      id="envelope"
      className="relative h-[100svh] w-full overflow-hidden bg-blush-100"
      aria-label="Wedding invitation, tap the white rose to open"
    >
      {/* Video revealed once the roses open */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="/wedding_intro.mp4"
          muted
          playsInline
          loop
          poster="/overlay_bg.jpg"
          // Only fetch metadata up front — the poster image covers us
          // visually, and the rose+backdrop animation gives the browser
          // ~2s of user-gesture buffering time to fetch the rest before
          // the video is actually revealed. Keeps first paint light.
          preload="metadata"
        />
        <div className="absolute inset-0 bg-ink/20" />
      </div>

      {/* Solid color backdrop guarantees full coverage before opening, since
          the rose PNGs are cutouts with transparent backgrounds. Fades away
          together with the white rose. */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blush-300 via-blush-200 to-blush-400"
        initial={false}
        animate={{ opacity: opened ? 0 : 1 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 1.2, ease: "easeOut" }}
        style={{ pointerEvents: opened ? "none" : "auto" }}
      />

      {/* Red roses: clustered over the center while closed, spread out to
          frame the four corners once opened, all moving together as one
          synchronized motion. The motion element itself carries both the
          centering offset and the animated x/y/rotate/scale (via calc()),
          so its hit-testable box travels with it — nothing untransformed
          is left sitting at dead center to swallow clicks once opened. */}
      {CORNER_ROSES.map((rose) => (
        <motion.div
          key={rose.src}
          className="pointer-events-none absolute left-1/2 top-1/2 z-20"
          style={{ width: 260, height: 260 }}
          initial={false}
          animate={
            shouldReduceMotion
              ? { x: "-50%", y: "-50%", rotate: opened ? rose.open.rotate : 0, scale: 1 }
              : opened
              ? rose.open
              : rose.closed
          }
          transition={ROSE_TRANSITION}
        >
          <Image src={rose.src} alt={rose.alt} fill sizes="260px" className="object-contain drop-shadow-lg" />
        </motion.div>
      ))}

      {/* White rose: the tap target, dead center, fades away on open */}
      <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
        <AnimatePresence>
          {!opened && (
            <motion.button
              type="button"
              onClick={handleOpen}
              aria-label="Tap the white rose to open your invitation"
              className="relative flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              style={{ width: 220, height: 220 }}
              initial={{ opacity: 1, scale: 1.5, rotate: 0 }}
              animate={{ opacity: 1, scale: 1.5, rotate: 0 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.3, rotate: 25 }
              }
              transition={WHITE_ROSE_TRANSITION}
            >
              <Image src="/white_rose.png" alt="" fill sizes="220px" className="object-contain drop-shadow-xl" priority />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-heading text-xs uppercase tracking-[0.3em] text-ink/70 md:text-sm">
                Tap to open
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Reveal text once opened */}
      <AnimatePresence>
        {opened && (
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center text-ivory">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.9 }}
              className="font-script text-6xl drop-shadow-md md:text-8xl"
            >
              Sara &amp; Atef
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 1.2 }}
              className="max-w-md font-body text-lg italic md:text-xl"
            >
              Two hearts, one story — join us as we begin the next chapter.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 1.5 }}
              className="font-heading text-xs uppercase tracking-[0.3em] md:text-sm"
            >
              27 &ndash; 28 September 2026 &bull; Seville, Spain
            </motion.p>
            <motion.button
              type="button"
              onClick={scrollToRsvp}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 1.8 }}
              className="mt-2 rounded-full border border-ivory/80 px-8 py-3 font-heading text-xs uppercase tracking-[0.25em] text-ivory backdrop-blur-sm transition-colors duration-300 ease-out hover:bg-ivory hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              RSVP Now
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}