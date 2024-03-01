import type { FC } from "react";
import SyntaxHighlighter, {
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { stackoverflowLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodePreview: FC<SyntaxHighlighterProps> = (props) => {
  return <SyntaxHighlighter style={stackoverflowLight} {...props} />;
};

export default CodePreview;
