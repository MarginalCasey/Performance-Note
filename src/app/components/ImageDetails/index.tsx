"use client";

import type { FC } from "react";
import { useEffect, useState } from "react";

interface ImageDetailsProps {
  id: string;
}

interface ImageDetailsState {
  currentSrc: string;
  dpr: number | null;
}

const ImageDetails: FC<ImageDetailsProps> = ({ id }) => {
  const [details, setDetails] = useState<ImageDetailsState>({
    currentSrc: "",
    dpr: null,
  });

  useEffect(() => {
    const img = document.getElementById(id) as HTMLImageElement | null;
    if (img) {
      const getImageDetail = () => {
        const { currentSrc } = img;
        const dpr = window.devicePixelRatio;

        setDetails({ currentSrc: currentSrc.split("/").pop() as string, dpr });
      };

      getImageDetail();
      img.onload = () => {
        getImageDetail();
      };
    }
  }, [id]);

  return (
    <table className="mt-4">
      <thead>
        <tr>
          <th colSpan={2}>
            <h4 className="m-0">Image Details</h4>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>File</td>
          <td>{details.currentSrc}</td>
        </tr>
        <tr>
          <td>DPR</td>
          <td>{details.dpr}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ImageDetails;
