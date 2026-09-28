import Header from "@repo/ui/components/composites-ui/header";
import spokesLogo from "@repo/ui/assets/spokesLogo.png";
import { Card } from "@repo/ui/components/shadcn-ui/card";

export default function AuthBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center px-4">
      <Header image={spokesLogo.src} />
      <Card className="w-full max-w-96 grid items-center">
        {children}
      </Card>
    </div>
  );
}
