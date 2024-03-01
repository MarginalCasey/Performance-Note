import LCP from "@/app/components/metrics/LCP";

const Image = () => {
  return (
    <div>
      <img
        src={`https://learn-performance-images.glitch.me/images/image-640-uncompressed.jpg?v=2&time=${Date.now()}`}
      />
      <LCP />
    </div>
  );
};

export default Image;
