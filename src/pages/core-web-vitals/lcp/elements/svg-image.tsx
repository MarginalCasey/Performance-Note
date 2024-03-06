import LCP from "@/app/components/metrics/LCP";

export const getServerSideProps = () => {
  const time = Date.now();
  return { props: { time } };
};

const SvgImage = ({ time }: { time: number }) => {
  return (
    <div>
      <svg width="640" height="426" xmlns="http://www.w3.org/2000/svg">
        <image href={`/image-640-uncompressed.jpg?time=${time}`} />
      </svg>
      <LCP />
    </div>
  );
};

export default SvgImage;
