import getCurrentUserProfile from "@repo/db/queries/user/get-current-user-profile";
import UserProfileForm from "../../../components/forms/user-profile-form";
import PageHeader from "@node_modules/@repo/ui/src/shared/page-layouts/pageHeader";
import PageShell from "@node_modules/@repo/ui/src/shared/page-layouts/pageShell";

export default async function UserProfilePage() {
  const user = await getCurrentUserProfile();
  return (
    <PageShell>
      <PageHeader
        title="Profile settings"
        description="Manage your personal details and keep your account secure."
      />
      <UserProfileForm user={user} />
    </PageShell>
  );
}
