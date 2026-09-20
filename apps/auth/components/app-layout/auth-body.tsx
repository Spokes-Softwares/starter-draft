import Header from "@repo/ui/components/composites-ui/header";
import spokesLogo from "@repo/ui/assets/spokesLogo.png";

export default function AuthBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto my-auto flex flex-col">
      <Header image={spokesLogo.src} />
      {children}
    </div>
  );
}
