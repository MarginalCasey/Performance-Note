import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  ListItem,
} from "@material-tailwind/react";
import { usePathname } from "next/navigation";
import type { FC } from "react";
import { ReactNode, useState } from "react";

interface AccordionItemProps {
  text: string;
  path: string;
  visitable?: boolean;
  children: ReactNode;
}

const AccordionItem: FC<AccordionItemProps> = ({
  text,
  path,
  visitable = false,
  children,
}) => {
  const pathname = usePathname();
  const open =
    pathname === path ||
    pathname?.startsWith(`${path}/`) ||
    pathname?.startsWith(`/demo${path}/`);

  const [openState, setOpenState] = useState(open ?? false);

  const onAccordionClick = () => {
    setOpenState(!openState);
  };

  return (
    <Accordion
      open={openState}
      icon={
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`mx-auto h-4 w-4 transition-transform ${openState ? "rotate-180" : ""}`}
        />
      }
    >
      <ListItem className="p-0" selected={pathname === path}>
        <AccordionHeader onClick={onAccordionClick} className="border-b-0 p-3">
          {visitable ? <a href={path}>{text}</a> : text}
        </AccordionHeader>
      </ListItem>
      <AccordionBody className="py-1 pl-4">{children}</AccordionBody>
    </Accordion>
  );
};

export default AccordionItem;
