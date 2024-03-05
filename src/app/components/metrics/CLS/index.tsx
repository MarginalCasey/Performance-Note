"use client";
import { useEffect, useState } from "react";
import type { CLSMetric } from "web-vitals";
import { onCLS } from "web-vitals";
import MetricDrawer from "../MetricDrawer";

export default function LCP() {
  const [cls, setCLS] = useState<CLSMetric>();

  useEffect(() => {
    onCLS(
      (data) => {
        setCLS({ ...data });
      },
      { reportAllChanges: true },
    );
  }, []);

  if (!cls) return null;

  return (
    <MetricDrawer name="CLS">
      <h1>CLS</h1>
      <div>value: {cls.value.toFixed(4)}</div>
      <div>rating: {cls.rating}</div>
    </MetricDrawer>
  );
}
