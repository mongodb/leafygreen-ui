export const fontWeights = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  /**
   * @deprecated The font face used has always been a semibold font. Even
   * though a bold weight was offered, it still was rendering a semibold font.
   * This has been deprecated in favor of {@link semiBold} to more accurately
   * reflect the font face being used.
   */
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
