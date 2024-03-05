import CodeBlock from "@/app/components/CodeBlock";
import CodeBlockCollapse from "@/app/components/CodeBlockCollapse";
import CLS from "@/app/components/metrics/CLS";

const Image = () => {
  const code = `
  <img
    src="/image-640-uncompressed.jpg?time=${Date.now()}"
    width={640}
    height={426}
  />
  `;

  return (
    <div>
      <img
        src={`/image-640-uncompressed.jpg?time=${Date.now()}`}
        width={640}
        height={426}
      />
      <CodeBlockCollapse>
        <CodeBlock language="xml">{code}</CodeBlock>
      </CodeBlockCollapse>
      <CLS />
    </div>
  );
};

export default Image;
