"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { rsvpSchema, MENU_CHOICES, STARTER_CHOICES, type RsvpFormValues } from "@/lib/validations";
import SectionOrnament from "@/components/ui/SectionOrnament";

const MENU_LABELS: Record<(typeof MENU_CHOICES)[number], string> = {
  MEAT: "Meat",
  FISH: "Fish",
  VEGETARIAN: "Vegetarian",
};

const STARTER_LABELS: Record<(typeof STARTER_CHOICES)[number], string> = {
  TOMATO_CREAM: "Cold cream of roasted tomatoes",
  CARABINEROS_CARPACCIO: "Carabineros carpaccio",
};

const baseFieldClass =
  "w-full rounded-none border border-clay-600/25 bg-white px-4 font-body text-sm outline-none transition-colors duration-200 ease-in-out focus:border-clay-600 placeholder:text-xs placeholder:text-clay-700/40";
const inputClass = `${baseFieldClass} h-[46px]`;
const selectClass = `${inputClass} appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:11px] pr-9 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%238b3f27%22 stroke-width=%222%22><polyline points=%226 9 12 15 18 9%22/></svg>')]`;
const textareaClass = `${baseFieldClass} py-3`;
const labelClass = "mb-1 block font-body text-xs uppercase tracking-wide text-clay-700/90";
const eyebrowClass = "text-sm text-center uppercase tracking-[0.22em] text-honey";
const checkboxLabelClass = "flex items-center gap-3 font-body text-sm text-clay-700/80";

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
      attendingSunday: true,
      attendingMonday: true,
      hotel: "",
      shuttleToHacienda: false,
      shuttleBack: false,
      shuttleBackTime: "",
      starterChoice: "",
      menuChoice: "",
      foodNotes: "",
      songRequest: "",
      notes: "",
      guests: [],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "guests" });
  const shuttleBack = watch("shuttleBack");
  const guestShuttleBack = watch("guests");

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
    <section id="rsvp" className="scroll-mt-24 bg-cream-50 px-6 py-24 md:py-32" aria-label="RSVP form">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="mx-auto mb-12 max-w-2xl text-center"
      >
        <img src="/icons/champagne.svg" alt="" aria-hidden="true" className="mx-auto mb-10 h-20 w-auto text-honey" />
        <h2 className="mt-2 font-heading text-4xl leading-[5rem] text-clay-600 md:break-normal md:text-5xl md:leading-tight">Please RSVP</h2>
        <p className="copy-caps mt-3 text-clay-700/70">
          Please reconfirm by <span className="font-bold text-clay-700">Friday, 11 September</span>.
        </p>
      </motion.div>

      <div className="mx-auto max-w-2xl">
        <AnimatePresence mode="wait">
          {submitState === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="rounded-none bg-cream-50 p-10 text-center"
              role="status"
            >
              <p className="font-heading text-3xl text-clay-500">Thank you!</p>
              <p className="copy-caps mt-3 text-clay-700/80">
                We&apos;ve got your RSVP. We&apos;ll reach out if anything changes.
              </p>
              <button
                type="button"
                onClick={() => setSubmitState("idle")}
                className="copy-caps mt-6 text-honey underline underline-offset-4"
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
              transition={{ duration: 0.4, ease: "easeInOut" }}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-6 rounded-none bg-cream-50 p-6 md:p-10"
            >
              <fieldset className="space-y-6">
                <legend className={eyebrowClass}>Main Guest</legend>

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
                    placeholder="e.g. Sara Altamimi" maxLength={100}
                    className={inputClass}
                  />
                  {errors.mainName && (
                    <p id="mainName-error" role="alert" className="mt-1 text-sm text-red-600">
                      {errors.mainName.message}
                    </p>
                  )}
                </div>

                <div>
                  <p className={labelClass}>Which day(s) will you join us?</p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
                    <label className={checkboxLabelClass}>
                      <input
                        type="checkbox"
                        {...register("attendingSunday")}
                        className="h-4 w-4 accent-honey"
                      />
                      Sunday 27 &mdash; Welcome evening
                    </label>
                    <label className={checkboxLabelClass}>
                      <input
                        type="checkbox"
                        {...register("attendingMonday")}
                        className="h-4 w-4 accent-honey"
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
                    <label htmlFor="starterChoice" className={labelClass}>
                      Starter for Monday
                    </label>
                    <select id="starterChoice" {...register("starterChoice")} className={selectClass}>
                      <option value="">Select a starter</option>
                      {STARTER_CHOICES.map((choice) => (
                        <option key={choice} value={choice}>
                          {STARTER_LABELS[choice]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="menuChoice" className={labelClass}>
                      Main course for Monday
                    </label>
                    <select id="menuChoice" {...register("menuChoice")} className={selectClass}>
                      <option value="">Select a menu</option>
                      {MENU_CHOICES.map((choice) => (
                        <option key={choice} value={choice}>
                          {MENU_LABELS[choice]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="foodNotes" className={labelClass}>
                    Allergies or intolerances
                  </label>
                  <input id="foodNotes" type="text" placeholder="e.g. nut allergy, vegetarian" maxLength={150} {...register("foodNotes")} className={inputClass} />
                </div>

                <div className="space-y-3">
                  <label className={checkboxLabelClass}>
                    <input
                      type="checkbox"
                      {...register("shuttleToHacienda")}
                      className="h-4 w-4 accent-honey"
                    />
                    I&apos;ll use the shuttle bus to the Hacienda on the 28th
                  </label>
                  <label className={checkboxLabelClass}>
                    <input type="checkbox" {...register("shuttleBack")} className="h-4 w-4 accent-honey" />
                    I&apos;ll use the shuttle bus back to Seville
                  </label>
                  <AnimatePresence initial={false}>
                    {shuttleBack && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
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
                  <input id="songRequest" type="text" placeholder="e.g. Uptown Funk – Bruno Mars" maxLength={100} {...register("songRequest")} className={inputClass} />
                </div>

                <div>
                  <label htmlFor="notes" className={labelClass}>
                    Anything else you&apos;d like us to know?
                  </label>
                  <textarea id="notes" rows={3} {...register("notes")} className={textareaClass} />
                </div>
              </fieldset>

              <fieldset className="space-y-6">
                <div className="flex items-center justify-between">
                  <legend className={eyebrowClass}>Additional Guests</legend>
                  <button
                    type="button"
                    onClick={() =>
                      append({
                        fullName: "",
                        attendingSunday: true,
                        attendingMonday: true,
                        shuttleToHacienda: false,
                        shuttleBack: false,
                        shuttleBackTime: "",
                        starterChoice: "",
                        menuChoice: "",
                        foodNotes: "",
                      })
                    }
                    className="rounded-sm border border-clay-600 px-4 py-1.5 font-body text-xs uppercase tracking-widest text-clay-500 transition-colors duration-200 ease-in-out hover:bg-clay-800 hover:text-cream-50"
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
                  {fields.map((field, index) => {
                    const guestShuttleBackOn = guestShuttleBack?.[index]?.shuttleBack;
                    return (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="space-y-4 rounded-none border border-clay-600/20 bg-cream-50/50 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-body text-xs italic uppercase tracking-wide text-honey">
                            Guest {index + 1}
                          </p>
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            aria-label={`Remove guest ${index + 1}`}
                            className="font-body text-xs uppercase tracking-widest text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </div>

                        <div>
                          <label htmlFor={`guests.${index}.fullName`} className={labelClass}>
                            Full name
                          </label>
                          <input
                            id={`guests.${index}.fullName`}
                            type="text"
                            placeholder="e.g. John Smith" maxLength={100}
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
                          <p className={labelClass}>Which day(s) will they join?</p>
                          <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
                            <label className={checkboxLabelClass}>
                              <input
                                type="checkbox"
                                {...register(`guests.${index}.attendingSunday` as const)}
                                className="h-4 w-4 accent-honey"
                              />
                              Sunday 27
                            </label>
                            <label className={checkboxLabelClass}>
                              <input
                                type="checkbox"
                                {...register(`guests.${index}.attendingMonday` as const)}
                                className="h-4 w-4 accent-honey"
                              />
                              Monday 28
                            </label>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div>
                            <label htmlFor={`guests.${index}.starterChoice`} className={labelClass}>
                              Starter
                            </label>
                            <select
                              id={`guests.${index}.starterChoice`}
                              {...register(`guests.${index}.starterChoice` as const)}
                              className={selectClass}
                            >
                              <option value="">Select a starter</option>
                              {STARTER_CHOICES.map((choice) => (
                                <option key={choice} value={choice}>
                                  {STARTER_LABELS[choice]}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label htmlFor={`guests.${index}.menuChoice`} className={labelClass}>
                              Main course
                            </label>
                            <select
                              id={`guests.${index}.menuChoice`}
                              {...register(`guests.${index}.menuChoice` as const)}
                              className={selectClass}
                            >
                              <option value="">Select a menu</option>
                              {MENU_CHOICES.map((choice) => (
                                <option key={choice} value={choice}>
                                  {MENU_LABELS[choice]}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label htmlFor={`guests.${index}.foodNotes`} className={labelClass}>
                            Allergies / preferences
                          </label>
                          <input
                            id={`guests.${index}.foodNotes`}
                            type="text"
                            placeholder="e.g. gluten-free" maxLength={150}
                            {...register(`guests.${index}.foodNotes` as const)}
                            className={inputClass}
                          />
                        </div>

                        <div className="space-y-3">
                          <label className={checkboxLabelClass}>
                            <input
                              type="checkbox"
                              {...register(`guests.${index}.shuttleToHacienda` as const)}
                              className="h-4 w-4 accent-honey"
                            />
                            They&apos;ll use the shuttle bus to the Hacienda
                          </label>
                          <label className={checkboxLabelClass}>
                            <input
                              type="checkbox"
                              {...register(`guests.${index}.shuttleBack` as const)}
                              className="h-4 w-4 accent-honey"
                            />
                            They&apos;ll use the shuttle bus back to Seville
                          </label>
                          <AnimatePresence initial={false}>
                            {guestShuttleBackOn && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <label htmlFor={`guests.${index}.shuttleBackTime`} className={labelClass}>
                                  Roughly what time?
                                </label>
                                <input
                                  id={`guests.${index}.shuttleBackTime`}
                                  type="text"
                                  placeholder="e.g. 1:00 AM"
                                  {...register(`guests.${index}.shuttleBackTime` as const)}
                                  className={inputClass}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })}
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
                className="w-full rounded-sm bg-clay-700 px-8 py-3 font-body text-sm uppercase tracking-[0.2em] text-cream-50 transition-colors duration-200 ease-in-out hover:bg-clay-800 disabled:opacity-60"
              >
                {submitState === "submitting" ? "Confirming..." : "Confirm Reply"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}