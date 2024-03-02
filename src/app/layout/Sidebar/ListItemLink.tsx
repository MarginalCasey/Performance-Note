import { ListItem } from "@material-tailwind/react";
import { usePathname } from "next/navigation";
import type { FC } from "react";

interface ListItemLinkProps {
  text: string;
  path: string;
}

const ListItemLink: FC<ListItemLinkProps> = ({ text, path }) => {
  const pathname = usePathname();

  return (
    <a href={path}>
      <ListItem selected={pathname === path}>{text}</ListItem>
    </a>
  );
};

export default ListItemLink;
