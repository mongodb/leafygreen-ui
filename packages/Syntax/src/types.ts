/**
 * Takes an object type or interface as a parameter, and
 * returns a union type composed of the values of each property.
 *
 * ```
 * const MyObject = { First: 'first', Second: 'second' }
 * type MyObjectType = StringUnionFromObjectType<typeof MyObject>
 *
 * // MyObjectType: 'first' | 'second'
 * ```
 */
type UnionFromValues<T> = T[keyof T];

export const Variant = {
  Light: 'light',
  Dark: 'dark',
} as const;

export type Variant = UnionFromValues<typeof Variant>;

// When adding additional language support, be sure to also add
// the language in webpack.config.js
export const SupportedLanguages = {
  Javascript: 'javascript',
  Typescript: 'typescript',
  Cal: 'cal', // C/AL
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

export type SupportedLanguages = UnionFromValues<typeof SupportedLanguages>;

export const Lang = {
  ...SupportedLanguages,
  Auto: 'auto',
  None: 'none',
} as const;

export type Lang = UnionFromValues<typeof Lang>;
