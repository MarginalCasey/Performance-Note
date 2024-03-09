import CodeBlock from "@/app/components/CodeBlock";
import CodeBlockCollapse from "@/app/components/CodeBlockCollapse";
import ImageDetails from "@/app/components/ImageDetails";

const Image = () => {
  const code = `
  <picture>
    <source
      media="(min-width: 560px) and (-webkit-min-device-pixel-ratio: 1.5)"
      type="image/avif"
      srcSet="/image-1280-lossy.avif 1280w, /image-1920-lossy.avif 1920w"
      sizes="(max-width: 540px) 640px, 46rem"
    />
    <source
      media="(max-width: 560px) and (-webkit-min-device-pixel-ratio: 1.5)"
      type="image/avif"
      srcSet="/image-1280-lossy-sm.avif 1280w, /image-1920-lossy-sm.avif 1920w"
      sizes="(max-width: 540px) 640px, 46rem"
    />
    <source
      type="image/avif"
      srcSet="/image-640-lossy.avif"
      sizes="(max-width: 540px) 640px, 46rem"
    />

    <source
      media="(min-width: 560px) and (-webkit-min-device-pixel-ratio: 1.5)"
      type="image/webp"
      srcSet="/image-1280-lossy.webp 1280w, /image-1920-lossy.webp 1920w"
      sizes="(max-width: 540px) 640px, 46rem"
    />
    <source
      media="(max-width: 560px) and (-webkit-min-device-pixel-ratio: 1.5)"
      type="image/webp"
      srcSet="/image-1280-lossy-sm.webp 1280w, /image-1920-lossy-sm.webp 1920w"
      sizes="(max-width: 540px) 640px, 46rem"
    />
    <source
      type="image/webp"
      srcSet="/image-640-lossy.webp 640w"
      sizes="(max-width: 540px) 640px, 46rem"
    />

    <source
      media="(min-width: 560px) and (-webkit-min-device-pixel-ratio: 1.5)"
      srcSet="/image-1280-lossy.jpg 1280w, /image-1920-lossy.jpg 1920w"
      sizes="(max-width: 540px) 640px, 46rem"
    />
    <source
      media="(max-width: 560px) and (-webkit-min-device-pixel-ratio: 1.5)"
      srcSet="/image-1280-lossy-sm.jpg 1280w, /image-1920-lossy-sm.jpg 1920w"
      sizes="(max-width: 540px) 640px, 46rem"
    />
    <img
      id="image"
      style={{ maxWidth: "100%" }}
      src="/image-1280-lossy.jpg"
    />
  </picture>
  `;

  return (
    <div>
      <picture>
        <source
          media="(min-width: 560px) and (-webkit-min-device-pixel-ratio: 1.5)"
          type="image/avif"
          srcSet="/image-1280-lossy.avif 1280w, /image-1920-lossy.avif 1920w"
          sizes="(max-width: 540px) 640px, 46rem"
        />
        <source
          media="(max-width: 560px) and (-webkit-min-device-pixel-ratio: 1.5)"
          type="image/avif"
          srcSet="/image-1280-lossy-sm.avif 1280w, /image-1920-lossy-sm.avif 1920w"
          sizes="(max-width: 540px) 640px, 46rem"
        />
        <source
          type="image/avif"
          srcSet="/image-640-lossy.avif"
          sizes="(max-width: 540px) 640px, 46rem"
        />

        <source
          media="(min-width: 560px) and (-webkit-min-device-pixel-ratio: 1.5)"
          type="image/webp"
          srcSet="/image-1280-lossy.webp 1280w, /image-1920-lossy.webp 1920w"
          sizes="(max-width: 540px) 640px, 46rem"
        />
        <source
          media="(max-width: 560px) and (-webkit-min-device-pixel-ratio: 1.5)"
          type="image/webp"
          srcSet="/image-1280-lossy-sm.webp 1280w, /image-1920-lossy-sm.webp 1920w"
          sizes="(max-width: 540px) 640px, 46rem"
        />
        <source
          type="image/webp"
          srcSet="/image-640-lossy.webp 640w"
          sizes="(max-width: 540px) 640px, 46rem"
        />

        <source
          media="(min-width: 560px) and (-webkit-min-device-pixel-ratio: 1.5)"
          srcSet="/image-1280-lossy.jpg 1280w, /image-1920-lossy.jpg 1920w"
          sizes="(max-width: 540px) 640px, 46rem"
        />
        <source
          media="(max-width: 560px) and (-webkit-min-device-pixel-ratio: 1.5)"
          srcSet="/image-1280-lossy-sm.jpg 1280w, /image-1920-lossy-sm.jpg 1920w"
          sizes="(max-width: 540px) 640px, 46rem"
        />
        <img
          id="image"
          style={{ maxWidth: "100%" }}
          src="/image-1280-lossy.jpg"
        />
      </picture>
      <CodeBlockCollapse>
        <CodeBlock language="xml">{code}</CodeBlock>
      </CodeBlockCollapse>
      <ImageDetails id="image" />
    </div>
  );
};

export default Image;
