import CodeBlock from "@/app/components/CodeBlock";
import ExternalLink from "@/app/components/ExternalLink";
import InternalLink from "@/app/components/InternalLink";
import { CORE_WEB_VITALS } from "@/app/path";

const CLS = () => {
  return (
    <div>
      <h1>Cumulative Layout Shift (CLS)</h1>
      <section>
        <h3>什麼是 CLS</h3>
        <section>
          <p>
            對於使用者輸入內容 500
            毫秒後所發生的版面位移，將各版面位移分數相加，藉此評估內容的不穩定性。也就是在可視區域中被位移的內容幅度，以及受影響的元素移動距離。
          </p>
          <p>
            網頁內容突然移動，通常是因為以非同步方式載入資源，或以動態方式將 DOM
            元素動態新增至頁面的現有內容上方。問題可能是尺寸不明的圖片或影片、比備用字型更大或更小的字型，動態調整大小的第三方廣告或是插件。
          </p>
        </section>
        <section>
          <h4>怎樣算是一個良好的 CLS 分數</h4>
          <p>
            為了提供良好的使用者體驗，網站應力求 CLS 分數 <b>0.1</b>{" "}
            以下，評估門檻是網頁載入的<b>第 75 個百分位數</b>
          </p>
          <img
            src="https://web.dev/static/articles/cls/image/good-cls-values.svg"
            alt=""
          />
        </section>
      </section>
      <section>
        <h3>CLS 的常見原因</h3>
        <section>
          <h4>沒有尺寸的圖片</h4>
          <p>
            對圖片和影片元素加上 <code>width</code> 和 <code>height</code>{" "}
            或是透過 CSS 的{" "}
            <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio">
              <code>aspect-ratio</code>
            </ExternalLink>{" "}
            屬性設定寬高比，確保瀏覽器在載入圖片時，有分配足夠的空間給它們。
          </p>
          <br />
          <p>
            過去，開發人員會在 <code>{"<img>"}</code> 中加入 <code>width</code>{" "}
            和 <code>height</code>{" "}
            屬性，確保在瀏覽器開始載入圖片前，已在頁面上分配足夠空間。這樣做可以盡量減少
            reflow 和 re-layout。
            <InternalLink href={CORE_WEB_VITALS.CLS.IMG.FIXED_SIZE.PATH}>
              範例
            </InternalLink>
          </p>
          <CodeBlock language="xml">{`
  <img src="puppy.jpg" width="640" height="360" alt="Puppy with balloons">
          `}</CodeBlock>
          <p>
            但是當 RWD 的概念被引入之後，開發人員開始省略 width 和 height
            屬性，轉而改用 CSS 調整圖片大小
            <InternalLink
              href={CORE_WEB_VITALS.CLS.IMG.RESPONSIVE.WITHOUT_SIZE.PATH}
            >
              範例
            </InternalLink>
          </p>
          <CodeBlock language="css">{`
  img {
    width: 100%; /* or max-width: 100%; */
    height: auto;
  }
          `}</CodeBlock>
          <p>
            這個做法的缺點是，要直到瀏覽器開始下載圖片並知道圖片尺寸後，才有辦法分配空間給圖片。圖片載入完成時，頁面會
            reflow
            。所以，要再設定寬高比，知道寬高比之後，瀏覽器就可以計算出高度和相關區域，並保留足夠的空間。
          </p>

          <br />
          <p>
            現代的瀏覽器會根據圖片的 <code>width</code> 和 <code>height</code>{" "}
            屬性，設定圖片的預設寬高比。只要設定這些屬性並加入先前的
            CSS，即可防止版面發生位移。
            <InternalLink href={CORE_WEB_VITALS.CLS.IMG.RESPONSIVE.WITH_SIZE}>
              範例
            </InternalLink>
          </p>
          <CodeBlock language="xml">{`
  <!-- set a 640:360 i.e a 16:9 aspect ratio -->
  <img src="puppy.jpg" width="640" height="360" alt="Puppy with balloons">
          `}</CodeBlock>
          <p>
            瀏覽器會根據 <code>width</code> 和 <code>height</code>{" "}
            屬性，在圖片載入前計算寬高比。這項資訊會在 layout
            計算一開始時就被提供。只要當圖片被設定為特定寬度 (例如{" "}
            <code>width: 100%</code>) 後，就會使用該寬高比計算高度。
          </p>
          <p>Chrome 會在 devtool 中顯示</p>
          <CodeBlock language="css">{`
  img[Attributes Style] {
    aspect-ratio: auto 640 / 360;
  }
          `}</CodeBlock>
          <p>Safari 和 Firefox 也有著類似的實作。</p>
          <p>
            上面 <code>auto</code>{" "}
            的設定，會讓圖片在被下載完成後，用圖片的真實尺寸去覆蓋{" "}
            <code>640 / 360</code>
            的設定。雖然如果寬高比的設定與圖片的真實尺寸不符，圖片載入後仍會造成版面位移，但這確保了圖片顯示比例最終仍會採用圖片的真實尺寸，而且至少版面位移的距離會比預設
            0 x 0 的圖片好很多。
          </p>
          <section>
            <h5>Responsive images</h5>
            <p>
              建立 responsive images 時，會透過 <code>srcset</code>{" "}
              定義瀏覽器可以選擇的圖片及圖片大小。為確保可以設定{" "}
              <code>{"<img>"}</code> 的 <code>width</code> 和{" "}
              <code>height</code> 屬性，每張圖片應採用相同的長寬比。
              <InternalLink
                href={CORE_WEB_VITALS.CLS.IMG.RESPONSIVE_IMAGES.WITH_SIZE.PATH}
              >
                範例
              </InternalLink>
            </p>
            <CodeBlock language="xml">{`
  <img
    width="1000"
    height="1000"
    src="puppy-1000.jpg"
    srcset="puppy-1000.jpg 1000w, puppy-2000.jpg 2000w, puppy-3000.jpg 3000w"
    alt="Puppy with balloons"
  />
          `}</CodeBlock>
          </section>
          <section>
            <h5>在不同螢幕下顯示不同寬高比的圖片</h5>
            <p>
              網頁可以針對較小的螢幕，顯示裁剪過的圖片，並在桌面版中顯示完整圖片
              <InternalLink
                href={
                  CORE_WEB_VITALS.CLS.IMG.DIFFERENT_ASPECT_RATIO.WITHOUT_SIZE
                    .PATH
                }
              >
                範例
              </InternalLink>
            </p>
            <CodeBlock language="xml">{`
  <picture>
    <source media="(max-width: 799px)" srcset="puppy-480w-cropped.jpg" />
    <source media="(min-width: 800px)" srcset="puppy-800w.jpg" />
    <img src="puppy-800w.jpg" alt="Puppy with balloons" />
  </picture>
          `}</CodeBlock>
            <p>
              這些圖片可能採用不同的長寬比。Chrome、Firefox 和 Safari 現在支援在{" "}
              <code>picture</code> 元素的 <code>source</code> 上設定{" "}
              <code>width</code> 和 <code>height</code>
              <InternalLink
                href={
                  CORE_WEB_VITALS.CLS.IMG.DIFFERENT_ASPECT_RATIO.WITH_SIZE.PATH
                }
              >
                範例
              </InternalLink>
            </p>
            <CodeBlock language="xml">{`
  <picture>
    <source media="(max-width: 799px)" srcset="puppy-480w-cropped.jpg" width=480 height=400/>
    <source media="(min-width: 800px)" srcset="puppy-800w.jpg" width=800 height=400/>
    <img src="puppy-800w.jpg" alt="Puppy with balloons" width=800 height=400/>
  </picture>
          `}</CodeBlock>
          </section>
        </section>
        <section>
          <h4>廣告、插件和其他延遲載入的內容</h4>
          <ul>
            <li>
              預留空間給延遲載入的內容
              <p>
                如果內容高度不固定
                (例如廣告)，可能無法預留確切空間來避免版面位移。如果放送的是小型廣告，發布商可以設定較大的容器或根據歷史資料選擇最適合的廣告版位大小。這個方式的缺點是會增加空白空間，所以需要有所取捨。
              </p>
              <p>
                或者也可以將初始大小設為要使用的 <code>min-height</code>
                ，並針對較大的內容接受一定程度的位移。這麼做並不會完全消除
                CLS，但至少能減少 CLS 的影響。
              </p>
            </li>
            <li>
              避免將延遲載入的內容靠近可視區域頂端
              <p>
                動態插入內容靠近可視區域頂端的位置，會導致版面位移幅度較大。
              </p>
            </li>
            <li>
              避免在使用者未進行互動的情況下插入新內容
              <p>
                在某些情況下，動態新增內容是使用者體驗的重要一環。例如將更多產品載入商品清單或更新即時動態饋給內容。可以透過多種方式，避免在這些情況下發生非預期的版面位移
              </p>
              <ul>
                <li>
                  將舊內容替換為固定大小容器中的新內容，或是使用 carousel 並在
                  transition 過後移除舊內容。
                </li>
                <li>
                  讓使用者觸發新內容的載入，例如使用「載入更多」或「重新整理」按鈕。
                </li>
                <li>
                  在畫面外載入內容，然後顯示懸浮通知給使用者
                  (例如「向上捲動」按鈕)。
                </li>
              </ul>
            </li>
          </ul>
        </section>
        <section>
          <h4>動畫</h4>
          <a href="https://web.dev/articles/animations-guide" target="__blank">
            Animation Guides
          </a>
        </section>
        <section>
          <h4>網頁字型</h4>
          <p>網頁字型的下載與渲染通常的處理方式是</p>
          <ul>
            <li>
              用網頁字型替換掉備用字型 (FOUT—flash of unstyled text){" "}
              <InternalLink href={CORE_WEB_VITALS.CLS.FONT.SWAP.PATH}>
                範例
              </InternalLink>
            </li>
            <li>
              使用不可見的備用字型渲染文字，直到網頁字型可用後且讓文字變為可見
              (FOIT—flash of invisible text)
              <InternalLink href={CORE_WEB_VITALS.CLS.FONT.BLOCK.PATH}>
                範例
              </InternalLink>
            </li>
          </ul>
          <p>
            這兩者都會造成版面位移。即使文字不可見，仍會使用備用字型排版。也就是說，使用網頁字型的文字區塊和周圍內容都會在載入網頁字型後移動。
          </p>
          <br />
          <p>優化的方式有</p>
          <ul>
            <li>
              使用{" "}
              <InternalLink href="TODO">
                <code>font-display: optional</code>
              </InternalLink>{" "}
              可以避免 re-layout，因為網頁字型只有在可以立即載入時才會被使用。
              <InternalLink href={CORE_WEB_VITALS.CLS.FONT.OPTIONAL.PATH}>
                範例
              </InternalLink>
            </li>
            <li>
              使用適合的備用字型
              <p>
                舉例來說，使用{" "}
                <code>font-family: &quot;Google Sans&quot;, sans-serif;</code>
                可確保系統在載入 <code>Google Sans</code> 時，使用瀏覽器的{" "}
                <code>sans-serif</code>
                備用字型。如果不使用{" "}
                <code>font-family: &quot;Google Sans&quot;</code>
                指定備用字型，系統就會使用預設字型，而 Chrome 中的預設字型為
                <code>Times</code>。這種 Serif 字型與預設的{" "}
                <code>sans-serif</code> 字型更為一致。
              </p>
            </li>
            <li>
              使用一些新的 CSS 屬性來{" "}
              <ExternalLink href="https://developer.chrome.com/blog/font-fallbacks">
                改善備用字型
              </ExternalLink>{" "}
              與網頁字型之間的差異
              <ul>
                <li>
                  <code>size-adjust</code>
                </li>
                <li>
                  <code>ascent-override</code>
                </li>
                <li>
                  <code>descent-override</code>
                </li>
                <li>
                  <code>line-gap-override</code>
                </li>
              </ul>
            </li>
            <li>
              使用{" "}
              <a href="https://web.dev/articles/optimize-webfont-loading#the_font_loading_api">
                Font Loading API
              </a>{" "}
              加快字型的載入
            </li>
            <li>
              使用 <code>{"<link rel=preload>"}</code>{" "}
              盡快載入網頁字型。預先載入的字型較有可能趕上第一次繪圖，在這種情況下，版面就不會發生位移。
            </li>
          </ul>
        </section>
      </section>
      <section>
        <h3>確認網頁符合 bfcache 的資格，藉此減少 CLS</h3>
        <p>
          如要維持低 CLS 分數，有個有效的技巧，就是確保網頁適用{" "}
          <a href="https://web.dev/articles/bfcache">back/forward cache</a>{" "}
          (bfcache)功能。
        </p>
        <p>
          bfcache
          會在使用者離開網頁後將網頁短期保留在瀏覽器記憶體中內，因此當使用者返回網頁時，網頁將與離開時完全相同。這表示已完全載入的網頁可以立即被存取，不會因為上述任何原因而在載入期間發生版面位移。
        </p>
        <p>
          向前和向後導覽在許多網站上很常見。例如返回內容頁面、類別頁面或是搜尋結果。
        </p>
      </section>
    </div>
  );
};

export default CLS;
