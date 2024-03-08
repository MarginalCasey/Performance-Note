const DOM = () => {
  return (
    <div>
      <h1>DOM 的大小如何影響互動性</h1>
      <section>
        <p>DOM 愈大，初始渲染的成本以及後續更新的成本就愈高</p>
        <section>
          <h3>大型 DOM 對頁面效能有何影響</h3>
          <ol>
            <li>
              初始渲染時，與 DOM 結構相似的 CSSOM 會被建立，隨著 CSSOM
              變得更複雜，執行 style, layout, composite, paint
              所需的時間也會變多，從而影響網頁載入期間的互動延遲時間
            </li>
            <li>
              如果互動時對 DOM 進行了元素的插入及刪除，又或是更新了 DOM
              裡的內容與樣式，同樣可能會造成 style, layout, composite, paint
              的工作
            </li>
            <li>
              透過 JavaScript 來 query DOM 時，元素的 reference
              會被存在記憶體中。當 query 回傳了大量 element
              時，記憶體的成本可能十分可觀。像是{" "}
              <code>{"document.querySelectorAll(' * ')"}</code>
            </li>
          </ol>
        </section>
        <section>
          <h3>其他策略</h3>
          <section>
            <h4>透過 lazy load 載入內容</h4>
            <p>
              在載入網頁時拿掉可視範圍外的內容，並在後續互動時再把它們加入 DOM
              中，這會讓渲染更加快速，讓互動更不容易因為 main thread
              被渲染佔用而延遲。
            </p>
          </section>
          <section>
            <h4>降低 CSS selector 的複雜度</h4>
            <p>
              瀏覽器在 parse selector 時，必須遍歷 DOM tree 去確認 selector
              是否可套用到元素之上。當 selector
              愈複雜時，瀏覽器就需要畫更多時間在初始渲染上，當頁面因為互動而需要重新計算樣式和
              layout 時也是一樣。
            </p>
          </section>
          <section>
            <h4>使用 content-visibility 屬性</h4>
            <p>
              透過實驗性質的{" "}
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility"
                target="_blank"
              >
                <code>content-visibility</code>
              </a>{" "}
              屬性，可以讓某一區塊的內容，只有在進入可視範圍時才進行渲染。
            </p>
            <a
              href="https://web.dev/articles/content-visibility"
              target="_blank"
            >
              content-visibility: the new CSS property that boosts your
              rendering performance
            </a>
          </section>
        </section>
      </section>
    </div>
  );
};

export default DOM;
