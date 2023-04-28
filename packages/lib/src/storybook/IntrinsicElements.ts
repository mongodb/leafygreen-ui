const IntrinsicElements: Array<keyof JSX.IntrinsicElements> = [
  // 'symbol', - SVG only element
  // 'object', - irrelevant for `as` prop
  'small',
  'button',
  'a',
  'abbr',
  'address',
  // 'area', - Void element - cannot accept Children
  'article',
  'aside',
  // 'audio', irrelevant for `as` prop
  'b',
  // 'base', - Void element - cannot accept Children
  // 'bdi', irrelevant for `as` prop
  // 'bdo', irrelevant for `as` prop
  'big',
  'blockquote',
  // 'body', irrelevant for `as` prop
  // 'br', - Void element - cannot accept Children
  // 'canvas', irrelevant for `as` prop
  'caption',
  'cite',
  'code',
  // 'col', - Void element - cannot accept Children
  // 'colgroup', irrelevant for `as` prop
  // 'data', irrelevant for `as` prop
  // 'datalist', irrelevant for `as` prop
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  // 'dl', irrelevant for `as` prop
  // 'dt', irrelevant for `as` prop
  'em',
  // 'embed', - Void element - cannot accept Children
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  // 'hr', - Void element - cannot accept Children
  // 'html', irrelevant for `as` prop
  'i',
  // 'iframe', irrelevant for `as` prop
  // 'img', - Void element - cannot accept Children
  // 'input', - Void element - cannot accept Children
  'ins',
  'kbd',
  'keygen',
  'label',
  'legend',
  'li',
  // 'link', - Void element - cannot accept Children
  'main',
  'map',
  'mark',
  'menu',
  'menuitem',
  // 'meta', - Void element - cannot accept Children
  'meter',
  'nav',
  // 'noindex', irrelevant for `as` prop
  'noscript',
  'ol',
  // 'optgroup', irrelevant for `as` prop
  // 'option', irrelevant for `as` prop
  // 'output', irrelevant for `as` prop
  'p',
  // 'param', irrelevant for `as` prop
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'slot',
  'script',
  'section',
  'select',
  // 'source', - Void element - cannot accept Children
  'span',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  // 'table', irrelevant for `as` prop
  'template',
  'tbody',
  'td',
  // 'textarea', irrelevant for `as` prop
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  // 'track', - Void element - cannot accept Children
  'u',
  'ul',
  // 'var', irrelevant for `as` prop
  // 'video', irrelevant for `as` prop
  // 'wbr', - Void element - cannot accept Children
  // 'webview', irrelevant for `as` prop
  // 'svg', - SVG only element
];

export default IntrinsicElements;
