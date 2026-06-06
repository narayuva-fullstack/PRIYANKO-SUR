import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Plus_Jakarta_Sans, Geist, Geist_Mono, Syne } from "next/font/google";
import { AudioProvider } from "@/context/AudioContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AudioPlayer } from "@/components/AudioPlayer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Priyanko Sur | Visionary Music Director, Composer & Researcher",
  description: "Official digital headquarters of Priyanko Sur, internationally recognized singer, composer, producer, and researcher of Vedic Sanskrit Chants and Nada-Bramh sound frequencies.",
  keywords: ["Priyanko Sur", "Music Director", "Vedic Chants", "Sound Healing", "ISCORCE", "Surya Krishna Production", "Aditya Hridayam"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${cormorant.variable} ${inter.variable} ${jakarta.variable} ${syne.variable} ${geist.variable} ${geistMono.variable} min-h-full flex flex-col bg-luxury-bg text-luxury-primary font-sans antialiased`}>
        <AudioProvider>
          <LanguageProvider>
            <Navbar />
            <main className="flex-grow pt-20">
              {children}
            </main>
            <Footer />
            <AudioPlayer />
          </LanguageProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
