/** @deprecated prefer Theme */
const Mode = {
  Dark: 'dark',
  Light: 'light',
} as const;

/** @deprecated prefer Theme */
type Mode = (typeof Mode)[keyof typeof Mode];

export { Mode };
