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
import type { Tokens } from 'marked';
import { Marked, Renderer } from 'marked';

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

function escapeHTML(str: string) {
  return str;
}

// 渲染空格
function renderSpace(item: Tokens.Space) {
  return item?.type === 'space' ? ' ' : '';
}

// 渲染blockquote
function renderBlockquote(item: Tokens.Blockquote) {
  if (!item || item.type !== 'blockquote') return '';

  const content = renderChildTokens(item.tokens || []);
  return `<blockquote>${content}</blockquote>`;
}

// 渲染html
function renderHtml(item: Tokens.HTML) {
  return item?.type === 'html' ? item.text || '' : '';
}

// 渲染html
function renderHeading(item: Tokens.Heading) {
  if (!item || item.type !== 'heading') return '';

  const level = Math.min(Math.max(item.depth || 1, 1), 6);
  const content = renderChildTokens(item.tokens || []);
  return `<h${level}>${content}</h${level}>`;
}

// 渲染hr
function renderHr(item: Tokens.Hr) {
  return item?.type === 'hr' ? '<hr>' : '';
}

// 渲染列表
function renderList(tokens: Tokens.List): string {
  if (!tokens || tokens.type !== 'list') return '';

  const tag = tokens.ordered ? 'ol' : 'ul';
  const startAttr = tokens.start ? ` start="${tokens.start}"` : '';
  const itemsHTML = tokens.items.map(renderListItem).join('');

  return `<${tag}${startAttr}>${itemsHTML}</${tag}>`;
}

function renderListItem(token: Tokens.ListItem): string {
  if (!token || token.type !== 'list_item') return '';

  const content = token.tokens ? renderChildTokens(token.tokens) : escapeHTML(token.text || '');
  return `<li>${content}</li>`;
}

// 渲染段落
function renderParagraph(item: Tokens.Paragraph) {
  if (!item || item.type !== 'paragraph') return '';

  const content = renderChildTokens(item.tokens || []);
  return `<p class="w-full whitespace-normal break-all">${content}</p>`;
}

// 渲染表格

function renderTable(item: Tokens.Table) {
  if (!item || item.type !== 'table') return '';

  const thead = renderTableHeader(item.header, item.align || []);
  const tbody = renderTableBody(item.rows, item.align || []);

  return `<table>${thead}${tbody}</table>`;
}

function renderTableHeader(header: Tokens.Table['header'], align: Tokens.Table['align']) {
  if (!header || !Array.isArray(header)) return '';

  const headerCells = header
    .map((cell, index) => `<th style="text-align: ${align[index] || 'left'};">${escapeHTML(cell.text || '')}</th>`)
    .join('');

  return `<thead><tr>${headerCells}</tr></thead>`;
}

function renderTableBody(rows: Tokens.Table['rows'], align: Tokens.Table['align']) {
  if (!rows || !Array.isArray(rows)) return '';

  const bodyRows = rows
    .map(row => {
      const rowCells = row
        .map((cell, index) => `<td style="text-align: ${align[index] || 'left'};">${escapeHTML(cell.text || '')}</td>`)
        .join('');
      return `<tr>${rowCells}</tr>`;
    })
    .join('');

  return `<tbody>${bodyRows}</tbody>`;
}

// 渲染strong
function renderStrong(item: Tokens.Strong) {
  if (!item || item.type !== 'strong') return '';

  const content = renderChildTokens(item.tokens || []);
  return `<strong>${content}</strong>`;
}

// 渲染em
function renderEm(item: Tokens.Em) {
  if (!item || item.type !== 'em') return '';

  const content = renderChildTokens(item.tokens || []);
  return `<em>${content}</em>`;
}

// 渲染br
function renderBr(item: Tokens.Br) {
  return item?.type === 'br' ? '<br>' : '';
}

// 渲染del
function renderDel(item: Tokens.Del) {
  if (!item || item.type !== 'del') return '';

  const content = renderChildTokens(item.tokens || []);
  return `<del>${content}</del>`;
}

// 渲染链接
function renderLink(token: Tokens.Link): string {
  if (!token || token.type !== 'link') return '';

  const href = escapeHTML(token.href || '#');
  const title = token.title ? ` title="${escapeHTML(token.title)}"` : '';
  const content = renderChildTokens(token.tokens || []);

  return `<a href="${href}"${title}>${content}</a>`;
}

// 通用函数：渲染子节点数组
function renderChildTokens(tokens: any[]): string {
  console.log('🚀 ~ renderChildTokens ~ tokens:', tokens);
  return tokens.map(renderInlineToken).join('');
}

// 通用函数：处理内联 token
function renderInlineToken(token: any): string {
  if (!token) return '';

  if (token.type === 'space') {
    return renderSpace(token);
  } else if (token.type === 'blockquote') {
    return renderBlockquote(token);
  } else if (token.type === 'html') {
    return renderHtml(token);
  } else if (token.type === 'heading') {
    return renderHeading(token);
  } else if (token.type === 'hr') {
    return renderHr(token);
  } else if (token.type === 'list') {
    return renderList(token);
  } else if (token.type === 'list_item') {
    return renderListItem(token);
  } else if (token.type === 'paragraph') {
    return renderParagraph(token);
  } else if (token.type === 'table') {
    return renderTable(token);
  } else if (token.type === 'strong') {
    return renderStrong(token);
  } else if (token.type === 'em') {
    return renderEm(token);
  } else if (token.type === 'br') {
    return renderBr(token);
  } else if (token.type === 'del') {
    return renderDel(token);
  } else if (token.type === 'link') {
    return renderLink(token);
  } else if (token.type === 'text') {
    const html = token.tokens ? renderChildTokens(token.tokens || []) : token.text;
    return html;
  } else if (token.type === 'escape') {
    return token.raw;
  }
  return '';
}

// Renderer 方法绑定
renderer.space = renderSpace;

renderer.blockquote = renderBlockquote;

renderer.paragraph = renderParagraph;

renderer.html = renderHtml;

renderer.heading = renderHeading;

renderer.hr = renderHr;

renderer.table = renderTable;

renderer.list = renderList;

renderer.listitem = renderListItem;

renderer.strong = renderStrong;

renderer.em = renderEm;

renderer.br = renderBr;

renderer.del = renderDel;

renderer.link = renderLink;

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

// 导出 markedRender
export const markedRender = (val: string) => {
  return marked.parse(val) as string;
};
