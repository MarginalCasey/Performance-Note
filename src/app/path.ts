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
        WITH_SIZE: {
          PATH: "/demo/core-web-vitals/cls/img/responsive/with-size",
        },
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
  CRITICAL_RENDERING_PATH_AND_OPTIMIZATION: {
    PATH: "/performance-optimization/rendering-path-and-optimization",
  },
  RESOURCE_HINT: {
    PATH: "/performance-optimization/resource-hint",
  },
  IMAGE: {
    PATH: "/performance-optimization/image",
    DPR_DEMO: {
      PATH: "/demo/performance-optimization/image/dpr",
    },
    MEDIA_AND_DPR_DEMO: {
      PATH: "/demo/performance-optimization/image/media-dpr",
    },
    PICTURE_AND_DIFFERENT_SRCSET_DEMO: {
      PATH: "/demo/performance-optimization/image/picture-and-different-srcset",
    },
    PICTURE_AND_DIFFERENT_TYPE_DEMO: {
      PATH: "/demo/performance-optimization/image/picture-and-different-type",
    },
    LAZY_LOAD_DEMO: {
      PATH: "/demo/performance-optimization/image/lazy-load",
    },
  },
  VIDEO: {
    PATH: "/performance-optimization/video",
    FACADE_DEMO: {
      PATH: "/demo/performance-optimization/video/facade",
    },
  },
  WEB_FONTS: {
    PATH: "/performance-optimization/web-fonts",
    FONT_DISPLAY_BLOCK_DEMO: {
      PATH: "/demo/performance-optimization/web-fonts/font-display-block",
    },
    FONT_DISPLAY_SWAP_DEMO: {
      PATH: "/demo/performance-optimization/web-fonts/font-display-swap",
    },
    FONT_DISPLAY_FALLBACK_DEMO: {
      PATH: "/demo/performance-optimization/web-fonts/font-display-fallback",
    },
    FONT_DISPLAY_OPTIONAL_DEMO: {
      PATH: "/demo/performance-optimization/web-fonts/font-display-optional",
    },
  },
  CODE_SPLITTING: {
    PATH: "/performance-optimization/code-splitting",
  },
  LAZY_LOAD: {
    PATH: "/performance-optimization/lazy-load",
  },
  PREFETCH_AND_PRERENDER: {
    PATH: "/performance-optimization/prefetch-and-prerender",
    PREFETCH_DOCUMENT_DEMO: {
      PATH: "/demo/performance-optimization/prefetch-and-prerender/prefetch-document",
    },
    SPECULATION_RULES_API_PREFETCH_DOCUMENT_DEMO: {
      PATH: "/performance-optimization/prefetch-and-prerender/speculation-rules-api-prefetch-document",
    }, // not working in iframe
    SPECULATION_RULES_API_PRERENDER_DEMO: {
      PATH: "/performance-optimization/prefetch-and-prerender/speculation-rules-api-prerender",
    }, // not working in iframe
  },
  WEB_WORKERS: {
    PATH: "/performance-optimization/web-workers",
  },
  BREAK_UP_LONG_TASKS: {
    PATH: "/performance-optimization/break-up-long-tasks",
  },
  SCRIPT_EVALUATION_AND_LONG_TASKS: {
    PATH: "/performance-optimization/script-evaluation-and-long-tasks",
  },
  EVENT_LOOP: {
    PATH: "/performance-optimization/event-loop",
  },
} satisfies Route;
