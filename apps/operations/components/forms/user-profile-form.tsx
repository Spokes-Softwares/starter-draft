import { CurrentUserProfile } from "@repo/db/queries/user/get-current-user-profile";

export default function UserProfileForm({
  user,
}: {
  user: CurrentUserProfile;
}) {
  return <div> user profile form here</div>;
}
