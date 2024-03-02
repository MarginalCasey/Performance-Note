export const CORE_WEB_VITALS = {
  PATH: "/core-web-vitals",
  LCP: {
    PATH: "/core-web-vitals/lcp",
    ELEMENTS: {
      PATH: "/demo/core-web-vitals/lcp/elements",
      TEXT: {
        PATH: "/demo/core-web-vitals/lcp/elements/text",
      },
      IMG: {
        PATH: "/demo/core-web-vitals/lcp/elements/img",
      },
      SVG_IMAGE: {
        PATH: "/demo/core-web-vitals/lcp/elements/svg-image",
      },
      BACKGROUND_IMAGE: {
        PATH: "/demo/core-web-vitals/lcp/elements/background-image",
      },
      VIDEO_POSTER: {
        PATH: "/demo/core-web-vitals/lcp/elements/video-poster",
      },
      VIDEO_AUTOPLAY_FRAME: {
        PATH: "/demo/core-web-vitals/lcp/elements/video-autoplay-frame",
      },
    },
    RESOURCE_LOAD_DELAY: {
      PATH: "/demo/core-web-vitals/lcp/resource-load-delay",
      IMG: {
        PATH: "/demo/core-web-vitals/lcp/resource-load-delay/img",
        SRC: {
          PATH: "/demo/core-web-vitals/lcp/resource-load-delay/img/src",
        },
        DYNAMIC: {
          PATH: "/demo/core-web-vitals/lcp/resource-load-delay/img/dynamic",
        },
        LAZY: {
          PATH: "/demo/core-web-vitals/lcp/resource-load-delay/img/lazy",
        },
      },
    },
  },
} as const;
