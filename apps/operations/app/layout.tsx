import { Kanit } from "next/font/google";
import "./globals.css";
import { cn } from "@repo/ui/lib/utils";
import { AppShell } from "@repo/ui/shared/layouts/appShell";
import { Metadata } from "next/dist/types";
import { SidebarProvider } from "@repo/ui/components/shadcn-ui/sidebar";
import { OperationsSidebar } from "../components/nav/operations-sidebar";
import getCurrentUserProfile from "@repo/db/queries/user/get-current-user-profile";

const kanit = Kanit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spokes Tenant Portal",
  description: "Tenant-facing portal for Spokes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUserProfile();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full antialiased", kanit.variable)}
    >
      <body className="min-h-full flex flex-col bg-linear-to-l from-primary to-background">
        <SidebarProvider>
          <OperationsSidebar user={user} />
          <AppShell>{children}</AppShell>
        </SidebarProvider>
      </body>
    </html>
  );
}
