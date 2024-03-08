import CodeBlock from "@/app/components/CodeBlock";
import ExternalLink from "@/app/components/ExternalLink";
import InnerLink from "@/app/components/InnerLink";

const ScriptEvaluation = () => {
  return (
    <div>
      <h1>Script evaluation 與 long tasks</h1>
      <section>
        <h3>script 與 evaluate 的 task 之間的關係</h3>
        <section>
          <h4>{"透過 <script> 載入的 script"}</h4>
          <p>
            每個 {"<script>"} 都會啟動一個 evaluate 的 task，在 Chromium,
            Safari, Firefox 上都是一樣。 拆分程式碼為多個小的 script
            可以避免造成單一個 long task。
          </p>
          <img
            src="https://web.dev/static/articles/script-evaluation-and-long-tasks/image/multiple-tasks-involving-744bb86f09b1a_960.png"
            alt=""
          />
        </section>
        <section>
          <h4>{"透過 <script type=”module”>載入的 script"}</h4>
          <p>在 Chromium 瀏覽器中，會先對每個模組執行 Compile Module 的 task</p>
          <img
            src="https://web.dev/static/articles/script-evaluation-and-long-tasks/image/module-compilation-in-mu-724bec674b5df_960.png"
            alt=""
          />
          <p>並在後續模組中的程式碼被使用時，執行 Evaluate Module 的 task</p>
          <img
            src="https://web.dev/static/articles/script-evaluation-and-long-tasks/image/just-time-evaluation-a-660d5e72fb916_960.png"
            alt=""
          />
          <p>編譯的步驟被拆分成不同 task 會讓 main thread 更不易被占用</p>
          <br />
          <p>另外，使用 ES module 的優點還有</p>
          <ul>
            <li>
              module 預設會在 strict mode 中執行，這讓 JavaScript
              引擎得以進行一些最佳化的調整
            </li>
            <li>
              <code>type=module</code> 載入的 script 預設為{" "}
              <InnerLink href="TODO">defer</InnerLink>
            </li>
          </ul>
          <br />
          <p>在 Safari 和 Firefox 中，每個模組都會啟動一個 evaluate 的 task</p>
        </section>
        <section>
          <h4>透過 import() 動態載入 script</h4>
          <p>
            使用 <code>import()</code> 動態載入的優點有
          </p>
          <ol>
            <li>
              延遲載入的模組可減少啟動時載入的 JavaScript
              數量，有助於減少啟動期間 main thread 的爭用情形
            </li>
            <li>
              呼叫 <code>import()</code> 動態載入 script 時，每個 script
              都會啟動一個 evaluate 的 task
            </li>
          </ol>
        </section>
        <section>
          <h4>在 web worker 中載入 script</h4>
          <p>
            在 web worker 中載入與執行程式碼，會在 web worker 的 thread
            上執行，而不會占用 main thread，減少 main thread 的壅塞
          </p>
        </section>
      </section>
      <section>
        <h3>取捨與注意事項</h3>
        <section>
          <h4>壓縮效率</h4>
          <p>script 檔案愈大，壓縮效率愈好，script 較小，則壓縮效率會降低</p>
        </section>
        <section>
          <h4>快取撤銷</h4>
          <p>
            script
            檔案愈大，快取愈容易因為程式碼的改動而被撤銷。分割指令碼不僅使
            script evaluation 被拆解更小的
            task，也提高回訪訪客從瀏覽器快取拿取更多 script 的可能性
          </p>
        </section>
        <section>
          <h4>巢狀 module 與載入效能</h4>
          <p>使用巢狀的 module 時</p>
          <CodeBlock language="javascript">
            {`
  // a.js
  import {b} from './b.js';
  
  // b.js
  import {c} from './c.js';
            `}
          </CodeBlock>
          <p>會造成 network request chain</p>
          <br />
          <p>一個解決這個問題的方法是使用 bundler，並設定 code splitting</p>
          <p>
            另一個做法是使用{" "}
            <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/modulepreload">
              <code>{'<link rel="modulepreload">'}</code>
            </ExternalLink>{" "}
            對 module 進行 preload
          </p>
        </section>
      </section>
    </div>
  );
};

export default ScriptEvaluation;
