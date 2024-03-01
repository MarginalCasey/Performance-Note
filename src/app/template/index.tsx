"use client";

import { ThemeProvider } from "@material-tailwind/react";
import type { FC } from "react";
import { ReactNode } from "react";
import Sidebar from "./Sidebar";

const Template: FC<{ children: ReactNode }> = ({ children }) => {
  const customTheme = {
    list: {
      styles: {
        base: {
          item: {
            initial: {
              color:
                "text-gray-600 hover:text-black focus:text-black active:text-black",
              weight: "font-medium",
            },
            selected: {
              bg: "bg-blue-gray-50",
              color: "text-black",
              fontWeight: "font-semibold",
            },
          },
        },
      },
    },
    accordion: {
      styles: {
        base: {
          header: {
            initial: {
              color: "text-gray-600",
              fontSize: "fontSize",
              fontWeight: "font-medium",
            },
          },
        },
      },
    },
  };

  return (
    <ThemeProvider value={customTheme}>
      <div className="flex h-screen">
        <Sidebar />
        <main className="p-4 flex-1 overflow-y-auto">
          <div className="mt-[18vh] mb-[30vh] max-w-3xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Template;
