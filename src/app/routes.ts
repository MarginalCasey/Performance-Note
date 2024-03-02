export interface Route {
  name: string;
  demo?: boolean;
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
                demo: true,
              },
              {
                name: "<img>",
                path: "img",
                demo: true,
              },
              {
                name: "<svg> 裡面的 <image>",
                path: "svg-image",
                demo: true,
              },
              {
                name: "透過 url() 載入的 background image",
                path: "background-image",
                demo: true,
              },
              {
                name: "<video> 的 poster 封面圖",
                path: "video-poster",
                demo: true,
              },
              {
                name: "自動播放的 <video> 所繪製的第一個 frame",
                path: "video-autoplay-frame",
                demo: true,
              },
            ],
          },
          {
            name: "Example: 移除 Resouce load delay",
            path: "resource-load-delay",
            isVisitable: false,
            pages: [
              {
                name: "<img>",
                path: "img",
                isVisitable: false,
                pages: [
                  {
                    name: "有 src 屬性",
                    path: "src",
                    demo: true,
                  },
                  {
                    name: "動態插入",
                    path: "dynamic",
                    demo: true,
                  },
                  {
                    name: "使用 data-src 延遲載入",
                    path: "lazy",
                    demo: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
