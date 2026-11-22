import { AssetDetails } from "@repo/db/queries/get-actions/types";
import {
  Card,
  CardContent,
  CardHeader,
} from "@repo/ui/components/shadcn-ui/card";
import { Heading } from "@repo/ui/components/shadcn-ui/heading/heading";

type SingleAssetDetails = {
  createdAt: string;
  serviceStatus: string;
  referenceTag: string;
  assetType: string;
};

export default function AssetOverviewSection({
  createdAt,
  serviceStatus,
  referenceTag,
  assetType,
}: SingleAssetDetails) {
  return (
    <section className="grid grid-cols-3 gap-6">
      <Card className="col-span-2 border">
        <CardHeader>
          <Heading variant="h3">Maintenance Information</Heading>
        </CardHeader>
        <CardContent>
          Maintenance information will go here as a list
        </CardContent>
      </Card>

      <Card className="col-span-1 border">
        <CardHeader>
          <Heading variant="h3">Details</Heading>
        </CardHeader>
        <CardContent>
          Asset information will go here and be editable for people to change
          information of the asset
        </CardContent>
      </Card>
    </section>
  );
}
