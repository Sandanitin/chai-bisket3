import "./../styles/globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import { Toaster } from 'react-hot-toast';

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chai Bisket — an Indian eatery",
  description: "CHAI is an emotion, biryani is for mood.",
  icons: {
    icon: [
      { url: "/images/logo.jpg" },
      { url: "/images/logo.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/images/logo.jpg", sizes: "16x16", type: "image/jpeg" },
    ],
    shortcut: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable} scroll-smooth`}>
      <body className="min-h-screen pointer-events-auto antialiased font-sans bg-[#050302] text-[#f5eddc]">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#120a07',
              color: '#f5eddc',
              border: '1px solid #2d1a11',
              borderRadius: '12px',
              padding: '16px',
            },
            success: {
              iconTheme: {
                primary: '#f0a35c',
                secondary: '#120a07',
              },
            },
          }}
        />
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const preferredRegion = "auto";
