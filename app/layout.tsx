import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Header from "@/components/menu_header_footer/Header";
import Footer from "@/components/menu_header_footer/Footer";
import ReactQueryProvider from "./lib/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s - SITS Information Technology School",
    default: "SITS Information Technology School",
  },
  description: "Welcome to SITS — the leading Information Technology School in Siem Reap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Kantumruy+Pro&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />
        <link href="/assets/lib/animate/animate.min.css" rel="stylesheet" />
        <link href="/assets/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />

      </head>
      <body className={inter.className} style={{ background: "#f0f4f8 " }}>
        <ReactQueryProvider>
          <Header />

          {children}

          <Footer />
        </ReactQueryProvider>

      </body>
      <Script src="https://code.jquery.com/jquery-3.4.1.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js" />
      <Script src="/assets/lib/wow/wow.min.js" />
      <Script src="/assets/lib/easing/easing.min.js" />
      <Script src="/assets/lib/waypoints/waypoints.min.js" />
      <Script src="/assets/lib/owlcarousel/owl.carousel.min.js" />
      <Script src="/assets/js/main.js" />

    </html>
  );
}
