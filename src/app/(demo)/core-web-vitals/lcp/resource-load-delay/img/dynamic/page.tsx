import CodeBlock from "@/app/components/CodeBlock";
import CodeBlockCollapse from "@/app/components/CodeBlockCollapse";
import LCP from "@/app/components/metrics/LCP";
import Script from "next/script";

const Image = () => {
  const script = `document.getElementById('dynamic').innerHTML = '<img src="/image-640-uncompressed.jpg?time=${Date.now()}"} />'`;
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
