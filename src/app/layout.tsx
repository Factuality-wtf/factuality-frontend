import "./globals.css";
import { metadata, viewport } from "./metadata";
import { monaSans } from "./fonts";
import { NavBar } from "@/components/layouts/NavBar";
import PaRappaDaWrapper from "@/components/layouts/PaRappaDaWrapper";
import Footer from "@/components/layouts/Footer";

export { metadata, viewport };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${monaSans.variable} antialiased min-h-screen overflow-hidden`}
      >
        <PaRappaDaWrapper>
          <NavBar />
          {children}
          <Footer />
        </PaRappaDaWrapper>
      </body>
    </html>
  );
}
