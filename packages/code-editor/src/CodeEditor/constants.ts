import { type LanguageName } from './hooks/extensions/useLanguageExtension';

/**
 * Mapping of language names to their corresponding file extensions
 */
export const LANGUAGE_EXTENSION_MAP: Record<LanguageName, string> = {
  cpp: 'cpp',
  csharp: 'cs',
  css: 'css',
  go: 'go',
  html: 'html',
  java: 'java',
  javascript: 'js',
  jsx: 'jsx',
  json: 'json',
  kotlin: 'kt',
  php: 'php',
  python: 'py',
  ruby: 'rb',
  rust: 'rs',
  typescript: 'ts',
  tsx: 'tsx',
} as const;
