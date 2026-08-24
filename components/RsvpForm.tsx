"use client";

import { useState, FormEvent } from "react";
import FramedSection from "./FramedSection";
import { wedding } from "@/lib/weddingConfig";
import sectionStyles from "./Section.module.css";
import styles from "./RsvpForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";

export default function RsvpForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [attending, setAttending] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
      setAttending("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        "Something went wrong sending your response. Please try again, or reach out to us directly."
      );
    }
  }

  if (status === "success") {
    return (
      <FramedSection id="rsvp">
        <div className={styles.successState}>
          <p className="eyebrow">Thank You</p>
          <h2 className={sectionStyles.heading}>Your RSVP is in</h2>
          <div className="divider" />
          <p className={styles.successText}>
            We can't wait to celebrate with you on {wedding.displayDate}.
          </p>
        </div>
      </FramedSection>
    );
  }

  return (
    <FramedSection id="rsvp">
      <p className="eyebrow" style={{ textAlign: "center" }}>
        Kindly Reply
      </p>
      <h2 className={sectionStyles.heading}>RSVP</h2>
      <p className={sectionStyles.subheading}>
        Please respond by {wedding.rsvpDeadline}
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="fullName">Full Name(s)</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Jane &amp; John Doe"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="attending">Will you be attending?</label>
          <select
            id="attending"
            name="attending"
            required
            value={attending}
            onChange={(e) => setAttending(e.target.value)}
          >
            <option value="" disabled>
              Select one
            </option>
            <option value="Joyfully Accepts">Joyfully Accepts</option>
            <option value="Regretfully Declines">Regretfully Declines</option>
          </select>
        </div>

        {attending === "Joyfully Accepts" && (
          <>
            <div className={styles.field}>
              <label htmlFor="guestCount">Number in Your Party</label>
              <select id="guestCount" name="guestCount" defaultValue="1">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="mealChoice">Meal Choice</label>
              <select id="mealChoice" name="mealChoice" required defaultValue="">
                <option value="" disabled>
                  Select a meal
                </option>
                {wedding.mealOptions.map((meal) => (
                  <option key={meal} value={meal}>
                    {meal}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="dietary">
                Allergies or Dietary Restrictions
              </label>
              <textarea
                id="dietary"
                name="dietary"
                rows={3}
                placeholder="e.g. peanut allergy, gluten-free, vegan"
              />
            </div>

            <div className={styles.fieldDivider}>
              <span>Travel &amp; Accommodations</span>
            </div>

            <div className={styles.field}>
              <label htmlFor="hotelName">
                Where are you staying? (hotel name)
              </label>
              <input
                id="hotelName"
                name="hotelName"
                type="text"
                placeholder="See our Accommodations list above, or your own"
              />
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="checkIn">Check-in</label>
                <input id="checkIn" name="checkIn" type="date" />
              </div>
              <div className={styles.field}>
                <label htmlFor="checkOut">Check-out</label>
                <input id="checkOut" name="checkOut" type="date" />
              </div>
            </div>
          </>
        )}

        <div className={styles.field}>
          <label htmlFor="notes">Note for the Couple (optional)</label>
          <textarea id="notes" name="notes" rows={3} />
        </div>

        <button
          type="submit"
          className={styles.submit}
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending..." : "Send RSVP"}
        </button>

        {status === "error" && (
          <p className={styles.errorText} role="alert">
            {errorMessage}
          </p>
        )}
      </form>
    </FramedSection>
  );
}
