import { Button } from "@repo/ui/components/shadcn-ui/button";
import { Heading } from "@repo/ui/components/shadcn-ui/heading";
import { Bot } from "lucide-react";
import DataTable from "@repo/ui/components/data-table/table";
import { columns } from "./_components/data-table/columns";
import { ExampleData } from "./_components/data-table/data";

export default function KitchenSinkPage() {
  return (
    <div className="grid gap-20 ml-20 mb-60">
      <div>
        This is where our kitchen sink can live! Throw them components in there
        :D
      </div>
      <section className="flex gap-6">
        <div className="grid gap-2 border w-fit p-6">
          <p>White Headings</p>
          <Heading variant="h1">Heading one</Heading>
          <Heading variant="h2">Heading two</Heading>
          <Heading variant="h3">Heading three</Heading>
          <Heading variant="h4">Heading four</Heading>
          <Heading variant="h5">Heading five</Heading>
        </div>
        <div className="grid gap-2 border w-fit p-6 text-primary">
          <p>Primary Headings</p>
          <Heading variant="h1" className="text-primary">
            Heading one
          </Heading>
          <Heading variant="h2" className="text-primary">
            Heading two
          </Heading>
          <Heading variant="h3" className="text-primary">
            Heading three
          </Heading>
          <Heading variant="h4" className="text-primary">
            Heading four
          </Heading>
          <Heading variant="h5" className="text-primary">
            Heading five
          </Heading>
        </div>
        <div className="grid gap-2 border w-fit p-6 text-destructive">
          <p>Destructive Headings</p>
          <Heading variant="h1" className="text-destructive">
            Heading one
          </Heading>
          <Heading variant="h2" className="text-destructive">
            Heading two
          </Heading>
          <Heading variant="h3" className="text-destructive">
            Heading three
          </Heading>
          <Heading variant="h4" className="text-destructive">
            Heading four
          </Heading>
          <Heading variant="h5" className="text-destructive">
            Heading five
          </Heading>
        </div>
        <div className="grid gap-2 border w-fit p-6 text-muted-foreground">
          <p>Muted Foreground Headings</p>
          <Heading variant="h1" className="text-muted-foreground">
            Heading one
          </Heading>
          <Heading variant="h2" className="text-muted-foreground">
            Heading two
          </Heading>
          <Heading variant="h3" className="text-muted-foreground">
            Heading three
          </Heading>
          <Heading variant="h4" className="text-muted-foreground">
            Heading four
          </Heading>
          <Heading variant="h5" className="text-muted-foreground">
            Heading five
          </Heading>
        </div>
      </section>
      <section className="flex gap-6">
        <div className="grid gap-2 border w-fit p-6">
          <p>White text</p>
          <p className="text-2xl">Text 2xl</p>
          <p className="text-xl">Text xl</p>
          <p className="text-lg">Text lg</p>
          <p>Text base</p>
          <p className="text-sm">Text sm</p>
          <p className="text-xs">Text xs</p>
        </div>
        <div className="grid gap-2 border w-fit p-6 text-primary">
          <p>Primary text</p>
          <p className="text-2xl">Text 2xl</p>
          <p className="text-xl">Text xl</p>
          <p className="text-lg">Text lg</p>
          <p>Text base</p>
          <p className="text-sm">Text sm</p>
          <p className="text-xs">Text xs</p>
        </div>
        <div className="grid gap-2 border w-fit p-6 text-destructive">
          <p>Destructive text</p>
          <p className="text-2xl">Text 2xl</p>
          <p className="text-xl">Text xl</p>
          <p className="text-lg">Text lg</p>
          <p>Text base</p>
          <p className="text-sm">Text sm</p>
          <p className="text-xs">Text xs</p>
        </div>
        <div className="grid gap-2 border w-fit p-6 text-muted-foreground">
          <p>Muted Foreground text</p>
          <p className="text-2xl">Text 2xl</p>
          <p className="text-xl">Text xl</p>
          <p className="text-lg">Text lg</p>
          <p>Text base</p>
          <p className="text-sm">Text sm</p>
          <p className="text-xs">Text xs</p>
        </div>
      </section>
      <section className="flex gap-6">
        <div className="grid gap-2 border w-fit p-6">
          <p>xs Variants</p>
          <Button size="xs">Default Button</Button>
          <Button variant="destructive" size="xs">
            Destructive Button
          </Button>
          <Button variant="ghost" size="xs">
            Ghost Button
          </Button>
          <Button variant="link" size="xs">
            Link Button
          </Button>
          <Button variant="outline" size="xs">
            Outline Button
          </Button>
          <Button variant="secondary" size="xs">
            Secondary Button
          </Button>
        </div>
        <div className="grid gap-2 border w-fit p-6">
          <p>sm variants</p>
          <Button size="sm">Default Button</Button>
          <Button variant="destructive" size="sm">
            Destructive Button
          </Button>
          <Button variant="ghost" size="sm">
            Ghost Button
          </Button>
          <Button variant="link" size="sm">
            Link Button
          </Button>
          <Button variant="outline" size="sm">
            Outline Button
          </Button>
          <Button variant="secondary" size="sm">
            Secondary Button
          </Button>
        </div>
        <div className="grid gap-2 border w-fit p-6">
          <p>default variants</p>
          <Button>Default Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="link">Link Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="secondary">Secondary Button</Button>
        </div>
        <div className="grid gap-2 border w-fit p-6">
          <p>lg variants</p>
          <Button size="sm">Default Button</Button>
          <Button variant="destructive" size="lg">
            Destructive Button
          </Button>
          <Button variant="ghost" size="lg">
            Ghost Button
          </Button>
          <Button variant="link" size="lg">
            Link Button
          </Button>
          <Button variant="outline" size="lg">
            Outline Button
          </Button>
          <Button variant="secondary" size="lg">
            Secondary Button
          </Button>
        </div>
        <div className="grid gap-2 border w-fit p-6">
          <p>icon variants</p>
          <Button size="icon">
            <Bot />
          </Button>
          <Button variant="destructive" size="icon">
            <Bot />
          </Button>
          <Button variant="ghost" size="icon">
            <Bot />
          </Button>
          <Button variant="link" size="icon">
            <Bot />
          </Button>
          <Button variant="outline" size="icon">
            <Bot />
          </Button>
          <Button variant="secondary" size="icon">
            <Bot />
          </Button>
        </div>
        <div className="grid gap-2 border w-fit p-6">
          <p>text + icon variants</p>
          <Button>
            Bot icon <Bot />
          </Button>
          <Button variant="destructive">
            Bot icon
            <Bot />
          </Button>
          <Button variant="ghost">
            Bot icon <Bot />
          </Button>
          <Button variant="link">
            Bot icon <Bot />
          </Button>
          <Button variant="outline">
            Bot icon <Bot />
          </Button>
          <Button variant="secondary">
            Bot icon <Bot />
          </Button>
        </div>
      </section>
      <section>
        <DataTable
          columns={columns}
          data={ExampleData}
          filter={{
            columnId: "companyName",
            placeholder: "Filter companies...",
          }}
          getRowHref={(row) => `/tenants/${row.id}`}
          getRowAriaLabel={(row) => `View ${row.companyName}`}
        />
      </section>
    </div>
  );
}
