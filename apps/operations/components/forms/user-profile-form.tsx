import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@node_modules/@repo/ui/src/components/shadcn-ui/card";
import { Heading } from "@node_modules/@repo/ui/src/components/shadcn-ui/heading";
import { Input } from "@node_modules/@repo/ui/src/components/shadcn-ui/input";
import { Label } from "@node_modules/@repo/ui/src/components/shadcn-ui/label";
import { CurrentUserProfile } from "@repo/db/queries/user/get-current-user-profile";

export default function UserProfileForm({
  user,
}: {
  user: CurrentUserProfile;
}) {
  return (
    <Card className="bg-sidebar">
      <CardHeader>
        <Heading variant="h4">Personal information</Heading>
        <CardDescription>
          Update your first and last name you use to sign in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
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
        </form>
      </CardContent>
    </Card>
  );
}
