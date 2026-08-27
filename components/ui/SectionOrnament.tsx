// A thin gold flourish — line, diamond, line — dropped under a section's
// eyebrow/heading to give otherwise plain sections a bit of ceremony.
export default function SectionOrnament({
  className = "",
  align = "center",
}: {
  className?: string;
  align?: "center" | "start";
}) {
  return (
    <div
      className={`flex items-center gap-3 ${align === "center" ? "justify-center" : "justify-start"} ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-10 bg-gold/50" />
      <span className="h-2 w-2 rotate-45 rounded-[2px] bg-gold/70" />
      <span className="h-px w-10 bg-gold/50" />
    </div>
  );
}