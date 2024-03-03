"use client";

import { CORE_WEB_VITALS } from "@/app/path";
import theme from "@/app/theme";
import { List, ThemeProvider, Typography } from "@material-tailwind/react";
import AccordionItem from "./AccordionItem";
import ListItemLink from "./ListItemLink";

const Sidebar = () => {
  return (
    <ThemeProvider value={theme}>
      <div className="overflow-y-auto w-80 bg-gray-50 font-medium sidebar">
        <div className="p-4">
          <a href="/">
            <Typography variant="h5" color="blue-gray" className="font-bold">
              前端效能優化筆記
            </Typography>
          </a>
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
                          path={CORE_WEB_VITALS.LCP.ELEMENTS.VIDEO_POSTER.PATH}
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
                                CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY.IMG.SRC
                                  .PATH
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
                                CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY.IMG.LAZY
                                  .PATH
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
              </List>
            </AccordionItem>
          </List>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Sidebar;
