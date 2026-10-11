import { Button } from "../../components/shadcn-ui/button";
import { CardDescription } from "../../components/shadcn-ui/card";
import { Heading } from "../../components/shadcn-ui/heading";

/* Since most of the pages in each app are going to be similar - I have created a small re-usable header for each page */

type PageHeaderLink = {
  href: string;
  text: string;
  icon?: React.ReactNode;
};
export type PageHeaderProps = {
  title: string;
  description?: string;
  link?: PageHeaderLink;
};
export default function PageHeader({
  title,
  description,
  link,
}: PageHeaderProps) {
  
  return (
    <div className="grid gap-10">
      <div className="grid gap-2">
        <div className="flex items-center">
          <Heading variant="h2">{title}</Heading>
          {link ? (
            <a href={link.href} className="ml-auto">
              <Button className="flex gap-2 hover:cursor-pointer dark:bg-secondary">
                {link.icon ? <span>{link.icon}</span> : null}
                {link.text}
              </Button>
            </a>
          ) : null}
        </div>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </div>
    </div>
  );
}
