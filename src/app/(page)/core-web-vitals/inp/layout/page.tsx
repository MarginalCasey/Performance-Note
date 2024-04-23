import CodeBlock from "@/app/components/CodeBlock";
import InternalLink from "@/app/components/InternalLink";
import { CORE_WEB_VITALS } from "@/app/path";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "避免大型、複雜的 layout 以及 layout thrashing",
    description:
      "盡可能避免 layout | 避免強制同步 layout | 避免 layout thrashing",
  };
};

const Layout = () => {
  return (
    <div>
      <h1>避免大型、複雜的 layout 以及 layout thrashing</h1>
      <section>
        <p>
          Layout 是瀏覽器判斷元素所在位置以及尺寸的流程。Layout 的成本取決於
        </p>
        <ol>
          <li>需要 layout 的元素數量，這主要是受到 DOM size 的影響</li>
          <li>DOM 的複雜度</li>
        </ol>
        <section>
          <h3 id="summary">總結</h3>
          <ol>
            <li>Layout 對互動延遲時間有直接影響</li>
            <li>Layout 的範圍通常為整份文件</li>
            <li>DOM 元素數量會影響效能，請盡量避免觸發 layout</li>
            <li>
              避免強制同步 layout 和 layout
              thrashing，先讀取樣式，再進行樣式變更
            </li>
          </ol>
        </section>
        <section>
          <h3 id="avoid_layout_wherever_possible">盡可能避免 layout</h3>
          <CodeBlock language="css">
            {`
  .box {
    width: 20px;
    height: 20px;
  }
  
  /**
    * Changing width and height
    * triggers layout.
    */
  
  .box--expanded {
    width: 200px;
    height: 350px;
  }
              `}
          </CodeBlock>
          <p>
            更改元素的 <code>width</code> <code>height</code> <code>left</code>{" "}
            <code>top</code> 等屬性時，瀏覽器需要進行 layout。layout
            所影響的範圍大多是整份文件。當元素很多時，就需要花很長的時間才能找出所有元素的位置和尺寸。
          </p>
          <br />
          <img
            src="https://web.dev/static/articles/avoid-large-complex-layouts-and-layout-thrashing/image/devtools-showing-long-i-9f35099ab9d22_960.png"
            alt=""
          />
          <p>
            devtool 可以顯示 layout
            所花費的時間以及影響到的元素數量。如果希望動畫可以以 60 fps
            來顯示的話，上圖的 28.3 ms 就已經超過了 16.6 ms 的時間。
          </p>
          <br />
          <p>
            雖然建議盡可能避免 layout，但當不可避免時，就需要注意 DOM
            的大小以降低 layout 的成本。
          </p>
          <InternalLink href={CORE_WEB_VITALS.INP.DOM_SIZE.PATH}>
            DOM 的大小如何影響互動性
          </InternalLink>
        </section>
        <section>
          <h3 id="avoid_forced_synchronous_layouts">避免強制同步 layout</h3>
          <img
            src="https://web.dev/static/articles/avoid-large-complex-layouts-and-layout-thrashing/image/using-flexbox-layout-0c9955c54a296_960.jpg"
            alt=""
          />
          <p>
            一般來說，Javascript 會先執行，然後計算出 style，接著再進行
            layout。不過我們也可以強制瀏覽器使用 JavaScript 提早進行 layout。
          </p>
          <br />
          <p>舉例來說，我們想要在 frame 一開始時 log 寫出元素的高度。</p>
          <CodeBlock language="javascript">
            {`
  // Schedule our function to run at the start of the frame:
  requestAnimationFrame(logBoxHeight);
  
  function logBoxHeight () {
    // Gets the height of the box in pixels and logs it out:
    console.log(box.offsetHeight);
  }
            `}
          </CodeBlock>
          <p>
            但如果我們在查詢元素的高度之前就先更改了元素的樣式，那就會發生問題。
          </p>
          <CodeBlock language="javascript">
            {`
  function logBoxHeight () {
    box.classList.add('super-big');
  
    // Gets the height of the box in pixels and logs it out:
    console.log(box.offsetHeight);
  }
            `}
          </CodeBlock>
          <p>
            為了回答高度多少，瀏覽器必須先套用 style 的變更，然後執行
            layout。才能傳回正確的高度。這可能會耗費大量資源。
          </p>
          <p>建議先批次處理樣式的讀取，再執行任何的寫入。</p>
          <CodeBlock language="javascript">
            {`
  function logBoxHeight () {
    // Gets the height of the box in pixels and logs it out:
    console.log(box.offsetHeight);
  
    box.classList.add('super-big');
  }
            `}
          </CodeBlock>
        </section>
        <section>
          <h3 id="avoid_layout_thrashing">避免 layout thrashing</h3>
          <p>當大量的強制同步 layout 發生時，會造成所謂的 layout thrashing。</p>
          <CodeBlock language="javascript">
            {`
  function resizeAllParagraphsToMatchBlockWidth () {
    // Puts the browser into a read-write-read-write cycle.
    for (let i = 0; i < paragraphs.length; i++) {
      paragraphs[i].style.width = \`\${box.offsetWidth}px\`;
    }
  }
            `}
          </CodeBlock>
          <p>修正方式一樣是先讀取再寫入。</p>
          <CodeBlock language="javascript">
            {`
  // Read.
  const width = box.offsetWidth;
  
  function resizeAllParagraphsToMatchBlockWidth () {
    for (let i = 0; i < paragraphs.length; i++) {
      // Now write.
      paragraphs[i].style.width = \`\${width}px\`;
    }
  }
            `}
          </CodeBlock>
        </section>
      </section>
    </div>
  );
};

export default Layout;
