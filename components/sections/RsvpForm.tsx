"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { rsvpSchema, MENU_CHOICES, type RsvpFormValues } from "@/lib/validations";
import SectionOrnament from "@/components/ui/SectionOrnament";

const MENU_LABELS: Record<(typeof MENU_CHOICES)[number], string> = {
  MEAT: "Meat",
  FISH: "Fish",
  VEGETARIAN: "Vegetarian",
};

const inputClass =
  "w-full rounded-lg border border-blush-200 bg-white px-4 py-2.5 font-body outline-none transition-colors duration-200 ease-out focus:border-gold";
const labelClass = "mb-1 block font-heading text-xs uppercase tracking-wide text-ink/70";

export default function RsvpForm() {
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      mainName: "",
      email: "",
      phone: "",
      attendingSunday: true,
      attendingMonday: true,
      hotel: "",
      shuttleToHacienda: false,
      shuttleBack: false,
      shuttleBackTime: "",
      menuChoice: "",
      foodNotes: "",
      songRequest: "",
      notes: "",
      guests: [],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "guests" });
  const shuttleBack = watch("shuttleBack");

  async function onSubmit(values: RsvpFormValues) {
    setSubmitState("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Something went wrong. Please try again.");
      }
      setSubmitState("success");
      reset();
    } catch (err) {
      setSubmitState("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="rsvp" className="bg-ivory px-6 py-24 md:py-32" aria-label="RSVP form">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto mb-12 max-w-2xl text-center"
      >
        <p className="section-heading mb-3">Kindly Reply</p>
        <h2 className="font-script tracking-wide text-4xl text-blush-500 md:text-5xl">R S V P</h2>
        <SectionOrnament className="mt-4" />
        <p className="mt-3 font-body text-ink/70">
          Please respond by 4 September 2026 so we can finalise numbers with the venues.
        </p>
      </motion.div>

      <div className="mx-auto max-w-2xl">
        <AnimatePresence mode="wait">
          {submitState === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-2xl border border-sage-300 bg-sage-100/60 p-10 text-center"
              role="status"
            >
              <p className="font-script text-3xl text-sage-700">Thank you!</p>
              <p className="mt-3 font-body text-ink/80">
                Your RSVP has been received. We&apos;ll be in touch with any updates.
              </p>
              <button
                type="button"
                onClick={() => setSubmitState("idle")}
                className="mt-6 font-heading text-xs uppercase tracking-widest text-gold underline underline-offset-4"
              >
                Submit another response
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-6 rounded-2xl border border-blush-200 bg-white/70 p-6 shadow-sm md:p-10"
            >
              <fieldset className="space-y-6">
                <legend className="section-heading">Main Guest</legend>

                <div>
                  <label htmlFor="mainName" className={labelClass}>
                    Full name
                  </label>
                  <input
                    id="mainName"
                    type="text"
                    {...register("mainName")}
                    aria-invalid={!!errors.mainName}
                    aria-describedby={errors.mainName ? "mainName-error" : undefined}
                    className={inputClass}
                  />
                  {errors.mainName && (
                    <p id="mainName-error" role="alert" className="mt-1 text-sm text-red-600">
                      {errors.mainName.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={inputClass}
                    />
                    {errors.email && (
                      <p id="email-error" role="alert" className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone (WhatsApp, for day-of updates)
                    </label>
                    <input id="phone" type="tel" {...register("phone")} className={inputClass} />
                  </div>
                </div>

                <div>
                  <p className={labelClass}>Which day(s) will you join us?</p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
                    <label className="flex items-center gap-3 font-body text-sm text-ink/80">
                      <input
                        type="checkbox"
                        {...register("attendingSunday")}
                        className="h-4 w-4 accent-gold"
                      />
                      Sunday 27 &mdash; Welcome evening
                    </label>
                    <label className="flex items-center gap-3 font-body text-sm text-ink/80">
                      <input
                        type="checkbox"
                        {...register("attendingMonday")}
                        className="h-4 w-4 accent-gold"
                      />
                      Monday 28 &mdash; The wedding
                    </label>
                  </div>
                  {errors.attendingMonday && (
                    <p role="alert" className="mt-1 text-sm text-red-600">
                      {errors.attendingMonday.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="hotel" className={labelClass}>
                    Where are you staying in Seville?
                  </label>
                  <input
                    id="hotel"
                    type="text"
                    placeholder="Alfonso XIII, Villapanés, or another hotel"
                    {...register("hotel")}
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="menuChoice" className={labelClass}>
                      Menu choice for Monday
                    </label>
                    <select id="menuChoice" {...register("menuChoice")} className={inputClass}>
                      <option value="">Select a menu</option>
                      {MENU_CHOICES.map((choice) => (
                        <option key={choice} value={choice}>
                          {MENU_LABELS[choice]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="foodNotes" className={labelClass}>
                      Allergies or intolerances
                    </label>
                    <input id="foodNotes" type="text" {...register("foodNotes")} className={inputClass} />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 font-body text-sm text-ink/80">
                    <input
                      type="checkbox"
                      {...register("shuttleToHacienda")}
                      className="h-4 w-4 accent-gold"
                    />
                    I&apos;ll use the shuttle bus to the Hacienda on the 28th
                  </label>
                  <label className="flex items-center gap-3 font-body text-sm text-ink/80">
                    <input type="checkbox" {...register("shuttleBack")} className="h-4 w-4 accent-gold" />
                    I&apos;ll use the shuttle bus back to Seville
                  </label>
                  <AnimatePresence initial={false}>
                    {shuttleBack && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <label htmlFor="shuttleBackTime" className={labelClass}>
                          Roughly what time?
                        </label>
                        <input
                          id="shuttleBackTime"
                          type="text"
                          placeholder="e.g. 1:00 AM"
                          {...register("shuttleBackTime")}
                          className={inputClass}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label htmlFor="songRequest" className={labelClass}>
                    A song that will get you on the dance floor
                  </label>
                  <input id="songRequest" type="text" {...register("songRequest")} className={inputClass} />
                </div>

                <div>
                  <label htmlFor="notes" className={labelClass}>
                    Anything else you&apos;d like us to know?
                  </label>
                  <textarea id="notes" rows={3} {...register("notes")} className={inputClass} />
                </div>
              </fieldset>

              <fieldset className="space-y-6">
                <div className="flex items-center justify-between">
                  <legend className="section-heading">Additional Guests</legend>
                  <button
                    type="button"
                    onClick={() => append({ fullName: "", menuChoice: "", foodNotes: "" })}
                    className="rounded-full border border-gold px-4 py-1.5 font-heading text-xs uppercase tracking-widest text-gold transition-colors duration-200 ease-out hover:bg-gold hover:text-ivory"
                  >
                    + Add another guest
                  </button>
                </div>

                {errors.guests?.root && (
                  <p role="alert" className="text-sm text-red-600">
                    {errors.guests.root.message}
                  </p>
                )}

                <AnimatePresence initial={false}>
                  {fields.map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="space-y-4 rounded-xl border border-sage-300/60 bg-sage-100/30 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-heading text-xs uppercase tracking-wide text-sage-700">
                          Guest {index + 1}
                        </p>
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          aria-label={`Remove guest ${index + 1}`}
                          className="font-heading text-xs uppercase tracking-widest text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="md:col-span-2">
                          <label
                            htmlFor={`guests.${index}.fullName`}
                            className={labelClass}
                          >
                            Full name
                          </label>
                          <input
                            id={`guests.${index}.fullName`}
                            type="text"
                            {...register(`guests.${index}.fullName` as const)}
                            aria-invalid={!!errors.guests?.[index]?.fullName}
                            className={inputClass}
                          />
                          {errors.guests?.[index]?.fullName && (
                            <p role="alert" className="mt-1 text-sm text-red-600">
                              {errors.guests[index]?.fullName?.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor={`guests.${index}.menuChoice`}
                            className={labelClass}
                          >
                            Menu choice
                          </label>
                          <select
                            id={`guests.${index}.menuChoice`}
                            {...register(`guests.${index}.menuChoice` as const)}
                            className={inputClass}
                          >
                            <option value="">Select a menu</option>
                            {MENU_CHOICES.map((choice) => (
                              <option key={choice} value={choice}>
                                {MENU_LABELS[choice]}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor={`guests.${index}.foodNotes`}
                            className={labelClass}
                          >
                            Allergies / preferences
                          </label>
                          <input
                            id={`guests.${index}.foodNotes`}
                            type="text"
                            {...register(`guests.${index}.foodNotes` as const)}
                            className={inputClass}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </fieldset>

              {serverError && (
                <p role="alert" className="text-sm text-red-600">
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitState === "submitting"}
                className="w-full rounded-full bg-blush-500 px-8 py-3 font-heading text-sm uppercase tracking-[0.2em] text-ivory transition-colors duration-200 ease-out hover:bg-blush-400 disabled:opacity-60"
              >
                {submitState === "submitting" ? "Sending..." : "Send RSVP"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}