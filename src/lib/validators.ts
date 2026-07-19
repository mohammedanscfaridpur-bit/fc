import { z } from "zod";

export const contactMessageSchema = z.object({
  name: z.string().min(2, "Name is too short").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().max(30).optional().or(z.literal("")),
  subject: z.string().max(150).optional().or(z.literal("")),
  message: z.string().min(10, "Message is too short").max(2000),
});
export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

export const membershipApplicationSchema = z.object({
  fullName: z.string().min(2).max(150),
  fatherOrGuardianName: z.string().max(150).optional().or(z.literal("")),
  dateOfBirth: z.string().optional().or(z.literal("")),
  address: z.string().min(5).max(500),
  phone: z.string().min(6).max(30),
  email: z.string().email().optional().or(z.literal("")),
  occupation: z.string().max(150).optional().or(z.literal("")),
  message: z.string().max(1000).optional().or(z.literal("")),
});
export type MembershipApplicationInput = z.infer<typeof membershipApplicationSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type LoginInput = z.infer<typeof loginSchema>;
