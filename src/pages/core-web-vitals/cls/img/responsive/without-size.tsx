import CodeBlock from "@/app/components/CodeBlock";
import CodeBlockCollapse from "@/app/components/CodeBlockCollapse";
import Lipsum from "@/app/components/Lipsum";
import CLS from "@/app/components/metrics/CLS";
import "../style.css";

export const getServerSideProps = () => {
  const time = Date.now();
  return { props: { time } };
};

const Image = ({ time }: { time: number }) => {
  const html = `
  <img
    id="responsive-img"
    src="/image-640-uncompressed.jpg?time=${time}"
  />
  `;

  const css = `
  #responsive-img {
    width: 100%;
    height: auto;
  }  
  `;

  return (
    <div>
      <img
        id="responsive-img"
        src={`/image-640-uncompressed.jpg?time=${time}`}
      />
      <Lipsum />
      <CodeBlockCollapse>
        <CodeBlock language="xml">{html}</CodeBlock>
        <CodeBlock language="css">{css}</CodeBlock>
      </CodeBlockCollapse>
      <CLS />
    </div>
  );
};

export default Image;
