import CodeBlock from "@/app/components/CodeBlock";
import CodeBlockCollapse from "@/app/components/CodeBlockCollapse";
import CLS from "@/app/components/metrics/CLS";
import "./style.css";

const Image = () => {
  const html = `
  <img
    id="responsive-img"
    src="/image-640-uncompressed.jpg?time=${Date.now()}"
  />
  `;

  const css = `
  #responsive-img {
    width: 100%;
    height: auto;
  }  
  `;

  return (
    <div>
      <img
        id="responsive-img"
        src={`/image-640-uncompressed.jpg?time=${Date.now()}`}
      />
      <CodeBlockCollapse>
        <CodeBlock language="xml">{html}</CodeBlock>
        <CodeBlock language="css">{css}</CodeBlock>
      </CodeBlockCollapse>
      <CLS />
    </div>
  );
};

export default Image;
