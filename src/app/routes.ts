export interface Route {
  name: string;
  path: string;
  isVisitable?: boolean;
  pages?: Route[];
}

const routes: Route[] = [
  {
    name: "Core Web Vitals",
    path: "core-web-vitals",
    isVisitable: false,
    pages: [
      {
        name: "Large Contentful Paint (LCP)",
        path: "lcp",
        pages: [
          {
            name: "Example: 哪些元素會列入考量",
            path: "elements",
            isVisitable: false,
            pages: [
              {
                name: "包含文字節點或是其他行內文字元素的區塊元素",
                path: "text",
              },
              {
                name: "<img>",
                path: "img",
              },
              {
                name: "<svg> 裡面的 <image>",
                path: "svg-image",
              },
              {
                name: "透過 url() 載入的 background image",
                path: "background-image",
              },
              {
                name: "<video> 的 poster 封面圖",
                path: "video-poster",
              },
              {
                name: "自動播放的 <video> 所繪製的第一個 frame",
                path: "video-autoplay-frame",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
