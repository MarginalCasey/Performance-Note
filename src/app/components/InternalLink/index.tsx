import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";
import type { AnchorHTMLAttributes, FC } from "react";

const InternalLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  children,
  ...props
}) => {
  return (
    <a {...props}>
      <ArrowLeftEndOnRectangleIcon className="inline-block align-middle mr-1 mb-1 w-4 h-4" />
      {children}
    </a>
  );
};

export default InternalLink;
