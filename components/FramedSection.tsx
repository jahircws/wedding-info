import { ReactNode } from "react";
import styles from "./FramedSection.module.css";

export default function FramedSection({
  children,
  id,
}: {
  children: ReactNode;
  id?: string;
}) {
  return (
    <div className={styles.card} id={id}>
      <svg
        className={styles.borderSvg}
        viewBox="0 0 800 550"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M 50,15 H 750 A 35,35 0 0,0 785,50 V 500 A 35,35 0 0,0 750,535 H 50 A 35,35 0 0,0 15,500 V 50 A 35,35 0 0,0 50,15 Z"
          fill="none"
          stroke="#a04936"
          strokeWidth="2"
        />
        <path
          d="M 54,23 H 746 A 27,27 0 0,0 777,54 V 496 A 27,27 0 0,0 746,527 H 54 A 27,27 0 0,0 23,496 V 54 A 27,27 0 0,0 54,23 Z"
          fill="none"
          stroke="#a04936"
          strokeWidth="1"
        />
      </svg>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
