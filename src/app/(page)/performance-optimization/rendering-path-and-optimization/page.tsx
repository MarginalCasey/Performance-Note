import Alert from "@/app/components/Alert";
import ExternalLink from "@/app/components/ExternalLink";
import InternalLink from "@/app/components/InternalLink";
import { PERFORMANCE_OPTIMIZATION } from "@/app/path";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "關鍵渲染路徑與資源載入最佳化",
    description: "了解關鍵路徑 | 資源載入最佳化",
  };
};

const RenderingPathAndOptimization = () => {
  return (
    <div>
      <h1>關鍵渲染路徑與資源載入最佳化</h1>
      <section>
        <h3 id="understanding-the-critical-path">了解關鍵路徑</h3>
        <p>
          關鍵渲染路徑 (critical rendering path)
          為瀏覽器執行初次渲染之前所採取的步驟順序
        </p>
        <section>
          <h4 id="the_critical_rendering_path">關鍵渲染路徑</h4>
          <p>渲染路徑包含</p>
          <div className="flex items-stretch">
            <ol className="flex flex-col justify-between">
              <li>從 HTML 建構 DOM</li>
              <li>從 CSS 建構 CSSOM</li>
              <li>套用會修改 DOM 或 CSSOM 的 JavaScript</li>
              <li>從 DOM 和 CSSOM 建構 render tree</li>
              <li>在頁面上執行 style 和 layout</li>
              <li>Paint 每個 pixel 到 memory 中</li>
              <li>Composite 重疊的 pixel</li>
              <li>繪製所有產生的像素到螢幕上</li>
            </ol>
            <img
              className="ml-2"
              src="https://web.dev/static/learn/performance/understanding-the-critical-path/image/fig-1-v2.svg"
              alt=""
            />
          </div>
          <p>
            渲染流程會在初次渲染時執行，並且會在後續資源載入後重新執行
            (也可能只執行部分)，以更新使用者看到的內容
          </p>
        </section>
        <section>
          <h4 id="what_resources_are_on_the_critical_rendering_path">
            關鍵渲染路徑上有哪些資源
          </h4>
          <p>
            瀏覽器需要等待一些重要資源下載完成後，才能完成初次渲染。這些資源包括
          </p>
          <ul>
            <li>HTML 的一部分</li>
            <li>{"<head>"} 中 Render-blocking 的 CSS</li>
            <li>{"<head>"} 中 Render-blocking 的 JavaScript</li>
          </ul>
          <br />
          <p>初次渲染不會等待</p>
          <ul>
            <li>全部的 HTML</li>
            <li>字型</li>
            <li>圖片</li>
            <li>{"<head>"} 外的 Non-render-blocking 的 JavaScript</li>
            <li>
              {"<head>"} 外的 Non-render-blocking 的 CSS，或是{" "}
              <code>media</code> 設定與目前的 viewport 不符的 CSS
            </li>
          </ul>
        </section>
        <section>
          <h4 id="render-blocking_resources">Render-Blocking 的資源</h4>
          <p>
            CSS 預設為 render-blocking，瀏覽器在發現 CSS 時會暫停渲染直到 CSS
            被下載及處理完畢，但暫停渲染並不會影響瀏覽器繼續 parse HTML
          </p>
          <p>
            新的{" "}
            <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#blocking">
              blocking=render
            </ExternalLink>{" "}
            屬性，可以將 <code>link</code> <code>script</code>{" "}
            <code>style</code> 標示為 rendering-blocking，並允許瀏覽器在
            render-blocking 時繼續 parse HTML
          </p>
        </section>
        <section>
          <h4 id="parser-blocking_resources">Parser-Blocking 的資源</h4>
          <p>
            JavaScript 預設為 parser-blocking，瀏覽器在發現 JavaScript 時會暫停
            parse HTML 直到 JavaScript 被下載及執行完畢，並且 parser-blocking
            同時也代表著 render-blocking
          </p>
          <Alert type="info">
            parser-blocking 的 {"<script>"} 必須等 render-blocking 的 css 被
            parse 完之後才可以執行
          </Alert>
          <p>
            瀏覽器會在主要的 HTML parser 被 block 時，透過另一個次要的 HTML
            parser，
            <ExternalLink href="https://web.dev/articles/preload-scanner">
              preload scanner
            </ExternalLink>{" "}
            去預先下載其他資源
          </p>
        </section>
        <section>
          <h3 id="optimize-resource-loading">資源載入最佳化</h3>
          <section>
            <h4 id="preload_scanner">Preload scanner</h4>
            <p>
              如果要利用 preload scanner，伺服器傳送的 HTML
              應包含重要資源。preload scanner 無法處理
            </p>
            <ul>
              <li>
                CSS 中使用 <code>background-image</code> 載入的圖片
              </li>
              <li>
                透過 JavaScript 動態 inject 的 <code>{"<script>"}</code>{" "}
                或是使用{" "}
                <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import">
                  import()
                </ExternalLink>{" "}
                動態載入的模組
              </li>
              <li>client side rendering 的 HTML</li>
              <li>
                CSS 的 <code>@import</code> 宣告
              </li>
            </ul>
            <p>
              這些做法都會導致資源被延遲載入，在無法避免的情況下，可以使用{" "}
              <InternalLink
                href={`${PERFORMANCE_OPTIMIZATION.RESOURCE_HINT.PATH}#preload`}
              >
                preload
              </InternalLink>{" "}
              來避免延遲
            </p>
          </section>
          <section>
            <h4 id="css">CSS</h4>
            <ul>
              <li>Minification</li>
              <li>
                移除未使用的 CSS{" "}
                <p>
                  可以透過 Chrome Devtools 裡的{" "}
                  <ExternalLink href="https://developer.chrome.com/docs/devtools/css/reference/#coverage">
                    Coverage tool
                  </ExternalLink>{" "}
                  找出未被使用到的 CSS
                </p>
              </li>
              <li>
                避免使用 <code>@import</code> 宣告
                <ul>
                  <li>
                    大多數情況下，可以使用{" "}
                    <code>{'<link rel="stylesheet">'}</code> 元素取代{" "}
                    <code>@import</code>
                  </li>
                  <li>
                    如果無法取代 <code>@import</code>，還是可以使用{" "}
                    <InternalLink
                      href={`${PERFORMANCE_OPTIMIZATION.RESOURCE_HINT.PATH}#preload`}
                    >
                      preload
                    </InternalLink>{" "}
                    來降低延遲
                  </li>
                </ul>
              </li>
              <li>
                Inline critical CSS
                <ul>
                  <li>critical CSS 是指初次 render 時 viewport 內的內容</li>
                  <li>inline 在 HTML 中的 CSS 有著無法被長時間 cache 的缺點</li>
                </ul>
              </li>
            </ul>
          </section>
          <section>
            <h4 id="javascript">JavaScript</h4>
            <ul>
              <li>
                async 與 defer
                <img
                  src="https://web.dev/static/learn/performance/optimize-resource-loading/image/fig-2.svg"
                  alt=""
                />
                <ul>
                  <li>
                    async
                    <p>下載完後立即 parse 與執行</p>
                  </li>
                  <li>
                    defer{" "}
                    <ul>
                      <li>
                        HTML parse 完之後，在 <code>DOMContentLoaded</code>{" "}
                        event 前執行
                      </li>
                      <li>同樣需要等待 CSS 被載入</li>
                      <li>依序執行</li>
                    </ul>
                  </li>
                </ul>
                <Alert type="info">
                  <div id="defer">
                    <code>type=&quot;module&quot;</code> 的 script 預設為{" "}
                    <code>defer</code> ，動態 inject 的 script 預設為{" "}
                    <code>async</code>
                  </div>
                </Alert>
              </li>
              <li>
                Client-side rendering
                <p>應避免使用在重要內容及 LCP 元素上</p>
              </li>
              <li>
                Minification
                <ul>
                  <li>
                    Minify
                    <p>移除</p>
                    <ul>
                      <li>空格</li>
                      <li>註解</li>
                      <li>分號</li>
                    </ul>
                  </li>
                  <li>
                    Uglify
                    <ul>
                      <li>替換變數名稱為簡短的字元</li>
                      <li>打亂程式邏輯</li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </section>
        </section>
      </section>
    </div>
  );
};

export default RenderingPathAndOptimization;
