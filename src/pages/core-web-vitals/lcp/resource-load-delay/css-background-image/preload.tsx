import CodeBlock from "@/app/components/CodeBlock";
import CodeBlockCollapse from "@/app/components/CodeBlockCollapse";
import LCP from "@/app/components/metrics/LCP";
import Head from "next/head";
import "./style.css";

const Image = () => {
  const html = `
  <head>
    <link
      rel="preload"
      fetchPriority="high"
      as="image"
      href="/image-640-uncompressed.jpg"
      type="image/jpeg"
    />
  </head>
  ...
  <div className="background-image" />
   `;

  const css = `
  .background-image {
    width: 640px;
    height: 426px;
    background-image: url("/image-640-uncompressed.jpg");
  }
  `;

  return (
    <div>
      <Head>
        <link
          rel="preload"
          fetchPriority="high"
          as="image"
          href="/image-640-uncompressed.jpg"
          type="image/jpeg"
        />
      </Head>
      <div className="background-image" />
      <CodeBlockCollapse>
        <CodeBlock language="xml">{html}</CodeBlock>
        <CodeBlock language="css">{css}</CodeBlock>
      </CodeBlockCollapse>
      <LCP />
    </div>
  );
};

export default Image;
