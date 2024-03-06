import CodeBlock from "@/app/components/CodeBlock";
import CodeBlockCollapse from "@/app/components/CodeBlockCollapse";
import LCP from "@/app/components/metrics/LCP";
import Script from "next/script";

export const getServerSideProps = () => {
  const time = Date.now();
  return { props: { time } };
};

const Image = ({ time }: { time: number }) => {
  const script = `document.getElementById('dynamic').innerHTML = '<img src="/image-640-uncompressed.jpg?time=${time}"} />'`;
  const code = `
  <div id="dynamic" />
  <script>
    ${script}
  </script>
  `;

  return (
    <div>
      <div id="dynamic" />
      <Script id="script">{script}</Script>
      <CodeBlockCollapse>
        <CodeBlock language="xml">{code}</CodeBlock>
      </CodeBlockCollapse>
      <LCP />
    </div>
  );
};

export default Image;
