import Alert from "@/app/components/Alert";
import CodeBlock from "@/app/components/CodeBlock";
import ExternalLink from "@/app/components/ExternalLink";
import InternalLink from "@/app/components/InternalLink";
import { CORE_WEB_VITALS, PERFORMANCE_OPTIMIZATION } from "@/app/path";

const Video = () => {
  return (
    <div>
      <h1>影片最佳化</h1>
      <section>
        <h3>影片來源</h3>
        <p>
          使用媒體檔案時，在作業系統中識別的檔案 (<code>.mp4</code>、
          <code>.webm</code> 等) 稱為 container。container 包含一或多個
          stream。在多數情況下，這會是視訊和音訊串流。
        </p>
        <p>
          我們可以使用轉碼器壓縮每個 stream。舉例來說，<code>video.webm</code>{" "}
          可以是 WebM 容器，其中包含使用 VP9 壓縮的影片 stream，以及使用 Vorbis
          壓縮的聲音 stream。
        </p>
        <p>
          如果使用 <code>{"<video>"}</code> 元素取代
          GIF，可以移除音軌來縮減影片檔案的大小
        </p>
      </section>
      <section>
        <h3>多種格式</h3>
        <p>
          使用影片檔案時，可以指定多種格式可以做為備用選項，在不支援所有新格式的瀏覽器中使用
        </p>
        <CodeBlock language="xml">{`
  <video>
    <source src="video.webm" type="video/webm">
    <source src="video.mp4" type="video/mp4">
  </video>
        `}</CodeBlock>
      </section>
      <section>
        <h3>poster 屬性</h3>
        <p>
          使用 <code>{"<video>"}</code> 元素上的{" "}
          <a href="https://developer.mozilla.org/docs/Web/HTML/Element/video#attr-poster">
            <code>poster</code>
          </a>{" "}
          屬性新增影片的封面圖
        </p>
        <CodeBlock language="xml">{`
  <video poster="poster.jpg">
    <source src="video.webm" type="video/webm">
    <source src="video.mp4" type="video/mp4">
  </video>
        `}</CodeBlock>
        <p>
          <code>poster</code> 圖片會被列為{" "}
          <InternalLink href={`${CORE_WEB_VITALS.LCP.PATH}#element`}>
            LCP 的候選名單
          </InternalLink>
        </p>
        <br />
        <p>
          如果 <code>poster</code> 圖片是 LCP 元素，可以使用{" "}
          <code>{'<link rel="preload">'}</code> 和{" "}
          <code>fetchpriority=&quot;high&quot;</code> 提高 <code>poster</code>{" "}
          圖片的優先順序
        </p>
        <CodeBlock language="xml">{`
  <link rel="preload" as="image" href="poster.jpg" fetchpriority="high">
        `}</CodeBlock>
      </section>
      <section>
        <h3>自動播放</h3>
        <p>
          相較於 GIF 動畫，<code>{"<video>"}</code>{" "}
          的檔案通常更小，可以使用自動播放的 <code>{"<video>"}</code> 來取代 GIF
          動畫
        </p>
        <p>
          要自動播放影片，可以在 <code>{"<video>"}</code> 元素上使用{" "}
          <code>autoplay</code> 屬性
        </p>
        <CodeBlock language="xml">{`
  <video autoplay muted loop playsinline>
    <source src="video.webm" type="video/webm">
    <source src="video.mp4" type="video/mp4">
  </video>
        `}</CodeBlock>
        <Alert type="info">
          具有 <code>autoplay</code> 屬性的 <code>{"<video>"}</code>{" "}
          元素會立即下載，即使這些元素位於初始可視區域之外
        </Alert>
        <br />
        <p>
          結合 <code>poster</code> 屬性與 Intersection Observer
          API，可以讓可視範圍外的影片
          <ExternalLink href="https://web.dev/articles/lazy-loading-video#video-gif-replacement">
            延遲載入
          </ExternalLink>
          ，以縮短初始可視範圍中的內容載入時間
        </p>
      </section>
      <section>
        <h3>手動播放</h3>
        <p>
          一般來說，瀏覽器會在 parse HTML 遇到 <code>{"<video>"}</code>{" "}
          時就開始下載
        </p>
        <p>
          使用{" "}
          <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#preload">
            <code>preload</code>
          </ExternalLink>{" "}
          屬性，可以提示瀏覽器在影片被播放前需要被下載的內容，但不具強制性
        </p>
        <ul>
          <li>
            設定 <code>preload=&quot;none&quot;</code>{" "}
            提示瀏覽器不需預先載入影片內容
          </li>
          <li>
            設定 <code>preload=&quot;metadata&quot;</code>{" "}
            提示瀏覽器先拿取影片的 metadata
          </li>
          <li>
            設定 <code>preload=&quot;auto&quot;</code>{" "}
            提示瀏覽器可以下載整個影片
          </li>
        </ul>
      </section>
      <section>
        <h3>嵌入第三方服務影片</h3>
        <p>
          第三方服務可以提供較佳的影片播放品質，但是嵌入式影片播放器所需載入的額外資源可能會對網頁效能產生影響
        </p>
        <p>
          解決這個問題的方法是，先顯示一個靜態圖片或是其他 HTML
          元素，並在使用者點擊後替換成實際的 <code>{"<iframe>"}</code>{" "}
          嵌入，觸發第三方 <code>{"<iframe>"}</code> 元素的 HTML
          和子資源開始下載。這項技術被稱作為{" "}
          <ExternalLink href="https://web.dev/articles/embed-best-practices#use_click-to-load_to_enhance_facades">
            facade
          </ExternalLink>
          <InternalLink href={PERFORMANCE_OPTIMIZATION.VIDEO.FACADE_DEMO.PATH}>
            範例
          </InternalLink>
        </p>
      </section>
    </div>
  );
};

export default Video;
