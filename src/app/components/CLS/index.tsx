"use client";
import { useEffect, useState } from "react";
import type { CLSMetric } from "web-vitals";
import { onCLS } from "web-vitals";

export default function LCP() {
  const [cls, setCLS] = useState<CLSMetric>();

  useEffect(() => {
    onCLS(setCLS, { reportAllChanges: true });
  }, []);

  return (
    <div>
      <h1>CLS</h1>
      {cls && (
        <>
          <div>value: {cls.value}</div>
          <div>rating: {cls.rating}</div>
        </>
      )}
    </div>
  );
}
