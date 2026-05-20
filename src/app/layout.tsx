import type { Metadata } from "next";
import { Libre_Baskerville, Noto_Sans_SC, Poppins } from "next/font/google";
import { listing } from "@/config/listing";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-family",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif-family",
});

const notoSansSc = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cjk-family",
});

export const metadata: Metadata = {
  title: `808-13573 98A Ave, Surrey — ${listing.price} | MLS ${listing.mls}`,
  description: `${listing.beds} bed, ${listing.baths} bath, ${listing.sqft} sq ft corner condo for sale in ${listing.building}.`,
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark h-full antialiased ${poppins.variable} ${libreBaskerville.variable} ${notoSansSc.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
