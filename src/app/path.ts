interface Route {
  PATH: string;
  [key: string]: string | Route;
}

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
      CSS_BACKGROUND_IMAGE: {
        PATH: "/demo/core-web-vitals/lcp/resource-load-delay/css-background-image",
        NO_PRELOAD: {
          PATH: "/demo/core-web-vitals/lcp/resource-load-delay/css-background-image/no-preload",
        },
        PRELOAD: {
          PATH: "/demo/core-web-vitals/lcp/resource-load-delay/css-background-image/preload",
        },
      },
    },
  },
  CLS: {
    PATH: "/core-web-vitals/cls",
    IMG: {
      PATH: "/demo/core-web-vitals/cls/img",
      FIXED_SIZE: {
        PATH: "/demo/core-web-vitals/cls/img/fixed-size",
      },
      RESPONSIVE: {
        PATH: "/demo/core-web-vitals/cls/img/responsive",
        WITHOUT_SIZE: {
          PATH: "/demo/core-web-vitals/cls/img/responsive/without-size",
        },
        WITH_SIZE: "/demo/core-web-vitals/cls/img/responsive/with-size",
      },
      RESPONSIVE_IMAGES: {
        PATH: "/demo/core-web-vitals/cls/img/responsive-images",
        WITHOUT_SIZE: {
          PATH: "/demo/core-web-vitals/cls/img/responsive-images/without-size",
        },
        WITH_SIZE: {
          PATH: "/demo/core-web-vitals/cls/img/responsive-images/with-size",
        },
      },
      DIFFERENT_ASPECT_RATIO: {
        PATH: "/demo/core-web-vitals/cls/img/different-aspect-ratio",
        WITHOUT_SIZE: {
          PATH: "/demo/core-web-vitals/cls/img/different-aspect-ratio/without-size",
        },

        WITH_SIZE: {
          PATH: "/demo/core-web-vitals/cls/img/different-aspect-ratio/with-size",
        },
      },
    },
    FONT: {
      PATH: "/demo/core-web-vitals/cls/font",
      SWAP: {
        PATH: "/demo/core-web-vitals/cls/font/swap",
      },
      BLOCK: {
        PATH: "/demo/core-web-vitals/cls/font/block",
      },
      OPTIONAL: {
        PATH: "/demo/core-web-vitals/cls/font/optional",
      },
    },
  },
  INP: {
    PATH: "/core-web-vitals/inp",
    LAYOUT: {
      PATH: "/core-web-vitals/inp/layout",
    },
    DOM_SIZE: {
      PATH: "/core-web-vitals/inp/dom-size",
    },
  },
} satisfies Route;

export const PERFORMANCE_OPTIMIZATION = {
  PATH: "/performance-optimization",
  HTML: {
    PATH: "/performance-optimization/html",
  },
  BREAK_UP_LONG_TASKS: {
    PATH: "/performance-optimization/break-up-long-tasks",
  },
  SCRIPT_EVALUATION_AND_LONG_TASKS: {
    PATH: "/performance-optimization/script-evaluation-and-long-tasks",
  },
} satisfies Route;
