import CodeBlock from "@/app/components/CodeBlock";
import ExternalLink from "@/app/components/ExternalLink";
import InternalLink from "@/app/components/InternalLink";
import { CORE_WEB_VITALS } from "@/app/path";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Web workers 總覽",
    description:
      "啟動 web worker | Web worker 的限制 | Web worker 如何與 window 溝通",
  };
};

const WebWorkers = () => {
  return (
    <div>
      <h1>Web workers 總覽</h1>
      <section>
        <p>
          JavaScript 通常被稱為 single thread 語言，實務中，這是指 main
          thread，讓瀏覽器執行大部分在瀏覽器中看到的工作，包括畫面渲染、HTML 和
          CSS 剖析等等。但根據預設，可以在 JavaScript 中註冊及使用其他
          thread。允許 JavaScript multi thread 的功能稱為{" "}
          <ExternalLink href="https://developer.mozilla.org/docs/Web/API/Web_Workers_API/Using_web_workers">
            Web Workers API
          </ExternalLink>
          。
        </p>
        <p>
          如果有計算成本高昂的工作，在 main thread 上執行會造成網頁無法回應的
          long task，那麼 web workers 就非常實用。這類工作會影響到網站的
          <InternalLink href={CORE_WEB_VITALS.INP.PATH}>INP</InternalLink>
          ，將它們與主執行緒分開清出空間，可以提升使用者互動的速度。
        </p>
      </section>
      <section>
        <h3 id="how_a_web_worker_is_launched">啟動 web worker</h3>
        <p>指定 web worker 程式碼的位置，讓瀏覽器載入並建立一個新的 thread</p>
        <CodeBlock language="javascript">{`
  const myWebWorker = new Worker("/js/my-web-worker.js");
        `}</CodeBlock>
      </section>
      <section>
        <h3 id="web_worker_limitations">Web worker 的限制</h3>
        <ul>
          <li>無法直接存取 DOM</li>
          <li>
            可以透過 <code>postMessage</code> 跟 <code>window</code>{" "}
            溝通，間接地存取 DOM
          </li>
          <li>
            scope 是 <code>self</code>，而不是 <code>window</code>
          </li>
          <li>可以使用基本的 JavaScript 功能和部分的 web API</li>
        </ul>
      </section>
      <section>
        <h3 id="how_web_workers_talk_to_the_window">
          Web worker 如何與 window 溝通
        </h3>
        <p>
          Web worker 透過 <code>postMessage</code> 與 main thread 上的{" "}
          <code>window</code> 溝通
        </p>
        <CodeBlock language="javascript">{`
  // my-web-worker.js
  self.addEventListener("message", () => {
    // Sends a message of "Hellow, window!" from the web worker:
    self.postMessage("Hello, window!");
  });
        `}</CodeBlock>
        <CodeBlock language="javascript">{`
  // scripts.js

  // Creates the web worker:
  const myWebWorker = new Worker('/js/my-web-worker.js');
  
  // Adds an event listener on the web worker instance that listens for messages:
  myWebWorker.addEventListener("message", ({ data }) => {
    // Echoes "Hello, window!" to the console from the worker.
    console.log(data);
  });
  
  myWebWorker.postMessage("Hello, worker!")
        `}</CodeBlock>
        <p>
          <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage">
            <code>Worker.postMessage()</code>
          </ExternalLink>{" "}
          可以傳送任何可以被{" "}
          <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm">
            structured clone algorithm
          </ExternalLink>{" "}
          處理的值，包含 String, Object 等等，它會在內部呼叫{" "}
          <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/structuredClone">
            structuredClone()
          </ExternalLink>{" "}
          對物件進行 deep clone，有時候會造成效能的瓶頸。
        </p>
        <p>
          如果被傳送的物件是一個{" "}
          <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects">
            Transferable object
          </ExternalLink>{" "}
          ，例如
        </p>
        <ul>
          <li>ArrayBuffer</li>
          <li>ReadableStream</li>
        </ul>
        <p>這部分可以透過 postMessage 的第二個參數進行 ownership 的轉移</p>
        <section>
          <p>
            Google 推出的{" "}
            <ExternalLink href="https://web.dev/articles/off-main-thread#comlink_making_web_workers_less_work">
              Comlink
            </ExternalLink>{" "}
            可以讓 Web worker 使用起來更為容易
          </p>
          <img
            src="https://user-images.githubusercontent.com/234957/54164510-cdab2d80-4454-11e9-92d0-7356aa6c5746.png"
            alt=""
          />
        </section>
      </section>
    </div>
  );
};

export default WebWorkers;
