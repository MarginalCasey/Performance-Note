import CodeBlock from "@/app/components/CodeBlock";
import CodeBlockCollapse from "@/app/components/CodeBlockCollapse";
import ImageDetails from "@/app/components/ImageDetails";

const Image = () => {
  const code = `
  <img
    id="dpr-img"
    src="/image-640-uncompressed.jpg"
    srcSet="/image-640-uncompressed.jpg, /image-1280-uncompressed.jpg 2x, /image-1920-uncompressed.jpg 3x"
  />
  `;

  return (
    <div>
      <img
        id="dpr-img"
        src="/image-640-uncompressed.jpg"
        srcSet="/image-640-uncompressed.jpg, /image-1280-uncompressed.jpg 2x, /image-1920-uncompressed.jpg 3x"
      />
      <CodeBlockCollapse>
        <CodeBlock language="xml">{code}</CodeBlock>
      </CodeBlockCollapse>
      <ImageDetails id="dpr-img" />
    </div>
  );
};

export default Image;
