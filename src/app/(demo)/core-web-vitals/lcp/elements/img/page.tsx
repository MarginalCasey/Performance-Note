import LCP from "@/app/components/metrics/LCP";

const Image = () => {
  return (
    <div>
      <img src={`/image-640-uncompressed.jpg?time=${Date.now()}`} />
      <LCP />
    </div>
  );
};

export default Image;
