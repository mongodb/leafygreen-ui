export interface TypeScale {
  fontSize: number;
  lineHeight: number;
}

const typeScales = {
  body1: {
    fontSize: 13,
    lineHeight: 20,
  } as TypeScale,
  body2: {
    fontSize: 16,
    lineHeight: 28,
  } as TypeScale,
  code1: {
    fontSize: 13,
    lineHeight: 20,
  } as TypeScale,
  code2: {
    fontSize: 15,
    lineHeight: 24,
  } as TypeScale,
  disclaimer: {
    fontSize: 12,
    lineHeight: 20,
  } as TypeScale,
} as const;

export default typeScales;
