import { Heading } from "@repo/ui/components/shadcn-ui/heading";
import { OverviewCardContentData, PhaseCards } from "../../app/(app)/overview/page";
import { CardTitle } from "@repo/ui/components/shadcn-ui/card";

const techCardsContent = [
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
    cardTitle: "Supabase",
    cardContent: (
      <>
        The back end is being controlled by the Supabase
        <code>SDK: @supabase/supabase-js</code> a Postgres database platform.
        Locally it is run via docker - and uses migration .sql files to provide
        the schema.
      </>
    ),
  },
  {
    cardTitle: "Vitest",
    cardContent: (
      <>
        As part of our testing suite - Vitest will play a vital role in
        Integration and Unit testing. For integration testing, we make calls to the DB and verify
        the data returning is accurate using Vitest. 

        Unit testing is slightly more complex as it involves mocking the Supabase functions.
        This is an ongoing spike in itself. 
      </>
    ),
  },
] satisfies OverviewCardContentData[];

export default function TechnologiesOverview() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Heading variant="h4" className="underline col-span-3">
        Technologies
      </Heading>
      {techCardsContent.map((item) => (
        <PhaseCards
          key={item.cardTitle}
          cardContent={item.cardContent}
          cardTitle={item.cardTitle}
        />
      ))}
    </div>
  );
}
