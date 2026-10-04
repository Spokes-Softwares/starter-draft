import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@repo/ui/components/shadcn-ui/accordion";
import { Heading } from "@repo/ui/components/shadcn-ui/heading";
import { PhaseCards, phaseOneCardContent, phaseTwoCardContent } from "../page";

export default function DevelopmentOverview(){
    return (
        <div className="grid gap-4">
        <Heading variant="h4" className="underline">
          Development
        </Heading>
        <p>
          This project has been split up into various phases. This allows us
          to track progress, implement tests in stages and plan future phases
          as the development progresses.
        </p>
        <Accordion>
          <AccordionItem value="phaseOne">
            <AccordionTrigger>Phase One</AccordionTrigger>
            <AccordionContent className="grid grid-cols-2 gap-4">
              <p className="col-span-2">
                This initial phase will be implementing the stack
                technologies, data structure and testing suites. The initial
                database schema is also part of this phase to get the basic
                data and structure in place.
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
                platform. This is potentially the larger phase out of all of
                them. This will mainly take place in the Hubs and Tenant App.
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
          It is currently being developed as a multi-tenant platform where
          each tenant is a "Company". Each company can have 'Hubs". These can
          be a branch of a company as an example.
          <br />
        </p>
      </div>
    )
}