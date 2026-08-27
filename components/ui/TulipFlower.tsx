"use client";

import styles from "./TulipFlower.module.css";

export default function TulipFlower({
  bloom = false,
  size = 130,
  className = "",
}: {
  bloom?: boolean;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`${styles.flower} ${bloom ? "" : styles.paused} ${className}`}
      style={{ fontSize: size / 55 }}
      aria-hidden="true"
    >
      <div className={styles.leafs}>
        <div className={`${styles.leaf} ${styles.leaf1}`} />
        <div className={`${styles.leaf} ${styles.leaf2}`} />
        <div className={`${styles.leaf} ${styles.leaf3}`} />
        <div className={`${styles.leaf} ${styles.leaf4}`} />

        <div className={`${styles.light} ${styles.light1}`} />
        <div className={`${styles.light} ${styles.light2}`} />
        <div className={`${styles.light} ${styles.light3}`} />
        <div className={`${styles.light} ${styles.light4}`} />
        <div className={`${styles.light} ${styles.light5}`} />
        <div className={`${styles.light} ${styles.light6}`} />
        <div className={`${styles.light} ${styles.light7}`} />
        <div className={`${styles.light} ${styles.light8}`} />
      </div>
      <div className={styles.line}>
        <div className={`${styles.lineLeaf} ${styles.lineLeaf1}`} />
        <div className={`${styles.lineLeaf} ${styles.lineLeaf2}`} />
        <div className={`${styles.lineLeaf} ${styles.lineLeaf3}`} />
        <div className={`${styles.lineLeaf} ${styles.lineLeaf4}`} />
      </div>
    </div>
  );
}