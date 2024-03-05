import CodeBlock from "@/app/components/CodeBlock";
import CodeBlockCollapse from "@/app/components/CodeBlockCollapse";
import ImageDetails from "@/app/components/ImageDetails";
import CLS from "@/app/components/metrics/CLS";
import "./style.css";

const Image = () => {
  const html = `
  <img
    id="responsive-img"
    src="/image-640-uncompressed.jpg?time=${Date.now()}"
    srcSet="/image-640-uncompressed.jpg?time=${Date.now()}, /image-1280-uncompressed.jpg?time=${Date.now()} 2x, /image-1920-uncompressed.jpg?time=${Date.now()} 3x"
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
        srcSet={`/image-640-uncompressed.jpg?time=${Date.now()}, /image-1280-uncompressed.jpg?time=${Date.now()} 2x, /image-1920-uncompressed.jpg?time=${Date.now()} 3x`}
      />
      <ImageDetails id="responsive-img" />
      <CodeBlockCollapse>
        <CodeBlock language="xml">{html}</CodeBlock>
        <CodeBlock language="css">{css}</CodeBlock>
      </CodeBlockCollapse>
      <CLS />
    </div>
  );
};

export default Image;
