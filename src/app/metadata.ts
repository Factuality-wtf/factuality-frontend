import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "factuality.wtf — The Facts No One Asked For",
  description:
    "Get smacked in the brain with random facts you didn't ask for but can't unlearn. factuality.wtf — where the weird is real.",
  keywords: [
    "random facts",
    "useless knowledge",
    "trivia",
    "interesting facts",
    "factuality",
  ],
  authors: [{ name: "factuality.wtf", url: "https://factuality.wtf" }],
  creator: "factuality.wtf",
  metadataBase: new URL("https://factuality.wtf"),
  openGraph: {
    title: "factuality.wtf — The Facts No One Asked For",
    description: "Bite-sized facts you didn't need but now can't stop reading.",
    url: "https://factuality.wtf",
    siteName: "factuality.wtf",
    images: [
      {
        url: "./icons/default-image.png",
        width: 1200,
        height: 630,
        alt: "factuality.wtf Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "factuality.wtf — The Facts No One Asked For",
    description: "Weird. Real. Shareable. Get your daily brain itch scratched.",
    images: ["./icons/default-image.png"],
    creator: "@factualitywtf",
  },
  icons: {
    icon: "./icons/favicon-32x32.png",
    apple: "./icons/apple-touch-icon.png",
    shortcut: "./favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#eb6f92",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
