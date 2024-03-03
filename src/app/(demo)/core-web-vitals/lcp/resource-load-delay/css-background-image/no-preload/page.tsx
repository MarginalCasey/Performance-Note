import CodeBlock from "@/app/components/CodeBlock";
import CodeBlockCollapse from "@/app/components/CodeBlockCollapse";
import LCP from "@/app/components/metrics/LCP";
import "./style.css";

const Image = () => {
  const html = `
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
