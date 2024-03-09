import CodeBlock from "@/app/components/CodeBlock";
import CodeBlockCollapse from "@/app/components/CodeBlockCollapse";
import ImageDetails from "@/app/components/ImageDetails";

const Image = () => {
  const code = `
  <picture>
    <source type="image/avif" srcSet="/image-1280-lossy.avif" />
    <source type="image/avif" srcSet="/image-1280-lossy.webp" />
    <img
      id="image"
      style={{ maxWidth: "100%" }}
      src="/image-1280-lossy.jpg"
    />
  </picture>
  `;

  return (
    <div>
      <picture>
        <source type="image/avif" srcSet="/image-1280-lossy.avif" />
        <source type="image/avif" srcSet="/image-1280-lossy.webp" />
        <img
          id="image"
          style={{ maxWidth: "100%" }}
          src="/image-1280-lossy.jpg"
        />
      </picture>
      <CodeBlockCollapse>
        <CodeBlock language="xml">{code}</CodeBlock>
      </CodeBlockCollapse>
      <ImageDetails id="image" />
    </div>
  );
};

export default Image;
