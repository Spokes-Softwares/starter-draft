"use client";
/**
 * What is needed to create a tenant?
 * - Display Name
 * - Email Address
 * - Password?
 * - Logo?
 * - Multiple email addresses + passwords per tenant? - Maybe the initial one we can give them - then they can invite their own members
 *
 * What should the invite do?
 * - Pass the data to the database
 * - Send an invite to the tenant to set up their account + set their password? Or do we want to set their password
 * and give them an option to change their password when they log in?
 *
 *  MVP
 *  - Assign their email address and password so they can log in to access their portal (Making it easier for them?)
 * */
import { useForm } from "react-hook-form";
import { tenantOnboardSchema, TenantInviteValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel } from "@repo/ui/components/shadcn-ui/field";
import { Input } from "@repo/ui/components/shadcn-ui/input";

export default function TenantOnboardForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TenantInviteValues>({
    resolver: zodResolver(tenantOnboardSchema),
    defaultValues: {
      displayName: undefined,
      companyName: "",
      email: "",
      password: "",
    },
  });

  async function handleTenantOnboarding(values: TenantInviteValues) {
    console.log(values);
  }

  return (
    <form
      onSubmit={handleSubmit(handleTenantOnboarding)}
      className="grid grid-cols-2 gap-6"
    >
      <Field data-invalid={!!errors.displayName}>
        <FieldLabel>Display Name</FieldLabel>
        <Input
          id="display-name"
          type="text"
          aria-invalid={!!errors.displayName}
          {...register("displayName")}
        />
      </Field>
      <Field data-invalid={!!errors.companyName}>
        <FieldLabel>Company Name</FieldLabel>
        <Input
          id="company-name"
          type="text"
          ara-invalid={!!errors.companyName}
          {...register("companyName")}
        />
      </Field>
      <Field>
        <FieldLabel>Email Address</FieldLabel>
        <Input
        id="company-email-address"
        type="email"
        aria-invalid={!!errors.email}
        {...register("email")}/>
      </Field>
    </form>
  );
}
