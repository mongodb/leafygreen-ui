export const ModuleType = {
  esm: 'esm',
  umd: 'umd',
  cjs: 'cjs',
  yui: 'yui',
  amd: 'amd',
  steal: 'steal',
} as const;
export type ModuleType = typeof ModuleType[keyof typeof ModuleType];
