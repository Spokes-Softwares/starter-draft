import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/shadcn-ui/accordion";
import { Heading } from "@repo/ui/components/shadcn-ui/heading";
import {
  OverviewCardContentData,
  PhaseCards,
} from "../../app/(app)/overview/page";

const phaseOneCardContent = [
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

const phaseTwoCardContent = [
  {
    cardTitle: "Hubs Portal",
    cardContent: (
      <>
        <p>
          By the end of phase two, the hubs portal should be working as
          described
        </p>
        <ul className="list-disc list-inside">
          <li>A hub admin should be able to manage hub users</li>
          <li>
            A hub user or admin should be able to carry out singular or bulk
            maintenance on assets
          </li>
        </ul>
      </>
    ),
  },
  {
    cardTitle: "Tenant Portal",
    cardContent: (
      <>
        <ul className="list-disc list-inside">
          <li>
            A tenant shoul be able to view the maintenance records of the assets
            belonging to hubs in their scope
          </li>
        </ul>
      </>
    ),
  },
] satisfies OverviewCardContentData[];

export default function DevelopmentOverview() {
  return (
    <div className="grid gap-4">
      <Heading variant="h4" className="underline">
        Development
      </Heading>
      <p>
        This project has been split up into various phases. This allows us to
        track progress, implement tests in stages and plan future phases as the
        development progresses.
      </p>
      <Accordion>
        <AccordionItem value="phaseOne">
          <AccordionTrigger>Phase One</AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-4">
            <p className="col-span-2">
              This initial phase will be implementing the stack technologies,
              data structure and testing suites. The initial database schema is
              also part of this phase to get the basic data and structure in
              place.
              <br /> <br />
              Phase One end goals:
            </p>
            {phaseOneCardContent.map((item) => (
              <PhaseCards
                key={item.cardTitle}
                cardTitle={item.cardTitle}
                cardContent={item.cardContent}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="phaseTwo">
          <AccordionTrigger>Phase Two</AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-4">
            <p className="col-span-2">
              This phase will introduce the maintenance management of the
              platform. This is potentially the larger phase out of all of them.
              This will mainly take place in the Hubs and Tenant App.
            </p>
            {phaseTwoCardContent.map((item) => (
              <PhaseCards
                key={item.cardTitle}
                cardTitle={item.cardTitle}
                cardContent={item.cardContent}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <p>
        It is currently being developed as a multi-tenant platform where each
        tenant is a "Company". Each company can have "Hubs". These can be a
        branch of a company as an example.
        <br />
      </p>
    </div>
  );
}
