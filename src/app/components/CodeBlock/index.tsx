"use client";

import { Button, Collapse } from "@material-tailwind/react";
import type { FC } from "react";
import { useState } from "react";
import SyntaxHighlighter, {
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { stackoverflowLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeBlockProps extends SyntaxHighlighterProps {
  collapse?: boolean;
}

const CodeBlock: FC<CodeBlockProps> = ({ collapse = false, ...props }) => {
  const [openState, setOpenState] = useState(false);

  const toggleOpen = () => setOpenState((cur) => !cur);

  if (collapse) {
    return (
      <div>
        <Button className="my-4" color="cyan" onClick={toggleOpen}>
          view code
        </Button>
        <Collapse open={openState}>
          <SyntaxHighlighter style={stackoverflowLight} {...props} />
        </Collapse>
      </div>
    );
  }

  return <SyntaxHighlighter style={stackoverflowLight} {...props} />;
};

export default CodeBlock;
