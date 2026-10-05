import { Kanit } from "next/font/google";
import "./globals.css";
import { cn } from "@repo/ui/lib/utils";
import { AppShell } from "@repo/ui/shared/layouts/appShell";
import type { Metadata } from "next";
import { SidebarProvider } from "@repo/ui/components/shadcn-ui/sidebar";
import DocumentationSidebar from "../components/nav/docs-sidebar";

const kanit = Kanit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spokes Docs",
  description: "Documentation for Spokes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full antialiased", kanit.variable)}
    >
      <body className="min-h-full flex flex-col bg-linear-to-l from-primary to-background">
        <SidebarProvider>
          <DocumentationSidebar />
          <AppShell>{children}</AppShell>
        </SidebarProvider>
      </body>
    </html>
  );
}
