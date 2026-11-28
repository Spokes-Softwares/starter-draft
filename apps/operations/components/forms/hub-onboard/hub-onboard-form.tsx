"use client";

import { CardDescription } from "@repo/ui/components/shadcn-ui/card";
import { Heading } from "@repo/ui/components/shadcn-ui/heading";
import { useForm } from "react-hook-form";
import { hubOnboardSchema, HubOnboardValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@repo/ui/components/shadcn-ui/field";
import { Input } from "@repo/ui/components/shadcn-ui/input";
import { Button } from "@repo/ui/components/shadcn-ui/button";
import { InfoIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/ui/components/shadcn-ui/alert";
import handleHubOnboard from "@/actions/handle-hub-onboard";

const emptyHubFields = {
  hubDisplayName: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export default function HubOnboardForm({ tenantId }: { tenantId: string }) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [createdHub, setCreatedHub] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<HubOnboardValues>({
    resolver: zodResolver(hubOnboardSchema),
    defaultValues: {
      tenantId,
      ...emptyHubFields,
    },
  });

  async function handleHubOnboarding(values: HubOnboardValues) {
    setError(null);
    setSuccess(false);
    setCreatedHub(null);

    const result = await handleHubOnboard(values);

    if (result.error) {
      setError(result.error);
      return;
    }

    setSuccess(true);
    setCreatedHub(result.data!.hub);
    reset({
      tenantId,
      ...emptyHubFields,
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleHubOnboarding)}
      className="p-6 grid grid-cols-2 gap-6"
    >
      <div className="col-span-2">
        <Heading variant="h4">Hub Details</Heading>
        <CardDescription>
          Use the space below to create a hub and create an Admin user for the
          hub
        </CardDescription>
      </div>
      {/* data-invalid turns the entire field red when the data that has been inserted does not meet the zod requirements */}
      <Field data-invalid={!!errors.hubDisplayName} className="col-span-2">
        <FieldLabel>Hub Display Name</FieldLabel>
        <Input
          id="display-name"
          type="text"
          aria-invalid={!!errors.hubDisplayName}
          {...register("hubDisplayName")}
        />
        {/* FieldErrors pops up wherever you place it, again when the data that has been inserted does not meet the zod requirements  */}
        <FieldError errors={[errors.hubDisplayName]} />
      </Field>
      <div className="grid col-span-2 gap-6 grid-cols-2">
        <Field data-invalid={!!errors.firstName}>
          <FieldLabel>Admin First Name</FieldLabel>
          <Input
            id="first-name"
            type="text"
            aria-invalid={!!errors.firstName}
            {...register("firstName")}
          />
          <FieldError errors={[errors.firstName]} />
        </Field>
        <Field data-invalid={!!errors.lastName}>
          <FieldLabel>Admin Last Name</FieldLabel>
          <Input
            id="last-name"
            type="text"
            aria-invalid={!!errors.lastName}
            {...register("lastName")}
          />
          <FieldError errors={[errors.lastName]} />
        </Field>
        <Field data-invalid={!!errors.email}>
          <FieldLabel>Admin Email</FieldLabel>
          <Input
            id="email-address"
            type="text"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          <FieldError errors={[errors.email]} />
        </Field>
        <Field data-invalid={!!errors.password}>
          <FieldLabel>Password</FieldLabel>
          <Input
            id="password"
            type="password"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          <FieldError errors={[errors.password]} />
        </Field>
      </div>
      {error && (
        <Alert className="col-span-2">
          <InfoIcon />
          <AlertTitle>There has been an error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert className="col-span-2">
          <InfoIcon />
          <AlertTitle>Hub successfully created</AlertTitle>
          <AlertDescription>{createdHub}</AlertDescription>
        </Alert>
      )}
      <Button
        type="submit"
        className="w-fit ml-auto col-span-2"
        disabled={isSubmitting}
      >
        <PlusIcon />
        Create Hub
      </Button>
    </form>
  );
}
