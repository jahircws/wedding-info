"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { rsvpSchema, type RsvpFormValues } from "@/lib/validations";
import SectionOrnament from "@/components/ui/SectionOrnament";

export default function RsvpForm() {
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      mainName: "",
      email: "",
      hotel: "",
      foodNotes: "",
      attending: true,
      guests: [],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "guests" });

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
          Please respond by 1 September 2026. We can&apos;t wait to celebrate with you.
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
                  <label htmlFor="mainName" className="mb-1 block font-heading text-xs uppercase tracking-wide text-ink/70">
                    Full name
                  </label>
                  <input
                    id="mainName"
                    type="text"
                    {...register("mainName")}
                    aria-invalid={!!errors.mainName}
                    aria-describedby={errors.mainName ? "mainName-error" : undefined}
                    className="w-full rounded-lg border border-blush-200 bg-white px-4 py-2.5 font-body outline-none transition-colors duration-200 ease-out focus:border-gold"
                  />
                  {errors.mainName && (
                    <p id="mainName-error" role="alert" className="mt-1 text-sm text-red-600">
                      {errors.mainName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="mb-1 block font-heading text-xs uppercase tracking-wide text-ink/70">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className="w-full rounded-lg border border-blush-200 bg-white px-4 py-2.5 font-body outline-none transition-colors duration-200 ease-out focus:border-gold"
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="hotel" className="mb-1 block font-heading text-xs uppercase tracking-wide text-ink/70">
                    Hotel you&apos;re staying at
                  </label>
                  <input
                    id="hotel"
                    type="text"
                    {...register("hotel")}
                    className="w-full rounded-lg border border-blush-200 bg-white px-4 py-2.5 font-body outline-none transition-colors duration-200 ease-out focus:border-gold"
                  />
                </div>

                <div>
                  <label htmlFor="foodNotes" className="mb-1 block font-heading text-xs uppercase tracking-wide text-ink/70">
                    Food preferences / allergies
                  </label>
                  <textarea
                    id="foodNotes"
                    rows={3}
                    {...register("foodNotes")}
                    className="w-full rounded-lg border border-blush-200 bg-white px-4 py-2.5 font-body outline-none transition-colors duration-200 ease-out focus:border-gold"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    id="attending"
                    type="checkbox"
                    {...register("attending")}
                    defaultChecked
                    className="h-4 w-4 accent-gold"
                  />
                  <label htmlFor="attending" className="font-body text-sm text-ink/80">
                    We plan to attend
                  </label>
                </div>
              </fieldset>

              <fieldset className="space-y-6">
                <div className="flex items-center justify-between">
                  <legend className="section-heading">Additional Guests</legend>
                  <button
                    type="button"
                    onClick={() => append({ fullName: "", age: undefined, gender: "", foodNotes: "" })}
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
                        <div>
                          <label
                            htmlFor={`guests.${index}.fullName`}
                            className="mb-1 block font-heading text-xs uppercase tracking-wide text-ink/70"
                          >
                            Full name
                          </label>
                          <input
                            id={`guests.${index}.fullName`}
                            type="text"
                            {...register(`guests.${index}.fullName` as const)}
                            aria-invalid={!!errors.guests?.[index]?.fullName}
                            className="w-full rounded-lg border border-blush-200 bg-white px-4 py-2.5 font-body outline-none transition-colors duration-200 ease-out focus:border-gold"
                          />
                          {errors.guests?.[index]?.fullName && (
                            <p role="alert" className="mt-1 text-sm text-red-600">
                              {errors.guests[index]?.fullName?.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor={`guests.${index}.age`}
                            className="mb-1 block font-heading text-xs uppercase tracking-wide text-ink/70"
                          >
                            Age
                          </label>
                          <input
                            id={`guests.${index}.age`}
                            type="number"
                            min={0}
                            {...register(`guests.${index}.age` as const)}
                            className="w-full rounded-lg border border-blush-200 bg-white px-4 py-2.5 font-body outline-none transition-colors duration-200 ease-out focus:border-gold"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`guests.${index}.gender`}
                            className="mb-1 block font-heading text-xs uppercase tracking-wide text-ink/70"
                          >
                            Gender
                          </label>
                          <input
                            id={`guests.${index}.gender`}
                            type="text"
                            {...register(`guests.${index}.gender` as const)}
                            className="w-full rounded-lg border border-blush-200 bg-white px-4 py-2.5 font-body outline-none transition-colors duration-200 ease-out focus:border-gold"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`guests.${index}.foodNotes`}
                            className="mb-1 block font-heading text-xs uppercase tracking-wide text-ink/70"
                          >
                            Food allergies / preferences
                          </label>
                          <input
                            id={`guests.${index}.foodNotes`}
                            type="text"
                            {...register(`guests.${index}.foodNotes` as const)}
                            className="w-full rounded-lg border border-blush-200 bg-white px-4 py-2.5 font-body outline-none transition-colors duration-200 ease-out focus:border-gold"
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