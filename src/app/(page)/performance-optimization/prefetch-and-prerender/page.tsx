import Alert from "@/app/components/Alert";
import CodeBlock from "@/app/components/CodeBlock";
import ExternalLink from "@/app/components/ExternalLink";
import InternalLink from "@/app/components/InternalLink";
import { PERFORMANCE_OPTIMIZATION } from "@/app/path";

const PrefetchAndPrerender = () => {
  return (
    <div>
      <h1>Prefetch 和 Prerender</h1>
      <section id="prefetch">
        <h3>Prefetch 近期所需的低優先度資源</h3>
        <p>
          使用 <code>{'<link rel="prefetch">'}</code>{" "}
          提示可以預先拿取資源，包括圖片、CSS 或 JavaScript。prefetch
          提示會告知瀏覽器不久之後可能需要資源，瀏覽器可根據網路品質、系統層級偏好設定或其他因素決定是否以最低優先度為該項資源發出要求。
        </p>
        <p>
          Prefetch
          可以改善使用者體驗，因為使用者不需要等待所需資源下載，而是在需要時立即從
          disk cache 中拿取資源。
        </p>
        <CodeBlock language="xml">{`
  <link rel="prefetch" as="script" href="/date-picker.js">
  <link rel="prefetch" as="style" href="/date-picker.css">
        `}</CodeBlock>
        <p>
          <ExternalLink href="https://caniuse.com/link-rel-prefetch">
            除了 Safari 以外，所有新式瀏覽器都支援 <code>prefetch</code>
          </ExternalLink>
        </p>
      </section>
      <section>
        <h3>Prefetch 網頁以加快之後瀏覽的速度</h3>
        <p>
          可以對 HTML 文件指定 <code>as=&quot;document&quot;</code> 屬性，藉此
          prefetch 網頁及其所有子資源
          <InternalLink
            href={
              PERFORMANCE_OPTIMIZATION.PREFETCH_AND_PRERENDER
                .PREFETCH_DOCUMENT_DEMO.PATH
            }
          >
            範例
          </InternalLink>
        </p>
        <CodeBlock language="xml">{`
  <link rel="prefetch" href="/page" as="document">
        `}</CodeBlock>
        <Alert type="info">
          <div>
            一般建議避免使用 <code>{'<link rel="prefetch">'}</code> prefetch
            cross origin 的 document。目前有{" "}
            <ExternalLink href="https://github.com/whatwg/html/issues/6723">
              未解決的 issue
            </ExternalLink>{" "}
            會導致重複的 request。
          </div>
          <div>
            另外，也應該避免 prefetch 包含個人化內容的
            document。這類資源通常不會快取，因此最後很可能只是浪費頻寬。
          </div>
        </Alert>
        <section>
          <p>
            實驗性質的{" "}
            <ExternalLink href="https://developer.chrome.com/blog/prerender-pages/?hl=zh-tw#the-speculation-rules-api">
              Speculation Rules API
            </ExternalLink>
            ，可以透過 JSON 物件來定義需要預先 prefetch 的 document
            <InternalLink
              href={
                PERFORMANCE_OPTIMIZATION.PREFETCH_AND_PRERENDER
                  .SPECULATION_RULES_API_PREFETCH_DOCUMENT_DEMO.PATH
              }
            >
              範例
            </InternalLink>
          </p>
          <CodeBlock language="xml">{`
  <script type="speculationrules">
  {
    "prefetch": [{
      "source": "list",
      "urls": ["/page-a", "/page-b"]
    }]
  }
  </script>
        `}</CodeBlock>
          <Alert type="info">
            <code>{'<link rel="prefetch">'}</code> prefetch 資源並將其儲存在{" "}
            <code>HTTP cache</code> 中，而透過 speculation rules 進行的 prefetch
            的資源則是儲存在 <code>memory cache</code> 中，可以更快地被取用。
          </Alert>
        </section>
        <section>
          <ExternalLink href="https://github.com/GoogleChromeLabs/quicklink/">
            Quicklink
          </ExternalLink>{" "}
          是一個在網頁連結出現在可視區域後，可以對頁面進行 prefetch 或是
          prerender 的 library
        </section>
      </section>
      <section>
        <h3>Prerender 頁面</h3>
        <p>
          除了 prefetch 資源以外，也可提示瀏覽器在使用者造訪頁面前先行 prerender
          頁面，這麼做可以提供近乎即時的頁面載入，因為系統會在背景拿取及處理頁面及其資源。使用者前往該頁面後，頁面就會置於前景。
        </p>
        <p>
          Speculation Rules API 支援 prerender
          <InternalLink
            href={
              PERFORMANCE_OPTIMIZATION.PREFETCH_AND_PRERENDER
                .SPECULATION_RULES_API_PRERENDER_DEMO.PATH
            }
          >
            範例
          </InternalLink>
        </p>
        <CodeBlock language="xml">{`
  <script type="speculationrules">
  {
    "prerender": [
      {
        "source": "list",
        "urls": ["/page-a", "page-b"]
      }
    ]
  }
  </script>
        `}</CodeBlock>
        <Alert type="info">
          完整的 prerender 也會在要 prerender 的頁面上執行 JavaScript。由於
          JavaScript 可以是相當龐大且運算成本高的資源類型，建議謹慎使用
          prerender，且只有在非常確定使用者打算前往頁面時才會使用。
        </Alert>
      </section>
      <section>
        <h3>Service worker precaching</h3>
        <p>
          Service worker 像是一個 proxy server，允許修改 request 跟
          response，將其替換成 cache 儲存的內容。Service worker 使用{" "}
          <code>Cache</code> API 拿取和儲存資源，讓瀏覽器無須通過 network
          便可透過 <code>Cache</code> API 獲取資源。
        </p>
        <p>
          Service worker precaching 使用非常有效的 Service Worker 快取策略，稱為{" "}
          <ExternalLink href="https://developer.chrome.com/docs/workbox/caching-strategies-overview/#cache-only">
            cache-only strategy
          </ExternalLink>
          。這種模式非常有效率，因為資源放到 Service worker
          快取中後，就能在要求時幾乎立即拿取。
        </p>
        <img
          src="https://web.dev/static/learn/performance/prefetching-prerendering-precaching/image/fig-1_960.png"
          alt=""
        />
        <p>
          cache-only strategy 只會在 Service worker
          安裝期間，從網路拿取符合條件的資源。安裝之後，系統只會從 Service
          Worker 快取中拿取快取資源。
        </p>
        <br />
        <p>
          Service worker 目前
          <ExternalLink href="https://caniuse.com/serviceworkers">
            被所有新式瀏覽器支援
          </ExternalLink>
        </p>
        <Alert type="info">
          Service worker 使用的 Cache 介面和 HTTP cache 並不一致。Cache 介面是由
          JavaScript 控制的 high-level 快取，而 HTTP cache 則是由 Cache-Control
          header 控制的 low-level 快取。
        </Alert>
        <br />
        <p>
          Google 推出的{" "}
          <ExternalLink href="https://developer.chrome.com/docs/workbox">
            Workbox
          </ExternalLink>{" "}
          服務可以簡單地實作出大部分的 Service worker 功能
        </p>
      </section>
    </div>
  );
};

export default PrefetchAndPrerender;
