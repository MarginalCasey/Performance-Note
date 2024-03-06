import CodeBlock from "@/app/components/CodeBlock";
import CodeBlockCollapse from "@/app/components/CodeBlockCollapse";
import Lipsum from "@/app/components/Lipsum";
import CLS from "@/app/components/metrics/CLS";

export const getServerSideProps = () => {
  const time = Date.now();
  return { props: { time } };
};

const Image = ({ time }: { time: number }) => {
  const code = `
  <img
    src="/image-640-uncompressed.jpg?time=${time}"
    width={640}
    height={426}
  />
  `;

  return (
    <div>
      <img
        src={`/image-640-uncompressed.jpg?time=${time}`}
        width={640}
        height={426}
      />
      <Lipsum />
      <CodeBlockCollapse>
        <CodeBlock language="xml">{code}</CodeBlock>
      </CodeBlockCollapse>
      <CLS />
    </div>
  );
};

export default Image;
