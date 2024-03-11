"use client";

import ExternalLink from "@/app/components/ExternalLink";
import { CORE_WEB_VITALS, PERFORMANCE_OPTIMIZATION } from "@/app/path";
import theme from "@/app/theme";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";
import {
  IconButton,
  List,
  ThemeProvider,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import AccordionItem from "./AccordionItem";
import ListItemLink from "./ListItemLink";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.matchMedia("(min-width: 540px)").matches) return;
      setOpen(false);
    }
  }, []);

  const toggleDrawer = () => setOpen((prev) => !prev);

  return (
    <ThemeProvider value={theme}>
      <div className={`sidebar-wrapper ${open ? "" : "closed"}`}>
        <IconButton
          className="toggle"
          size="sm"
          variant="text"
          onClick={toggleDrawer}
        >
          {open ? (
            <ChevronDoubleLeftIcon className="w-4 h-4" />
          ) : (
            <ChevronDoubleRightIcon className="w-4 h-4" />
          )}
        </IconButton>
        <div className="sidebar">
          <div className="px-4 py-6 flex items-center justify-between">
            <a href="/">
              <Typography
                variant="h5"
                color="blue-gray"
                className="m-0 font-bold"
              >
                前端效能優化筆記
              </Typography>
            </a>
            <ExternalLink href="https://github.com/MarginalCasey/Performance-Demo">
              <IconButton size="sm" variant="text" className="rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <g fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                  </g>
                </svg>
              </IconButton>
            </ExternalLink>
          </div>
          <div className="px-4">
            <List>
              <AccordionItem text="Core Web Vitals" path={CORE_WEB_VITALS.PATH}>
                <List>
                  <AccordionItem
                    text="Large Contentful Paint (LCP)"
                    path={CORE_WEB_VITALS.LCP.PATH}
                    visitable
                  >
                    <List>
                      <AccordionItem
                        text="Example: 哪些元素會列入考量"
                        path={CORE_WEB_VITALS.LCP.ELEMENTS.PATH}
                      >
                        <List>
                          <ListItemLink
                            text="包含文字節點或是其他行內文字元素的區塊元素"
                            path={CORE_WEB_VITALS.LCP.ELEMENTS.TEXT.PATH}
                          />
                          <ListItemLink
                            text="<img>"
                            path={CORE_WEB_VITALS.LCP.ELEMENTS.IMG.PATH}
                          />
                          <ListItemLink
                            text="<svg> 裡面的 <image>"
                            path={CORE_WEB_VITALS.LCP.ELEMENTS.SVG_IMAGE.PATH}
                          />
                          <ListItemLink
                            text="透過 url() 載入的 background image"
                            path={
                              CORE_WEB_VITALS.LCP.ELEMENTS.BACKGROUND_IMAGE.PATH
                            }
                          />
                          <ListItemLink
                            text="<video> 的 poster 封面圖"
                            path={
                              CORE_WEB_VITALS.LCP.ELEMENTS.VIDEO_POSTER.PATH
                            }
                          />
                          <ListItemLink
                            text="自動播放的 <video> 所繪製的第一個 frame"
                            path={
                              CORE_WEB_VITALS.LCP.ELEMENTS.VIDEO_AUTOPLAY_FRAME
                                .PATH
                            }
                          />
                        </List>
                      </AccordionItem>
                      <AccordionItem
                        text="Example: 移除 Resouce load delay"
                        path={CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY.PATH}
                      >
                        <List>
                          <AccordionItem
                            text="<img>"
                            path={
                              CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY.IMG.PATH
                            }
                          >
                            <List>
                              <ListItemLink
                                text="有 src 屬性"
                                path={
                                  CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY.IMG
                                    .SRC.PATH
                                }
                              />
                              <ListItemLink
                                text="動態插入"
                                path={
                                  CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY.IMG
                                    .DYNAMIC.PATH
                                }
                              />
                              <ListItemLink
                                text="使用 data-src 延遲載入"
                                path={
                                  CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY.IMG
                                    .LAZY.PATH
                                }
                              />
                            </List>
                          </AccordionItem>
                          <AccordionItem
                            text="CSS background image"
                            path={
                              CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY
                                .CSS_BACKGROUND_IMAGE.PATH
                            }
                          >
                            <List>
                              <ListItemLink
                                text="沒有 preload"
                                path={
                                  CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY
                                    .CSS_BACKGROUND_IMAGE.NO_PRELOAD.PATH
                                }
                              />
                              <ListItemLink
                                text="preload"
                                path={
                                  CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY
                                    .CSS_BACKGROUND_IMAGE.PRELOAD.PATH
                                }
                              />
                            </List>
                          </AccordionItem>
                        </List>
                      </AccordionItem>
                    </List>
                  </AccordionItem>
                  <AccordionItem
                    text="Cumulative Layout Shift (CLS)"
                    path={CORE_WEB_VITALS.CLS.PATH}
                    visitable
                  >
                    <List>
                      <AccordionItem
                        text="Example: 圖片"
                        path={CORE_WEB_VITALS.CLS.IMG.PATH}
                      >
                        <List>
                          <ListItemLink
                            text="固定寬高"
                            path={CORE_WEB_VITALS.CLS.IMG.FIXED_SIZE.PATH}
                          />
                          <AccordionItem
                            text="RWD 圖片"
                            path={CORE_WEB_VITALS.CLS.IMG.RESPONSIVE.PATH}
                          >
                            <List>
                              <ListItemLink
                                text="沒有設定寬高"
                                path={
                                  CORE_WEB_VITALS.CLS.IMG.RESPONSIVE
                                    .WITHOUT_SIZE.PATH
                                }
                              />
                              <ListItemLink
                                text="有設定寬高"
                                path={
                                  CORE_WEB_VITALS.CLS.IMG.RESPONSIVE.WITH_SIZE
                                }
                              />
                            </List>
                          </AccordionItem>
                          <AccordionItem
                            text="Responsive images"
                            path={
                              CORE_WEB_VITALS.CLS.IMG.RESPONSIVE_IMAGES.PATH
                            }
                          >
                            <List>
                              <ListItemLink
                                text="沒有設定寬高"
                                path={
                                  CORE_WEB_VITALS.CLS.IMG.RESPONSIVE_IMAGES
                                    .WITHOUT_SIZE.PATH
                                }
                              />
                              <ListItemLink
                                text="有設定寬高"
                                path={
                                  CORE_WEB_VITALS.CLS.IMG.RESPONSIVE_IMAGES
                                    .WITH_SIZE.PATH
                                }
                              />
                            </List>
                          </AccordionItem>
                          <AccordionItem
                            text="在不同螢幕下顯示不同寬高比的圖片"
                            path={
                              CORE_WEB_VITALS.CLS.IMG.DIFFERENT_ASPECT_RATIO
                                .PATH
                            }
                          >
                            <List>
                              <ListItemLink
                                text="沒有設定寬高"
                                path={
                                  CORE_WEB_VITALS.CLS.IMG.DIFFERENT_ASPECT_RATIO
                                    .WITHOUT_SIZE.PATH
                                }
                              />
                              <ListItemLink
                                text="有設定寬高"
                                path={
                                  CORE_WEB_VITALS.CLS.IMG.DIFFERENT_ASPECT_RATIO
                                    .WITH_SIZE.PATH
                                }
                              />
                            </List>
                          </AccordionItem>
                        </List>
                      </AccordionItem>
                      <AccordionItem
                        text="Example: 字型"
                        path={CORE_WEB_VITALS.CLS.FONT.PATH}
                      >
                        <List>
                          <ListItemLink
                            text="font-display: swap"
                            path={CORE_WEB_VITALS.CLS.FONT.SWAP.PATH}
                          />
                          <ListItemLink
                            text="font-display: block"
                            path={CORE_WEB_VITALS.CLS.FONT.BLOCK.PATH}
                          />
                          <ListItemLink
                            text="font-display: optional"
                            path={CORE_WEB_VITALS.CLS.FONT.OPTIONAL.PATH}
                          />
                        </List>
                      </AccordionItem>
                    </List>
                  </AccordionItem>
                  <AccordionItem
                    text="Interaction to Next Paint (INP)"
                    path={CORE_WEB_VITALS.INP.PATH}
                    visitable
                  >
                    <List>
                      <ListItemLink
                        text="避免大型、複雜的 layout 以及 layout thrashing"
                        path={CORE_WEB_VITALS.INP.LAYOUT.PATH}
                      />
                      <ListItemLink
                        text="DOM 的大小如何影響互動性"
                        path={CORE_WEB_VITALS.INP.DOM_SIZE.PATH}
                      />
                    </List>
                  </AccordionItem>
                </List>
              </AccordionItem>
              <AccordionItem
                text="Performance optimization"
                path={PERFORMANCE_OPTIMIZATION.PATH}
              >
                <List>
                  <ListItemLink
                    text="一般 HTML 效能注意事項"
                    path={PERFORMANCE_OPTIMIZATION.HTML.PATH}
                  />
                  <ListItemLink
                    text="關鍵渲染路徑與資源載入最佳化"
                    path={
                      PERFORMANCE_OPTIMIZATION
                        .CRITICAL_RENDERING_PATH_AND_OPTIMIZATION.PATH
                    }
                  />
                  <ListItemLink
                    text="為瀏覽器提供 resource hint"
                    path={PERFORMANCE_OPTIMIZATION.RESOURCE_HINT.PATH}
                  />
                  <AccordionItem
                    text="圖片最佳化"
                    path={PERFORMANCE_OPTIMIZATION.IMAGE.PATH}
                    visitable
                  >
                    <List>
                      <ListItemLink
                        text="範例: 不同 DPR 時載入不同尺寸的圖片"
                        path={PERFORMANCE_OPTIMIZATION.IMAGE.DPR_DEMO.PATH}
                      />
                      <ListItemLink
                        text="範例: 根據 media 及 DPR 載入不同尺寸的圖片"
                        path={
                          PERFORMANCE_OPTIMIZATION.IMAGE.MEDIA_AND_DPR_DEMO.PATH
                        }
                      />
                      <ListItemLink
                        text="範例: 使用 <picture> 處理圖片格式支援度"
                        path={
                          PERFORMANCE_OPTIMIZATION.IMAGE
                            .PICTURE_AND_DIFFERENT_TYPE_DEMO.PATH
                        }
                      />
                      <ListItemLink
                        text="範例: 使用 <picture> 根據 media 及 DPR 載入不同格式及尺寸的圖片"
                        path={
                          PERFORMANCE_OPTIMIZATION.IMAGE
                            .PICTURE_AND_DIFFERENT_SRCSET_DEMO.PATH
                        }
                      />
                      <ListItemLink
                        text="範例: loading='lazy'"
                        path={
                          PERFORMANCE_OPTIMIZATION.IMAGE.LAZY_LOAD_DEMO.PATH
                        }
                      />
                    </List>
                  </AccordionItem>
                  <AccordionItem
                    text="影片最佳化"
                    path={PERFORMANCE_OPTIMIZATION.VIDEO.PATH}
                    visitable
                  >
                    <List>
                      <ListItemLink
                        text="範例: YouTube facade"
                        path={PERFORMANCE_OPTIMIZATION.VIDEO.FACADE_DEMO.PATH}
                      />
                    </List>
                  </AccordionItem>
                  <AccordionItem
                    text="Web fonts 最佳化"
                    path={PERFORMANCE_OPTIMIZATION.WEB_FONTS.PATH}
                    visitable
                  >
                    <List>
                      <ListItemLink
                        text="範例: font-display: block"
                        path={
                          PERFORMANCE_OPTIMIZATION.WEB_FONTS
                            .FONT_DISPLAY_BLOCK_DEMO.PATH
                        }
                      />
                      <ListItemLink
                        text="範例: font-display: swap"
                        path={
                          PERFORMANCE_OPTIMIZATION.WEB_FONTS
                            .FONT_DISPLAY_SWAP_DEMO.PATH
                        }
                      />
                      <ListItemLink
                        text="範例: font-display: fallback"
                        path={
                          PERFORMANCE_OPTIMIZATION.WEB_FONTS
                            .FONT_DISPLAY_FALLBACK_DEMO.PATH
                        }
                      />
                      <ListItemLink
                        text="範例: font-display: optional"
                        path={
                          PERFORMANCE_OPTIMIZATION.WEB_FONTS
                            .FONT_DISPLAY_OPTIONAL_DEMO.PATH
                        }
                      />
                    </List>
                  </AccordionItem>
                  <ListItemLink
                    text="Code splitting"
                    path={PERFORMANCE_OPTIMIZATION.CODE_SPLITTING.PATH}
                  />
                  <ListItemLink
                    text="Lazy load"
                    path={PERFORMANCE_OPTIMIZATION.LAZY_LOAD.PATH}
                  />
                  <AccordionItem
                    text="Prefetch 和 Prerender"
                    path={PERFORMANCE_OPTIMIZATION.PREFETCH_AND_PRERENDER.PATH}
                    visitable
                  >
                    <List>
                      <ListItemLink
                        text="範例: Prefetch 頁面"
                        path={
                          PERFORMANCE_OPTIMIZATION.PREFETCH_AND_PRERENDER
                            .PREFETCH_DOCUMENT_DEMO.PATH
                        }
                      />
                      <ListItemLink
                        text="範例: 使用 Speculation Rules API Prefetch 頁面"
                        path={
                          PERFORMANCE_OPTIMIZATION.PREFETCH_AND_PRERENDER
                            .SPECULATION_RULES_API_PREFETCH_DOCUMENT_DEMO.PATH
                        }
                      />
                      <ListItemLink
                        text="範例: 使用 Speculation Rules API Prerender 頁面"
                        path={
                          PERFORMANCE_OPTIMIZATION.PREFETCH_AND_PRERENDER
                            .SPECULATION_RULES_API_PRERENDER_DEMO.PATH
                        }
                      />
                    </List>
                  </AccordionItem>
                  <ListItemLink
                    text="Web workers 總覽"
                    path={PERFORMANCE_OPTIMIZATION.WEB_WORKERS.PATH}
                  />
                  <ListItemLink
                    text="分解 long task"
                    path={PERFORMANCE_OPTIMIZATION.BREAK_UP_LONG_TASKS.PATH}
                  />
                  <ListItemLink
                    text="Script evaluation 與 long tasks"
                    path={
                      PERFORMANCE_OPTIMIZATION.SCRIPT_EVALUATION_AND_LONG_TASKS
                        .PATH
                    }
                  />
                  <ListItemLink
                    text="Event loop 與 rendering"
                    path={PERFORMANCE_OPTIMIZATION.EVENT_LOOP.PATH}
                  />
                </List>
              </AccordionItem>
            </List>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Sidebar;
