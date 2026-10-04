"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/shadcn-ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
} from "@repo/ui/components/shadcn-ui/card";
import { Heading } from "@repo/ui/components/shadcn-ui/heading";
import ProjectOverview from "./_components/project-overview";
import DevelopmentOverview from "./_components/development-overview";
import TechnologiesOverview from "./_components/technologies-overview";

type OverviewCardContentData = {
  cardTitle: string;
  cardContent: React.ReactNode;
};

export const techCardsContent = [
  {
    cardTitle: "Next.js",
    cardContent: (
      <>
        Next.js is the application framework for every product surface in this
        monorepo — tenant, operations, docs, auth, and hubs.
        <br />
        <br />
        Each app is its own Next.js project - so they can all run independently
        of each other - yet share all of the packages + ui components.
      </>
    ),
  },
  {
    cardTitle: "React",
    cardContent: (
      <>
        The important Spokes-specific choice is a shared component library in{" "}
        <code>@repo/ui</code> (shadcn / Base UI). Tenant, operations, docs, and
        hubs all import from the same package, so layout patterns, headings, and
        composites stay consistent without copying markup between apps.
      </>
    ),
  },
] satisfies OverviewCardContentData[];

export const phaseOneCardContent = [
  {
    cardTitle: "Operations App",
    cardContent: (
      <>
        <ul className="list-disc list-inside">
          <li>Onboard, view and manage Tenants</li>
          <li>Onboard, view and manage Hubs within scope of a Tenant</li>
          <li>
            Onboard, view and manage Assets within scope of a Hub + Tenant
          </li>
          <li>Create kitchen sink for our components</li>
        </ul>
      </>
    ),
  },
  {
    cardTitle: "Auth App",
    cardContent: (
      <>
        <ul className="list-disc list-inside">
          <li>Redirect to each app depending who has logged in</li>
          <li>Forgot password flow</li>
        </ul>
      </>
    ),
  },
  {
    cardTitle: "Tenant App",
    cardContent: (
      <>
        <ul className="list-disc list-inside">
          <li>Login via Auth App</li>
          <li>Onboard, view and manage Hubs within their scope</li>
          <li>View and manage Assets within the scope of their Hubs</li>
        </ul>
      </>
    ),
  },
  {
    cardTitle: "Hubs App",
    cardContent: (
      <>
        <ul className="list-disc list-inside">
          <li>Login via the Auth App</li>
          <li>Onboard, view and manage Assets within their scope</li>
        </ul>
      </>
    ),
  },
  {
    cardTitle: "Documentation",
    cardContent: (
      <>
        <ul className="list-disc list-inside">
          <li>
            Record up to date documentation as the apps develops throughout
            phase 1
          </li>
        </ul>
      </>
    ),
  },
] satisfies OverviewCardContentData[];

export const phaseTwoCardContent = [
  {
    cardTitle: "Operations App",
    cardContent: <></>,
  },
] satisfies OverviewCardContentData[];

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
    <section className="p-10 grid gap-12">
      <div className="grid gap-6">
        <Heading>Welcome to Spokes</Heading>
        <p>
          This documentation portal is a constant work in progress and is
          updated as the project develops.
        </p>
        <ProjectOverview />
        <DevelopmentOverview />
        <TechnologiesOverview />
      </div>
    </section>
  );
}
