import "@/app/globals.css";
import Sidebar from "@/app/layout/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "前端效能優化筆記",
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
          </main>
        </div>
      </body>
    </html>
  );
}
