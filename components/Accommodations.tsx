import FramedSection from "./FramedSection";
import { wedding } from "@/lib/weddingConfig";
import styles from "./Section.module.css";

export default function Accommodations() {
  return (
    <FramedSection id="stay">
      <p className="eyebrow" style={{ textAlign: "center" }}>
        Where To Stay
      </p>
      <h2 className={styles.heading}>Accommodations</h2>
      <p className={styles.subheading}>
        A few options near {wedding.venue.ceremony.name}
      </p>
      <div className={styles.gridTwo}>
        {wedding.hotels.map((hotel) => (
          <div className={styles.item} key={hotel.name}>
            <p className={styles.itemTitle}>{hotel.name}</p>
            <p className={styles.itemMeta}>{hotel.note}</p>
            <a
              className={styles.link}
              href={hotel.link}
              target="_blank"
              rel="noreferrer"
            >
              View Hotel
            </a>
          </div>
        ))}
      </div>
    </FramedSection>
  );
}
