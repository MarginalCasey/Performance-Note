import type { AnchorHTMLAttributes, FC } from "react";

const ExternalLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
  return <a target="_blank" {...props} />;
};

export default ExternalLink;
