import LCP from "@/app/components/metrics/LCP";

export const getServerSideProps = () => {
  const time = Date.now();
  return { props: { time } };
};

const BackgroundImage = ({ time }: { time: number }) => {
  return (
    <div>
      <div
        style={{
          width: 640,
          height: 426,
          backgroundImage: `url("/image-640-uncompressed.jpg?time=${time}")`,
        }}
      />
      <LCP />
    </div>
  );
};

export default BackgroundImage;
