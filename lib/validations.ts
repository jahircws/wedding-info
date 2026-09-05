import { z } from "zod";

export const MENU_CHOICES = ["MEAT", "FISH", "VEGETARIAN"] as const;
const menuChoiceSchema = z.enum(MENU_CHOICES).optional().or(z.literal(""));

export const STARTER_CHOICES = ["TOMATO_CREAM", "CARABINEROS_CARPACCIO"] as const;
const starterChoiceSchema = z.enum(STARTER_CHOICES).optional().or(z.literal(""));

export const guestSchema = z.object({
  fullName: z.string().min(2, "Please enter a full name").max(100),
  attendingSunday: z.boolean().default(true),
  attendingMonday: z.boolean().default(true),
  shuttleToHacienda: z.boolean().default(false),
  shuttleBack: z.boolean().default(false),
  shuttleBackTime: z.string().max(60).optional().or(z.literal("")),
  starterChoice: starterChoiceSchema,
  menuChoice: menuChoiceSchema,
  foodNotes: z.string().max(150).optional().or(z.literal("")),
});

export const rsvpSchema = z
  .object({
    mainName: z.string().min(2, "Please enter your full name").max(100),
    attendingSunday: z.boolean().default(true),
    attendingMonday: z.boolean().default(true),
    hotel: z.string().max(150).optional().or(z.literal("")),
    shuttleToHacienda: z.boolean().default(false),
    shuttleBack: z.boolean().default(false),
    shuttleBackTime: z.string().max(60).optional().or(z.literal("")),
    starterChoice: starterChoiceSchema,
    menuChoice: menuChoiceSchema,
    foodNotes: z.string().max(150).optional().or(z.literal("")),
    songRequest: z.string().max(100).optional().or(z.literal("")),
    notes: z.string().max(400).optional().or(z.literal("")),
    guests: z.array(guestSchema).max(10, "Please contact us directly for larger parties"),
  })
  .refine((data) => data.attendingSunday || data.attendingMonday, {
    message: "Please let us know if you'll join us on at least one day.",
    path: ["attendingMonday"],
  });

export type RsvpFormValues = z.infer<typeof rsvpSchema>;

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const statusUpdateSchema = z.object({
  targetType: z.enum(["party", "guest"]),
  status: z.enum(["PENDING", "APPROVED", "DECLINED"]),
});

export const siteSettingsSchema = z.object({
  weddingDayOne: z.string(),
  weddingDayTwo: z.string(),
  venueName: z.string().min(1),
  venueAddress: z.string().min(1),
  ceremonyTime: z.string().min(1),
  receptionTime: z.string().min(1),
  mapUrl: z.string().url(),
});