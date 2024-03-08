import { ExclamationCircleIcon, StarIcon } from "@heroicons/react/24/solid";
import type { FC } from "react";
import { ReactNode } from "react";

interface AlertProps {
  type: "info" | "warning";
  children: ReactNode;
}

const Alert: FC<AlertProps> = ({ type, children }) => {
  if (type === "info") {
    return (
      <div className="p-4 pl-3  text-blue-700 bg-blue-50 rounded flex">
        <div className="mr-2">
          <StarIcon className="w-4 h-4 m-1" />
        </div>
        <div>{children}</div>
      </div>
    );
  }

  return (
    <div className="p-4 pl-3  text-red-700 bg-red-50 rounded flex">
      <div className="mr-2">
        <ExclamationCircleIcon className="w-4 h-4 m-1" />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Alert;
