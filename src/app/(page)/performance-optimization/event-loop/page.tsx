import Alert from "@/app/components/Alert";
import ExternalLink from "@/app/components/ExternalLink";
import InternalLink from "@/app/components/InternalLink";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Event loop 與 rendering",
    description: "定義 | 流程 (簡化版)",
  };
};

const EventLoop = () => {
  return (
    <div>
      <h1>Event loop 與 rendering</h1>
      <section>
        <img
          className="max-w-md"
          src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*FzpTJ1dk8EYPZx81_q6fgg.png"
          alt=""
        />
        <h3 id="definition">定義</h3>
        <p>
          user agents 透過 event loop 來協調 events, user interaction, scripts,
          rendering, networking
        </p>
        <section>
          <h4 id="event_loop">event loop</h4>
          <ul>
            <li>包含一或多個 task queues</li>
            <li>
              有一個 <code>currently running task</code>
            </li>
            <li>有一個 microtask queue</li>
            <li>
              有一個 <code>performing a microtask checkpoint </code>
            </li>
            <li>
              有一個 <code>last render opportunity time</code>
            </li>
            <li>
              有一個 <code>last idle period start time</code>
            </li>
          </ul>
        </section>
        <section>
          <h4 id="task_queues">task queues</h4>
          <ul>
            <li>一個 set 的 tasks</li>
            <li>包含一或多個 task source</li>
          </ul>
        </section>
        <section>
          <h4 id="task_source">task source</h4>
          <p>對應一個特定的 task queue</p>
        </section>
        <section>
          <h4 id="task">task</h4>
          <p>來自一個特定的 task source</p>
        </section>
        <Alert type="info">
          <div>
            <b>Example</b>
          </div>
          <div>
            User agent 可以將 task queues 分為給滑鼠和鍵盤事件（即 user
            interaction task source）用的，和給其它 task source 用的。藉此，User
            agent 可以在 event loop processing model 的初始步驟中，給與 user
            interaction task source 關聯的 task queue
            四分之三的優先處理權，以讓介面保持響應性，但又不會卡死其它 task
            queue。
          </div>
        </Alert>
      </section>
      <section>
        <h3 id="flow">流程 (簡化版)</h3>
        <p>
          <ExternalLink href="https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model">
            HTML Standard
          </ExternalLink>
        </p>
        <section>
          <h4 id="continually_run_through_the_following_steps ">
            只要 event loop 存在便必須循環執行以下步驟
          </h4>
          <ol>
            <li>由 user agent 挑選出一個 task queue</li>
            <li>
              將 task queue 中第一個 task 設為{" "}
              <code>currently running task</code>，將其從 task queue 中移除
            </li>
            <li>
              執行 <code>currently running task</code>
            </li>
            <li>
              重設 <code>currently running task</code> 為 null
            </li>
            <li>
              執行 microtask
              <ol>
                <li>
                  當 <code>performing a microtask checkpoint</code> 為 true
                  時跳過後續步驟
                </li>
                <li>
                  設定 <code>performing a microtask checkpoint</code> 為 true
                </li>
                <li>
                  當 microtask queue 不為空時，循環執行
                  <ol>
                    <li>
                      將 microtask queue 中第一個 task 設為{" "}
                      <code>currently running task</code>，將其從 microtask
                      queue 中移除
                    </li>
                    <li>
                      執行 <code>currently running task</code>
                    </li>
                    <li>
                      重設 <code>currently running task</code> 為 null
                    </li>
                  </ol>
                </li>
              </ol>
            </li>
            <li>
              重設 <code>performing a microtask checkpoint</code> 為 false
            </li>
          </ol>
        </section>
        <section>
          <h4 id="run_the_following_in_parallel">
            window event loop 必須<code>並行</code>執行以下步驟
          </h4>
          <ol>
            <li>
              等待直到 event loop 存在的 user agent 至少有一個{" "}
              <ExternalLink href="https://html.spec.whatwg.org/multipage/document-sequences.html#navigable">
                navigable
              </ExternalLink>{" "}
              的 document 有{" "}
              <InternalLink href="#rendering-opportunity">
                rendering opportunity
              </InternalLink>
            </li>
            <li>
              設定 <code>last render opportunity time</code> 為現在時間
            </li>
            <li>
              針對每個有 rendering opportunity 的 navigable，加入一個 global
              task 到 <code>rendering task source</code> 中來更新渲染
              <ol>
                <li>將所有 user agent 中的 document 加入 docs 列表中</li>
                <li>
                  從 docs 中篩選掉無法將新內容展現給使用者的 document
                  (non-renderable documents)
                </li>
                <li>
                  從 docs 中篩選掉沒有新內容可繪製的 document (Unnecessary
                  rendering)
                </li>
                <li>
                  當 user agent 認為應該要跳過更新渲染時，從 docs 中移除掉所有的
                  document
                  <Alert type="info">
                    <div>
                      <b>Example</b>
                    </div>
                    <div>
                      為了確保特定的 tasks 們連續地被執行（除了中間夾著的
                      microtask），例如，user agent 可能希望合併 timer
                      callbacks，中間沒有畫面更新。
                    </div>
                  </Alert>
                </li>
                <li>對每個 doc 進行一系列的畫面更新步驟</li>
              </ol>
            </li>
          </ol>
          <section>
            <h5 id="rendering-opportunity">rendering opportunity</h5>
            <p>
              如果 user agent 當前能夠向使用者呈現一個 navigable
              的內容，則它就具有 rendering opportunity，這取決於硬體的刷新率以及
              user agent 的效能限制。Rendering opportunities 通常定期發生。
            </p>
            <Alert type="info">
              <div>
                <b>Example</b>
              </div>
              <div>
                若瀏覽器試圖實現 60Hz 的刷新率，那 rendering opportunity 最多每
                1/60 秒要出現一次（約 16.7ms）
              </div>
            </Alert>
          </section>
        </section>
      </section>
    </div>
  );
};

export default EventLoop;
