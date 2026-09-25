import * as z from "zod";

const emailSchema = z.email();
const passwordSchema = z.string().min(8, "Your password is too short");

export const emailFormSchema = z.object({
  email: emailSchema,
});

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const resetPasswordFormSchema = z
  .object({
    password: passwordSchema,
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    error: "Passwords do not match",
    path: ["confirm"],
  });

export type EmailFormValues = z.infer<typeof emailFormSchema>;
export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordFormSchema>;
