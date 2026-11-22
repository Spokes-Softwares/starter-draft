import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@repo/ui/lib/utils";
import { AppShell } from "@repo/ui/shared/layouts/appShell";
import { SidebarProvider } from "@repo/ui/components/shadcn-ui/sidebar";
import { HubsSidebar } from "./components/nav/hubs-sidebar";
import getCurrentUserProfile from "@repo/db/queries/user/get-current-user-profile";
import { createSupabaseServerClient } from "@repo/db/server";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spokes Hubs Portal",
  description: "Hubs-facing portal for Spokes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createSupabaseServerClient();
  const user = await getCurrentUserProfile(supabase);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col bg-linear-to-l from-primary to-background">
        <SidebarProvider>
          <HubsSidebar user={user} />
          <AppShell>{children}</AppShell>
        </SidebarProvider>
      </body>
    </html>
  );
}
