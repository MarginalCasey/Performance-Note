export default function Home() {
  return (
    <div>
      <p>
        這是將我從 web.dev 網站
        <ul>
          <li>
            <a href="https://web.dev/learn/performance/welcome" target="_blank">
              https://web.dev/learn/performance/welcome
            </a>
          </li>
          <li>
            <a
              href="https://web.dev/explore/learn-core-web-vitals"
              target="_blank"
            >
              https://web.dev/explore/learn-core-web-vitals
            </a>
          </li>
        </ul>
        上所學到的知識整理而成的筆記。
      </p>

      <p>
        內容涵蓋了提升網站性能和優化核心 Web 關鍵指標 (Core Web Vitals)
        所需的資訊，以及測試用的範例。
      </p>
    </div>
  );
}
