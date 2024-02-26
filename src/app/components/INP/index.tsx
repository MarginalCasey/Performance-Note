"use client";
import { useEffect, useState } from "react";
import type { INPMetric } from "web-vitals";
import { onINP } from "web-vitals";

export default function INP() {
  const [inp, setINP] = useState<INPMetric>();

  useEffect(() => {
    onINP(setINP, { reportAllChanges: true });
  }, []);

  return (
    <div>
      <h1>INP</h1>
      {inp && (
        <>
          <div>value: {inp.value}</div>
          <div>rating: {inp.rating}</div>
        </>
      )}
    </div>
  );
}
