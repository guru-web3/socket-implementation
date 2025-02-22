import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import NavBar from "./components/templates/NavBar";
import Footer from "./components/templates/Footer";
import { Metadata } from "next";
import Providers from "@/context/RainbowKitProvider";

const siteConfig = {
  title: "Socket Implementation",
  description: "Socket Implementation",
  url: "https://socket-implementation.vercel.app/home",
};

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/favicon.ico",
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#1c1c28] text-white`}
      >
        <link rel="preconnect" href="https://explorer-api.walletconnect.com/" />
        <link rel="preconnect" href="https://eth.merkle.io" />
        <link rel="preconnect" href="https://pulse.walletconnect.org" />
        <link rel="preconnect" href="https://assets.web3auth.io" />

        <Providers>
          <NavBar />
          <div className="min-h-[87vh]">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
