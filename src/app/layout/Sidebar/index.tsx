"use client";

import type { Route } from "@/app/routes";
import routes from "@/app/routes";
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

  const renderRoutes = (list: Route[], baseUrl: string) => (
    <List>
      {list.map(({ name, path, demo, isVisitable = true, pages }) => {
        const url = `${demo ? "/demo" : ""}${baseUrl}/${path}`;

        const open =
          pathname.startsWith(`${url}/`) || pathname.startsWith(`/demo${url}/`);
        const selected = pathname === url || pathname === `/demo${url}`;

        if (pages) {
          return (
            <AccordionItem
              key={url}
              header={
                isVisitable ? (
                  <a href={url} className="hover:underline">
                    {name}
                  </a>
                ) : (
                  name
                )
              }
              selected={selected}
              open={open}
            >
              {renderRoutes(pages, url)}
            </AccordionItem>
          );
        }

        return (
          <a key={url} href={url} className="hover:underline">
            <ListItem selected={selected}>{name}</ListItem>
          </a>
        );
      })}
    </List>
  );

  return (
    <ThemeProvider value={theme}>
      <div className="overflow-y-auto w-80 bg-gray-50 font-medium">
        <div className="p-4">
          <a href="/">
            <Typography variant="h5" color="blue-gray" className="font-bold">
              前端效能優化筆記
            </Typography>
          </a>
        </div>
        <div className="px-4">{renderRoutes(routes, "")}</div>
      </div>
    </ThemeProvider>
  );
};

export default Sidebar;
