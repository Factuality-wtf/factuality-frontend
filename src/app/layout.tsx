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
          <main className="flex flex-col items-center md:items-start justify-between text-text w-3/4 m-4">
            <div className="flex flex-col text-center md:text-left items-start justify-between gap-y-4">
              {children}
            </div>
          </main>
          <Footer />
        </PaRappaDaWrapper>
      </body>
    </html>
  );
}
