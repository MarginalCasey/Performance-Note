import CodeBlock from "@/app/components/CodeBlock";
import CodeBlockCollapse from "@/app/components/CodeBlockCollapse";
import ImageDetails from "@/app/components/ImageDetails";
import CLS from "@/app/components/metrics/CLS";
import "./style.css";

const Image = () => {
  const html = `
  <picture>
    <source
      media="(max-width: 639px)"
      srcSet="/image-640-cropped-uncompressed.jpg?time=${Date.now()}"
    />
    <source
      media="(min-width: 640px)"
      srcSet="/image-640-uncompressed.jpg?time=${Date.now()}"
    />
    <img
      id="responsive-img"
      src="/image-640-uncompressed.jpg?time=${Date.now()}"
    />
  </picture>
  `;

  const css = `
  #responsive-img {
    width: 100%;
    height: auto;
  }  
  `;

  return (
    <div>
      <picture>
        <source
          media="(max-width: 639px)"
          srcSet={`/image-640-cropped-uncompressed.jpg?time=${Date.now()}`}
        />
        <source
          media="(min-width: 640px)"
          srcSet={`/image-640-uncompressed.jpg?time=${Date.now()}`}
        />
        <img
          id="responsive-img"
          src={`/image-640-uncompressed.jpg?time=${Date.now()}`}
        />
      </picture>
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
