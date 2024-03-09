import CodeBlock from "@/app/components/CodeBlock";
import "./style.css";

const Font = () => {
  const html = `
  <span className="uber">Uber</span>
  `;

  const css = `
  @font-face {
    font-family: "UberMove";
    src:
      url("https://d1a3f4spazzrp4.cloudfront.net/dotcom-assets/fonts/UberMove-Regular.woff2")
        format("woff2"),
      url("https://d1a3f4spazzrp4.cloudfront.net/dotcom-assets/fonts/UberMove-Regular.woff")
        format("woff");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  
  .uber {
    font-family: UberMove, UberMoveText, system-ui, "Helvetica Neue", Helvetica,
      Arial, sans-serif;
    font-weight: 400;
    @apply text-xl;
  }
  `;

  return (
    <div>
      <div>
        <span className="uber">Uber</span>
      </div>
      <CodeBlock language="xml">{html}</CodeBlock>
      <CodeBlock language="css">{css}</CodeBlock>
    </div>
  );
};

export default Font;
