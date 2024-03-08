import CodeBlock from "@/app/components/CodeBlock";

const HTML = () => {
  return (
    <div>
      <h1>一般 HTML 效能注意事項</h1>
      <section>
        <h3>減少重新導向次數</h3>
        <p>
          當伺服器回 <code>301 Moved Permanently</code> 或是{" "}
          <code>301 Found</code> 時，瀏覽器必須重發 HTTP request 到新的 location
        </p>
      </section>
      <section>
        <h3>快取 HTML response</h3>
        <section>
          <h4>Etag</h4>
          <p>
            Response Headers 回傳 <code>etag</code>
          </p>
          <img
            src="https://cdn.glitch.global/1d17d497-a0db-4183-b4e9-1a5f350327b1/learn-performance-caching-2-3.png"
            alt=""
          />
          <p>
            後續 request 時 Request Headers 就會帶入 <code>If-None-Match</code>
          </p>
          <img
            src="https://cdn.glitch.global/1d17d497-a0db-4183-b4e9-1a5f350327b1/learn-performance-caching-2-2.png"
            alt=""
          />
          <p>
            並在後端驗證相符後回傳 <code>304 Not Modified</code>
          </p>
        </section>
        <section>
          <h4>Last-Modified</h4>
          <p>
            Response Headers 回傳 <code>last-modified</code>
          </p>
          <img
            src="https://cdn.glitch.global/1d17d497-a0db-4183-b4e9-1a5f350327b1/learn-performance-caching-3-2.png"
            alt=""
          />
          <p>
            後續 request 時 Request Headers 就會帶入{" "}
            <code>If-Modified-since</code>
          </p>
          <p>
            並在後端驗證相符後回傳 <code>304 Not Modified</code>
          </p>
        </section>
        <section>
          <h4>max-age</h4>
          <p>
            Response Headers 回傳 <code>max-age=N</code>
          </p>
          <img
            src="https://cdn.glitch.global/1d17d497-a0db-4183-b4e9-1a5f350327b1/learn-performance-caching-4-2.png"
            alt=""
          />
          <p>
            在 <code>N</code> 秒內的後續
            request，不需要再次透過後端驗證，直接收到{" "}
            <code>200 (from disk cache)</code>
          </p>
        </section>
      </section>
      <section>
        <h3>測量伺服器 response time</h3>
        <p>
          可以在伺服器端回傳 <code>Server-Timing</code> response header
          提供相關資訊
        </p>
        <CodeBlock>
          {`
  Server-Timing: auth;dur=55.5, db;dur=220
          `}
        </CodeBlock>
      </section>
      <section>
        <h3>End To End 壓縮</h3>
        <p>
          基於文字的回應（例如 HTML、JavaScript、CSS 和
          SVG）應進行壓縮，以減少其在網路上的傳輸大小，以便更快地下載。
          最廣泛使用的壓縮演算法是 <code>gzip</code> 和 <code>Brotli</code>
        </p>
        <img
          src="https://developer.mozilla.org/en-US/docs/Web/HTTP/Compression/httpcompression1.svg"
          alt=""
        />
        <p>
          瀏覽器在 Request Header 帶上 <code>Accept-Encoding</code>{" "}
          ，伺服器選擇一種演算法壓縮並回傳壓縮後的文件
        </p>
        <br />
        <p>
          網頁代管服務通常會自動設定壓縮，但如果能夠自行配置或調整壓縮設置，則需要考慮一些重要事項
        </p>
        <ul>
          <li>
            盡可能使用 Brotli
            <p>
              與使用 gzip 相比，Brotli 的改善幅度約為 15% 到
              20%。但在有大量使用者透過舊版瀏覽器使用時，建議使用 gzip 做為
              fallback
            </p>
          </li>
          <li>
            檔案大小很重要
            <p>
              檔案越大，壓縮效果較佳。但是大型的檔案在解壓縮後同樣需要更多時間進行解析，並且會更頻繁地變動導致
              file hash 的變化
            </p>
          </li>
          <li>
            瞭解動態與靜態壓縮
            <ul>
              <li>
                動態壓縮
                <ul>
                  <li>
                    在 request 時進行壓縮，有時甚至會在每次 request 時都進行壓縮
                  </li>
                  <li>適用動態內容，如根據使用者身分顯示不同內容的 HTML</li>
                </ul>
              </li>
              <li>
                靜態壓縮
                <ul>
                  <li>提前壓縮檔案</li>
                  <li>可以降低 server response time</li>
                  <li>適用靜態資源，如 JavaScript, CSS, SVG</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </section>
      <section id="cdn">
        <h3>CDN</h3>
        <p>
          CDN
          是一種分散式伺服器網路，可從原始伺服器快取資源，進而從實際位置較近的邊緣伺服器提供資源。使用者的實際所在位置可縮短封包往返時間
          (RTT)，而 HTTP/2 或 HTTP/3、快取和壓縮等最佳化作業可讓 CDN
          提供內容，比從原始伺服器擷取的速度更快。在某些情況下，使用 CDN
          可大幅改善網站的 TTFB。
        </p>
      </section>
    </div>
  );
};

export default HTML;
