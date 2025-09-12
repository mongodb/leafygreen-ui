/**
 * Utility type that returns `X.Y` if it exists, otherwise defaults to fallback type `Z`, or `any`
 */
export type Exists<
  X,
  Y extends keyof X | string,
  Z = unknown,
> = Y extends keyof X ? X[Y] : Z;
