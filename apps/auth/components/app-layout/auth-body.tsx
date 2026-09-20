import Header from "@repo/ui/components/composites-ui/header";
import spokesLogo from "@repo/ui/assets/spokesLogo.png";
import { Card } from "@repo/ui/components/shadcn-ui/card";

export default function AuthBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto my-auto flex flex-col">
      <Header image={spokesLogo.src} />
      <Card className="w-full max-w-72 grid items-center justify-center">
        {children}
      </Card>
    </div>
  );
}
