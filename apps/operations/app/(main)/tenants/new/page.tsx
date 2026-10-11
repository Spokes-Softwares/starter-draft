import TenantOnboardForm from "../../../../components/tenant-onboard/tenant-onboard-form";
import PageShell from "@repo/ui/shared/page-layouts/pageShell";
import PageHeader from "@repo/ui/shared/page-layouts/pageHeader";

async function NewTenantPageContent() {
  return <TenantOnboardForm />;
}

export default async function NewTenantPage() {
  return (
    <PageShell>
      <PageHeader
        title="Tenant Onboarding"
        description="Fill in the below form to onboard a new tenant.
        Pass the email and password on to the tenant on completion and testing"
      />

      <NewTenantPageContent />
    </PageShell>
  );
}
