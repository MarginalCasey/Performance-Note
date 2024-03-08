import CodeBlock from "@/app/components/CodeBlock";
import ExternalLink from "@/app/components/ExternalLink";
import InnerLink from "@/app/components/InnerLink";
import { CORE_WEB_VITALS, PERFORMANCE_OPTIMIZATION } from "@/app/path";

const INP = () => {
  return (
    <div>
      <h1>Interaction to Next Paint (INP)</h1>
      <section>
        <h3>什麼是 INP</h3>
        <section>
          <p>
            INP
            是一個透過觀察使用者造訪網頁期間所發生的所有點擊、觸控和鍵盤互動事件的延遲，來評估頁面互動性的指標。INP
            值會等於觀測到的最長互動時間 (去除極端值)。
          </p>
        </section>
        <section>
          <h4>怎樣算是一個良好的 INP 分數</h4>
          <p>
            為了提供良好的使用者體驗，網站應力求不超過 <b>200ms</b> 的
            INP，評估門檻是網頁載入的<b>第 75 個百分位數</b>
          </p>
          <img
            src="https://web.dev/static/articles/inp/image/inp-desktop-v2.svg"
            alt=""
          />
        </section>
        <section>
          <h4>互動是什麼</h4>
          <p>
            輸入延遲時間 (Input delay) + 處理時間 (Processing time) +
            顯示延遲時間 (Presentation delay)
          </p>
          <img
            src="https://web.dev/static/articles/inp/image/a-diagram-depicting-inte-d2bec16a5952.svg"
            alt=""
          />
          <p>目前只有三種互動的類型會被納入 INP 觀察的對象</p>
          <ul>
            <li>滑鼠點擊事件</li>
            <li>觸控螢幕裝置上的觸控事件</li>
            <li>實體鍵盤或螢幕小鍵盤上的按鍵事件</li>
          </ul>
          <br />
          <p>互動有可能分成兩個部分，並且各自包含多個事件</p>
          <img
            src="https://web.dev/static/articles/inp/image/a-depiction-more-complex-5b1eeba6e5d1.svg"
            alt=""
          />
          <p>
            當使用者按下滑鼠按鈕時，互動的第一部分會收到輸入內容。然而，在放開滑鼠按鈕之前，會先渲染一個
            frame。使用者放開滑鼠按鈕時，一系列的 event handler 必須在顯示下一個
            frame 之前執行。互動期間持續時間最長的事件會被選為互動的延遲時間。
          </p>
        </section>
        <section>
          <h4>INP 與 First Input Delay (FID) 有何不同</h4>
          <p>
            INP 將所有的頁面互動納入考量，但 FID 只會計算最初的互動。FID
            只會計算最初的互動的 input delay，不包含 event handler
            的執行時間，或是渲染下一個 frame 的延遲時間。
          </p>
        </section>
      </section>
      <section>
        <h3>優化 INP</h3>
        <section>
          <p>互動可分為三個階段</p>
          <ol>
            <li>
              輸入延遲時間
              <p>
                從使用者開始與網頁互動時起算，並在互動 event callback
                開始執行時結束。
              </p>
            </li>
            <li>
              處理時間
              <p>執行 event callback 所花費的時間。</p>
            </li>
            <li>
              顯示延遲時間
              <p>瀏覽器顯示含有互動結果的下一個 frame 所需的時間</p>
            </li>
          </ol>
          <p>
            這三個階段的總和就是總互動延遲時間。互動的每一個階段都會造成總互動延遲的時間。
          </p>
          <section>
            <h4>辨別並縮短輸入延遲時間</h4>
            <ul>
              <li>
                避免使用週期性計時器，導致過度使用主執行緒
                <img
                  src="https://web.dev/static/articles/optimize-input-delay/image/a-screenshot-the-perform-0955d1c357d1f_960.png"
                  alt=""
                />
              </li>
              <li>
                避免 long tasks
                <img
                  src="https://web.dev/static/articles/optimize-input-delay/image/a-visualization-how-long-af65d3963b8fb_960.png"
                  alt=""
                />
                <InnerLink
                  href={PERFORMANCE_OPTIMIZATION.BREAK_UP_LONG_TASKS.PATH}
                >
                  分解 long tasks
                </InnerLink>
              </li>
              <li>
                注意互動重疊情形
                <img
                  src="https://web.dev/static/articles/optimize-input-delay/image/a-depiction-when-tasks-8c6449133de24_960.png"
                  alt=""
                />
                <ul>
                  <li>使用 debounce</li>
                  <li>
                    使用{" "}
                    <ExternalLink href="https://developer.mozilla.org/docs/Web/API/AbortController/abort">
                      AbortController
                    </ExternalLink>{" "}
                    來取消 fetch，讓 fetch 的 callback 不必被執行
                  </li>
                </ul>
              </li>
            </ul>
            <p>
              另一個會造成網頁啟動期間的輸入延遲時間的作業是，在 script
              載入完畢後，瀏覽器必須先進行解析與編譯，接著才能執行。視程式碼的大小，這項作業可能會在
              main thread 執行 long task，導致互動上的延遲
            </p>
            <InnerLink
              href={
                PERFORMANCE_OPTIMIZATION.SCRIPT_EVALUATION_AND_LONG_TASKS.PATH
              }
            >
              Script evaluation 與 long tasks
            </InnerLink>
          </section>
          <section>
            <h4>優化 event callback</h4>
            <ul>
              <li>
                頻繁地讓出 main thread
                <p>
                  最好的優化 event callback
                  的方式是盡量不要在裡面做太多事，但是當互動的邏輯很複雜時，可能很難進一步簡化。在這種時候，可以試著把
                  event callback 拆分成多個 task，避免造成 long
                  task，影響到其他的互動
                </p>
              </li>
              <li>
                讓出 main thread 以讓渲染儘早發生
                <p>
                  一個更進階的作法是，只保留會影響下一個 frame
                  的視覺更新的邏輯，把其他部份放到後續的 task 裡。
                </p>
                <section>
                  <p>
                    舉例來說，假設有一個文字編輯器，可在輸入文字時調整文字格式，並且根據輸入的內容更新
                    UI 的其他部分
                    (例如總字數、顯示拼字錯誤)。此外，也會自動儲存撰寫的內容。
                  </p>
                  <p>
                    在這個範例中，需要根據使用者輸入的內容進行以下四個操作。但是，只有第一個項目必須在顯示下一個
                    frame 之前完成
                  </p>
                  <ol>
                    <li>根據使用者輸入內容更新文字，並套用格式</li>
                    <li>更新 UI 中顯示目前總字數的部分</li>
                    <li>執行拼字檢查</li>
                    <li>將最近的變更儲存在本機或資料庫</li>
                  </ol>
                  <CodeBlock language="javascript">
                    {`
  textBox.addEventListener('input', (inputEvent) => {
    // Update the UI immediately, so the changes the user made
    // are visible as soon as the next frame is presented.
    updateTextBox(inputEvent);
  
    // Use 'setTimeout' to defer all other work until at least the next
    // frame by queuing a task in a 'requestAnimationFrame()' callback.
    requestAnimationFrame(() => {
      setTimeout(() => {
        const text = textBox.textContent;
        updateWordCount(text);
        checkSpelling(text);
        saveChanges(text);
      }, 0);
    });
  });
                    `}
                  </CodeBlock>
                  <img
                    src="https://web.dev/static/articles/optimize-inp/image/a-depiction-a-keyboard.svg"
                    alt=""
                  />
                </section>
              </li>
              <li>
                避免 layout thrashing
                <img
                  src="https://web.dev/static/articles/optimize-inp/image/a-visualization-layout-t-cefcc10055727_960.png"
                  alt=""
                />
                <p>
                  當透過 JavaScript
                  更新樣式，並緊接著讀取樣式時，會強迫瀏覽器必須同步地進行
                  layout，而不是等到 event callback 執行完畢後才去進行，造成
                  long task。
                </p>
                <InnerLink href={CORE_WEB_VITALS.INP.LAYOUT.PATH}>
                  避免大型、複雜的 layout 以及 layout thrashing
                </InnerLink>
              </li>
            </ul>
          </section>
          <section>
            <h4>盡可能縮短顯示延遲時間</h4>
            <ul>
              <li>
                最小化 DOM
                <div>
                  <InnerLink href={CORE_WEB_VITALS.INP.DOM_SIZE.PATH}>
                    DOM 的大小如何影響互動性
                  </InnerLink>
                </div>
              </li>
              <li>
                使用{" "}
                <ExternalLink href="https://web.dev/articles/content-visibility">
                  <code>content-visibility</code>
                </ExternalLink>{" "}
                屬性來 lazy render 畫面外的元素
              </li>
              <li>
                注意使用 JavaScript 渲染 HTML 的成本
                <p>
                  伺服器傳送 HTML
                  時，會以串流的形式傳入瀏覽器。瀏覽器會在傳送串流時逐步 parse
                  串流的區塊並進行 render，藉此進行最佳化。
                </p>
                <p>
                  但若我們使用 JavaScript 渲染 HTML 時，除了執行 JavaScript
                  的成本之外，也無法享受串流帶來的最佳化。
                </p>
                <img
                  src="https://web.dev/static/articles/client-side-rendering-of-html-and-interactivity/image/a-screenshot-parsing-ht-7b89c1ab03511_960.png"
                  alt=""
                />
                <section>
                  <h5>Streaming service worker</h5>
                  <p>
                    另一個進階的作法是，使用 service worker
                    去預先快取網站的靜態部分，將它存在 <code>CacheStorage</code>{" "}
                    中，然後使用
                    <code>ReadableStream</code> API 去拿取動態的 HTML 內容。
                  </p>
                  <p>
                    如此一來，在跳轉到其他頁面時，就可以立刻顯示網頁的部分內容(如
                    Header, Footer)，然後透過網路拿取小量的所需 HTML 內容。
                  </p>
                  <a href="https://developer.chrome.com/docs/workbox/faster-multipage-applications-with-streams/">
                    Faster multipage applications with streams
                  </a>
                </section>
              </li>
            </ul>
          </section>
        </section>
      </section>
    </div>
  );
};

export default INP;
