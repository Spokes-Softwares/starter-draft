import * as z from "zod";

export const userProfileSchema = z.object({
  firstName: z.string().min(1, "A name is required"),
  lastName: z.string().min(1, "A last name is required"),
});

export type UserProfileValues = z.infer<typeof userProfileSchema>;
