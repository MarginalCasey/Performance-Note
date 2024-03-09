import CodeBlock from "@/app/components/CodeBlock";
import Head from "next/head";

const Font = () => {
  const code = `
  <head>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?display=block&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
    />
  </head>
  ...
  <span className="material-symbols-outlined">star</span>
  `;

  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?display=block&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </Head>
      <div>
        <span className="material-symbols-outlined">star</span>
      </div>
      <CodeBlock language="xml">{code}</CodeBlock>
    </div>
  );
};

export default Font;
