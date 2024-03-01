import LCP from "@/app/components/metrics/LCP";

const VideoPoster = () => {
  return (
    <div>
      <video
        controls
        width="1920"
        height="1080"
        poster={`https://learn-performance-images.glitch.me/images/image-640-uncompressed.jpg?v=2&time=${Date.now()}`}
      >
        <source
          type="video/mp4"
          src={`https://cdn.glitch.global/97616b87-f930-4eb0-a8a0-84c6a73d97e7/video-1920.mp4?time=${Date.now()}`}
        />
        <source
          type="video/webm"
          src={`https://cdn.glitch.global/97616b87-f930-4eb0-a8a0-84c6a73d97e7/video-1920.webm?time=${Date.now()}`}
        />
      </video>
      <LCP />
    </div>
  );
};

export default VideoPoster;
