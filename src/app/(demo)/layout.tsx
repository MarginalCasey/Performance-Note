import "@/app/globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "前端效能優化筆記",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  headers(); // to force dynamic rendering

  return (
    <html lang="en">
      <body className="content demo">{children}</body>
    </html>
  );
}
