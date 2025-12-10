import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Helvetica Neue - Primary font for regular and semi-bold content
const helveticaNeue = localFont({
  src: [
    {
      path: "../../public/helvetica-neue-5/HelveticaNeueThin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/helvetica-neue-5/HelveticaNeueUltraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/helvetica-neue-5/HelveticaNeueLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/helvetica-neue-5/HelveticaNeueRoman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/helvetica-neue-5/HelveticaNeueMedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/helvetica-neue-5/HelveticaNeueMedium.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-helvetica",
  display: "swap",
  preload: true,
});

// Almarai - For bold content (700+ weight)
const almarai = localFont({
  src: [
    {
      path: "../../public/almarai-webfont/Almarai-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/almarai-webfont/Almarai-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/almarai-webfont/Almarai-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/almarai-webfont/Almarai-ExtraBold.woff",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-almarai",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "MedTech Compliance SaaS",
  description: "AI-powered compliance assistant for medical device startups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${helveticaNeue.variable} ${almarai.variable} font-sans antialiased bg-paleAqua text-forestGreen`}
      >
        {children}
      </body>
    </html>
  );
}
