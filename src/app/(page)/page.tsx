import ExternalLink from "@/app/components/ExternalLink";

export default function Home() {
  return (
    <div>
      <p>這是將我從 web.dev 網站</p>
      <ul>
        <li>
          <ExternalLink href="https://web.dev/learn/performance/welcome">
            https://web.dev/learn/performance/welcome
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://web.dev/explore/learn-core-web-vitals">
            https://web.dev/explore/learn-core-web-vitals
          </ExternalLink>
        </li>
      </ul>
      <p>上所學到的知識整理而成的筆記。</p>
      <br />
      <p>
        內容涵蓋了提升網站性能和優化核心 Web 關鍵指標 (Core Web Vitals)
        所需的資訊，以及測試用的範例。
      </p>
    </div>
  );
}
