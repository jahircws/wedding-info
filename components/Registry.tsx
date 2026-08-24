import FramedSection from "./FramedSection";
import { wedding } from "@/lib/weddingConfig";
import styles from "./Section.module.css";

export default function Registry() {
  return (
    <FramedSection id="registry">
      <p className="eyebrow" style={{ textAlign: "center" }}>
        With Love
      </p>
      <h2 className={styles.heading}>Registry</h2>
      <p className={styles.subheading}>
        Your presence is the greatest gift — for those who'd still like to
        send something
      </p>
      <div className={styles.gridTwo}>
        {wedding.registry.map((r) => (
          <div className={styles.item} key={r.store}>
            <p className={styles.itemTitle}>{r.store}</p>
            <a
              className={styles.link}
              href={r.link}
              target="_blank"
              rel="noreferrer"
            >
              View Registry
            </a>
          </div>
        ))}
      </div>
    </FramedSection>
  );
}
