"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

// How long the open animation takes before we unlock page scroll. Keep in
// sync with ROSE_TRANSITION.duration below (roses settle last) plus a
// small buffer.
const OPEN_ANIMATION_MS = 2200;

// Slow, purely ease-out tween — no spring/bounce.
const ROSE_TRANSITION = { duration: 1.9, ease: [0.16, 1, 0.3, 1], type: "tween" as const };
const WHITE_ROSE_TRANSITION = { duration: 1, ease: [0.16, 1, 0.3, 1], type: "tween" as const };

type CornerRose = {
  src: string;
  alt: string;
  // Covering the center, hiding the video, before the click.
  closed: { x: string; y: string; rotate: number; scale: number };
  // Framing a corner, after the click.
  open: { x: string; y: string; rotate: number; scale: number };
};

const CORNER_ROSES: CornerRose[] = [
  {
    src: "/red_rose_1.png",
    alt: "",
    closed: { x: "20vw", y: "50vh", rotate: 0, scale: 2.5 },
    open: { x: "-45vw", y: "-40vh", rotate: -3, scale: 1.5 },
  },
  {
    src: "/red_rose_2.png",
    alt: "",
    closed: { x: "-20vw", y: "50vh", rotate: 0, scale: 2.5 },
    open: { x: "45vw", y: "-40vh", rotate: -75, scale: 1.5 },
  },
  {
    src: "/red_rose_3.png",
    alt: "",
    closed: { x: "20vw", y: "-55vh", rotate: 0, scale: 2.5 },
    open: { x: "-45vw", y: "40vh", rotate: 10, scale: 1.5 },
  },
  {
    src: "/red_rose_4.png",
    alt: "",
    closed: { x: "-20vw", y: "-55vh", rotate: 0, scale: 2.5 },
    open: { x: "45vw", y: "35vh", rotate: -10, scale: 1.5 },
  },
];

export default function EnvelopeIntro() {
  const [opened, setOpened] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Always shows the flower intro fresh on every load/reload — no
  // sessionStorage skip.

  // Lock page scroll until the reveal animation has fully played out.
  useEffect(() => {
    const shouldLock = !introComplete;
    document.documentElement.style.overflow = shouldLock ? "hidden" : "";
    document.body.style.overflow = shouldLock ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [introComplete]);

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
          frame the four corners once opened. Each is anchored to true
          center with a static wrapper; the inner motion element carries the
          animated translate/rotate/scale so the two transforms don't
          collide. */}
      {CORNER_ROSES.map((rose) => (
        <div
          key={rose.src}
          className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 260, height: 260 }}
        >
          <motion.div
            className="relative h-full w-full"
            initial={false}
            animate={
              shouldReduceMotion
                ? { x: 0, y: 0, rotate: opened ? rose.open.rotate : 0, scale: 1 }
                : opened
                ? rose.open
                : rose.closed
            }
            transition={ROSE_TRANSITION}
          >
            <Image src={rose.src} alt={rose.alt} fill sizes="260px" className="object-contain drop-shadow-lg" />
          </motion.div>
        </div>
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
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}