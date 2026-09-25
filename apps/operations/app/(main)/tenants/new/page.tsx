import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@repo/ui/components/shadcn-ui/card";
import TenantOnboardForm from "../../../../components/tenant-onboard/tenant-invite-form";
import { Heading } from "@repo/ui/components/shadcn-ui/heading";

export default async function NewTenantPage() {
  return (
    <Card className="max-w-1/2 m-auto">
      <CardHeader>
        <Heading variant="h3">Invite Tenant</Heading>
        <CardDescription>
          Set the credentials for the new tenant
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TenantOnboardForm />
      </CardContent>
    </Card>
  );
}
