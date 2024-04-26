import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const Common = () => {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default Common;
