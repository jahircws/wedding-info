import { wedding } from "@/lib/weddingConfig";
import ArchMotif from "./ArchMotif";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.frameOuter}>
        <div className={styles.frameInner}>
          <ArchMotif className={styles.arch} />
          <p className="eyebrow">We're getting married</p>
          <h1 className={styles.names}>
            <span className="script">{wedding.coupleNames.partnerOne}</span>
            <span className={styles.amp}>&amp;</span>
            <span className="script">{wedding.coupleNames.partnerTwo}</span>
          </h1>
          <div className="divider" />
          <p className={styles.date}>{wedding.displayDate}</p>
          <p className={styles.venue}>{wedding.venue.ceremony.name}</p>
          <a className={styles.cta} href="#rsvp">
            RSVP &amp; Details
          </a>
        </div>
      </div>
    </section>
  );
}
