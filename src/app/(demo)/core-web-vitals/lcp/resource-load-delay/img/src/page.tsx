import CodeBlock from "@/app/components/CodeBlock";
import CodeBlockCollapse from "@/app/components/CodeBlockCollapse";
import LCP from "@/app/components/metrics/LCP";

const Image = () => {
  const code = `
  <img
    src="/image-640-uncompressed.jpg?time=${Date.now()}"
  />
   `;

  return (
    <div>
      <img src={`/image-640-uncompressed.jpg?time=${Date.now()}`} />
      <CodeBlockCollapse>
        <CodeBlock language="xml">{code}</CodeBlock>
      </CodeBlockCollapse>
      <LCP />
    </div>
  );
};

export default Image;
