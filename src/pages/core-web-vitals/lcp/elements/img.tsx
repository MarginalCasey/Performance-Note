import LCP from "@/app/components/metrics/LCP";

export const getServerSideProps = () => {
  const time = Date.now();
  return { props: { time } };
};

const Image = ({ time }: { time: number }) => {
  return (
    <div>
      <img src={`/image-640-uncompressed.jpg?time=${time}`} />
      <LCP />
    </div>
  );
};

export default Image;
