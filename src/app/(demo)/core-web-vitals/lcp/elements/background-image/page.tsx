import LCP from "@/app/components/metrics/LCP";

const BackgroundImage = () => {
  return (
    <div>
      <div
        style={{
          width: 640,
          height: 426,
          backgroundImage: `url("/image-640-uncompressed.jpg?v=2&time=${Date.now()}")`,
        }}
      />
      <LCP />
    </div>
  );
};

export default BackgroundImage;
