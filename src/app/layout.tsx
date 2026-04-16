import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | SmartDrop",
    default: "SmartDrop — Global Dropshipping Store",
  },
  description:
    "Shop thousands of products shipped worldwide. Fast US/EU shipping available.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
