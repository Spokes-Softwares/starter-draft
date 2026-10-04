import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/ui/components/shadcn-ui/alert";
import { InfoIcon } from "lucide-react";

type ErrorHandlingProps = {
  errorTitle?: string;
  errorDescription?: string;
};

export function ErrorHandling({
  errorTitle,
  errorDescription,
}: ErrorHandlingProps) {
  return (
    <Alert
      variant="destructive"
      className="bg-destructive/10 border-destructive/20"
    >
      <InfoIcon />
      {errorTitle ? <AlertTitle>{errorTitle}</AlertTitle> : null}
      {errorDescription ? (
        <AlertDescription>{errorDescription}</AlertDescription>
      ) : null}
    </Alert>
  );
}
