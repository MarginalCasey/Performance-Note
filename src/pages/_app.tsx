import "@/app/globals.css";
import Common from "@/app/layout/Common";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Common />
    </>
  );
}
