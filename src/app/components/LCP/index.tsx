"use client";
import { useEffect, useState } from "react";
import type { LCPMetric } from "web-vitals";
import { onLCP } from "web-vitals";

export default function LCP() {
  const [lcp, setLCP] = useState<LCPMetric>();

  useEffect(() => {
    onLCP(setLCP, { reportAllChanges: true });
  }, []);

  return (
    <div>
      <h1>LCP</h1>
      {lcp && (
        <>
          <div>value: {lcp.value}</div>
          <div>rating: {lcp.rating}</div>
        </>
      )}
    </div>
  );
}
