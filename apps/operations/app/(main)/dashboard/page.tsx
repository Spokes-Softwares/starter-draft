import signOutAction from "@repo/db/actions/sign-out-action";
import SignOutButton from "../../../components/auth/sign-out-button";

export default async function OperationsDashboard() {
  return (
    <div>
      <SignOutButton handleSignOut={signOutAction} />
    </div>
  );
}
