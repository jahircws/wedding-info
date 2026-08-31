"use client";

import styles from "./GrassBed.module.css";

// See GrassBed.module.css for the porting notes (source files, the two
// color variants, and the two adaptations made for a light background).

const GRASS_LEAF_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

const LONG_G_GROUPS: { mod?: string; delays: [string, string, string, string] }[] = [
  { delays: ["3s", "2.2s", "3.4s", "3.6s"] },
  { mod: "longG1", delays: ["3.6s", "3.8s", "4s", "4.2s"] },
  { mod: "longG2", delays: ["4s", "4.2s", "4.4s", "4.6s"] },
  { mod: "longG3", delays: ["4s", "4.2s", "3s", "3.6s"] },
  { mod: "longG4", delays: ["4s", "4.2s", "3s", "3.6s"] },
  { mod: "longG5", delays: ["4s", "4.2s", "3s", "3.6s"] },
  { mod: "longG6", delays: ["4.2s", "4.4s", "4.6s", "4.8s"] },
  { mod: "longG7", delays: ["3s", "3.2s", "3.5s", "3.6s"] },
];

function d(delay: string): React.CSSProperties {
  return { "--d": delay } as React.CSSProperties;
}

function GrassTuftLeaves() {
  return (
    <>
      {GRASS_LEAF_NUMBERS.map((n) => (
        <div key={n} className={`${styles.grassLeaf} ${styles[`grassLeaf${n}`]}`} />
      ))}
    </>
  );
}

export default function GrassBed({
  bloom = false,
  size = 110,
  flip = false,
  variant = "green",
  className = "",
}: {
  bloom?: boolean;
  size?: number;
  flip?: boolean;
  variant?: "green" | "teal";
  className?: string;
}) {
  return (
    <div
      className={`${styles.bed} ${variant === "teal" ? styles.teal : ""} ${bloom ? "" : styles.paused} ${className}`}
      style={{ fontSize: size / 55, transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      {/* flower__g-long */}
      <div className={styles.growAns} style={d("1.2s")}>
        <div className={styles.gLong}>
          <div className={styles.gLongTop} />
          <div className={styles.gLongBottom} />
        </div>
      </div>

      {/* flower__grass--1 */}
      <div className={styles.growingGrass}>
        <div className={`${styles.grass} ${styles.grass1}`}>
          <div className={styles.grassTop} />
          <div className={styles.grassBottom} />
          <GrassTuftLeaves />
        </div>
      </div>

      {/* flower__grass--2 */}
      <div className={styles.growingGrass}>
        <div className={`${styles.grass} ${styles.grass2}`}>
          <div className={styles.grassTop} />
          <div className={styles.grassBottom} />
          <GrassTuftLeaves />
        </div>
      </div>

      {/* flower__g-right--1 */}
      <div className={styles.growAns} style={d("2.4s")}>
        <div className={`${styles.gRight} ${styles.gRight1}`}>
          <div className={styles.gRightLeaf} />
        </div>
      </div>

      {/* flower__g-right--2 */}
      <div className={styles.growAns} style={d("2.8s")}>
        <div className={`${styles.gRight} ${styles.gRight2}`}>
          <div className={styles.gRightLeaf} />
        </div>
      </div>

      {/* flower__g-front */}
      <div className={styles.growAns} style={d("2.8s")}>
        <div className={styles.gFront}>
          {GRASS_LEAF_NUMBERS.map((n) => (
            <div key={n} className={`${styles.gFrontLeafWrapper} ${styles[`gFrontLeafWrapper${n}`]}`}>
              <div className={styles.gFrontLeaf} />
            </div>
          ))}
          <div className={styles.gFrontLine} />
        </div>
      </div>

      {/* flower__g-fr */}
      <div className={styles.growAns} style={d("3.2s")}>
        <div className={styles.gFr}>
          <div className={styles.gFrBaseLeaf} />
          {GRASS_LEAF_NUMBERS.map((n) => (
            <div key={n} className={`${styles.gFrLeaf} ${styles[`gFrLeaf${n}`]}`} />
          ))}
        </div>
      </div>

      {/* long-g--0 through long-g--7 */}
      {LONG_G_GROUPS.map((group, gi) => (
        <div key={gi} className={`${styles.longG} ${group.mod ? styles[group.mod] : ""}`}>
          {group.delays.map((delay, li) => (
            <div key={li} className={styles.growAns} style={d(delay)}>
              <div className={`${styles.longGLeaf} ${styles[`longGLeaf${li}`]}`} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}