/** Maps the scope name with the directory in the current repository */
export const Scope = {
  '@leafygreen-ui': 'packages',
  '@lg-tools': 'tools',
} as const;
export type scope = keyof typeof Scope;
