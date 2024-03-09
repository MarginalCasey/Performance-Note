import CodeBlock from "@/app/components/CodeBlock";
import ExternalLink from "@/app/components/ExternalLink";
import InternalLink from "@/app/components/InternalLink";
import { PERFORMANCE_OPTIMIZATION } from "@/app/path";

const Image = () => {
  return (
    <div>
      <h1>圖片最佳化</h1>
      <section>
        <h3>檔案格式</h3>
        <table className="mt-2 text-sm">
          <tbody>
            <tr>
              <td></td>
              <td>PNG</td>
              <td>JPEG</td>
              <td>WebP</td>
              <td>AVIF</td>
            </tr>
            <tr>
              <td>圖檔大小</td>
              <td>大</td>
              <td>中</td>
              <td>小</td>
              <td>更小</td>
            </tr>
            <tr>
              <td>壓縮</td>
              <td>無損</td>
              <td>有損</td>
              <td>有損/無損</td>
              <td>有損/無損</td>
            </tr>
            <tr>
              <td>支援動圖</td>
              <td></td>
              <td></td>
              <td>V</td>
              <td>V</td>
            </tr>
            <tr>
              <td>其他</td>
              <td></td>
              <td>
                適合大背景圖
                <br />
                有損壓縮讓文字、線條易產生瑕疵
              </td>
              <td>瀏覽器支援度較差</td>
              <td>瀏覽器支援度更差</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <h3>圖片尺寸</h3>
        <section>
          <h4>srcset</h4>
          <p>
            一個或多組由逗號所分隔的字串，用來表示可能的圖片來源，每組字串包含
          </p>
          <ol>
            <li>圖片 URL</li>
            <li>
              (optional) 空格加上以下其一
              <ul>
                <li>
                  一個寬度 descriptor，用來描述圖片的固有寬度
                  <p>必須同時跟 sizes 一起使用</p>
                </li>
                <li>一個像素密度 descriptor，用來描述裝置的 DPR</li>
              </ul>
            </li>
          </ol>
        </section>
        <section>
          <h4>sizes</h4>
          <p>一個或多組由逗號所分隔的字串，用來表示圖片的尺寸，每組字串包含</p>
          <ol>
            <li>一個 media condition (最後一組一定是空的)</li>
            <li>一個圖片的寬度</li>
          </ol>
        </section>
        <section>
          <h4>範例</h4>
          <p>
            不同 DPR 時載入不同尺寸的圖片{" "}
            <InternalLink href={PERFORMANCE_OPTIMIZATION.IMAGE.DPR_DEMO.PATH}>
              範例
            </InternalLink>
          </p>
          <CodeBlock language="xml">
            {`
  <img
    src="img.jpg"
    srcset="img_1x.jpg 1x, img_2x.jpg 2x"
  />
            `}
          </CodeBlock>
          <br />
          <p>
            根據 media 及 DPR 載入不同尺寸的圖片{" "}
            <InternalLink
              href={PERFORMANCE_OPTIMIZATION.IMAGE.MEDIA_AND_DPR_DEMO.PATH}
            >
              範例
            </InternalLink>
          </p>
          <CodeBlock language="xml">
            {`
  <img
    src="img_small.jpg"
    srcset="img_small.jpg 300w, img_mid.jpg 600w, img_large.jpg 1000w"
    sizes="(max-width: 400px) 300px, 50vw"
  />
            `}
          </CodeBlock>
        </section>
      </section>
      <section>
        <h3>{"<picture>"}</h3>
        <p>
          包含了 ≥ 0 個 <code>{"<source>"}</code> 以及一個{" "}
          <code>{"<img>"}</code>{" "}
          元素，以為不同顯示器/裝置提供同張圖片的不同版本。
        </p>
        <p>
          可以靈活地指定多張圖片，瀏覽器會由上而下選出適合的
          source，或是顯示預設的圖片
        </p>
        <section>
          <h4>範例</h4>
          <p>
            根據 media 載入不同尺寸的圖片{" "}
            <InternalLink
              href={
                PERFORMANCE_OPTIMIZATION.IMAGE.PICTURE_AND_DIFFERENT_SRCSET_DEMO
                  .PATH
              }
            >
              範例
            </InternalLink>
          </p>
          <CodeBlock language="xml">
            {`
  <picture>
    <source
      media="(min-width: 800px)"
      srcset="img-large-1x.jpg 1x, img-large-2x.jpg 2x"
      sizes="(max-width: 400px) 300px, 50vw"
    />
    <source
      media="(min-width: 500px)"
      srcset="img-medium-1x.jpg 1x, img-medium-2x.jpg 2x"
      sizes="(max-width: 400px) 300px, 50vw"
    />
    <img src="img-small.jpg" />
  </picture>
            `}
          </CodeBlock>
          <p>
            處理圖片格式支援度{" "}
            <InternalLink
              href={
                PERFORMANCE_OPTIMIZATION.IMAGE.PICTURE_AND_DIFFERENT_TYPE_DEMO
                  .PATH
              }
            >
              範例
            </InternalLink>
          </p>
          <CodeBlock language="xml">
            {`
  <picture>
    <source
      srcset="img.avif"
      type="image/avif"
    />
    <source
      srcset="img.webp"
      type="image/webp"
    />
    <img src="img.jpg" />
  </picture>
            `}
          </CodeBlock>
        </section>
      </section>
      <section>
        <h3>根據 Accept request header 提供圖片</h3>
        <p>
          Accept HTTP request header
          會告知伺服器使用者瀏覽器可理解的內容類型，伺服器可使用這項資訊提供最佳圖片格式
        </p>
        <CodeBlock language="javascript">
          {`
  if (request.headers.accept) {
    if (request.headers.accept.includes('image/avif')) {
      return reply.from('image.avif');
    } else if (request.headers.accept.includes('image/webp')) {
      return reply.from('image.webp');
    }
  }

  return reply.from('image.jpg');
          `}
        </CodeBlock>
      </section>
      <section>
        <h3>Lazy loading</h3>
        <p>
          <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/loading">
            <code>loading</code>
          </ExternalLink>{" "}
          屬性會提示瀏覽器在圖片位於可視區域之外時該如何載入圖片
        </p>
        <ul>
          <li>
            eager
            <p>預設行為，告訴瀏覽器在處理 {"<img>"} 時就立即載入圖片</p>
          </li>
          <li>
            lazy
            <p>
              告訴瀏覽器在圖片位於 (或接近) 可視區域附近之前，不要下載圖片
              <InternalLink
                href={PERFORMANCE_OPTIMIZATION.IMAGE.LAZY_LOAD_DEMO.PATH}
              >
                範例
              </InternalLink>
            </p>
          </li>
        </ul>
      </section>
      <section>
        <h3>decoding 屬性</h3>
        <p>
          <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decoding">
            <code>decoding</code>
          </ExternalLink>{" "}
          屬性會提示瀏覽器應如何解碼圖片
        </p>
        <ul>
          <li>
            sync
            <p>瀏覽器應以同步方式解碼圖片，以同時顯示圖片與其他內容</p>
          </li>
          <li>
            async
            <p>瀏覽器應以非同步方式解碼圖片，可能改善渲染其他內容的時間</p>
          </li>
          <li>
            auto
            <p>預設值，不同瀏覽器有不同實作</p>
          </li>
        </ul>
        <ExternalLink href="https://www.tunetheweb.com/blog/what-does-the-image-decoding-attribute-actually-do/">
          What does the image decoding attribute actually do?
        </ExternalLink>
      </section>
    </div>
  );
};

export default Image;
