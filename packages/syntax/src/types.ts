export const Variant = {
  Light: 'light',
  Dark: 'dark',
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

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
  Swift: 'swift',
  Bash: 'bash',
  Shell: 'shell',
  Sql: 'sql',
  Yaml: 'yaml',
  Json: 'json',
} as const;

export type SupportedLanguages = typeof SupportedLanguages[keyof typeof SupportedLanguages];

export const Language = {
  ...SupportedLanguages,
  Auto: 'auto',
  None: 'none',
} as const;

export type Language = typeof Language[keyof typeof Language];
