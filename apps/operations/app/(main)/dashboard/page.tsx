import signOutAction from "@repo/db/actions/sign-out-action";
import SignOutButton from "../../../components/sign-out-button";

export default async function Dashboard() {
  return (
    <div>
      <p>Operations dashboard here</p>
      <SignOutButton handleSignOut={signOutAction} />
    </div>
  );
}
