import CodePreview from "@/app/components/CodePreview";
import LCP from "@/app/components/metrics/LCP";
import Script from "next/script";

const Image = () => {
  const script = `document.getElementById('dynamic').innerHTML = '<img src="/image-640-uncompressed.jpg?v=2&time=${Date.now()}"} />'`;
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
      <CodePreview language="xml" collapse>
        {code}
      </CodePreview>
      <LCP />
    </div>
  );
};

export default Image;
