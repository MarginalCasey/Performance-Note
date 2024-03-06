import type { Metadata } from "next";
import { Head, Html, Main, NextScript } from "next/document";

export const metadata: Metadata = {
  title: "前端效能優化筆記",
};

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="content demo">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
