import type { Metadata } from "next";
import type { ReactNode } from "react";
import AnalyticsGate from "@/components/AnalyticsGate";
import CookieBanner from "@/components/CookieBanner";

type RootLayoutProps = {
  children: ReactNode;
};

// eslint-disable-next-line react-refresh/only-export-components -- Next.js layout exports metadata by convention.
export const metadata: Metadata = {
  metadataBase: new URL("https://www.blinkchart.ai"),
  title: "BlinkChart – Turn Spreadsheets Into Charts Instantly",
  description: "Convert Excel and CSV data into charts in seconds.",
  alternates: {
    canonical: "https://www.blinkchart.ai/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AnalyticsGate />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
