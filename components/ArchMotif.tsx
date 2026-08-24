export default function ArchMotif({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 300 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="#A64B2A" strokeWidth="1.1" strokeLinecap="round">
        {/* Arch */}
        <path d="M100 200 V110 A50 50 0 0 1 200 110 V200" />
        <path d="M92 200 V106 A58 58 0 0 1 208 106 V200" />
        <path d="M100 118 H200" opacity="0.6" />

        {/* Fountain, simplified concentric basin */}
        <path d="M150 200 V178" />
        <ellipse cx="150" cy="178" rx="6" ry="3" />
        <path d="M126 200 Q150 190 174 200" />
        <path d="M118 200 Q150 212 182 200" />

        {/* Left palm */}
        <path d="M64 200 C 60 170 58 150 48 132" />
        <path d="M48 132 C 30 126 18 118 8 108" opacity="0.75" />
        <path d="M48 132 C 34 122 26 108 22 92" opacity="0.75" />
        <path d="M48 132 C 46 112 50 96 60 82" opacity="0.75" />
        <path d="M48 132 C 60 118 74 112 90 110" opacity="0.75" />

        {/* Right palm */}
        <path d="M236 200 C 240 170 242 150 252 132" />
        <path d="M252 132 C 270 126 282 118 292 108" opacity="0.75" />
        <path d="M252 132 C 266 122 274 108 278 92" opacity="0.75" />
        <path d="M252 132 C 254 112 250 96 240 82" opacity="0.75" />
        <path d="M252 132 C 240 118 226 112 210 110" opacity="0.75" />

        {/* Ground line */}
        <path d="M20 200 H280" opacity="0.5" />
      </g>
    </svg>
  );
}
