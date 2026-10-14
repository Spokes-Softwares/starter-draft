import * as z from "zod";

export const hubOnboardSchema = z.object({
  tenantId: z.string().min(1, "A tenant is missing"),
  hubDisplayName: z.string().min(1, "A name is required"),
  firstName: z.string().min(1, "A name is required"),
  lastName: z.string().min(1, "A last name is required"),
  email: z.email(),
  password: z.string().min(8, "A password is required"),
});

export type HubOnboardValues = z.infer<typeof hubOnboardSchema>;
