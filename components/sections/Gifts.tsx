"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionOrnament from "@/components/ui/SectionOrnament";

const ACCOUNT_DETAILS = [
  { label: "Account holder", value: "Sara Altamimi and/or Atef Merhej" },
  { label: "Bank", value: "UBS Switzerland AG, Zurich" },
  { label: "IBAN", value: "CH17 0027 6276 1237 6040 T" },
  { label: "BIC / SWIFT", value: "UBSWCHZH80A" },
  { label: "Reference", value: "Sara & Atef" },
];

export default function Gifts() {
  const [copied, setCopied] = useState<string | null>(null);

  async function handleCopy(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value.replace(/\s/g, ""));
      setCopied(label);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      // clipboard API unavailable — fine, the value is still visible to copy by hand
    }
  }

  return (
    <section id="gifts" className="relative overflow-hidden bg-cream-50 px-6 py-24 md:py-32" aria-label="Gifts">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="relative z-10 mx-auto mb-10 max-w-2xl text-center"
      >
        <img src="/icons/beach.svg" alt="" aria-hidden="true" className="mx-auto h-20 w-auto text-honey" />
        <h2 className="mt-3 font-heading text-4xl text-clay-500 md:text-5xl">Honeymoon Fund</h2>
        <SectionOrnament className="mt-6" />
        <p className="mt-6 font-body leading-relaxed text-clay-700/80">
          Your presence is the greatest gift we could ask for. We know that joining us in
          Seville takes time, planning and travel, and we are so grateful to have you there
          with us.
        </p>
        <p className="mt-4 font-body leading-relaxed text-clay-700/80">
          If you would nonetheless like to give something, we have set up an account to
          help us plan our honeymoon. Any contribution, big or small, will go towards
          making it unforgettable.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }}
        className="relative z-10 mx-auto max-w-md rounded-none border border-clay-600/25 bg-white/70 p-6 shadow-sm md:p-8"
      >
        <dl className="space-y-4">
          {ACCOUNT_DETAILS.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-4">
              <div>
                <dt className="font-body text-xs italic uppercase tracking-widest text-clay-700/50">
                  {item.label}
                </dt>
                <dd className="mt-0.5 font-body text-sm text-clay-700/90 md:text-base">{item.value}</dd>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(item.label, item.value)}
                className="shrink-0 rounded-sm border border-clay-600 px-3 py-1.5 font-body text-[11px] italic uppercase tracking-widest text-clay-500 transition-colors duration-200 ease-in-out hover:bg-clay-800 hover:text-cream-50"
              >
                {copied === item.label ? "Copied" : "Copy"}
              </button>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}