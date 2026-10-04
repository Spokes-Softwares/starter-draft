import { Heading } from "@repo/ui/components/shadcn-ui/heading";
import { PhaseCards, techCardsContent } from "../page";

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
