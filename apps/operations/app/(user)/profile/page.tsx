import getCurrentUserProfile from "@repo/db/queries/user/get-current-user-profile";
import { createSupabaseServerClient } from "@repo/db/server";
import UserProfileForm from "../../../components/forms/user-profile-form";
import {
  Card,
  CardContent,
  CardHeader,
} from "@repo/ui/components/shadcn-ui/card";
import { Heading } from "@repo/ui/components/shadcn-ui/heading";

export default async function UserProfilePage() {
  const supabase = await createSupabaseServerClient();
  const user = await getCurrentUserProfile(supabase);
  return (
    <Card className="max-w-200 ml-6 mt-6">
      <CardHeader>
        <Heading variant="h2">Profile</Heading>
      </CardHeader>
      <CardContent>
        <UserProfileForm user={user} />
      </CardContent>
    </Card>
  );
}
