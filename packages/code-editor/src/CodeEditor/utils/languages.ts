export const codeMirrorLanguageExtenstions = {
  cpp: async () => {
    const { cpp } = await import('@codemirror/lang-cpp');
    return cpp();
  },
  csharp: async () => {},
  css: async () => {},
  go: async () => {},
  html: async () => {},
  java: async () => {},
  javascript: async () => {},
  jsx: async () => {},
  json: async () => {},
  kotlin: async () => {},
  php: async () => {},
  python: async () => {},
  ruby: async () => {},
  rust: async () => {},
  typescript: async () => {},
  tsx: async () => {},
};
