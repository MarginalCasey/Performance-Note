import CodeBlock from "@/app/components/CodeBlock";
import ExternalLink from "@/app/components/ExternalLink";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "分解 long task",
    description: "未分解的單一 task | 分解 Task 的方式 | 目前 API 的不足",
  };
};

const LongTasks = () => {
  return (
    <div>
      <h1>分解 long task</h1>
      <section>
        <h3 id="single_long_task">未分解的單一 task</h3>
        <CodeBlock language="javascript">
          {`
  function saveSettings () {
    validateForm();
    showSpinner();
    saveToDatabase();
    updateUI();
    sendAnalytics();
  }
          `}
        </CodeBlock>
        <img
          src="https://web.dev/static/articles/optimize-long-tasks/image/the-savesettings-function-b71e8e42d8bf7_960.png"
          alt=""
        />
      </section>
      <section>
        <h3 id="how-to">分解 Task 的方式</h3>
        <section>
          <h4 id="defer-code-execution">用 setTimeout 手動延遲</h4>
          <CodeBlock language="javascript">
            {`
  function saveSettings () {
    // Do critical work that is user-visible:
    validateForm();
    showSpinner();
    updateUI();
  
    // Defer work that isn't user-visible to a separate task:
    setTimeout(() => {
      saveToDatabase();
      sendAnalytics();
    }, 0);
  }
            `}
          </CodeBlock>
        </section>
        <section>
          <h4 id="async-await">使用 async/await 建立 yield points</h4>
          <CodeBlock language="javascript">
            {`
  function yieldToMain () {
    return new Promise(resolve => {
      setTimeout(resolve, 0);
    });
  }
              `}
          </CodeBlock>
          <CodeBlock language="javascript">
            {`
  async function saveSettings () {
    // Create an array of functions to run:
    const tasks = [
      validateForm,
      showSpinner,
      saveToDatabase,
      updateUI,
      sendAnalytics
    ]
  
    // Loop over the tasks:
    while (tasks.length > 0) {
      // Shift the first task off the tasks array:
      const task = tasks.shift();
  
      // Run the task:
      task();
  
      // Yield to the main thread:
      await yieldToMain();
    }
  }
            `}
          </CodeBlock>
          <img
            src="https://web.dev/static/articles/optimize-long-tasks/image/the-same-savesettings-fun-689035655ea7a_960.png"
            alt=""
          />
        </section>
        <section>
          <h4 id="isinputpending">只在有需要時 yield</h4>
          <p>
            透過{" "}
            <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/Scheduling/isInputPending">
              navigator.scheduling.isInputPending()
            </ExternalLink>{" "}
            (目前僅 chromium 瀏覽器支援) 判斷使用者是否正在與頁面進行互動
          </p>
          <CodeBlock language="javascript">
            {`
  async function saveSettings () {
    // A task queue of functions
    const tasks = [
      validateForm,
      showSpinner,
      saveToDatabase,
      updateUI,
      sendAnalytics
    ];
    
    while (tasks.length > 0) {
      // Yield to a pending user input:
      if (navigator.scheduling.isInputPending()) {
        // There's a pending user input. Yield here:
        await yieldToMain();
      } else {
        // Shift the task out of the queue:
        const task = tasks.shift();
  
        // Run the task:
        task();
      }
    }
  }
            `}
          </CodeBlock>
          <img
            src="https://web.dev/static/articles/optimize-long-tasks/image/a-depiction-the-savesett-b4950d8ff3d1b_960.png"
            alt=""
          />
        </section>
      </section>
      <section>
        <h3 id="experimental">目前 API 的不足</h3>
        <section>
          <p>
            上述做法雖然可以做到分解 task，但是新的 task 一律會被塞進 task queue
            的尾端，而沒辦法做到按照優先順序執行。
          </p>
        </section>
        <section>
          <h4 id="scheduler-api">Scheduler API</h4>
          <p>
            目前僅 chromium 瀏覽器支援的{" "}
            <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/Scheduler">
              scheduler API
            </ExternalLink>{" "}
            (
            <ExternalLink href="https://www.npmjs.com/package/scheduler-polyfill">
              polyfill
            </ExternalLink>
            )，提供了一個{" "}
            <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/Scheduler/postTask">
              <code>postTask()</code>
            </ExternalLink>{" "}
            函式，允許建立不同優先順序的 task，還可以設定延遲時間、中斷 task
            又或是調整優先順序
          </p>
          <p>
            <code>postTask()</code> 提供三種不同的優先順序
          </p>
          <ul>
            <li>
              user-blocking
              <p>
                阻止使用者與頁面互動的 task。包括頁面渲染或是回應使用者的輸入。
              </p>
            </li>
            <li>
              user-visible (預設值)
              <p>
                使用者可見但不一定會阻止使用者操作的
                task。可能包括渲染頁面的非必要部分，例如非必要的圖像或動畫。
              </p>
            </li>
            <li>
              background
              <p>
                對時間不要求的 task。可能包括 log
                或是初始化目前渲染還不需要的第三方 library。
              </p>
            </li>
          </ul>
        </section>
        <section>
          <h4 id="scheduler_yield">scheduler.yield</h4>
          <p>
            目前還是實驗性質的{" "}
            <ExternalLink href="https://developer.chrome.com/blog/introducing-scheduler-yield-origin-trial">
              <code>scheduler.yield</code>
            </ExternalLink>{" "}
            可以讓執行到一半被中斷的 tasks，照著原先的順序被執行，而不會像使用
            <code>setTimeout</code> 一樣是把 task 插入到 task queue 尾端。
          </p>
          <CodeBlock language="javascript">
            {`
  async function saveSettings () {
    // Create an array of functions to run:
    const tasks = [
      validateForm,
      showSpinner,
      saveToDatabase,
      updateUI,
      sendAnalytics
    ]
  
    // Loop over the tasks:
    while (tasks.length > 0) {
      // Shift the first task off the tasks array:
      const task = tasks.shift();
  
      // Run the task:
      task();
  
      // Yield to the main thread with the scheduler
      // API's own yielding mechanism:
      await scheduler.yield();
    }
  }
            `}
          </CodeBlock>
          <img
            src="https://web.dev/static/articles/optimize-long-tasks/image/three-diagrams-depicting-13b4f9ac49a85_960.png"
            alt=""
          />
        </section>
      </section>
    </div>
  );
};

export default LongTasks;
