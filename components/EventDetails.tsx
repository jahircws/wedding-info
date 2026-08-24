import FramedSection from "./FramedSection";
import { wedding } from "@/lib/weddingConfig";
import styles from "./Section.module.css";

export default function EventDetails() {
  return (
    <FramedSection id="details">
      <p className="eyebrow" style={{ textAlign: "center" }}>
        The Celebration
      </p>
      <h2 className={styles.heading}>Wedding Details</h2>
      <div className="divider" />
      <div className={styles.gridTwo}>
        <div className={styles.item}>
          <p className={styles.itemLabel}>Ceremony</p>
          <p className={styles.itemTitle}>{wedding.venue.ceremony.time}</p>
          <p className={styles.itemMeta}>{wedding.venue.ceremony.name}</p>
          <p className={styles.itemMeta}>{wedding.venue.ceremony.address}</p>
        </div>
        <div className={styles.item}>
          <p className={styles.itemLabel}>Reception</p>
          <p className={styles.itemTitle}>{wedding.venue.reception.time}</p>
          <p className={styles.itemMeta}>{wedding.venue.reception.name}</p>
        </div>
      </div>
    </FramedSection>
  );
}
