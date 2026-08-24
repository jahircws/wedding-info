import { wedding } from "@/lib/weddingConfig";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className="script" style={{ fontSize: "1.6rem" }}>
        {wedding.coupleNames.partnerOne} &amp; {wedding.coupleNames.partnerTwo}
      </p>
      <p className={styles.small}>{wedding.displayDate}</p>
    </footer>
  );
}
