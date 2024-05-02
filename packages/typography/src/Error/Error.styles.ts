import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  BaseFontSize,
  color,
  fontFamilies,
  fontWeights,
  typeScales,
} from '@leafygreen-ui/tokens';

export const getErrorMessageStyle = ({
  theme,
  baseFontSize,
}: {
  theme: Theme;
  baseFontSize: BaseFontSize;
}) => {
  const fontSize =
    baseFontSize === BaseFontSize.Body1
      ? typeScales.body1.fontSize
      : typeScales.body2.fontSize;
  const lineHeight =
    baseFontSize === BaseFontSize.Body1 ? typeScales.body1.lineHeight : 20;

  return css`
    font-family: ${fontFamilies.default};
    font-weight: ${fontWeights.regular};
    font-size: inherit;
    line-height: inherit;

    /* Unsets browser defaults */
    margin-block-start: 0;
    margin-block-end: 0;

    /* Variable Styles */
    color: ${color[theme].text.error.default};
    font-size: ${fontSize}px;
    line-height: ${lineHeight}px;
  `;
};
