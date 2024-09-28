import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import go from 'highlight.js/lib/languages/go';
import java from 'highlight.js/lib/languages/java';
import rust from 'highlight.js/lib/languages/rust';
import shell from 'highlight.js/lib/languages/shell';
import php from 'highlight.js/lib/languages/php';
import sql from 'highlight.js/lib/languages/sql';
import less from 'highlight.js/lib/languages/less';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml'; // HTML 使用 'xml' 模块
import json from 'highlight.js/lib/languages/json';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import plaintext from 'highlight.js/lib/languages/plaintext';

import { markedHighlight } from 'marked-highlight';
import { Marked, Renderer } from 'marked';
import markedKatex from 'marked-katex-extension';

const languages = {
  javascript,
  python,
  go,
  java,
  rust,
  shell,
  php,
  sql,
  less,
  css,
  xml,
  json,
  c,
  plaintext,
  cpp
};

// 循环注册所有语言模块
for (const [name, module] of Object.entries(languages)) {
  hljs.registerLanguage(name, module);
}
const renderer = new Renderer();
// renderer.paragraph = ({ text }) => {
//   return `<p class="w-full whitespace-normal break-all " style="word-break:break-all">${text}</p>\n`;
// };

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, language) {
      const validLanguage = Boolean(language && hljs.getLanguage(language));
      const highlighted = validLanguage ? hljs.highlight(code, { language }).value : hljs.highlightAuto(code).value;
      return highlighted;
      // const languagess = hljs.getLanguage(language) ? language : 'plaintext';
      // return hljs.highlight(code, { language: languagess }).value;
    }
  })
);

marked.use({
  renderer,
  gfm: true // 启动类似于Github样式的Markdown语法
});
marked.use(markedKatex({ throwOnError: false, output: 'mathml', nonStandard: true }));

// 导出 markedRender
export const markedRender = (val: string) => {
  return marked.parse(val) as string;
};
