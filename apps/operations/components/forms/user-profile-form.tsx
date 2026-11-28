"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@repo/ui/components/shadcn-ui/card";
import { Heading } from "@repo/ui/components/shadcn-ui/heading";
import { Input } from "@repo/ui/components/shadcn-ui/input";
import { ShieldCheckIcon } from "lucide-react";
import { CurrentUserProfile } from "@repo/db/queries/user/get-current-user-profile";
import { Label } from "@repo/ui/components/shadcn-ui/label";
import { useForm, UseFormRegister } from "react-hook-form";
import { Button } from "@repo/ui/components/shadcn-ui/button";

type UserProfileFormValues = {
  firstName: string;
  lastName: string;
  newPassword: string;
  confirmPassword: string;
};

export default function UserProfileForm({
  user,
}: {
  user: CurrentUserProfile;
}) {
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
    reset,
  } = useForm<UserProfileFormValues>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function handleUserProfileForm(values: UserProfileFormValues) {
    console.log(values, "<<< values");

    reset({
      ...values,
      newPassword: "",
      confirmPassword: "",
    });
  }

  return (
    <form
      className="grid gap-10"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <PersonalInformation register={register} />
      <ChangePassword register={register} />
      <div className="flex gap-2 justify-end">
        <Button
          variant="outline"
          type="button"
          disabled={!isDirty}
          onClick={() => reset()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={!isDirty}>
          Save
        </Button>
      </div>
    </form>
  );
}

/* 

STEP 1: Use <form> in UserProfileForm and wrap it around the other two components
- It will know the values of all four fields at once
- It can tell whether anything has changed

STEP 2: Build useForm in UserProfileForm
- Build UserProfileSchemaValues

*/

const PersonalInformation = ({
  register,
}: {
  register: UseFormRegister<UserProfileFormValues>;
}) => {
  return (
    <Card>
      <CardHeader>
        <Heading variant="h4">Personal information</Heading>
        <CardDescription>
          Update your first and last name you use to sign in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Replace the div, labels with the 'Field" equivalent. This allows
        progressive error handling.  */}
        <div className="flex flex-row gap-6">
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="first-name">First name</Label>
            <Input
              id="first-name"
              type="text"
              {...register("firstName")}
              required
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            {/* And here */}
            <Label htmlFor="last-name">Last name</Label>
            <Input
              id="last-name"
              type="text"
              {...register("lastName")}
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ChangePassword = ({
  register,
}: {
  register: UseFormRegister<UserProfileFormValues>;
}) => {
  return (
    <Card>
      <CardHeader>
        <Heading variant="h4">Change password</Heading>
        <CardDescription>
          Choose a strong password to help protect your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-6">
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="new-password">New password</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="New password"
              {...register("newPassword")}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="confirm-password">Confirm new password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm new password"
              {...register("confirmPassword")}
            />
          </div>
        </div>
        <CardDescription className="my-5">
          Use at least 12 characters, including a number and a symbol.
        </CardDescription>
        <CardDescription className="flex gap-1 bg-sidebar p-3 rounded-md">
          <ShieldCheckIcon />
          Changing your password will sign you out of other devices.
        </CardDescription>
      </CardContent>
    </Card>
  );
};
