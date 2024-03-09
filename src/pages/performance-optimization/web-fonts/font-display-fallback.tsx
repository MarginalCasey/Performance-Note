import CodeBlock from "@/app/components/CodeBlock";
import Lipsum from "@/app/components/Lipsum";
import Head from "next/head";
import "./style.css";

const Font = () => {
  const html = `
  <head>
    <link
      href="https://fonts.googleapis.com/css2?family=Madimi+One&display=fallback"
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
          href="https://fonts.googleapis.com/css2?family=Madimi+One&display=fallback"
          rel="stylesheet"
        />
      </Head>
      <Lipsum className="madimi-one-regular" />
      <CodeBlock language="xml">{html}</CodeBlock>
      <CodeBlock language="css">{css}</CodeBlock>
    </div>
  );
};

export default Font;
