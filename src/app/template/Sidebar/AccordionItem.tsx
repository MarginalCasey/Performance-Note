import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  ListItem,
} from "@material-tailwind/react";
import type { FC } from "react";
import { ReactNode, useState } from "react";

interface AccordionItemProps {
  open?: boolean;
  selected?: boolean;
  header: ReactNode;
  children: ReactNode;
}

const AccordionItem: FC<AccordionItemProps> = ({
  open,
  selected,
  header,
  children,
}) => {
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
      <ListItem className="p-0" selected={selected}>
        <AccordionHeader onClick={onAccordionClick} className="border-b-0 p-3">
          {header}
        </AccordionHeader>
      </ListItem>
      <AccordionBody className="py-1 pl-4">{children}</AccordionBody>
    </Accordion>
  );
};

export default AccordionItem;
