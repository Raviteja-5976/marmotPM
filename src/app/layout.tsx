import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MarmotPM | AI-Powered Project Management",
  description: "Planning your project, generating features, and designing architecture effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans relative overflow-x-hidden">
        {/* Subtle background blob animations */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-6NC4GW21RB" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6NC4GW21RB');
          `}
        </Script>
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-marmot-orange/5 mix-blend-multiply blur-3xl animate-blob opacity-50" />
          <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-200/5 mix-blend-multiply blur-3xl animate-blob animation-delay-2000 opacity-50" />
          <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-marmot-orange/5 mix-blend-multiply blur-3xl animate-blob animation-delay-4000 opacity-50" />
        </div>
        {children}
      </body>
    </html>
  );
}
