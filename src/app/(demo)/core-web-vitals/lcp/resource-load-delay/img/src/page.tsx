import CodePreview from "@/app/components/CodePreview";
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
      <CodePreview language="xml" collapse>
        {code}
      </CodePreview>
      <LCP />
    </div>
  );
};

export default Image;
