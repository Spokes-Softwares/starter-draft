import { redirect } from "next/navigation";

export default function landingPage() {
  return redirect("/login");
}
