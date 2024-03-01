import LCP from "@/app/components/metrics/LCP";

const SvgImage = () => {
  return (
    <div>
      <svg width="640" height="426" xmlns="http://www.w3.org/2000/svg">
        <image href={`/image-640-uncompressed.jpg?v=2&time=${Date.now()}`} />
      </svg>
      <LCP />
    </div>
  );
};

export default SvgImage;
