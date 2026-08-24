import { wedding } from "@/lib/weddingConfig";
import styles from "./Nav.module.css";

const links = [
  { href: "#details", label: "Details" },
  { href: "#stay", label: "Stay" },
  { href: "#registry", label: "Registry" },
  { href: "#rsvp", label: "RSVP" },
];

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <span className={styles.brand}>
        {wedding.coupleNames.partnerOne[0]}
        <span className={styles.ampSmall}>&amp;</span>
        {wedding.coupleNames.partnerTwo[0]}
      </span>
      <div className={styles.links}>
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
