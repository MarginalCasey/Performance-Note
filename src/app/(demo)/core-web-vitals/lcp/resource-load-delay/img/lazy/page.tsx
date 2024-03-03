import CodeBlock from "@/app/components/CodeBlock";
import LCP from "@/app/components/metrics/LCP";
import Script from "next/script";

const Image = () => {
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
  <img className="lazy" data-src="/image-640-uncompressed.jpg?time=${Date.now()}" />
  <script>${script}</script>
  `;

  return (
    <div>
      <img
        className="lazy"
        data-src={`/image-640-uncompressed.jpg?time=${Date.now()}`}
      />
      <Script id="script">{script}</Script>
      <CodeBlock language="xml" collapse>
        {code}
      </CodeBlock>
      <LCP />
    </div>
  );
};

export default Image;
