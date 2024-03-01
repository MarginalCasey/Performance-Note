"use client";

import theme from "@/app/theme";
import { ThemeProvider } from "@material-tailwind/react";
import type { FC } from "react";
import { ReactNode } from "react";
import Sidebar from "./Sidebar";

const Template: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider value={theme}>
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
