import CodeBlock from "@/app/components/CodeBlock";
import CodeBlockCollapse from "@/app/components/CodeBlockCollapse";
import Lipsum from "@/app/components/Lipsum";
import CLS from "@/app/components/metrics/CLS";
import Head from "next/head";
import "./style.css";

const Font = () => {
  const html = `
  <head>
    <link
      href="https://fonts.googleapis.com/css2?family=Madimi+One&display=swap"
      rel="stylesheet"
    />
  </head>
  `;

  const css = `
  .madimi-one-regular {
    font-family: "Madimi One", serif;
    font-weight: 400;
    font-style: normal;
  } 
  `;

  return (
    <div>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Madimi+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Lipsum className="madimi-one-regular" />
      <div>content using default font</div>
      <CodeBlockCollapse>
        <CodeBlock language="xml">{html}</CodeBlock>
        <CodeBlock language="css">{css}</CodeBlock>
      </CodeBlockCollapse>
      <CLS />
    </div>
  );
};

export default Font;
