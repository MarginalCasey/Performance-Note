import CodeBlock from "@/app/components/CodeBlock";
import CodeBlockCollapse from "@/app/components/CodeBlockCollapse";
import ImageDetails from "@/app/components/ImageDetails";
import Lipsum from "@/app/components/Lipsum";
import CLS from "@/app/components/metrics/CLS";
import "../style.css";

export const getServerSideProps = () => {
  const time = Date.now();
  return { props: { time } };
};

const Image = ({ time }: { time: number }) => {
  const html = `
  <picture>
    <source
      media="(max-width: 639px)"
      srcSet="/image-640-cropped-uncompressed.jpg?time=${time}"
      width={640}
      height={852}
    />
    <source
      media="(min-width: 640px)"
      srcSet="/image-640-uncompressed.jpg?time=${time}"
      width={640}
      height={426}
    />
    <img
      id="responsive-img"
      src="/image-640-uncompressed.jpg?time=${time}"
      width={640}
      height={426}
    />
  </picture>
  `;

  const css = `
  #responsive-img {
    width: 100%;
    height: auto;
  }  
  `;

  return (
    <div>
      <picture>
        <source
          media="(max-width: 639px)"
          srcSet={`/image-640-cropped-uncompressed.jpg?time=${time}`}
          width={640}
          height={852}
        />
        <source
          media="(min-width: 640px)"
          srcSet={`/image-640-uncompressed.jpg?time=${time}`}
          width={640}
          height={426}
        />
        <img
          id="responsive-img"
          src={`/image-640-uncompressed.jpg?time=${time}`}
          width={640}
          height={426}
        />
      </picture>
      <Lipsum />
      <CodeBlockCollapse>
        <CodeBlock language="xml">{html}</CodeBlock>
        <CodeBlock language="css">{css}</CodeBlock>
      </CodeBlockCollapse>
      <ImageDetails id="responsive-img" />
      <CLS />
    </div>
  );
};

export default Image;
