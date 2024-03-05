import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button, Drawer, IconButton } from "@material-tailwind/react";
import type { FC, ReactNode } from "react";
import { useState } from "react";

interface MetricDrawerProps {
  name: string;
  children: ReactNode;
}

const MetricDrawer: FC<MetricDrawerProps> = ({ name, children }) => {
  const [open, setOpen] = useState(true);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <div className="absolute top-4 right-4">
        <Button onClick={openDrawer}>{name}</Button>
      </div>
      <Drawer
        open={open}
        onClose={closeDrawer}
        placement="bottom"
        overlayProps={{ className: "bg-opacity-10 backdrop-blur-none" }}
        className="p-4"
      >
        <div className="absolute top-4 right-4">
          <IconButton
            size="sm"
            variant="text"
            className="rounded-full"
            onClick={closeDrawer}
          >
            <XMarkIcon className="w-4 h-4" />
          </IconButton>
        </div>
        {children}
      </Drawer>
    </>
  );
};
export default MetricDrawer;
