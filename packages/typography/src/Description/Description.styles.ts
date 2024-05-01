import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  BaseFontSize,
  color,
  fontFamilies,
  fontWeights,
  typeScales,
} from '@leafygreen-ui/tokens';

export const descriptionStyle = css`
  font-family: ${fontFamilies.default};
  font-weight: ${fontWeights.regular};
  margin-top: 0;
  margin-bottom: 0;
`;

export const descriptionColorStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${color.light.text.secondary.default};
  `,
  [Theme.Dark]: css`
    color: ${color.dark.text.secondary.default};
  `,
};

export const disabledDescriptionColorStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${color.light.text.lowContrast.default};
  `,
  [Theme.Dark]: css`
    color: ${color.dark.text.lowContrast.default};
  `,
};

export const descriptionTypeScaleStyles: Record<BaseFontSize, string> = {
  [BaseFontSize.Body1]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
  `,
  [BaseFontSize.Body2]: css`
    font-size: ${typeScales.body2.fontSize}px;
    line-height: 20px; // Hardcoding because it does not match body2 lineHeight
  `,
};
