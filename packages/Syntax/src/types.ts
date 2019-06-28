export const Variant = {
  Light: 'light',
  Dark: 'dark',
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

// When adding additional language support, be sure to also add
// the language in webpack.config.js
export const SupportedLanguages = {
  JavaScript: 'javascript',
  TypeScript: 'typescript',
  Csp: 'csp', // C#
  Cpp: 'cpp', // C++
  Go: 'go',
  Java: 'java',
  Perl: 'perl',
  Php: 'php',
  Python: 'python',
  Ruby: 'ruby',
  Scala: 'scala',
  Bash: 'bash',
  Shell: 'shell',
  Sql: 'sql',
  Yaml: 'yaml',
  Json: 'json',
} as const;

export type SupportedLanguages = typeof SupportedLanguages[keyof typeof SupportedLanguages];

export const Lang = {
  ...SupportedLanguages,
  Auto: 'auto',
  None: 'none',
} as const;

export type Lang = typeof Lang[keyof typeof Lang];
