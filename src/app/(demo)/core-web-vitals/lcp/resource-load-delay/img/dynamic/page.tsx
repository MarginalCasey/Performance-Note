import CodeBlock from "@/app/components/CodeBlock";
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
      <CodeBlock language="xml" collapse>
        {code}
      </CodeBlock>
      <LCP />
    </div>
  );
};

export default Image;
