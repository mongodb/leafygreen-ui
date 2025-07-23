export const BaseFontSize = {
  Body1: 13,
  Body2: 16,
} as const;

export type BaseFontSize = (typeof BaseFontSize)[keyof typeof BaseFontSize];

/**
 * Defines font sizes and line heights of common typographic elements.
 * Units are in `px`
 */
const typeScales = {
  body1: {
    fontSize: BaseFontSize.Body1,
    lineHeight: 20,
  } as const,
  body2: {
    fontSize: BaseFontSize.Body2,
    lineHeight: 28,
  } as const,
  code1: {
    fontSize: 13,
    lineHeight: 20,
  } as const,
  code2: {
    fontSize: 15,
    lineHeight: 24,
  } as const,
  disclaimer: {
    fontSize: 12,
    lineHeight: 20,
  } as const,
  large: {
    fontSize: 18,
    lineHeight: 24,
  } as const,
} as const;

export default typeScales;
