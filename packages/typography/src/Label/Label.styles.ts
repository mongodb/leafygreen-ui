import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  BaseFontSize,
  color,
  fontFamilies,
  fontWeights,
  typeScales,
} from '@leafygreen-ui/tokens';

export const getLabelStyles = (theme: Theme) => {
  return css`
    color: ${color[theme].text.primary.default};

    font-family: ${fontFamilies.default};
    font-weight: ${fontWeights.semiBold};
  `;
};

export const getDisabledLabelColorStyle = (theme: Theme) => {
  return css`
    color: ${color[theme].text.disabled.default};
  `;
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
