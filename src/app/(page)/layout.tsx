import TableOfContent from "@/app/components/TableOfContent";
import "@/app/globals.css";
import Common from "@/app/layout/Common";
import Sidebar from "@/app/layout/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "前端效能優化筆記",
  description: "Frontend performance optimization notes with test examples",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <Sidebar />
          <main className="main">
            <article className="content">{children}</article>
            <TableOfContent />
          </main>
        </div>
        <Common />
      </body>
    </html>
  );
}
