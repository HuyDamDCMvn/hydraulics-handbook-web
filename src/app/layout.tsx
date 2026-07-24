import type { Metadata } from "next";
import { Libre_Baskerville, Source_Sans_3, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import "./globals.css";
import "katex/dist/katex.min.css";

const display = Libre_Baskerville({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
});

const sans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Hydraulics Formula Handbook",
    template: "%s · Hydraulics Formula Handbook",
  },
  description:
    "Academic technical reference: 24 chapters, governing equations, SI worked examples. / Tài liệu học thuật: 24 chương, phương trình chi phối, ví dụ SI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}
      >
        <LocaleProvider>
          <SiteHeader />
          <main className="min-h-[70vh]">{children}</main>
          <SiteFooter />
        </LocaleProvider>
      </body>
    </html>
  );
}
