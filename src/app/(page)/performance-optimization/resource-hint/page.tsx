import Alert from "@/app/components/Alert";
import CodeBlock from "@/app/components/CodeBlock";
import ExternalLink from "@/app/components/ExternalLink";
import InternalLink from "@/app/components/InternalLink";
import { CORE_WEB_VITALS } from "@/app/path";

const ResourceHint = () => {
  return (
    <div>
      <h1>為瀏覽器提供 resource hint</h1>
      <section>
        <h3>preconnect</h3>
        <p>
          預期瀏覽器將會連線至特定的 cross origin 伺服器，在等待 HTML parser 或
          preload scanner 進行作業之前，與拿取重要資源的 origin 與建立連線
        </p>
        <p>
          如果網頁上有大量的 cross origin 資源，使用 <code>preconnect</code>{" "}
          在目前頁面最重要的資源上
        </p>
        <CodeBlock language="xml">
          {`
  <link rel="preconnect" href="https://example.com">  
          `}
        </CodeBlock>
        <br />
        <p>
          <code>preconnect</code> 的一個常見用法是 Google Font，Google Font 建議{" "}
          <code>preconnect</code>
          至提供 <code>@font-face</code> 宣告的{" "}
          <code>https://fonts.googleapis.com</code> 網域，以及提供字型檔案的{" "}
          <code>https://fonts.gstatic.com</code> 網域
        </p>
        <CodeBlock language="xml">
          {`
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          `}
        </CodeBlock>
        <p>
          <code>crossorigin</code> 屬性用於表示是否必須使用{" "}
          <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS">
            Cross-Origin Resource Sharing (CORS)
          </ExternalLink>{" "}
          拿取資源。如果資源的來源使用 CORS (例如字型檔案)，就必須在{" "}
          <code>preconnect</code> 提示中加入 <code>crossorigin</code> 屬性
        </p>
      </section>
      <section>
        <h3>dns-prefetch</h3>
        <p>
          相較於 <code>preconnect</code> 來說成本較低的提示。
          <code>dns-prefetch</code> 不會與 cross origin
          伺服器建立連線，而只會預先對其執行 DNS 查找
        </p>
        <CodeBlock language="xml">
          {`
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
  <link rel="dns-prefetch" href="https://fonts.gstatic.com">
          `}
        </CodeBlock>
        <br />
        <p>
          <ExternalLink href="https://github.com/malchata/dnstradamus">
            dnstradamus
          </ExternalLink>{" "}
          是一個使用 Intersection Observer
          API，在畫面中出現導向其他網站的連結時，將<code>dns-prefetch</code>
          提示插入 HTML 的服務
        </p>
      </section>
      <section id="preload">
        <h3>preload</h3>
        <p>
          <code>preload</code> 指令的用途是對渲染頁面所需的資源發出提前請求
        </p>
        <CodeBlock language="xml">
          {`
  <link rel="preload" href="/lcp-image.jpg" as="image">
          `}
        </CodeBlock>
        <br />
        <p>
          <code>preload</code> 適合被用在 late-discovered 的重要資源上
        </p>
        <ul>
          <li>
            <InternalLink href="TODO">字型</InternalLink>
          </li>
          <li>
            透過 <code>@import</code> 載入的 CSS
          </li>
          <li>
            CSS 中使用 <code>background-image</code> 載入的圖片{" "}
            <InternalLink
              href={
                CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY.CSS_BACKGROUND_IMAGE
                  .PRELOAD.PATH
              }
            >
              範例
            </InternalLink>
          </li>
        </ul>
        <br />
        <CodeBlock language="xml">
          {`
  <link rel="preload" href="/font.woff2" as="font" crossorigin>
          `}
        </CodeBlock>
        <p>
          <code>preload</code> 在拿取 CORS 資源時，同樣需要加上{" "}
          <code>crossorigin</code> 屬性
        </p>
        <br />
        <Alert type="warning">
          <code>preload</code> 指令是非常強大的效能最佳化功能。使用{" "}
          <code>preload</code> 指令下載的資源會以高優先順序下載；如果過度使用，
          <code>preload</code>{" "}
          可能會佔用過多頻寬，進而對網頁載入速度造成負面影響
        </Alert>
      </section>
      <section>
        <h3>
          <InternalLink href="TODO">prefetch</InternalLink>
        </h3>
        <p>
          <code>prefetch</code> 指令的用途是對 future navigations
          可能會用到的資源發出低優先順序的請求
        </p>
        <CodeBlock language="xml">
          {`
  <link rel="prefetch" href="/next-page.css" as="style">
          `}
        </CodeBlock>
        <br />
        <p>
          與 <code>preload</code> 指令不同的是，<code>prefetch</code>{" "}
          基本上具有推測性。如果發現網站上大多數使用者會走過的 user
          flow，那麼針對這些後續的頁面，<code>prefetch</code>{" "}
          渲染頁面所需的關鍵資源有助於縮短載入時間
        </p>
      </section>
      <section id="fetchpriority">
        <h3>Fetch Priority API</h3>
        <p>
          使用 <code>fetchpriority</code> 可以調整 <code>{"<link>"}</code>{" "}
          <code>{"<img>"}</code> <code>{"<script>"}</code> 的載入優先順序
        </p>
        <CodeBlock language="xml">
          {`
  <div class="gallery">
    <div class="poster">
      <img src="img/poster-1.jpg" fetchpriority="high">
    </div>
    <div class="thumbnails">
      <img src="img/thumbnail-2.jpg" fetchpriority="low">
      <img src="img/thumbnail-3.jpg" fetchpriority="low">
      <img src="img/thumbnail-4.jpg" fetchpriority="low">
    </div>
  </div>
          `}
        </CodeBlock>
        <p>
          預設的圖片載入優先順序較低，完成 layout 後，瀏覽器會將 initial
          viewport 中的圖片優先度改為 High。但如果預先就對 LCP 圖片設定
          <code>fetchpriority=high</code>，那圖片就可以更早地被載入完成
        </p>
      </section>
    </div>
  );
};

export default ResourceHint;
