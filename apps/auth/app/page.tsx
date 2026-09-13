import { redirect } from "next/navigation";

export default function landingPage() {
  return redirect("/auth/login");
}
