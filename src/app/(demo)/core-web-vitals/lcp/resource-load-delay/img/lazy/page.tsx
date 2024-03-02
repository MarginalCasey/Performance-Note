import CodePreview from "@/app/components/CodePreview";
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
  <img className="lazy" data-src="/image-640-uncompressed.jpg?v=2&time=${Date.now()}" />
  <script>${script}</script>
  `;

  return (
    <div>
      <img
        className="lazy"
        data-src={`/image-640-uncompressed.jpg?v=2&time=${Date.now()}`}
      />
      <Script id="script">{script}</Script>
      <CodePreview language="xml" collapse>
        {code}
      </CodePreview>
      <LCP />
    </div>
  );
};

export default Image;
