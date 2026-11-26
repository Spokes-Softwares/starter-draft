"use client";

import {
  Card,
  CardContent,
  CardHeader,
} from "@repo/ui/components/shadcn-ui/card";
import PageHeader from "@repo/ui/shared/page-layouts/pageHeader";
import PageShell from "@repo/ui/shared/page-layouts/pageShell";
import { Heading } from "@repo/ui/components/shadcn-ui/heading";
import ProjectOverview from "../../../components/overview/project-overview";
import DevelopmentOverview from "../../../components/overview/development-overview";
import TechnologiesOverview from "../../../components/overview/technologies-overview";

export type OverviewCardContentData = {
  cardTitle: string;
  cardContent: React.ReactNode;
};

export function PhaseCards({
  cardTitle,
  cardContent,
}: OverviewCardContentData) {
  return (
    <Card className={`${cardTitle === "Operations App" ? "col-span-2" : ""}`}>
      <CardHeader>
        <Heading variant="h4">{cardTitle}</Heading>
      </CardHeader>
      <CardContent>{cardContent}</CardContent>
    </Card>
  );
}

export default function OverviewPage() {
  return (
    <PageShell>
      <PageHeader
        title="Welcome to Spokes"
        description="  This documentation portal is a constant work in progress and is updated
        as the project develops."
      />

      <ProjectOverview />
      <DevelopmentOverview />
      <TechnologiesOverview />
    </PageShell>
  );
}
