import LCP from "@/app/components/metrics/LCP";

export const getServerSideProps = () => {
  const time = Date.now();
  return { props: { time } };
};

const VideoAutoPlayFrame = ({ time }: { time: number }) => {
  return (
    <div>
      <video autoPlay muted playsInline loop width="1920" height="1080">
        <source
          type="video/mp4"
          src={`https://cdn.glitch.global/97616b87-f930-4eb0-a8a0-84c6a73d97e7/video-1920.mp4?time=${time}`}
        />
        <source
          type="video/webm"
          src={`https://cdn.glitch.global/97616b87-f930-4eb0-a8a0-84c6a73d97e7/video-1920.webm?time=${time}`}
        />
      </video>
      <LCP />
    </div>
  );
};

export default VideoAutoPlayFrame;
