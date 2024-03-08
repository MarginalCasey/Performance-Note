import Alert from "@/app/components/Alert";
import CodeBlock from "@/app/components/CodeBlock";
import InnerLink from "@/app/components/InnerLink";
import { CORE_WEB_VITALS, PERFORMANCE_OPTIMIZATION } from "@/app/path";

const LCP = () => {
  return (
    <div>
      <h1>Largest Contentful Paint (LCP)</h1>
      <section>
        <h3>什麼是 LCP</h3>
        <section>
          <p>
            LCP
            代表的是，使用者首次造訪頁面時，可視區域中最大圖片或文字區塊的渲染時間
          </p>
          <Alert type="info">
            LCP 包含來自上一頁的任何卸載時間、連線設定時間、重新導向時間和 Time
            To First Byte (TTFB)
          </Alert>
        </section>
        <section>
          <h4>怎樣算是一個良好的 LCP 分數</h4>
          <p>
            為了提供良好的使用者體驗，網站應力求 LCP <b>2.5 秒</b>
            以下，評估門檻是網頁載入的<b>第 75 個百分位數</b>
          </p>
          <img
            src="https://web.dev/static/articles/lcp/image/good-lcp-values.svg"
            alt=""
          />
        </section>
        <section>
          <h4>哪些元素會列入考量</h4>
          <ul>
            <li>
              <InnerLink href={CORE_WEB_VITALS.LCP.ELEMENTS.TEXT.PATH}>
                包含文字節點或是其他行內文字元素的區塊元素
              </InnerLink>
            </li>
            <li>
              <InnerLink href={CORE_WEB_VITALS.LCP.ELEMENTS.IMG.PATH}>
                <code>{"<img>"}</code>
              </InnerLink>
            </li>
            <li>
              <InnerLink href={CORE_WEB_VITALS.LCP.ELEMENTS.SVG_IMAGE.PATH}>
                <code>{"<svg>"}</code> 裡面的 <code>{"<image>"}</code>
              </InnerLink>
            </li>
            <li>
              <InnerLink
                href={CORE_WEB_VITALS.LCP.ELEMENTS.BACKGROUND_IMAGE.PATH}
              >
                透過 <code>url()</code> 載入的 background image
              </InnerLink>
            </li>
            <li>
              <InnerLink href={CORE_WEB_VITALS.LCP.ELEMENTS.VIDEO_POSTER.PATH}>
                <code>{"<video>"}</code> 裡面的 <code>{"poster"}</code> 封面圖
              </InnerLink>
            </li>
            <li>
              <InnerLink
                href={CORE_WEB_VITALS.LCP.ELEMENTS.VIDEO_AUTOPLAY_FRAME.PATH}
              >
                自動播放的 <code>{"<video>"}</code> 所繪製的第一個 frame
              </InnerLink>
            </li>
          </ul>
        </section>
        <section>
          <h4>元素的大小如何被決定</h4>
          <p>
            LCP
            回報的元素大小，通常是使用者在可視區域中可看見的大小。如果元素超出可視區域範圍，或是元素遭到裁剪或出現不可見的
            overflow，這些部分就不會計入元素的大小。
          </p>
          <p>
            如果圖片經過縮放，系統回報的大小就會是 <b>可見尺寸</b> 或是{" "}
            <b>原始尺寸</b> 大小
            (以較小者為準)。例如，縮小到比原始尺寸小很多的圖片，只會回報可見尺寸，而放大至較大尺寸的圖片只會回報其原始尺寸。
          </p>
          <p>
            對於文字元素，系統只會考慮文字節點的大小
            (涵蓋所有文字節點的最小矩形)。
          </p>
          <p>所有元素都不會考慮透過 CSS 套用的 margin, padding, border。</p>
        </section>
        <section>
          <h4>何時會回報 LCP</h4>
          <p>
            網頁通常會分階段載入，因此網頁上最大的元素可能會改變。為處理可能的變動，瀏覽器會在瀏覽器繪製第一個
            frame 後，立即 dispatch 一個 type{" "}
            <code>largest-contentful-paint</code> 的{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry"
              target="_blank"
            >
              <code>PerformanceEntry</code>
            </a>{" "}
            來 識別最大內容元素。但在渲染後續的 frame
            時，每當最大內容元素變更，系統就會 dispatch 另一個{" "}
            <code>PerformanceEntry</code>。
          </p>
          <p>
            只有在元素已渲染且對使用者來說可見時，才能被視為最大內容元素。尚未載入的圖片不會被視為已渲染。使用
            web font 的文字節點在{" "}
            <InnerLink href="TODO">font block period</InnerLink>{" "}
            期間也不會被考慮進去。
          </p>
          <p>
            如果目前是最大內容元素的元素從可視區域中被移除 (甚至從 DOM
            中移除)，那麼除非出現更大的元素，否則該元素仍會是最大內容元素。
          </p>
          <p>
            使用者開始與網頁互動後
            (透過輕觸、捲動或按鍵)，瀏覽器就會停止回報，因為使用者互動通常會改變使用者可見的內容
            。
          </p>
        </section>
        <section>
          <h4>如何處理元素版面配置和大小的變動</h4>
          <p>
            變更元素的大小或位置並不會產生新的 LCP
            候選項目。系統只會考量元素的初始大小和可視區域中的位置。這表示一開始在可視區域外但後來被移進可視區域的圖片不會被考慮進去。這也代表一開始在可視區域內但隨後被擠到下方的元素，仍會回報在初始可視區域中的大小。
          </p>
        </section>
        <section>
          <h4>如何測量 LCP</h4>
          <h5>Field tools</h5>
          <ul>
            <li>
              <a href="https://developer.chrome.com/docs/crux/" target="_blank">
                Chrome User Experience Report
              </a>
            </li>
            <li>
              <a href="https://pagespeed.web.dev/" target="_blank">
                PageSpeed Insights
              </a>
            </li>
            <li>
              <a
                href="https://support.google.com/webmasters/answer/9205520"
                target="_blank"
              >
                Search Console (Core Web Vitals report)
              </a>
            </li>
            <li>
              <a
                href="https://github.com/GoogleChrome/web-vitals"
                target="_blank"
              >
                <code>web-vitals</code> JavaScript library
              </a>
            </li>
          </ul>
          <h5>Lab tools</h5>
          <ul>
            <li>
              <a
                href="https://developer.chrome.com/docs/devtools/"
                target="_blank"
              >
                Chrome DevTools
              </a>
            </li>
            <li>
              <a
                href="https://developer.chrome.com/docs/lighthouse/overview/"
                target="_blank"
              >
                Lighthouse
              </a>
            </li>
            <li>
              <a href="https://pagespeed.web.dev/" target="_blank">
                PageSpeed Insights
              </a>
            </li>
            <li>
              <a href="https://webpagetest.org/" target="_blank">
                WebPageTest
              </a>
            </li>
          </ul>
        </section>
      </section>
      <section>
        <h3>優化 LCP</h3>
        <section>
          <h4>拆解 LCP</h4>
          <p>想要優化 LCP 主要可以從兩個地方開始</p>
          <ol>
            <li>一開始的 HTML</li>
            <li>LCP 資源</li>
          </ol>
          <br />
          <p>LCP 總時間可細分為</p>
          <ul>
            <li>
              Time to first byte (TTFB)
              <p>
                從使用者開始載入網頁，到瀏覽器收到 HTML
                文件回應第一個位元組的時間
              </p>
            </li>
            <li>
              Resource load delay
              <p>從 TTFB 到開始載入 LCP 資源之間的延遲</p>
            </li>
            <li>
              Resource load time
              <p>載入 LCP 資源所需的時間</p>
            </li>
            <li>
              Element render delay
              <p>LCP 資源載入完成到 LCP 元素渲染完成之間的延遲</p>
            </li>
          </ul>
          <img
            src="https://web.dev/static/articles/optimize-lcp/image/a-breakdown-lcp-showing-23a709f16b362_960.png"
            alt=""
          />
          <p>
            LCP 資源應儘早開始載入，在資源載入完畢後，應儘快進行 LCP
            元素渲染。大部分 LCP 時間都應花在載入 HTML 文件和 LCP 資源，所以
            Resource load delay 與 Element render delay 應該要盡可能接近零。
          </p>
        </section>
        <section>
          <h4>如何優化各個部分</h4>
          <ol>
            <li>
              移除 Resource load delay
              <p>LCP 資源應與該網頁載入的第一個資源同時開始載入</p>
              <img
                src="https://web.dev/static/articles/optimize-lcp/image/a-network-waterfall-diagr-1ee19fc20ee1f_960.png"
                alt=""
              />
              <p>一般來說，LCP 資源的載入速度取決於兩個因素</p>
              <ol>
                <li>
                  何時找到資源
                  <p>
                    為確保 LCP 資源能盡早開始載入，需要讓瀏覽器的 preload
                    scanner 在 HTML 中找到該資源
                  </p>
                  <ul>
                    <li>
                      正確案例
                      <ul>
                        <li>
                          <InnerLink
                            href={
                              CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY.IMG.SRC
                                .PATH
                            }
                          >
                            LCP 元素是有 <code>src</code> 或 <code>srcset</code>{" "}
                            屬性的 <code>{"<img>"}</code>{" "}
                          </InnerLink>
                        </li>
                        <li>
                          <InnerLink
                            href={
                              CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY
                                .CSS_BACKGROUND_IMAGE.PRELOAD.PATH
                            }
                          >
                            LCP 元素使用 CSS background image，但圖片有透過{" "}
                            <code>{'<link rel="preload">'}</code> 預先載入
                          </InnerLink>
                        </li>
                        <li>
                          LCP 元素是使用 web font 的文字節點，但字型有透過{" "}
                          <code>{'<link rel="preload">'}</code> 預先載入
                        </li>
                      </ul>
                    </li>
                    <li>
                      錯誤案例
                      <ul>
                        <li>
                          <InnerLink
                            href={
                              CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY.IMG
                                .DYNAMIC.PATH
                            }
                          >
                            LCP 元素是透過 JavaScript 動態插入的{" "}
                            <code>{"<img>"}</code>{" "}
                          </InnerLink>
                        </li>
                        <li>
                          <InnerLink
                            href={
                              CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY.IMG.LAZY
                                .PATH
                            }
                          >
                            LCP 元素是透過 JavaScript library 延遲載入，library
                            會隱藏其 <code>src</code> 或 <code>srcset</code>{" "}
                            屬性，使用 <code>data-src</code> 或
                            <code>data-srcset</code> 之類的自訂屬性取代
                          </InnerLink>
                        </li>
                        <li>
                          <InnerLink
                            href={
                              CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY
                                .CSS_BACKGROUND_IMAGE.NO_PRELOAD.PATH
                            }
                          >
                            LCP 元素使用 CSS background image
                          </InnerLink>
                        </li>
                      </ul>
                      <p>
                        在這些情況下，瀏覽器必須執行 script 或套用 CSS，才能找到
                        LCP 資源並開始載入，而這些通常都需要等待網路要求完成。
                      </p>
                    </li>
                  </ul>
                  <section>
                    <p>
                      為避免不必要的資源載入延遲，LCP 資源應該要能從 HTML 找到
                      。如果資源只能從外部 CSS 或 JavaScript 取得，則 LCP
                      資源應以優先順序 high 預先載入。
                    </p>
                    <CodeBlock language="xml">
                      {`
  <!-- Load the stylesheet that will reference the LCP image. -->
  <link rel="stylesheet" href="/path/to/styles.css">

  <!-- Preload the LCP image with a high fetchpriority so it starts loading with the stylesheet. -->
  <link rel="preload" fetchpriority="high" as="image" href="/path/to/hero-image.webp" type="image/webp">
                    `}
                    </CodeBlock>
                  </section>
                </li>
                <li>
                  資源的優先順序
                  <p>
                    即使可以從 HTML 找到 LCP
                    資源，它也有可能無法與第一項資源同時開始載入。如果 preload
                    scanner
                    無法辨識該資源很重要，或是判定其他資源比較重要，就會發生這種情況。
                  </p>
                  <section>
                    <p>
                      如果網頁的 LCP 元素是 <code>{"<img>"}</code>
                      ，建議在元素上設定 <code>{'fetchpriority="high”'}</code>
                      。因為圖片不是 render-blocking
                      的資源，瀏覽器一開始並不會以最高優先順序載入圖片。利用
                      <code>fetchpriority</code>{" "}
                      屬性，可以提醒瀏覽器哪些資源最重要。
                    </p>
                    <CodeBlock language="xml">
                      {`
  <img fetchpriority="high" src="/path/to/hero-image.webp">
                    `}
                    </CodeBlock>
                  </section>
                  <section>
                    <p>
                      同理，對於那些一開始不可見的圖片(例如 carousel
                      中的圖片)，可以設定較低的優先度將頻寬分給優先度更高的資源
                    </p>
                    <CodeBlock language="xml">
                      {`
  <img fetchpriority="low" src="/path/to/carousel-slide-3.webp">
                    `}
                    </CodeBlock>
                  </section>
                </li>
              </ol>
              <p>
                最佳化 LCP 資源優先順序和發現時間後，LCP
                資源應與該網頁載入的第一個資源同時開始載入
              </p>
              <img
                src="https://web.dev/static/articles/optimize-lcp/image/a-network-waterfall-diagr-b6906b9fce22_960.png"
                alt=""
              />
              <br />
            </li>
            <li>
              移除 Element render delay
              <p>
                資源載入完成後，LCP
                元素無法立即渲染的主要原因是渲染在某些情況下被 block 住
              </p>
              <ul>
                <li>
                  <code>{"<head>"}</code> 中的 CSS 或同步 Javascript 仍在載入中
                </li>
                <li>
                  LCP 資源已載入完成，但 LCP 元素尚未被新增至 DOM (正在等待
                  JavaScript 載入)
                </li>
                <li>
                  LCP 元素被某些程式碼隱藏住，例如尚未決定使用者應看到什麼實驗的
                  A/B testing library
                </li>
                <li>
                  由於 long task 導致 main thread 被 block，需等到 long task
                  工作完成後才能開始進行渲染
                </li>
              </ul>
              <section>
                解決方式
                <ul>
                  <li>
                    減少或是內嵌 render-blocking 的 CSS
                    <p>
                      如果 CSS 檔案太大，載入所需時間遠超過 LCP
                      資源，即使資源已載入完畢，LCP 元素仍會無法顯示
                    </p>
                    <img
                      src="https://web.dev/static/articles/optimize-lcp/image/a-network-waterfall-diagr-42b740846d30d_960.png"
                      alt=""
                    />
                    <p>要解決這個問題，可以採用下列其中一種做法</p>
                    <ul>
                      <li>
                        將 CSS 內嵌到 HTML 中，以避免額外的網路要求
                        <ul>
                          <li>只適用於 CSS 檔案很小時</li>
                          <li>inline style 無法被 cache</li>
                        </ul>
                      </li>
                      <li>
                        縮減 CSS 檔案的大小
                        <ul>
                          <li>
                            移除未使用的 CSS：可以使用 Chrome DevTools 中的
                            Coverage 找出未被使用的 CSS
                          </li>
                          <li>
                            延遲不重要的 CSS：將 CSS
                            拆分為初始頁面載入所需的樣式，以及可以延遲載入的樣式
                          </li>
                          <li>
                            Minify 及壓縮
                            CSS：對於重要的樣式，務必盡量縮減傳輸大小
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    延遲載入或是內嵌 render-blocking 的 JavaScript
                    <p>
                      大部分情況下在網頁的 <code>{"<head>"}</code>{" "}
                      中加入同步指令碼都是沒有必要的，而且這種行為幾乎都會對效能造成負面影響。
                    </p>
                    <p>
                      如果 JavaScript
                      必須在網頁載入時盡早執行，那就建議內嵌程式碼，如此一來，便不需等待其他網路要求就能轉譯。不過跟
                      CSS 一樣，只有檔案非常小的 JavaScript 才適合被內嵌。
                    </p>
                  </li>
                  <li>
                    使用 SSR
                    <p>從優化 LCP 的角度來看，使用 SSR 有兩樣優點</p>
                    <ul>
                      <li>可以在 HTML 中找到 LCP 資源</li>
                      <li>
                        不需要等待額外的 JavaScript 載入就能開始渲染網頁內容
                      </li>
                    </ul>
                    <p>
                      SSR
                      的主要缺點是需要額外的伺服器處理時間，這可能會導致較長的
                      TTFB。但取捨過後這通常會是更好的選擇，因為{" "}
                      <b>
                        伺服器的處理時間是可控的，而使用者的網路和裝置功能是不可控的
                      </b>
                      。
                    </p>
                    <p>另一個類似的作法是 SSG。</p>
                  </li>
                  <li>
                    <InnerLink
                      href={PERFORMANCE_OPTIMIZATION.BREAK_UP_LONG_TASKS.PATH}
                    >
                      分解 long tasks
                    </InnerLink>
                    <p>
                      即使 JavaScript 程式碼沒有
                      render-blocking，也不負責渲染元素，仍可能會延遲 LCP。
                    </p>
                    <p>
                      最常見的原因是網頁載入大型 JavaScript
                      檔案時，需要在瀏覽器的 main thread
                      上剖析並執行該檔案。即使 LCP
                      資源已下載完畢，可能仍須等待不相關的指令碼執行完畢之後才能進行渲染。也就是說，任何
                      block main thread 的東西都可能導致不必要的 Element render
                      delay。
                    </p>
                  </li>
                </ul>
              </section>
            </li>
            <li>
              縮短 resource load time
              <ul>
                <li>
                  縮減資源的檔案大小
                  <p>LCP 資源可能是圖片或是網頁字型</p>
                  <ul>
                    <li>
                      <a
                        href="https://developer.chrome.com/docs/lighthouse/performance/uses-responsive-images/"
                        target="_blank"
                      >
                        提供最佳圖片尺寸
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://developer.chrome.com/docs/lighthouse/performance/uses-webp-images/"
                        target="_blank"
                      >
                        使用新型的圖片格式
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://developer.chrome.com/docs/lighthouse/performance/uses-optimized-images/"
                        target="_blank"
                      >
                        壓縮圖片
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://web.dev/articles/reduce-webfont-size"
                        target="_blank"
                      >
                        縮減網頁字型大小
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  減少資源需要移動的距離
                  <p>
                    除了縮減資源大小以外，也可以讓伺服器盡可能靠近使用者，從而縮短載入時間。最佳做法是使用
                    CDN
                  </p>
                  <p>
                    image CDN
                    不但可以減少資源需要移動的距離，還會提供縮減資源大小的優化。
                  </p>
                  <Alert type="info">
                    雖然 image CDN
                    是縮短資源載入時間的好方法，但使用第三方網域代管圖片會產生額外的連線成本。使用
                    preconnect 可以降低部分成本，但最佳做法還是提供與 HTML
                    文件來自 same origin 的圖片。許多 CDN 都支援從網站的 origin
                    proxy requests 到 CDN 的機制。
                  </Alert>
                </li>
                <li>
                  降低網路頻寬的爭用情況
                  <p>
                    即使縮減了資源大小和必須移動的距離，當同時載入許多其他資源時，可能還是需要較長的時間才能載入資源。這就是網路爭用。
                  </p>
                  <p>
                    如果已將 LCP 資源設為 <code>fetchpriority=high</code>{" "}
                    ，且盡快開始載入資源，瀏覽器會盡可能避免優先順序較低的資源與其競爭。但如果同時載入太多具有{" "}
                    <code>fetchpriority=high</code> 的資源，那一樣可能會影響到
                    LCP 資源的載入速度。
                  </p>
                </li>
                <li>
                  完全省去網路時間
                  <p>
                    如要縮短資源載入時間，最好的方法就是完全省去網路時間。使用有效的
                    cache-control policy
                    來提供資源，第二次造訪的使用者就會從快取拿到這些資源，因此資源載入時間幾乎等於零。
                  </p>
                  <p>
                    如果 LCP 資源為 web
                    font，除了縮減大小之外，可以考慮是否有必要在載入字型資源時
                    block rendering。如果將{" "}
                    <InnerLink href="TODO">
                      <code>font-display</code>
                    </InnerLink>{" "}
                    值設為 <code>auto</code> 或 <code>block</code>{" "}
                    以外的任何值，在字型載入期間就一樣會顯示文字內容，LCP
                    就不會被 block 住。
                  </p>
                </li>
              </ul>
            </li>
            <li>
              縮短 TTFB
              <p>
                在後端傳送內容的第一個位元組之前，前端沒有任何能做的事情，縮短
                TTFB 也會改善所有其他的載入指標。
              </p>
              <a href="https://web.dev/articles/optimize-ttfb" target="_blank">
                最佳化 TTFB
              </a>
            </li>
          </ol>
        </section>
      </section>
    </div>
  );
};

export default LCP;
