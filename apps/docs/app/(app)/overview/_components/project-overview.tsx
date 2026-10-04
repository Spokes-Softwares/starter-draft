import { Heading } from "@repo/ui/components/shadcn-ui/heading";

export default function ProjectOverview(){
    return (
        <div className="grid gap-4">
        <Heading variant="h4" className="underline">What is Spokes?</Heading>
        <p>
          Spokes is a piece of software which will hopefully fill a gap in the
          market for companies with a large amounts of assets which have
          ongoing maintenance requirements.
          <br />
          <br />
          Put simply - A company should be able to view the state of all their
          assets in one place, order parts and check at what stage of
          maintenance their assets are in, whether they are in service, out of
          service etc. Initially this app is being created for use in the
          cycling industry, however, should be able to adapt to various asset
          types.
          <br />
          <br />
          Maintenance - It's big and complex. There are a lot of factors to
          consider. Ideally the end result would be:
        </p>
          <ul className="list-disc list-inside">
            <li>
              Different "states" of service. Out of service, Awaiting parts
              etc
            </li>
            <li>Reminders if an Asset has been in a "state" for too long</li>
            <li>Quick and easy servicing methods</li>
            <li>Ordering/sourcing parts (Potential 3rd party needed here)</li>
            <li>Email reports - Invoices/Costs/Reports</li>
            <li>Download reports</li>
          </ul>
        </div>
    )
}