import CodeBlock from "@/app/components/CodeBlock";
import InternalLink from "@/app/components/InternalLink";
import { PERFORMANCE_OPTIMIZATION } from "@/app/path";
import Head from "next/head";

const Prefetch = () => {
  const script = `
  {
    "prefetch": [{
      "source": "list",
      "urls": ["${PERFORMANCE_OPTIMIZATION.PREFETCH_AND_PRERENDER.PATH}"]
    }]
  }
  `;
  const code = `
  <script type="speculationrules">${script}</script>
  `;

  return (
    <div>
      <Head>
        <script type="speculationrules">{script}</script>
      </Head>
      <CodeBlock language="xml">{code}</CodeBlock>
      <p>
        <InternalLink
          href={PERFORMANCE_OPTIMIZATION.PREFETCH_AND_PRERENDER.PATH}
        >
          Prefetch 和 Prerender
        </InternalLink>{" "}
        頁面已經被 prefetch
      </p>
    </div>
  );
};

export default Prefetch;
