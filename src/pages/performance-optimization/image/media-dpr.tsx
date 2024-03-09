import CodeBlock from "@/app/components/CodeBlock";
import CodeBlockCollapse from "@/app/components/CodeBlockCollapse";
import ImageDetails from "@/app/components/ImageDetails";

const Image = () => {
  const code = `
  <img
    id="image"
    style={{ maxWidth: "100%" }}
    src="/image-640-uncompressed.jpg"
    srcSet="/image-640-uncompressed.jpg 640w, /image-1280-uncompressed.jpg 1280w, /image-1920-uncompressed.jpg 1920w"
    sizes="(max-width: 540px) 640px, 46rem"
  />
  `;

  return (
    <div>
      <img
        id="image"
        style={{ maxWidth: "100%" }}
        src="/image-640-uncompressed.jpg"
        srcSet="/image-640-uncompressed.jpg 640w, /image-1280-uncompressed.jpg 1280w, /image-1920-uncompressed.jpg 1920w"
        sizes="(max-width: 540px) 640px, 46rem"
      />
      <CodeBlockCollapse>
        <CodeBlock language="xml">{code}</CodeBlock>
      </CodeBlockCollapse>
      <ImageDetails id="image" />
    </div>
  );
};

export default Image;
