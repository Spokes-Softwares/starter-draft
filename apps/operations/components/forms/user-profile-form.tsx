import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@node_modules/@repo/ui/src/components/shadcn-ui/card";
import { Heading } from "@node_modules/@repo/ui/src/components/shadcn-ui/heading";
import { Input } from "@node_modules/@repo/ui/src/components/shadcn-ui/input";
import { Label } from "@node_modules/@repo/ui/src/components/shadcn-ui/label";
import { ShieldCheckIcon } from "lucide-react";
import { CurrentUserProfile } from "@repo/db/queries/user/get-current-user-profile";
import { useForm } from "@node_modules/react-hook-form/dist";

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
    formState: { errors },
  } = useForm<UserProfileFormValues>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      newPassword: "",
      confirmPassword: "",
    },
  });

  return (
    <form className="grid gap-10">
      <PersonalInformation user={user} />
      <ChangePassword />
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

const PersonalInformation = ({ user }: { user: CurrentUserProfile }) => {
  return (
    <Card>
      <CardHeader>
        <Heading variant="h4">Personal information</Heading>
        <CardDescription>
          Update your first and last name you use to sign in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-6">
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="first-name">First name</Label>
            <Input
              id="first-name"
              type="text"
              placeholder={`${user.firstName}`}
              required
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input
              id="last-name"
              type="text"
              placeholder={`${user.lastName}`}
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ChangePassword = () => {
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
            <Label htmlFor="first-name">New password</Label>
            <Input
              id="new-password"
              type="text"
              placeholder="New password"
              required
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label htmlFor="confirm-password">Confirm new password</Label>
            <Input
              id="confirm-password"
              type="text"
              placeholder="Confirm new password"
              required
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
