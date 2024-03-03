import CodeBlock from "@/app/components/CodeBlock";
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
      <CodeBlock language="xml" collapse>
        {code}
      </CodeBlock>
      <LCP />
    </div>
  );
};

export default Image;
