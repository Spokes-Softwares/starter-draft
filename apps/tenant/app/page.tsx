import { redirect } from "next/navigation";

export default function tenantLandingPage(){
  return(
    redirect('/dashboard')
  )
}