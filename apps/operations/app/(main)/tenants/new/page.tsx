import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@repo/ui/components/shadcn-ui/card";
import TenantOnboardForm from "../../../../components/tenant-onboard/tenant-onboard-form";
import { Heading } from "@repo/ui/components/shadcn-ui/heading";

export default async function NewTenantPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">

    <Card>
      <CardHeader>
        <Heading variant="h3">Invite Tenant</Heading>
        <CardDescription>
          Set the credentials for the new tenant. Take note of the password as
          you will not be able to see it again!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TenantOnboardForm />
      </CardContent>
    </Card>
    </div>
  );
}
