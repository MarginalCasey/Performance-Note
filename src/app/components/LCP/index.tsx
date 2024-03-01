"use client";
import { useEffect, useState } from "react";
import type { LCPMetricWithAttribution } from "web-vitals";
import { onLCP } from "web-vitals/attribution";

export default function LCP() {
  const [lcp, setLCP] = useState<LCPMetricWithAttribution>();

  useEffect(() => {
    onLCP(setLCP, { reportAllChanges: true });
  }, []);

  useEffect(() => {
    if (lcp?.attribution.element) {
      const selector = lcp.attribution.element.replace(
        /[[\]]/g,
        (match) => `\\${match}`,
      );
      const element: HTMLElement | null = document.querySelector(selector);

      if (element) {
        element.classList.add("border-4", "border-red-500");

        return () => {
          element.classList.remove("border-4", "border-red-500");
        };
      }
    }
  }, [lcp?.attribution.element]);

  return (
    <div>
      <h1>LCP</h1>
      {lcp && (
        <>
          <div>value: {Math.round(lcp.value)}</div>
          <div>rating: {lcp.rating}</div>
          <div>
            Time to first byte: {Math.round(lcp.attribution.timeToFirstByte)}
          </div>
          <div>
            Resource load delay: {Math.round(lcp.attribution.resourceLoadDelay)}
          </div>
          <div>
            Resource load time: {Math.round(lcp.attribution.resourceLoadTime)}
          </div>
          <div>
            Element render delay:{" "}
            {Math.round(lcp.attribution.elementRenderDelay)}
          </div>
        </>
      )}
    </div>
  );
}
