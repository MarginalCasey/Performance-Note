import CodeBlock from "@/app/components/CodeBlock";
import { PERFORMANCE_OPTIMIZATION } from "@/app/path";
import Head from "next/head";

const Prefetch = () => {
  const code = `
  <link
    rel="prefetch"
    href="${PERFORMANCE_OPTIMIZATION.PREFETCH_AND_PRERENDER.PATH}"
    as="document"
  />
  `;

  return (
    <div>
      <Head>
        <link
          rel="prefetch"
          href={PERFORMANCE_OPTIMIZATION.PREFETCH_AND_PRERENDER.PATH}
          as="document"
        />
      </Head>
      <CodeBlock language="xml">{code}</CodeBlock>
      點擊左側導覽列的「Prefetch 和 Prerender」，可以看到網頁已經被 prefetch
    </div>
  );
};

export default Prefetch;
