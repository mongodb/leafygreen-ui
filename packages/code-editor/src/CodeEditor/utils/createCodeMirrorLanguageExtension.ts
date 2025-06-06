const codeMirrorLanguageExtenstions = {
  cpp: async () => {
    const { cpp } = await import('@codemirror/lang-cpp');
    return cpp();
  },
  csharp: async () => {
    const { csharp } = await import('@replit/codemirror-lang-csharp');
    return csharp();
  },
  css: async () => {
    const { cpp } = await import('@codemirror/lang-cpp');
    return cpp();
  },
  go: async () => {
    const { css } = await import('@codemirror/lang-css');
    return css();
  },
  html: async () => {
    const { html } = await import('@codemirror/lang-html');
    return html();
  },
  java: async () => {
    const { java } = await import('@codemirror/lang-java');
    return java();
  },
  javascript: async () => {
    const { javascript } = await import('@codemirror/lang-javascript');
    return javascript({ jsx: false, typescript: false });
  },
  jsx: async () => {
    const { javascript } = await import('@codemirror/lang-javascript');
    return javascript({ jsx: true, typescript: false });
  },
  json: async () => {
    const { json } = await import('@codemirror/lang-json');
    return json();
  },
  kotlin: async () => {
    const { StreamLanguage } = await import('@codemirror/language');
    const { kotlin } = await import('@codemirror/legacy-modes/mode/clike');
    return StreamLanguage.define(kotlin);
  },
  php: async () => {
    const { php } = await import('@codemirror/lang-php');
    return php();
  },
  python: async () => {
    const { python } = await import('@codemirror/lang-python');
    return python();
  },
  ruby: async () => {
    const { StreamLanguage } = await import('@codemirror/language');
    const { ruby } = await import('@codemirror/legacy-modes/mode/ruby');
    return StreamLanguage.define(ruby);
  },
  rust: async () => {
    const { rust } = await import('@codemirror/lang-rust');
    return rust();
  },
  typescript: async () => {
    const { javascript } = await import('@codemirror/lang-javascript');
    return javascript({ jsx: false, typescript: true });
  },
  tsx: async () => {
    const { javascript } = await import('@codemirror/lang-javascript');
    return javascript({ jsx: true, typescript: true });
  },
};

export function createCodeMirrorLanguageExtension(language: LanguageName) {
  return codeMirrorLanguageExtenstions[language]();
}

export const languageNames = Object.keys(
  codeMirrorLanguageExtenstions,
) as Array<LanguageName>;
export type LanguageName = keyof typeof codeMirrorLanguageExtenstions;
