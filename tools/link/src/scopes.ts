export const Scope = {
  '@leafygreen-ui': 'packages',
  '@lg-tools': 'tools',
} as const;
export type scope = keyof typeof Scope;
