import CodeBlock from "@/app/components/CodeBlock";
import CodeBlockCollapse from "@/app/components/CodeBlockCollapse";
import LCP from "@/app/components/metrics/LCP";

export const getServerSideProps = () => {
  const time = Date.now();
  return { props: { time } };
};

const Image = ({ time }: { time: number }) => {
  const code = `
  <img
    src="/image-640-uncompressed.jpg?time=${time}"
  />
   `;

  return (
    <div>
      <img src={`/image-640-uncompressed.jpg?time=${time}`} />
      <CodeBlockCollapse>
        <CodeBlock language="xml">{code}</CodeBlock>
      </CodeBlockCollapse>
      <LCP />
    </div>
  );
};

export default Image;
