import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  BaseFontSize,
  color,
  fontFamilies,
  fontWeights,
  typeScales,
} from '@leafygreen-ui/tokens';

export const labelStyle = css`
  font-family: ${fontFamilies.default};
  font-weight: ${fontWeights.bold};
`;

export const labelColorStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${color.light.text.primary.default};
  `,
  [Theme.Dark]: css`
    color: ${color.dark.text.primary.default};
  `,
};

export const disabledLabelColorStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${color.light.text.disabled.default};
  `,
  [Theme.Dark]: css`
    color: ${color.dark.text.disabled.default};
  `,
};

export const labelTypeScaleStyles: Record<BaseFontSize, string> = {
  [BaseFontSize.Body1]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
  `,
  [BaseFontSize.Body2]: css`
    font-size: ${typeScales.body2.fontSize}px;
    line-height: 20px; // Hardcoding because it does not match body2 lineHeight
  `,
};
