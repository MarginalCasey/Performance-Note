"use client";

import { Button, Collapse } from "@material-tailwind/react";
import type { FC } from "react";
import { ReactNode, useState } from "react";

interface CodeBlockCollapseProps {
  children: ReactNode;
}

const CodeBlockCollapse: FC<CodeBlockCollapseProps> = ({ children }) => {
  const [openState, setOpenState] = useState(false);

  const toggleOpen = () => setOpenState((cur) => !cur);

  return (
    <>
      <Button className="my-4" color="cyan" onClick={toggleOpen}>
        view code
      </Button>
      <Collapse className="grid gap-2" open={openState}>
        {children}
      </Collapse>
    </>
  );
};

export default CodeBlockCollapse;
