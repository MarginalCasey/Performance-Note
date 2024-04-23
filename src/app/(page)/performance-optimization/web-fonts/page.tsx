import Alert from "@/app/components/Alert";
import CodeBlock from "@/app/components/CodeBlock";
import ExternalLink from "@/app/components/ExternalLink";
import InternalLink from "@/app/components/InternalLink";
import { PERFORMANCE_OPTIMIZATION } from "@/app/path";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Web fonts 最佳化",
    description: "發現 | 下載 | 渲染",
  };
};

const WebFonts = () => {
  return (
    <div>
      <h1>Web fonts 最佳化</h1>
      <section>
        <h3 id="discovery">發現</h3>
        <p>
          我們在 CSS 中使用 <code>@font-face</code> 來定義 web font
        </p>
        <CodeBlock language="css">{`
  @font-face {
    font-family: "Open Sans";
    src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2");
  }
        `}</CodeBlock>
        <p>但是實際上，瀏覽器會在確認字型有被使用到之後才會去下載它</p>
        <CodeBlock language="css">{`
  h1 {
    font-family: "Open Sans";
  }
        `}</CodeBlock>
        <p>
          所以瀏覽器會等到 render-blocking 的 CSS 都下載完成，建構 CSSOM 並與
          DOM tree 結合建構出 render tree，再去判斷需要下載那些字型
        </p>
        <img
          src="https://web.dev/static/articles/optimize-webfont-loading/image/font-critical-rendering_960.png"
          alt=""
        />
        <section>
          <h4 id="inline_font-face_declarations">Inline @font-face</h4>
          <p>
            在 <code>{"<head>"}</code> 使用 <code>{"<style>"}</code> 去 inline{" "}
            <code>@font-face</code> 可以讓瀏覽器更早發現字型
          </p>
          <CodeBlock language="xml">{`
  <head>
    <style>
      @font-face {
        font-family: "Open Sans";
        src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2");
      }
  
      body {
        font-family: "Open Sans";
      }
    </style>
  </head>
        `}</CodeBlock>
          <p>
            但因為瀏覽器一樣必須等所有 render-blocking
            的資源都被載入完成，建構完 render tree
            之後才會開始下載字型。所以除非其他 non-critical 的 CSS 都是透過
            non-render blocking 方式下載，不然一樣都得等其他 CSS 先下載完成
          </p>
        </section>
        <section>
          <h4 id="preload">preload</h4>
          <p>
            使用{" "}
            <InternalLink
              href={`${PERFORMANCE_OPTIMIZATION.RESOURCE_HINT.PATH}#preload`}
            >
              <code>preload</code>
            </InternalLink>
            ，可以提早對網頁字型資源發出請求
          </p>
          <CodeBlock language="xml">{`
  <link rel="preload" as="font" href="/fonts/OpenSans-Regular-webfont.woff2" crossorigin>
        `}</CodeBlock>
          <Alert type="info">
            web fonts 是 CORS 資源，在 preload 字型時必須指定{" "}
            <code>crossorigin</code> 屬性
            <ExternalLink href="https://www.w3.org/TR/css-fonts-3/#font-fetching-requirements">
              https://www.w3.org/TR/css-fonts-3/#font-fetching-requirements
            </ExternalLink>
          </Alert>
        </section>
      </section>
      <section>
        <h3 id="download">下載</h3>
        <section>
          <h4 id="self-host_your_web_fonts">自己 host web fonts</h4>
          <p>
            Web fonts
            可以由第三方服務提供，也可以自行管理來源。使用第三方服務時，可以透過
            <InternalLink
              href={`${PERFORMANCE_OPTIMIZATION.RESOURCE_HINT.PATH}#preconnect`}
            >
              <code>preconnect</code>
            </InternalLink>{" "}
            來預先建立連線以減少後續下載 web fonts 的時間
          </p>
          <CodeBlock language="xml">{`
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        `}</CodeBlock>
          <p>
            自行 host web fonts 會比從跨來源下載更快，但就需要自己處理 cache
            的問題。
          </p>
        </section>
        <section>
          <h4 id="use_woff2—and_woff2_only">僅使用 WOFF2</h4>
          <p>
            WOFF2
            具備廣泛的瀏覽器支援和最佳壓縮功能。只有在需要支援舊版瀏覽器時，才需要使用其他格式
            (例如 WOFF、EOT 和 TTF)。
          </p>
        </section>
        <section>
          <h4 id="subset_your_web_fonts">子集</h4>
          <p>
            Web fonts 通常包含多種不同的
            <ExternalLink href="https://zh.wikipedia.org/wiki/%E5%AD%97%E5%BD%A2">
              字形
            </ExternalLink>
            ，這是代表不同語言中使用的各種字元的必要項目。如果網頁僅以一種語言提供內容，或使用單一字母，就可以透過子集設定縮減網頁字型檔案的大小。
          </p>
          <p>
            部分網路字型供應商 (例如 Google Fonts)
            會使用查詢字串參數自動提供子集
          </p>
          <p>
            <code>
              https://fonts.googleapis.com/css?family=Roboto&subset=latin
            </code>
          </p>
          <p>網址提供的 css 採用 Roboto 字型，但只有使用拉丁字</p>
          <br />
          自行 host web font，也可以使用{" "}
          <ExternalLink href="https://github.com/zachleat/glyphhanger">
            glyphanger
          </ExternalLink>{" "}
          或{" "}
          <ExternalLink href="https://github.com/Munter/subfont">
            subfont
          </ExternalLink>{" "}
          等工具自行產生及 host 這些子集
        </section>
      </section>
      <section>
        <h3 id="font_rendering">渲染</h3>
        <p>
          <code>@font-face</code> 中的 <code>font-display</code>{" "}
          屬性決定在字型下載完畢前如何顯示
        </p>
        <section>
          <p>字型顯示會分為三個階段</p>
          <ol>
            <li id="block-period">
              Font block period
              <p>
                字型尚未載入的話，會先以一個<b>不可見的備用字型</b>
                渲染，如果在此期間字型成功下載則正常使用它
              </p>
            </li>
            <li>
              Font swap period
              <p>
                字型尚未載入的話，會先以備用字型渲染，如果在此期間字型成功下載則正常使用它
              </p>
            </li>
            <li>
              Font failure period
              <p>字型尚未載入的話，則視為下載失敗，會以備用字型渲染</p>
            </li>
          </ol>
        </section>
        <section>
          <h4 id="font-display">font-display 屬性值</h4>
          <ul>
            <li>
              auto
              <p>大多數瀏覽器預設為 block</p>
            </li>
            <li>
              block
              <ul>
                <li>
                  定義
                  <p>
                    短暫的 block period (建議是 3 秒) 和無限長的 swap period
                  </p>
                </li>
                <li>
                  解釋
                  <p>
                    如果未載入字型，瀏覽器首先渲染不可見的文字內容，但在載入後立即交換字型
                  </p>
                </li>
                <li>
                  適用情境
                  <p>
                    只有當需要以特定字型呈現文字以使頁面可用時，才應使用此設定。適用於簡短的文字內容
                  </p>
                </li>
                <li>
                  <InternalLink
                    href={
                      PERFORMANCE_OPTIMIZATION.WEB_FONTS.FONT_DISPLAY_BLOCK_DEMO
                        .PATH
                    }
                  >
                    範例
                  </InternalLink>
                  <p>
                    使用不相關的字元來代表的 icon
                    fonts，所以如果以備用字型顯示的話，會是無意義的內容
                  </p>
                </li>
              </ul>
            </li>
            <li>
              swap
              <ul>
                <li>
                  定義
                  <p>
                    極短的 block period (建議是 ≤ 100ms) 和無限長的 swap period
                  </p>
                </li>
                <li>
                  解釋
                  <p>
                    如果未載入字型，瀏覽器會立即以備用字型渲染，但在載入後立即交換字型
                  </p>
                </li>
                <li>
                  適用情境
                  <p>
                    只有當以特定字型呈現文字對於頁面非常重要，但以任何字型呈現仍然會得到正確的訊息，才應使用此設定。適用於簡短的文字內容
                  </p>
                </li>
                <li>
                  缺點
                  <p>可能會造成版面變化，影響 CLS</p>
                </li>
                <li>
                  <InternalLink
                    href={
                      PERFORMANCE_OPTIMIZATION.WEB_FONTS.FONT_DISPLAY_SWAP_DEMO
                        .PATH
                    }
                  >
                    範例
                  </InternalLink>
                  <p>
                    網站 LOGO
                    所使用的特殊字型，對品牌來說很重要，但是以任何字型顯示都還是至少可以清楚地表達
                  </p>
                </li>
              </ul>
            </li>
            <li>
              fallback
              <ul>
                <li>
                  定義
                  <p>
                    極短的 block period (建議是 ≤ 100ms) 和短暫的 swap period
                    (建議是 3 秒)
                  </p>
                </li>
                <li>
                  解釋
                  <p>
                    如果未載入字型，瀏覽器會先以備用字型渲染，並在載入後交換字型。但是如果等待太久，就會繼續沿用備用字型
                  </p>
                </li>
                <li>
                  適用情境
                  <p>
                    適用於主要文字內容或是其他任何，雖然希望能使用所選的字型，但是讓使用者看到備用字型也可以接受的文字內容。適用於大範圍的文字內容
                  </p>
                </li>
                <li>
                  <InternalLink
                    href={
                      PERFORMANCE_OPTIMIZATION.WEB_FONTS
                        .FONT_DISPLAY_FALLBACK_DEMO.PATH
                    }
                  >
                    範例
                  </InternalLink>
                  <p>
                    在大段的主要文字內容中，最重要的是快速呈現文字內容，以便使用者可以盡快開始閱讀。
                    此外，一旦使用者開始閱讀，他們就不應該因換入新字型時文字突然移動而受到干擾
                  </p>
                </li>
              </ul>
            </li>
            <li id="optional">
              optional
              <ul>
                <li>
                  定義
                  <p>極短的 block period (建議是 ≤ 100ms) ，沒有 swap period</p>
                </li>
                <li>
                  解釋
                  <p>
                    如果可以立即載入字型，則使用該字型。不然瀏覽器可以選擇要中斷字型的下載，又或是以非常低的優先序去下載。如果瀏覽器判斷對使用者有用，甚至可以在最一開始就直接不下載字型並直接使用備用字型。瀏覽器可以選擇稍微延遲渲染元素，以便有時間從較慢的
                    local cache
                    載入字型，但是一旦文字內容以備用字型渲染到頁面後，就不會再切換字型
                  </p>
                </li>
                <li>
                  適用情境
                  <p>
                    適用於主要文字內容或是其他任何，所選的字型僅為裝飾性質的文字內容。當第一次早造訪網頁時，如果快速呈現內容比完美呈現更重要時，就該使用此設定。
                  </p>
                </li>
                <li>
                  <InternalLink
                    href={
                      PERFORMANCE_OPTIMIZATION.WEB_FONTS
                        .FONT_DISPLAY_OPTIONAL_DEMO.PATH
                    }
                  >
                    範例
                  </InternalLink>
                  <p>
                    當網站的主要文字內容中可以透過備用字體閱讀時，儘管下載的字體可能更有吸引力並且更符合網站的美觀。
                    網站的首次訪客通常更關心網站是否可以快速使用，而不是其顯示的細節。如果他們稍後返回，則所需的字體可能已完成下載，從而為他們提供預期體驗
                  </p>
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </section>
    </div>
  );
};

export default WebFonts;
