"use client";

import { CORE_WEB_VITALS } from "@/app/path";
import theme from "@/app/theme";
import {
  List,
  ListItem,
  ThemeProvider,
  Typography,
} from "@material-tailwind/react";
import { usePathname } from "next/navigation";
import AccordionItem from "./AccordionItem";

const Sidebar = () => {
  const pathname = usePathname();

  const isSelected = (path: string) => pathname === path;
  const isOpen = (path: string) =>
    pathname === path ||
    pathname.startsWith(`${path}/`) ||
    pathname.startsWith(`/demo${path}/`);

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
            <AccordionItem
              header="Core Web Vitals"
              selected={isSelected(CORE_WEB_VITALS.PATH)}
              open={isOpen(CORE_WEB_VITALS.PATH)}
            >
              <List>
                <AccordionItem
                  header={
                    <a href={CORE_WEB_VITALS.LCP.PATH}>
                      Large Contentful Paint (LCP)
                    </a>
                  }
                  selected={isSelected(CORE_WEB_VITALS.LCP.PATH)}
                  open={isOpen(CORE_WEB_VITALS.LCP.PATH)}
                >
                  <List>
                    <AccordionItem
                      header="Example: 哪些元素會列入考量"
                      selected={isSelected(CORE_WEB_VITALS.LCP.ELEMENTS.PATH)}
                      open={isOpen(CORE_WEB_VITALS.LCP.ELEMENTS.PATH)}
                    >
                      <a href={CORE_WEB_VITALS.LCP.ELEMENTS.TEXT.PATH}>
                        <ListItem
                          selected={isSelected(
                            CORE_WEB_VITALS.LCP.ELEMENTS.TEXT.PATH,
                          )}
                        >
                          包含文字節點或是其他行內文字元素的區塊元素
                        </ListItem>
                      </a>
                      <a href={CORE_WEB_VITALS.LCP.ELEMENTS.IMG.PATH}>
                        <ListItem
                          selected={isSelected(
                            CORE_WEB_VITALS.LCP.ELEMENTS.IMG.PATH,
                          )}
                        >
                          {"<img>"}
                        </ListItem>
                      </a>
                      <a href={CORE_WEB_VITALS.LCP.ELEMENTS.SVG_IMAGE.PATH}>
                        <ListItem
                          selected={isSelected(
                            CORE_WEB_VITALS.LCP.ELEMENTS.SVG_IMAGE.PATH,
                          )}
                        >
                          {"<svg> 裡面的 <image>"}
                        </ListItem>
                      </a>
                      <a
                        href={
                          CORE_WEB_VITALS.LCP.ELEMENTS.BACKGROUND_IMAGE.PATH
                        }
                      >
                        <ListItem
                          selected={isSelected(
                            CORE_WEB_VITALS.LCP.ELEMENTS.BACKGROUND_IMAGE.PATH,
                          )}
                        >
                          透過 url() 載入的 background image
                        </ListItem>
                      </a>
                      <a href={CORE_WEB_VITALS.LCP.ELEMENTS.VIDEO_POSTER.PATH}>
                        <ListItem
                          selected={isSelected(
                            CORE_WEB_VITALS.LCP.ELEMENTS.VIDEO_POSTER.PATH,
                          )}
                        >
                          {"<video> 的 poster 封面圖"}
                        </ListItem>
                      </a>
                      <a
                        href={
                          CORE_WEB_VITALS.LCP.ELEMENTS.VIDEO_AUTOPLAY_FRAME.PATH
                        }
                      >
                        <ListItem
                          selected={isSelected(
                            CORE_WEB_VITALS.LCP.ELEMENTS.VIDEO_AUTOPLAY_FRAME
                              .PATH,
                          )}
                        >
                          {"自動播放的 <video> 所繪製的第一個 frame"}
                        </ListItem>
                      </a>
                    </AccordionItem>
                    <AccordionItem
                      header="Example: 移除 Resouce load delay"
                      selected={isSelected(
                        CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY.PATH,
                      )}
                      open={isOpen(
                        CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY.PATH,
                      )}
                    >
                      <List>
                        <AccordionItem
                          header="<img>"
                          selected={isSelected(
                            CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY.IMG.PATH,
                          )}
                          open={isOpen(
                            CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY.IMG.PATH,
                          )}
                        >
                          <List>
                            <a
                              href={
                                CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY.IMG.SRC
                                  .PATH
                              }
                            >
                              <ListItem
                                selected={isSelected(
                                  CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY.IMG
                                    .SRC.PATH,
                                )}
                              >
                                有 src 屬性
                              </ListItem>
                            </a>
                            <a
                              href={
                                CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY.IMG
                                  .DYNAMIC.PATH
                              }
                            >
                              <ListItem
                                selected={isSelected(
                                  CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY.IMG
                                    .DYNAMIC.PATH,
                                )}
                              >
                                動態插入
                              </ListItem>
                            </a>
                            <a
                              href={
                                CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY.IMG.LAZY
                                  .PATH
                              }
                            >
                              <ListItem
                                selected={isSelected(
                                  CORE_WEB_VITALS.LCP.RESOURCE_LOAD_DELAY.IMG
                                    .LAZY.PATH,
                                )}
                              >
                                {"使用 data-src 延遲載入"}
                              </ListItem>
                            </a>
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
