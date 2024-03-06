import CodeBlock from "@/app/components/CodeBlock";
import CodeBlockCollapse from "@/app/components/CodeBlockCollapse";
import LCP from "@/app/components/metrics/LCP";
import Script from "next/script";

export const getServerSideProps = () => {
  const time = Date.now();
  return { props: { time } };
};

const Image = ({ time }: { time: number }) => {
  const script = `
    const lazyImages = document.querySelectorAll('img.lazy');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const target = entry.target;
                target.src = target.dataset.src;
                observer.unobserve(target);
            }
        });
    });

    lazyImages.forEach(function(lazyImage) {
        observer.observe(lazyImage);
    });
  `;
  const code = `
  <img className="lazy" data-src="/image-640-uncompressed.jpg?time=${time}" />
  <script>${script}</script>
  `;

  return (
    <div>
      <img
        className="lazy"
        data-src={`/image-640-uncompressed.jpg?time=${time}`}
      />
      <Script id="script">{script}</Script>
      <CodeBlockCollapse>
        <CodeBlock language="xml">{code}</CodeBlock>
      </CodeBlockCollapse>
      <LCP />
    </div>
  );
};

export default Image;
