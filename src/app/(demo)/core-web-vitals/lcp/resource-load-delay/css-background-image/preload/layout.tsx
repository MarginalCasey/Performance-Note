export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <link
          rel="preload"
          fetchPriority="high"
          as="image"
          href="/image-640-uncompressed.jpg"
          type="image/jpeg"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
