# Required assets in /public

The build references these files, which should be dropped into `/public`
before running the site (per the original brief, these are provided
separately and not generated here):

| File | Used in | Notes |
|---|---|---|
| `wedding_intro.mp4` | Envelope intro background video | 11s, muted/looping |
| `church_intro.mp4` | Not wired up by default — optional secondary reveal in the Venue section if desired | 15s |
| `white_rose_bouque.jpg` | Couple Portraits section decoration | Transparent background |
| `chapel.jpg` | Venue section full-bleed background | |
| `rings_on_flower.jpg` | Our Story detail shot + Open Graph image | |
| `overlay_bg.jpg` | Envelope texture / video poster | |

## Not included in the original brief but referenced by the build

- `bride.jpg`, `groom.jpg` — individual portrait photos for the Couple
  Portraits section. Swap in real photos of Sara and Atef.
- Extra floral/butterfly assets: the build currently renders butterflies as
  inline SVG (`components/ui/FloatingButterfly.tsx`, no external file
  needed) and reuses `white_rose_bouque.jpg` for rotating flowers. If you'd
  like additional variety, source free, license-safe photography from
  Unsplash or Pexels, or free SVG icon sets (e.g. unDraw, Flaticon's
  license-safe collections) and note the source in a comment near where
  it's used, per the brief.

All images are served through `next/image`, so any replacement file should
be reasonably optimized (a few hundred KB or less) for best LCP.
