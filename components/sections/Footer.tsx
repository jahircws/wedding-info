import Image from "next/image";
import SectionOrnament from "@/components/ui/SectionOrnament";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-clay-800 px-4 pt-14 pb-[104px] text-center text-cream-50 md:pb-14">
      {/* Trees sit in normal flex flow beside the text column (not absolutely
          positioned over it), so at every breakpoint they can only ever push
          the layout apart — never overlap it. They start tiny on phones and
          scale up to a full flourish on large screens. */}
      <div className="mx-auto flex max-w-4xl items-end justify-center gap-3 sm:gap-6 md:gap-10">
        <Image
          src="/footer-tree-left.png"
          alt=""
          aria-hidden="true"
          width={427}
          height={615}
          className="h-auto w-10 shrink-0 select-none opacity-70 sm:w-16 md:w-24 lg:w-40"
        />

        <div className="min-w-0 flex-1">
          <p className="font-heading font-bold text-4xl tracking-wide">S &amp; A</p>
          <p className="copy-caps mt-3 text-cream-50/80">
            With love, we can&apos;t wait to celebrate with you.
          </p>
          <p className="copy-caps mt-6 text-cream-50/40">
            Made with love &middot; Seville, 2026
          </p>
        </div>

        <Image
          src="/footer-tree-right.png"
          alt=""
          aria-hidden="true"
          width={427}
          height={615}
          className="h-auto w-10 shrink-0 select-none opacity-70 sm:w-16 md:w-24 lg:w-40"
        />
      </div>
    </footer>
  );
}