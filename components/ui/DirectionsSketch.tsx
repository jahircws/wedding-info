export default function DirectionsSketch({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 46 C 14 40, 18 30, 14 22 C 10 14, 20 8, 30 12 C 40 16, 38 26, 48 24"
        strokeDasharray="1 6"
      />
      <path d="M48 24 L58 20 M48 24 L54 32 M48 24 L44 16" />
      <circle cx="4" cy="46" r="2.6" fill="currentColor" stroke="none" />
    </svg>
  );
}