import { z } from "zod";

export const guestSchema = z.object({
  fullName: z.string().min(2, "Please enter a full name").max(100),
  age: z
    .union([z.coerce.number().int().min(0).max(120), z.literal("").transform(() => undefined)])
    .optional(),
  gender: z.string().max(40).optional().or(z.literal("")),
  foodNotes: z.string().max(500).optional().or(z.literal("")),
});

export const rsvpSchema = z.object({
  mainName: z.string().min(2, "Please enter your full name").max(100),
  email: z.string().email("Please enter a valid email address"),
  hotel: z.string().max(150).optional().or(z.literal("")),
  foodNotes: z.string().max(500).optional().or(z.literal("")),
  attending: z.boolean().default(true),
  guests: z.array(guestSchema).max(10, "Please contact us directly for larger parties"),
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
