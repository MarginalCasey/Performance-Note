const CodeSplitting = () => {
  return (
    <div>
      <h1>Code Splitting</h1>
      <p>
        Code Splitting 就是為了要解決單一 JS Bundle 過於肥大的問題，將原本單一的
        bundle 切分成數個小
        chunk，可以搭配平行載入，或者是有需要時才載入某些特定的
        chink，又或是對一些不常變動的 chunk 個別做快取，來達到載入效能的優化
      </p>
      <section>
        <h3>常見的 Code Splitting 做法</h3>
        <section>
          <h4>獨立抽離第三方套件</h4>
          <ul>
            <li>
              將所有第三方套件打包為單一檔案
              <ul>
                <li>
                  Application Bundle
                  <p>UI 與商業邏輯，是經常變動的部分</p>
                </li>
                <li>
                  Vendor Bundle
                  <p>第三⽅套件 / node_modules，不太會變動</p>
                </li>
              </ul>
            </li>
            <li>
              將第三方套件打包為多個檔案
              <ul>
                <li>根據套件關聯性打包</li>
                <li>如 webpack 的 CommonsChunkPlugin</li>
              </ul>
            </li>
          </ul>
        </section>
        <section>
          <h4>動態載入模組</h4>
          <ul>
            <li>根據路由做 Dynamic Import</li>
            <li>針對肥大套件做 Dynamic Import</li>
          </ul>
        </section>
      </section>
    </div>
  );
};

export default CodeSplitting;
