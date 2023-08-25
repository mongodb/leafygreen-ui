import once from 'lodash/once';

export const consoleOnce = {
  error: once(console.error),
  warn: once(console.warn),
  log: once(console.log),
};
