export const fontWeights = {
  regular: 400,
  medium: 500,
  bold: 700, // semi-bold inherent to font file is locally defined as bold
} as const;

export default fontWeights;

export type FontWeights = (typeof fontWeights)[keyof typeof fontWeights];
