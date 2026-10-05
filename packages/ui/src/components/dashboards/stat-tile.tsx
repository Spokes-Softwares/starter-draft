import { Card, CardContent, CardHeader } from "../shadcn-ui/card";
import { Heading } from "../shadcn-ui/heading";

export type StatTileProps = {
  title: string;
  data: string | number | undefined;
};

export default function StatTile({ title, data }: StatTileProps) {

  return (
    <Card>
      <CardHeader>
        <Heading variant="h4">{title}</Heading>
      </CardHeader>
      <CardContent>{data}</CardContent>
    </Card>
  );
}
