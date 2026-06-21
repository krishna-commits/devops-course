import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { PwaInstallPrompt } from "@/components/PwaInstallPrompt";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DevOps World",
    template: "%s | DevOps World",
  },
  description:
    "What broke? Paste an error — get commands, runbooks, and ship-it flows. Install guides for Linux, macOS, and Windows.",
  metadataBase: new URL("https://devops.krishnaneupane.com"),
  openGraph: {
    title: "DevOps World",
    description:
      "Pager-first DevOps reference — commands, runbooks, config templates, and ship-it flows.",
    url: "https://devops.krishnaneupane.com",
    siteName: "DevOps World",
    type: "website",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "DevOps World",
  },
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrains.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <ServiceWorkerRegister />
        <OfflineIndicator />
        {children}
        <PwaInstallPrompt />
      </body>
    </html>
  );
}
