const Mode = {
  Dark: 'dark',
  Light: 'light',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

export { Mode };
