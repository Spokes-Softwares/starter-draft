import * as z from "zod";

export const tenantOnboardSchema = z.object({
  displayName: z.string().optional(),
  companyName: z.string().min(1, "Company name is required"),
  email: z.email(),
  password: z.string().min(8, "A password is required"),
});

export type TenantInviteValues = z.infer<typeof tenantOnboardSchema>;
