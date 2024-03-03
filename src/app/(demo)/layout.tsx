import type { Metadata } from "next";
import { headers } from "next/headers";
import "../globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  headers(); // to force dynamic rendering

  return (
    <html lang="en">
      <body className="content">{children}</body>
    </html>
  );
}
