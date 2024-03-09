import CodeBlock from "@/app/components/CodeBlock";
import CodeBlockCollapse from "@/app/components/CodeBlockCollapse";
import Lispsum from "@/app/components/Lipsum";

const Image = () => {
  const code = `
  <img
    src="/image-640-uncompressed.jpg"
    loading="lazy"
    width={640}
    height={426}
  />
  `;

  return (
    <div>
      <Lispsum />
      <Lispsum />
      <Lispsum />
      <img
        src="/image-640-uncompressed.jpg"
        loading="lazy"
        width={640}
        height={426}
      />
      <CodeBlockCollapse>
        <CodeBlock language="xml">{code}</CodeBlock>
      </CodeBlockCollapse>
    </div>
  );
};

export default Image;
