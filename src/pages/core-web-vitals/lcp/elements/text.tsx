import Lipsum from "@/app/components/Lipsum";
import LCP from "@/app/components/metrics/LCP";

const Text = () => {
  return (
    <div>
      <Lipsum />
      <LCP />
    </div>
  );
};

export default Text;
