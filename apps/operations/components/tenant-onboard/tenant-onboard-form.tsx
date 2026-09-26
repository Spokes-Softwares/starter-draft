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
import { tenantOnboardSchema, TenantOnboardValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel } from "@repo/ui/components/shadcn-ui/field";
import { Input } from "@repo/ui/components/shadcn-ui/input";
import { Button } from "@repo/ui/components/shadcn-ui/button";
import { Check, InfoIcon } from "lucide-react";
import handleTenantOnboardAction from "../../actions/onboarding/tenant-onboard-action";
import { useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/ui/components/shadcn-ui/alert";

export default function TenantOnboardForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<Boolean>(false);
  const [resultSuccess, setResultSuccess] = useState<string | undefined | null>(
    null,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TenantOnboardValues>({
    resolver: zodResolver(tenantOnboardSchema),
    defaultValues: {
      displayName: undefined,
      companyName: "",
      email: "",
      password: "",
    },
  });

  async function handleTenantOnboarding(values: TenantOnboardValues) {
    const result = await handleTenantOnboardAction(values);

    if (result.error) {
      setError(result.error);
      return;
    }
    setSuccess(true);
    setResultSuccess(result.data?.tenant);
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
          aria-invalid={!!errors.companyName}
          {...register("companyName")}
        />
      </Field>
      <Field>
        <FieldLabel>Email Address</FieldLabel>
        <Input
          id="company-email-address"
          type="email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
      </Field>
      <Field>
        <FieldLabel>Password</FieldLabel>
        <Input
          id="password"
          type="password"
          aria-invalid={!!errors.password}
          {...register("password")}
        />
      </Field>
      <div className="grid col-span-2 gap-6">
        <Button type="submit" className="w-fit">
          <Check />
          Confirm details
        </Button>
        {error && (
          <Alert>
            <InfoIcon />
            <AlertTitle>There has been an error:</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert>
            <InfoIcon />
            <AlertTitle>The following tenant has been added</AlertTitle>
            <AlertDescription>{resultSuccess}</AlertDescription>
          </Alert>
        )}
      </div>
    </form>
  );
}
