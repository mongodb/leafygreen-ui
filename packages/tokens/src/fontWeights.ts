export const fontWeights = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  /** @deprecated - Prefer {@link semiBold} */
  bold: 700, // semi-bold inherent to font file is locally defined as bold
} as const;

export const FontWeight = {
  Regular: 'regular',
  Medium: 'medium',
  SemiBold: 'semiBold',
  /** @deprecated - Prefer {@link SemiBold} */
  Bold: 'bold',
} as const;
export type FontWeight = keyof typeof fontWeights;

export default fontWeights;
