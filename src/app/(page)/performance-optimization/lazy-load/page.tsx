import Alert from "@/app/components/Alert";
import ExternalLink from "@/app/components/ExternalLink";
import InternalLink from "@/app/components/InternalLink";
import { CORE_WEB_VITALS, PERFORMANCE_OPTIMIZATION } from "@/app/path";

const LazyLoad = () => {
  return (
    <div>
      <h1>Lazy load</h1>
      <p>
        延遲載入初始可視區域外的圖片，可以減少初始可視區域中其他重要資源的頻寬被佔用的情形。在網路連線品質不佳的情況下，重新分配頻寬有助於
        LCP candidates 更快地被載入及繪製，改善網頁的{" "}
        <InternalLink href={CORE_WEB_VITALS.LCP.PATH}>
          <code>LCP</code>
        </InternalLink>
        。
      </p>
      <p>
        延遲載入 <code>{"<iframe>"}</code>，可以改善網站載入時的{" "}
        <InternalLink href={CORE_WEB_VITALS.INP.PATH}>
          <code>INP</code>
        </InternalLink>
        。<code>{"<iframe>"}</code> 是包含子資源的完全獨立的 HTML
        文件，雖然可以在獨立的 process 中執行，但它們經常會與其他 thread 共用
        process，這可能會導致網頁對使用者輸入內容的回應速度降低
      </p>
      <section>
        <h3>延遲載入圖片</h3>
        <p>
          <code>{"<img>"}</code> 的{" "}
          <InternalLink
            href={`${PERFORMANCE_OPTIMIZATION.IMAGE.PATH}#lazy-load`}
          >
            <code>loading 屬性</code>
          </InternalLink>{" "}
          會告訴瀏覽器該如何載入圖片
        </p>
        <Alert type="warning">
          <div>不要延遲載入初始可視區域的圖片</div>
          <p>
            延遲載入的圖片必須等待瀏覽器完成 layout
            才能判斷圖片的最終位置是否在可視區域中。這表示如果可視區域中的
            <code>{"<img>"}</code> 元素含有{" "}
            <code>loading=&quot;lazy&quot;</code> 屬性，必須等到所有的 CSS
            都被下載、解析並被套用在頁面上後才會被下載，而不是 preload scanner
            找到時就立即開始
          </p>
        </Alert>
      </section>
      <section>
        <h3>延遲載入 iframe</h3>
        <p>
          <code>{"<iframe>"}</code> 一樣可以透過 loading
          屬性設定瀏覽器該如何載入
        </p>
        <section>
          <h4>Facades</h4>
          <p>
            為了避免在頁面載入時就直接開始載入
            iframe。先顯示一個靜態圖片或是其他 HTML
            元素，並在使用者點擊後替換成實際的 <code>{"<iframe>"}</code>
            嵌入，觸發第三方 <code>{"<iframe>"}</code> 元素的 HTML
            和子資源開始下載。這項技術被稱作為 facade
          </p>
          <InternalLink href={PERFORMANCE_OPTIMIZATION.VIDEO.FACADE_DEMO.PATH}>
            範例
          </InternalLink>
        </section>
      </section>
      <section>
        <h3>JavaScript 的延遲載入 libraries</h3>
        <p>如果需要延遲載入</p>
        <ul>
          <li>
            <code>{"<video>"}</code>
          </li>
          <li>
            <code>{"<video>"}</code> 元素上的 <code>poster</code> 封面圖
          </li>
          <li>
            CSS <code>background-image</code> 載入的圖片
          </li>
        </ul>
        <p>或是其他瀏覽器沒有內建支援延遲載入的元素</p>
        <p>
          可以使用 JavaScript 的延遲載入解決方案 (例如{" "}
          <ExternalLink href="https://github.com/aFarkas/lazysizes">
            Lazysizes
          </ExternalLink>{" "}
          或{" "}
          <ExternalLink href="https://github.com/malchata/yall.js">
            yall.js
          </ExternalLink>
          )
        </p>
      </section>
    </div>
  );
};

export default LazyLoad;
