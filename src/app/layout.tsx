import './globals.css';
import { Suspense } from 'react';
import { metadata, viewport } from './metadata';
import { monaSans } from './fonts';
import { NavBar } from '@/components/layouts/NavBar';
import PaRappaDaWrapper from '@/components/layouts/PaRappaDaWrapper';
import Footer from '@/components/layouts/Footer';
import AnalyticsRoot from '@/components/AnalyticsRoot';

export { metadata, viewport };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${monaSans.variable} antialiased min-h-screen overflow-hidden`}>
        <PaRappaDaWrapper>
          <Suspense fallback={null}>
            <AnalyticsRoot />
          </Suspense>
          <NavBar />
          <main className="flex flex-col items-start justify-between w-full px-4 md:w-3/4 md:m-4">
            <div className="flex flex-col text-center md:text-left items-start justify-between gap-y-4 w-full md:w-full">
              {children}
            </div>
          </main>
          <Footer />
        </PaRappaDaWrapper>
      </body>
    </html>
  );
}
