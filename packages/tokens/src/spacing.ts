const spacing = {
  0: 0,
  25: 1,
  50: 2,
  100: 4,
  150: 6,
  200: 8,
  300: 12,
  400: 16,

  /**  @deprecated use 100 instead */
  1: 4,
  /**  @deprecated use 200 instead */
  2: 8,
  /**  @deprecated use 400 instead*/
  3: 16,
  /**  @deprecated */
  4: 24,
  /**  @deprecated */
  5: 32,
  /**  @deprecated */
  6: 64,
  /**  @deprecated */
  7: 88,
} as const;

export default spacing;
